# stataRun Terminal - 轻量级版本

> **重要声明：** 这是基于原始stataRun扩展(https://github.com/poidstotal/stataRun)的个人修改版本。**它未发布到VS Code扩展市场**，需要手动编译生成vsix文件才能使用。我们推荐使用原始stataRun以获得更完整的功能。

stataRun Terminal是一个简化的VS Code扩展，允许您直接在内置终端中运行Stata代码（.do .ado）和命令。这是从原始stataRun扩展派生的轻量级仅终端版本。

## 功能特点

实现了以下命令和键盘快捷键（在macOS上将Ctrl替换为Cmd）：

- `Shift+Ctrl+A`：运行全部行 - 运行整个文件
- `Shift+Ctrl+S`：运行选择内容 - 运行选中的文本
- `Shift+Ctrl+C`：运行当前行 - 运行当前行
- `Shift+Ctrl+D`：运行向下行 - 从当前行运行到文件末尾
- `Shift+Ctrl+F`：运行前行 - 从第一行运行到当前行

## 前置要求

### 必需软件
- **Stata**：必须已安装并在系统PATH中可用
- **VS Code**：版本1.25.0或更高版本，支持内置终端

### 重要设置步骤
**在使用此扩展之前，您必须首先在VS Code终端中启动Stata：**

1. 打开VS Code
2. 打开集成终端（`Ctrl+`` 或 `查看 > 终端`）
3. 通过输入适当的命令运行Stata：
   ```bash
   stata-se    # 对于Stata SE
   stata-mp    # 对于Stata MP  
   stata-ic    # 对于Stata IC
   ```
4. 保持Stata会话在终端中运行

**注意**：该扩展将命令发送到活动终端，因此Stata必须在该终端中运行才能正确执行命令。

## 配置

您可以通过在VS Code设置中添加以下内容来配置在终端中使用的Stata命令：

```json
{
    "stataRun.vscodeTerminalBin": "stata-se"
}
```

支持的值：`stata-se`、`stata-mp`、`stata-ic`或您系统PATH中可用的任何自定义Stata命令。

## 安装

> **注意：** 此扩展未发布到VS Code扩展市场。**必须手动编译生成vsix文件才能进行本地安装**。

### 从源代码安装（适用于开发者）
**注意：** 仅在Ubuntu 22.04环境中测试，且只能用于在终端中运行Stata代码。

**注意**：手动编译vsix文件需要设置Node.js环境。仅测试了以下Node.js和npm版本：
```bash
node --version
v20.15.0
npm --version
10.7.0
```

1. 克隆此仓库：
```bash
git clone https://github.com/znxkxx/stataRun-vscode-terminal.git
```

2. 安装依赖：
```bash
npm install
```

3. 打包扩展：
```bash
npm run package
```

4. **手动安装生成的.vsix文件**：在VS Code中，点击扩展图标 → 右上角的三个点 → "从VSIX安装..."，然后选择生成的vsix文件。

## 使用方法

1. **启动Stata**：首先，按照上述说明在VS Code的集成终端中打开Stata
2. **打开Stata文件**：在VS Code中打开Stata文件（.do）
3. **运行代码**：使用键盘快捷键或右键上下文菜单运行代码
4. **查看结果**：代码将在运行Stata的终端中执行

## 故障排除

### 常见问题

**问题**：命令未在Stata中执行
**解决方案**：使用扩展前确保Stata正在活动终端中运行

**问题**："Command not found"错误
**解决方案**：确保Stata已正确安装并在系统PATH中可用

**问题**：扩展不工作
**解决方案**：检查您是否拥有最新版本的VS Code和扩展

## 与原始stataRun的区别

此版本经过简化，仅专注于终端功能：

- ✅ 仅使用VS Code的内置终端
- ✅ 没有特定平台的依赖项（Windows OLE、macOS AppleScript、Linux xdotool）
- ✅ 简化的配置
- ✅ 更好的跨平台兼容性
- ❌ 没有外部应用程序集成

## 贡献

欢迎通过在[GitHub仓库](https://github.com/znxkxx/stataRun-vscode-terminal)提交问题或拉取请求来贡献。

## 许可证

MIT许可证 - 详情请参阅LICENSE文件。

## 版本历史

### 1.0.0
- 初始发布：从stataRun 2.0.1派生的仅终端版本
- 简化的代码库和配置
- 移除了外部应用程序依赖
- 改进的跨平台兼容性