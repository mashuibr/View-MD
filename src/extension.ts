import * as vscode from "vscode";

let currentPanel: vscode.WebviewPanel | undefined;

export function activate(context: vscode.ExtensionContext) {
  const command = vscode.commands.registerCommand(
    "markdownPreviewer.open",
    async () => {
      const editor = vscode.window.activeTextEditor;

      if (!editor) {
        vscode.window.showErrorMessage("Open a file first!");
        return;
      }

      if (editor.document.languageId !== "markdown") {
        vscode.window.showErrorMessage("Open a Markdown (.md) file!");
        return;
      }

      // ✅ Reuse existing panel
      if (currentPanel) {
        currentPanel.reveal(vscode.ViewColumn.Beside);
      } else {
        currentPanel = vscode.window.createWebviewPanel(
          "markdownPreview",
          "Markdown Preview",
          vscode.ViewColumn.Beside,
          { enableScripts: true },
        );

        // ✅ Reset when closed
        currentPanel.onDidDispose(() => {
          currentPanel = undefined;
        });
      }

      const updatePreview = async () => {
        if (!currentPanel) {
          return;
        }

        const text = editor.document.getText();
        const html = await getHTML(text);
        currentPanel.webview.html = html;
      };

      await updatePreview();
      const scrollListener = vscode.window.onDidChangeTextEditorVisibleRanges(
        (event) => {
          if (!currentPanel) {
            return;
          }

          if (event.textEditor.document !== editor.document) {
            return;
          }

          const topLine = event.visibleRanges[0].start.line;

          currentPanel.webview.postMessage({
            type: "scroll-sync",
            line: topLine,
          });
        },
      );
      const onDidChangeTextDocument = vscode.workspace.onDidChangeTextDocument(
        async (event) => {
          if (event.document === editor.document) {
            await updatePreview();
          }
        },
      );

      // ✅ Clean up listener when panel closes
      currentPanel.onDidDispose(() => {
        onDidChangeTextDocument.dispose();
        scrollListener.dispose();
      });
    },
  );

  context.subscriptions.push(command);
}

async function getHTML(markdown: string): Promise<string> {
  const { marked } = await import("marked");

  // Split markdown into lines
  const lines = markdown.split("\n");

  // Wrap each line
  const wrappedMarkdown = lines
    .map((line, index) => {
      return `<div data-line="${index}">
${marked.parse(line)}
</div>`;
    })
    .join("");

  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

<style>
  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: system-ui;
    padding: 20px;
    max-width: 800px;
    margin: auto;
    line-height: 1.6;
    background-color: #0d1117;
    color: #c9d1d9;
  }

  h1, h2, h3 {
    border-bottom: 1px solid #30363d;
    padding-bottom: 5px;
  }

  code {
    background: #161b22;
    padding: 3px 6px;
    border-radius: 4px;
  }

  pre {
    background: #161b22;
    padding: 10px;
    border-radius: 6px;
    overflow-x: auto;
  }

  a {
    color: #58a6ff;
  }
</style>
</head>

<body>

${wrappedMarkdown}

<script>

window.addEventListener("message", (event) => {

  const message = event.data;

  if (message.type === "scroll-sync") {

    const line = message.line;

    const elements =
      document.querySelectorAll("[data-line]");

    let target = null;

    for (const el of elements) {

      const elLine =
        Number(el.dataset.line);

      if (elLine <= line) {
        target = el;
      } else {
        break;
      }
    }

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }
});

</script>

</body>
</html>
`;
}
