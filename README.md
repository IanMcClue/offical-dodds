# OFFICAL DODDS

A static, game-menu-inspired website in midnight blue and chrome. The locally hosted Syne font uses weight 800; its SIL Open Font License is included in `dist/assets/OFL.txt`.

## Local development

Run `npm run dev` and open `http://localhost:5173`. No runtime dependencies or build step are needed. Deployable files are in `dist/`, with relative asset URLs suitable for a GitHub Pages project path.

## Mobile navigation

At widths up to 900px, the desktop dial is replaced by a 48px menu button with three stacked chrome-and-cobalt capsules. Opening it reveals eight staggered pill-shaped links. The icon changes to a close symbol; selecting a destination closes the menu and focuses its heading. Escape closes the menu and restores focus to its button. Arrow keys, Home and End navigate the expanded links. Browser back/forward updates the active destination.

Mobile content uses normal document flow so longer sections remain scrollable. Touch controls are at least 44px high. Safari accommodations include viewport safe-area padding, a `vh` fallback before `svh`, a 16px text input, WebKit text clipping, and older MediaQueryList listener support. System reduced-motion settings disable menu animations.

## GitHub Pages

The workflow at `.github/workflows/pages.yml` validates pull requests in Chromium and WebKit. Successful `main` builds deploy only `dist/` using the official GitHub Pages actions. Configure the repository's **Settings → Pages → Source** as **GitHub Actions** before the first deployment. No custom domain or server is required.

Workflow reference: [GitHub's custom Pages workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Verification

- `npm run check` checks application and server JavaScript syntax.
- `npm ci`, `npx playwright install --with-deps chromium webkit`, and `npm run test:e2e` run the browser suite.
- Browser tests cover all destinations, phone and tablet widths, landscape, menu focus, Escape, history, reduced motion, resizing, horizontal overflow, and content height.
- Local DOM interaction checks passed for all eight destinations, expanded/current state, URL changes, focus, Escape and breakpoint cleanup.
- Local visual/browser verification remains unavailable: Chrome was prevented from launching and WebKit's download failed DNS resolution. The browser suite is prepared but has not passed yet.

Project, archive, and contact details have not been supplied; these sections retain their empty states. Sound, background motion, and texture preferences persist locally. Sound defaults to off.
