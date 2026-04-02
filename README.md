# Paul Roberts — Portfolio Site

Personal portfolio website for Paul Roberts. Single-page, no build step required.

## Tech Stack

- Plain HTML, CSS, and JavaScript — zero dependencies, no bundler
- Google Fonts: DM Serif Display + Space Mono
- GitHub Pages for hosting

## Local Preview

**Option 1 — Open directly in browser:**

```bash
open index.html
```

**Option 2 — Local HTTP server (recommended, avoids CORS edge cases):**

```bash
# Python 3
python -m http.server 8000

# Then visit: http://localhost:8000
```

```bash
# Node.js (if npx is available)
npx serve .
```

## Deploy to GitHub Pages

1. Go to the repository on GitHub: `https://github.com/pauljrob/webapp15`
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Source**, select **Deploy from a branch**
4. Set **Branch** to `main` and folder to `/ (root)`
5. Click **Save**
6. After a minute or two, the site will be live at:
   `https://pauljrob.github.io/webapp15/`

## Update Repo Cards

All project cards are driven by the `REPOS` array at the top of `main.js`.

To add, remove, or edit a card, open `main.js` and modify the array:

```js
const REPOS = [
  {
    name: "my-project",                          // repo slug shown as card title
    description: "Short description here.",      // shown below the title
    language: "JavaScript",                      // badge label + color key
    stars: 42,                                   // shown in card footer
    url: "https://github.com/pauljrob/my-project" // "View Repo" link target
  },
  // ... more entries
];
```

**Supported language badge colors:** `JavaScript`, `TypeScript`, `Python`, `Go`, `Rust`, `Shell`.
Any other value renders with a neutral grey badge.

Commit and push your changes — GitHub Pages will redeploy automatically within ~60 seconds.

## File Structure

```
webapp15/
├── index.html   — page structure and semantic markup
├── style.css    — all styles (CSS custom properties, mobile-first)
├── main.js      — scroll behavior, nav, Intersection Observer, repo cards
└── README.md    — this file
```
