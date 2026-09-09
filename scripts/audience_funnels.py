"""Runs the three audience conversion funnels from issue #19.

GA4 Explorations are not creatable through any API, so this reports the same
funnels through the Data API instead. Funnel reporting lives in the v1alpha
surface only — v1beta has no funnel types at all.

See scripts/audience-funnels.md.
"""

from __future__ import annotations

import sys

from google.analytics.data_v1alpha import AlphaAnalyticsDataClient
from google.analytics.data_v1alpha.types import (
    DateRange,
    Dimension,
    Funnel,
    FunnelBreakdown,
    FunnelEventFilter,
    FunnelParameterFilter,
    FunnelParameterFilterExpression,
    FunnelParameterFilterExpressionList,
    FunnelFilterExpression,
    FunnelFilterExpressionList,
    FunnelStep,
    RunFunnelReportRequest,
    StringFilter,
)

PROPERTY_ID = "333644173"

# (audience, page-path fragments identifying that audience, terminal events)
FUNNELS = [
    ("schools", ["/for-schools"], ["demo_click"]),
    ("funders", ["/for-researchers", "/publications"], ["contact_form_click", "form_submit"]),
    ("tutors", ["/for-tutors", "/get-involved"], ["tutor_apply_click"]),
]


def _event(name: str) -> FunnelFilterExpression:
    return FunnelFilterExpression(funnel_event_filter=FunnelEventFilter(event_name=name))


def _any_event(names: list[str]) -> FunnelFilterExpression:
    if len(names) == 1:
        return _event(names[0])
    return FunnelFilterExpression(
        or_group=FunnelFilterExpressionList(expressions=[_event(n) for n in names])
    )


def _viewed_any(paths: list[str]) -> FunnelFilterExpression:
    """Matches a page_view of any of `paths`, or of any page nested under them.

    Filters on the `page_location` event parameter rather than the `pagePath`
    dimension: the API rejects `pagePath` inside a funnel step outright
    ("not currently supported inside segments & funnel steps"). `page_location`
    is the full URL, so a CONTAINS match on the path is the equivalent test.
    """
    return FunnelFilterExpression(
        funnel_event_filter=FunnelEventFilter(
            event_name="page_view",
            funnel_parameter_filter_expression=FunnelParameterFilterExpression(
                or_group=FunnelParameterFilterExpressionList(
                    expressions=[
                        FunnelParameterFilterExpression(
                            funnel_parameter_filter=FunnelParameterFilter(
                                event_parameter_name="page_location",
                                string_filter=StringFilter(
                                    match_type=StringFilter.MatchType.CONTAINS,
                                    value=path,
                                ),
                            )
                        )
                        for path in paths
                    ]
                )
            ),
        )
    )


def _cohort_label(breakdown: str) -> str:
    """`RESERVED_TOTAL` is the API's own all-cohorts row, not an audience."""
    if breakdown == "RESERVED_TOTAL":
        return "all sessions"
    if not breakdown:
        return "first_audience = (empty)"
    return f"first_audience = {breakdown}"


def _cohort_order(item: tuple[str, list[tuple[str, int]]]) -> tuple[int, str]:
    """Totals first, then cohorts alphabetically."""
    return (0 if item[0] == "RESERVED_TOTAL" else 1, item[0])


def run(client: AlphaAnalyticsDataClient, start: str, end: str) -> None:
    for audience, paths, terminal in FUNNELS:
        request = RunFunnelReportRequest(
            property=f"properties/{PROPERTY_ID}",
            date_ranges=[DateRange(start_date=start, end_date=end)],
            funnel=Funnel(
                steps=[
                    FunnelStep(name="Session start", filter_expression=_event("session_start")),
                    FunnelStep(
                        name=f"Viewed {' or '.join(paths)}",
                        filter_expression=_viewed_any(paths),
                    ),
                    FunnelStep(
                        name=f"Converted ({', '.join(terminal)})",
                        filter_expression=_any_event(terminal),
                    ),
                ]
            ),
            # Attribute to the door entered through, not the page converted on.
            funnel_breakdown=FunnelBreakdown(
                breakdown_dimension=Dimension(name="customUser:first_audience")
            ),
        )
        response = client.run_funnel_report(request)

        print(f"\n{audience.upper()}  ({start} to {end})")
        rows = list(response.funnel_table.rows)
        if not rows:
            print("  no data")
            continue

        # Rows come back as (step, breakdown) pairs. Group by breakdown value so
        # each cohort's drop-off is read against its own step 1, and print every
        # cohort rather than only the matching one — before first_audience has
        # data the only cohort present is "(not set)", and silently dropping it
        # would report an empty funnel for a property that has traffic.
        by_breakdown: dict[str, list[tuple[str, int]]] = {}
        for row in rows:
            dims = [d.value for d in row.dimension_values]
            step = dims[0]
            breakdown = dims[1] if len(dims) > 1 else "(all)"
            by_breakdown.setdefault(breakdown, []).append(
                (step, int(row.metric_values[0].value))
            )

        for breakdown, steps in sorted(by_breakdown.items(), key=_cohort_order):
            print(f"  {_cohort_label(breakdown)}")
            base = steps[0][1] or 1
            for step, users in steps:
                print(f"    {step:<46} {users:>6}  ({users / base:.1%})")


def main() -> int:
    start, end = (sys.argv[1], sys.argv[2]) if len(sys.argv) > 2 else ("30daysAgo", "today")
    run(AlphaAnalyticsDataClient(), start, end)
    print(
        "\nfirst_audience was registered 2026-09-09; earlier data reports as unset.\n"
        "Baseline to beat: 1.65% of page-viewing sessions clicked any conversion CTA."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
