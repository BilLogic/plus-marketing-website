/**
 * LinkedIn post embeds shown in the homepage "Latest from LinkedIn" feed.
 *
 * How to add a post:
 *   1. Open the post on LinkedIn.
 *   2. Click the "..." menu on the post → "Embed this post".
 *   3. Copy the `src` URL from the provided <iframe>. It looks like:
 *        https://www.linkedin.com/embed/feed/update/urn:li:share:7300000000000000000
 *      (some posts use `urn:li:ugcPost:...` — that works too).
 *   4. Paste that full URL as a string in the array below. Newest first.
 *
 * The homepage feed renders automatically once this array is non-empty.
 */
export const PLUS_LINKEDIN_EMBEDS: string[] = [
  // e.g. "https://www.linkedin.com/embed/feed/update/urn:li:share:7300000000000000000",
]
