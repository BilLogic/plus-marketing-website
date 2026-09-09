import { act, render, screen } from "@testing-library/react"
import { useCallback, useState } from "react"
import { beforeEach, describe, expect, it, vi } from "vitest"

import {
  useParamSyncedState,
  useUrlSearchParams,
} from "@/lib/use-url-search-params"

const replaceSpy = vi.fn()
vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: replaceSpy }),
}))

function setUrl(search: string) {
  window.history.replaceState({}, "", `/publications${search}`)
}

function Probe() {
  const { params, replace } = useUrlSearchParams()
  return (
    <div>
      <output data-testid="q">{params.get("q") ?? ""}</output>
      <output data-testid="all">{params.toString()}</output>
      <button
        onClick={() => replace(new URLSearchParams({ year: "2026" }))}
      >
        set year
      </button>
    </div>
  )
}

beforeEach(() => {
  replaceSpy.mockClear()
  setUrl("")
})

describe("useUrlSearchParams", () => {
  it("reads the query string after mount", () => {
    setUrl("?q=tutoring&year=2026")
    render(<Probe />)
    expect(screen.getByTestId("q").textContent).toBe("tutoring")
  })

  it("reports no parameters when the URL has none", () => {
    render(<Probe />)
    expect(screen.getByTestId("all").textContent).toBe("")
  })

  it("updates on back/forward navigation", () => {
    render(<Probe />)
    expect(screen.getByTestId("q").textContent).toBe("")

    act(() => {
      setUrl("?q=later")
      window.dispatchEvent(new PopStateEvent("popstate"))
    })
    expect(screen.getByTestId("q").textContent).toBe("later")
  })

  it("applies a replace immediately, without waiting on the router", () => {
    render(<Probe />)
    act(() => {
      screen.getByText("set year").click()
    })
    expect(screen.getByTestId("all").textContent).toBe("year=2026")
  })

  it("pushes the new query string to the router", () => {
    render(<Probe />)
    act(() => {
      screen.getByText("set year").click()
    })
    expect(replaceSpy).toHaveBeenCalledWith("?year=2026", { scroll: false })
  })

  it("navigates to a bare '?' when every parameter is cleared", () => {
    setUrl("?q=x")
    render(<Probe />)
    act(() => {
      screen.getByTestId("all") // settled
    })
    replaceSpy.mockClear()

    function Clear() {
      const { replace } = useUrlSearchParams()
      return (
        <button onClick={() => replace(new URLSearchParams())}>clear</button>
      )
    }
    render(<Clear />)
    act(() => {
      screen.getByText("clear").click()
    })
    expect(replaceSpy).toHaveBeenCalledWith("?", { scroll: false })
  })

  it("stops listening for popstate once unmounted", () => {
    const { unmount } = render(<Probe />)
    const remove = vi.spyOn(window, "removeEventListener")
    unmount()
    expect(remove).toHaveBeenCalledWith("popstate", expect.any(Function))
  })
})

function SyncProbe() {
  const { params } = useUrlSearchParams()
  const [value, setValue] = useState("")
  const set = useCallback((next: string) => setValue(next), [])
  useParamSyncedState(params, "q", set)
  return <output data-testid="value">{value}</output>
}

describe("useParamSyncedState", () => {
  it("adopts the parameter's value on mount", () => {
    setUrl("?q=from-url")
    render(<SyncProbe />)
    expect(screen.getByTestId("value").textContent).toBe("from-url")
  })

  it("clears local state when the parameter goes away", () => {
    setUrl("?q=first")
    render(<SyncProbe />)
    expect(screen.getByTestId("value").textContent).toBe("first")

    act(() => {
      setUrl("")
      window.dispatchEvent(new PopStateEvent("popstate"))
    })
    expect(screen.getByTestId("value").textContent).toBe("")
  })

  it("leaves local state alone when an unrelated parameter changes", () => {
    setUrl("?q=keep")
    render(<SyncProbe />)

    act(() => {
      setUrl("?q=keep&year=2026")
      window.dispatchEvent(new PopStateEvent("popstate"))
    })
    expect(screen.getByTestId("value").textContent).toBe("keep")
  })
})
