# View MD - Markdown Previewer

![View MD Logo](assets/logo.png)

A simple and efficient Markdown previewer extension for Visual Studio Code. This extension provides a live preview for your Markdown files in a separate view, with scroll synchronization to keep your editor and preview aligned.

## Features

- **Live Preview**: See your Markdown changes rendered in real-time.
- **Scroll Sync**: The preview scrolls as you scroll through your Markdown file.
- **Simple and Lightweight**: No unnecessary features, just a fast and reliable preview.
- **Side-by-Side View**: The preview opens in a column next to your active editor.

## Usage

1.  Open a Markdown file (`.md`).
2.  Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac).
3.  Run the command: `Open Markdown Preview`.

A new panel will open to the side with the rendered HTML of your Markdown file. The preview will automatically update as you edit the file.

## Commands

- `Open Markdown Preview`: Opens the Markdown preview for the active Markdown file.

## Installation

You can install this extension from the Visual Studio Code Marketplace.

1.  Open the Extensions view in VS Code (`Ctrl+Shift+X`).
2.  Search for "View MD".
3.  Click "Install".

## Development

To get started with development:

1.  Clone the repository:
    ```bash
    git clone https://github.com/mashuibr/View-MD.git
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development watch task:
    ```bash
    npm run watch
    ```
4.  Press `F5` to open a new VS Code window with the extension loaded for debugging.

### Build

To create a production-ready package, run:

```bash
npm run package
```

This will create a `.vsix` file that can be installed in VS Code.

### Tests

To run the tests:

1.  Make sure the watch task is running (`npm run watch`).
2.  Open the Testing view in the Activity Bar.
3.  Click the "Run Tests" button.

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
