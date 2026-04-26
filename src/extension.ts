import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

  const command = vscode.commands.registerCommand('markdownPreviewer.open', async () => {

    const panel = vscode.window.createWebviewPanel(
      'markdownPreview',
      'Markdown Preview',
      vscode.ViewColumn.Beside,
      { enableScripts: true }
    );

    const editor = vscode.window.activeTextEditor;

    if (!editor) {
      vscode.window.showErrorMessage("Open a Markdown file first!");
      return;
    }

    const updatePreview = async () => {
		const text = editor.document.getText();
		const html = await getHTML(text);
		panel.webview.html = html;
	};

    await updatePreview();

    const onDidChangeTextDocument = vscode.workspace.onDidChangeTextDocument(async event => {
      if (event.document === editor.document) {
        await updatePreview();
      }
    });

    panel.onDidDispose(() => {
      onDidChangeTextDocument.dispose();
    });

  });

  context.subscriptions.push(command);
}

async function getHTML(markdown: string): Promise<string> {
  const { marked } = await import('marked');
  const html = marked(markdown);

  return `
    <html>
      <body>
        ${html}
      </body>
    </html>
  `;
}