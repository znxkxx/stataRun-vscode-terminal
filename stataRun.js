const vscode = require('vscode');
const sendCode = require('./sendCode');

function CheckEditor(editor) {
    if (!editor) {
        let mgs = 'No Editor is opened. Open a compatible file and try again';
        vscode.window.showWarningMessage(mgs);
        return null;
    }
    return editor;
}

function ShowError() {
    let mgs = 'The editor looks empty, please add some Stata code or command';
    vscode.window.showErrorMessage(mgs);
}

function activate(context) {
    console.log('StataRun Terminal extension activated - Version 1.0.0');

    let runAll = vscode.commands.registerCommand('stataRun.runAll', function () {
        let editor = CheckEditor(vscode.window.activeTextEditor);
        if (editor) {
            let code = editor.document.getText();
            if (code.length > 0) {
                if (editor.document.isUntitled) {
                    sendCode.send(code);
                } else {
                    var filePath = editor.document.uri.fsPath;
                    sendCode.send('do "' + filePath + '"');
                }
            } else {
                ShowError();
            }
        }
    });

    let runSelection = vscode.commands.registerCommand('stataRun.runSelection', function () {
        let editor = CheckEditor(vscode.window.activeTextEditor);
        if (editor) {
            let selection = editor.selection;
            let code = editor.document.getText(selection);
            if (code) {
                sendCode.send(code);
            } else {
                ShowError();
            }
        }
    });

    let runDown = vscode.commands.registerCommand('stataRun.runDown', function () {
        let editor = CheckEditor(vscode.window.activeTextEditor);
        if (editor) {
            const position = editor.selection.active.line;
            const lines = editor.document.lineCount - 1;
            const first = new vscode.Position(position, 0);
            const lastpos = editor.document.lineAt(lines);
            const last = new vscode.Position(lines, lastpos.range.end.character);

            if (first.line !== last.line) {
                const range = new vscode.Range(first, last);
                var code = editor.document.getText(range);
            }
            if (code) {
                sendCode.send(code);
            } else {
                ShowError();
            }
        }
    });

    let runCurrent = vscode.commands.registerCommand('stataRun.runCurrent', function () {
        let editor = CheckEditor(vscode.window.activeTextEditor);
        if (editor) {
            const position = editor.selection.active;
            const first = new vscode.Position(position.line, 0);
            const lastpos = editor.document.lineAt(position.line);
            const last = new vscode.Position(position.line, lastpos.range.end.character);
            
            if (first.character !== last.character) {
                const range = new vscode.Range(first, last);
                var code = editor.document.getText(range);
            }
            if (code) {
                sendCode.send(code);
            } else {
                ShowError();
            }
        }
    });

    let runFront = vscode.commands.registerCommand('stataRun.runFront', function () {
        let editor = CheckEditor(vscode.window.activeTextEditor);
        if (editor) {
            const position = editor.selection.active.line;
            const first = new vscode.Position(0, 0);
            const lastpos = editor.document.lineAt(position);
            const last = new vscode.Position(position, lastpos.range.end.character);

            if (first.line !== last.line) {
                const range = new vscode.Range(first, last);
                var code = editor.document.getText(range);
            }
            if (code) {
                sendCode.send(code);
            } else {
                ShowError();
            }
        }
    });

    context.subscriptions.push(runAll, runSelection, runCurrent, runDown, runFront);
}

exports.activate = activate;

function deactivate() {
    console.log('StataRun Terminal extension deactivated');
    // 清理所有临时文件
    sendCode.cleanupTempFiles();
}

exports.deactivate = deactivate;