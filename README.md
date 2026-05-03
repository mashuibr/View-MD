# view-md

`view-md` is a lightweight VS Code extension that opens a live Markdown preview in a side panel.

This project is currently pre-release and not yet published to the VS Code Marketplace. The GitHub repository is the main source of truth while development continues.

## What is view-md?

`view-md` helps you preview Markdown quickly while writing. Instead of switching tabs, it opens a dedicated preview panel beside your editor and updates as you type.

It is built for speed and simplicity:

- No complex setup.
- Fast open-and-preview workflow.
- Real-time updates from your active Markdown file.

## Why it is good

- **Focused workflow**: write and preview side-by-side.
- **Live feedback**: instantly see how Markdown renders.
- **Lightweight behavior**: reuses the existing preview panel instead of creating clutter.
- **Useful base for future features**: simple architecture that is easy to extend.

## Current Features

- Adds the command **Open Markdown Preview** (`markdownPreviewer.open`).
- Opens preview beside the current editor.
- Updates preview automatically as you edit the active Markdown file.
- Reuses an existing preview panel to avoid duplicate tabs.

## How to use it right now

1. Open a `.md` file in VS Code.
2. Run **Open Markdown Preview** from the Command Palette.
3. Edit your Markdown and watch the preview update in real time.

If no editor is open, or if the active file is not Markdown, the extension shows a helpful error message.

## Local development

### Prerequisites

- Node.js 20+ (recommended)
- npm
- VS Code 1.116.0+

### Install dependencies

```bash
npm install
```

### Build once

```bash
npm run compile
```

### Watch mode

```bash
npm run watch
```

### Run tests

```bash
npm test
```

## Available Scripts

- `npm run compile` - type-check, lint, and bundle extension code.
- `npm run package` - production bundle for publishing.
- `npm run watch` - run TypeScript and esbuild watchers in parallel.
- `npm run lint` - run ESLint on `src`.
- `npm run check-types` - run TypeScript type checks.
- `npm test` - run extension test suite.

## Contribution Guide

Contributions are welcome.

How others can contribute:

1. Fork the repository.
2. Create a feature branch.
3. Make changes with clear commit messages.
4. Run checks locally:

```bash
npm run compile
npm test
```

5. Open a Pull Request with:

- What changed
- Why it changed
- Any screenshots or preview notes (if UI output changed)

Contribution ideas:

- More Markdown rendering options.
- Better theming and typography controls.
- Extension settings for custom behavior.
- Performance and test coverage improvements.

## Known Limitations

- This extension currently applies its own preview styles (dark theme-like appearance).
- It does not yet expose user-configurable extension settings.

## Credits

- Project created and maintained by the `view-md` author.
- Built with the VS Code Extension API and the `marked` Markdown parser.
- Thanks to early users, testers, and contributors who help improve the extension.

## Release Notes

### 0.0.1

Initial version with live side-by-side Markdown preview.
