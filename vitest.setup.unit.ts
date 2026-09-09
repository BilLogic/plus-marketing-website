import { cleanup } from "@testing-library/react"
import { afterEach } from "vitest"

// React Testing Library does not auto-clean outside its own globals setup.
afterEach(() => {
  cleanup()
  document.body.innerHTML = ""
})
