/**
 * Notion serves uploaded files through S3 links whose `X-Amz-*` query is
 * re-signed on every API call (and expires within the hour), so two fetches of
 * unchanged content never match byte for byte. The path before the query names
 * the file itself, so dropping the query keeps a swapped image visible.
 */
// S3 percent-encodes everything else, so the query ends at the first other
// character — a following `)`, `]`, `>` or `,` stays outside the match.
const SIGNED_URL = /(https:\/\/[^\s"'()<>?[\],]+)\?[\w%.~+=&-]*X-Amz-Signature=[\w%.~+=&-]*/gi

const unsign = (_key: string, value: unknown) =>
  typeof value === "string" ? value.replace(SIGNED_URL, "$1") : value

/** True when `a` and `b` differ only in the signatures of Notion file links. */
export const sameIgnoringSignedUrls = (a: unknown, b: unknown): boolean =>
  JSON.stringify(a, unsign) === JSON.stringify(b, unsign)
