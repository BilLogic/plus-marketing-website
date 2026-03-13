import type { Preview } from "@storybook/nextjs-vite"
import "../src/app/globals.css"

const preview: Preview = {
  decorators: [],
  parameters: {
    options: {
      storySort: (a, b) => {
        const order = ["Welcome", "Styles", "Layout", "Effects", "components-marketing", "components-misc", "Templates"]

        const titleA = a?.title ?? a?.[1]?.title ?? ""
        const titleB = b?.title ?? b?.[1]?.title ?? ""

        const groupA = String(titleA).split("/")[0]
        const groupB = String(titleB).split("/")[0]

        const indexA = order.indexOf(groupA)
        const indexB = order.indexOf(groupB)

        if (indexA !== indexB) {
          if (indexA === -1) return 1
          if (indexB === -1) return -1
          return indexA - indexB
        }

        return String(titleA).localeCompare(String(titleB))
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
}

export default preview

