# Netlify: second site for Next.js (For Tutors branch)

The site **[plus-marketing-website.netlify.app](https://plus-marketing-website.netlify.app/)** is tied to **`main`** and only builds **Storybook** (`build-storybook` → static).

To host the **Next.js** app (including **`/for-tutors`**) on its own URL, add a **second Netlify site** that tracks **`for-tutors-v1`**.

## Steps

1. Netlify → **Add new site** → **Import an existing project** → GitHub → **`BilLogic/plus-marketing-website`** (or your fork).
2. **Branch to deploy** → set **Production branch** to **`for-tutors-v1`** (not `main`).
3. **Site name** → e.g. `plus-marketing-for-tutors` → live at `https://plus-marketing-for-tutors.netlify.app`.
4. Build settings are read from this branch’s **`netlify.toml`**:
   - **Build command:** `npm run build`
   - **Plugin:** `@netlify/plugin-nextjs` (handles output; do not use Storybook-only publish).
5. Deploy. Then open:
   - **For Tutors:** `https://<site>.netlify.app/for-tutors`
   - **Home:** `https://<site>.netlify.app/`

## Environment

- **Node 20** is set in `netlify.toml` (`NODE_VERSION`) for Next 16 + Storybook tooling in CI.

## Keeping both sites

| Site | Branch | What gets published |
|------|--------|---------------------|
| Existing (e.g. plus-marketing-website) | `main` | Storybook only (that branch’s `netlify.toml`) |
| New For Tutors / Next preview | `for-tutors-v1` | Full Next.js app (this branch’s `netlify.toml`) |

If you later merge `for-tutors-v1` into `main`, resolve **`netlify.toml`** intentionally (you cannot have two behaviors in one file without [context-specific config](https://docs.netlify.com/configure-builds/file-based-configuration/)).
