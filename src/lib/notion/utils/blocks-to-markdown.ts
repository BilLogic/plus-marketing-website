/**
 * Converts Notion block objects to markdown string.
 * Handles common block types for rendering on the website.
 */

function richTextToMarkdown(richText: any[]): string {
  if (!richText?.length) return ""
  return richText
    .map((t: any) => {
      let text = t.plain_text ?? ""
      const ann = t.annotations ?? {}
      if (ann.bold) text = `**${text}**`
      if (ann.italic) text = `*${text}*`
      if (ann.code) text = `\`${text}\``
      if (ann.strikethrough) text = `~~${text}~~`
      if (t.href) text = `[${text}](${t.href})`
      return text
    })
    .join("")
}

function blockToMarkdown(block: any): string {
  const type = block.type
  const data = block[type]

  switch (type) {
    case "paragraph":
      return richTextToMarkdown(data?.rich_text) + "\n"

    case "heading_1":
      return `# ${richTextToMarkdown(data?.rich_text)}\n`

    case "heading_2":
      return `## ${richTextToMarkdown(data?.rich_text)}\n`

    case "heading_3":
      return `### ${richTextToMarkdown(data?.rich_text)}\n`

    case "bulleted_list_item":
      return `- ${richTextToMarkdown(data?.rich_text)}\n`

    case "numbered_list_item":
      return `1. ${richTextToMarkdown(data?.rich_text)}\n`

    case "to_do":
      const checked = data?.checked ? "x" : " "
      return `- [${checked}] ${richTextToMarkdown(data?.rich_text)}\n`

    case "toggle":
      return `<details><summary>${richTextToMarkdown(data?.rich_text)}</summary></details>\n`

    case "quote":
      return `> ${richTextToMarkdown(data?.rich_text)}\n`

    case "callout":
      const icon = data?.icon?.emoji ?? ""
      return `> ${icon} ${richTextToMarkdown(data?.rich_text)}\n`

    case "divider":
      return "---\n"

    case "code":
      const lang = data?.language ?? ""
      return `\`\`\`${lang}\n${richTextToMarkdown(data?.rich_text)}\n\`\`\`\n`

    case "image": {
      const url = data?.file?.url ?? data?.external?.url ?? ""
      const caption = richTextToMarkdown(data?.caption)
      return `![${caption}](${url})\n`
    }

    case "video": {
      const videoUrl = data?.file?.url ?? data?.external?.url ?? ""
      return `[Video](${videoUrl})\n`
    }

    case "bookmark":
      return `[${data?.url ?? "Link"}](${data?.url ?? ""})\n`

    case "embed":
      return `[Embed](${data?.url ?? ""})\n`

    default:
      return ""
  }
}

export function blocksToMarkdown(blocks: any[]): string {
  return blocks
    .map(blockToMarkdown)
    .join("\n")
    .trim()
}
