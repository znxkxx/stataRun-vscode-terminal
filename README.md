# stataRun Terminal - Lightweight Version


> **Language:** [English](README.md) | [中文](README_zh.md)


> **Important Notice:** This is a personal modified version based on the original stataRun extension (https://github.com/poidstotal/stataRun). **It has not been published to the VS Code Extension Marketplace** and requires manual compilation to generate a vsix file for use. We recommend using the original stataRun for more complete functionality.

stataRun Terminal is a simplified VS Code extension that allows you to run Stata codes (.do .ado) and commands directly in the built-in terminal. This is a lightweight terminal-only version derived from the original stataRun extension.

## Features

The following commands and keyboard shortcuts are implemented (Ctrl to be replaced by Cmd on macOS):

- `Shift+Ctrl+A`: Run All Lines - Runs the entire file
- `Shift+Ctrl+S`: Run Selection - Runs the selected text
- `Shift+Ctrl+C`: Run Current Line - Runs the current line
- `Shift+Ctrl+D`: Run Downward Lines - Runs from current line to end of file
- `Shift+Ctrl+F`: Run Frontward Lines - Runs from first line to current line

## Prerequisites

### Required Software
- **Stata**: Must be installed and available in your system PATH
- **VS Code**: Version 1.25.0 or higher with built-in terminal support

### Important Setup Steps
**Before using this extension, you must first start Stata in the VS Code terminal:**

1. Open VS Code
2. Open the integrated terminal (`Ctrl+`` or `View > Terminal`)
3. Run Stata by typing the appropriate command:
   ```bash
   stata-se    # For Stata SE
   stata-mp    # For Stata MP  
   stata-ic    # For Stata IC
   ```
4. Keep the Stata session running in the terminal

**Note**: The extension sends commands to the active terminal, so Stata must be running in that terminal for the commands to execute properly.

## Configuration

You can configure the Stata command to use in the terminal by adding this to your VS Code settings:

```json
{
    "stataRun.vscodeTerminalBin": "stata-se"
}
```

Supported values: `stata-se`, `stata-mp`, `stata-ic`, or any custom Stata command available in your system PATH.

## Installation

> **Note:** This extension is not published to the VS Code Extension Marketplace. **It must be manually compiled to generate a vsix file for local installation**.

### From Source (For Developers)
**Note:** Only tested in Ubuntu 22.04 environment and can only be used for running Stata code in the terminal.

**Note**: Manual compilation of vsix files requires setting up a Node.js environment. Only the following Node.js and npm versions have been tested:
```bash
node --version
v20.15.0
npm --version
10.7.0
```

1. Clone this repository:
```bash
git clone https://github.com/znxkxx/stataRun-vscode-terminal.git
```

2. Install dependencies:
```bash
npm install
```

3. Package the extension:
```bash
npm run package
```

4. **Manually install the generated .vsix file**: In VS Code, click the Extensions icon → three dots in the top right → "Install from VSIX...", then select the generated vsix file.

## Usage

1. **Start Stata**: First, open Stata in VS Code's integrated terminal as described above
2. **Open Stata file**: Open a Stata file (.do) in VS Code
3. **Run code**: Use the keyboard shortcuts or right-click context menu to run code
4. **View results**: The code will be executed in the terminal where Stata is running

## Troubleshooting

### Common Issues

**Problem**: Commands are not executing in Stata
**Solution**: Make sure Stata is running in the active terminal before using the extension

**Problem**: "Command not found" error
**Solution**: Ensure Stata is properly installed and available in your system PATH

**Problem**: Extension not working
**Solution**: Check that you have the latest version of VS Code and the extension

## Differences from Original stataRun

This version is simplified and focuses only on terminal functionality:

- ✅ Uses VS Code's built-in terminal only
- ✅ No platform-specific dependencies (Windows OLE, macOS AppleScript, Linux xdotool)
- ✅ Simplified configuration
- ✅ Better cross-platform compatibility
- ❌ No external application integration

## Contributing

Feel free to contribute by submitting issues or pull requests at the [GitHub repository](https://github.com/znxkxx/stataRun-vscode-terminal).

## License

MIT License - See LICENSE file for details.

## Version History

### 1.0.0
- Initial release: Terminal-only version derived from stataRun 2.0.1
- Simplified codebase and configuration
- Removed external application dependencies
- Improved cross-platform compatibility