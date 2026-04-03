/**
 * Simple markdown-to-HTML renderer for Notion page content.
 * Converts markdown string to JSX with proper semantic HTML.
 */

type Props = {
  content: string
}

export const MarkdownRenderer = ({ content }: Props) => {
  // Split by double newlines for paragraphs, process each block
  const html = markdownToHtml(content)
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

function markdownToHtml(md: string): string {
  return md
    // Headings
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    // Horizontal rule
    .replace(/^---$/gm, "<hr />")
    // Bold
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    // Italic
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // Strikethrough
    .replace(/~~(.+?)~~/g, "<del>$1</del>")
    // Inline code
    .replace(/`(.+?)`/g, "<code>$1</code>")
    // Images
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // Blockquotes
    .replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")
    // Unordered lists
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    // Code blocks
    .replace(/```(\w*)\n([\s\S]*?)```/g, "<pre><code>$2</code></pre>")
    // Paragraphs: wrap non-tag lines
    .replace(/^(?!<[a-z]|$)(.+)$/gm, "<p>$1</p>")
    // Wrap consecutive <li> in <ul>
    .replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
}
