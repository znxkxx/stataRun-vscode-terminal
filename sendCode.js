const vscode = require('vscode');
const os = require('os');
const fs = require('fs');

var config = vscode.workspace.getConfiguration('stataRun');
// 存储临时文件路径的数组
const tempFiles = [];

function saveToFile(code) {
    if (code) {
        var temp = os.tmpdir();
        var filePath = temp + "/StataRun" + Date.now();
        filePath += '.do';
        fs.writeFileSync(filePath, code + "\n");
        console.log('Temporary file saved:', filePath);
        
        // 将文件路径添加到临时文件列表中
        tempFiles.push(filePath);
        
        // 3秒后尝试删除临时文件（给Stata足够时间执行）
        setTimeout(() => {
            try {
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                    console.log('Temporary file deleted:', filePath);
                    // 从临时文件列表中移除
                    const index = tempFiles.indexOf(filePath);
                    if (index > -1) {
                        tempFiles.splice(index, 1);
                    }
                }
            } catch (err) {
                console.error('Error deleting temporary file:', err);
            }
        }, 3000);
        
        return 'do "' + filePath + '"';
    }
    return code;
}

module.exports = {
  previousCommand: '',

  send(text) {
    console.log('entering sendCode function');
    this.previousCommand = text;
    // 直接调用sendTerminal
    return this.sendTerminal(text);
  },

  sendTerminal(text) {
    let activeTermOrNull = vscode.window.activeTerminal;

    if (activeTermOrNull === null || activeTermOrNull === undefined) {
      console.log("Not referencing any terminal and no terminal is open. Therefore creating new terminal.");
      activeTermOrNull = vscode.window.createTerminal("StataRun");
      activeTermOrNull.show(true);

      var cmd = config.get('vscodeTerminalBin');
      // 检查文本长度，如果太长则保存到临时文件
      const commandToSend = text.length > 1000 ? saveToFile(text) : text;
      cmd += " " + commandToSend;
      activeTermOrNull.sendText(cmd, true);
    }
    else {
      let activeTerm = activeTermOrNull;
      activeTerm.show(true);
      console.log(`StataRun|${text}`);
      // 检查文本长度，如果太长则保存到临时文件
      const commandToSend = text.length > 1000 ? saveToFile(text) : text;
      activeTerm.sendText(commandToSend, true);
    }
  },
  
  // 清理所有临时文件的方法
  cleanupTempFiles() {
    tempFiles.forEach(filePath => {
      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log('Cleaned up temporary file:', filePath);
        }
      } catch (err) {
        console.error('Error cleaning up temporary file:', err);
      }
    });
    tempFiles.length = 0; // 清空数组
  }
};