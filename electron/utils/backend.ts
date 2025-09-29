import { app } from 'electron';
import { exec, spawn } from 'child_process';
import path from 'path';
import fs from 'fs-extra';

let backendProcess = null;

// 获取应用安装目录
export const getAppInstallPath = () => {
  if (app.isPackaged) {
    return path.dirname(app.getPath('exe'));
  }
  return app.getAppPath();
};

// 检查Java环境
export const checkJavaEnv = async () => {
  return new Promise((resolve) => {
    exec('java -version', (error) => {
      if (error) {
        console.error('Java环境检查失败:', error);
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};

// 启动后端服务
export const startBackendService = async () => {
  return new Promise((resolve, reject) => {
    try {
      const installPath = getAppInstallPath();
      const jarPath = path.join(installPath, 'resources/app.jar');
      const dataPath = path.join(installPath, 'data');

      // 确保data目录存在
      fs.ensureDirSync(dataPath);

      // 检查app.jar是否存在
      if (!fs.existsSync(jarPath)) {
        throw new Error(`未找到app.jar文件，路径: ${jarPath}`);
      }

      console.log('启动后端服务:', `javaw -jar "${jarPath}"`);

      // 启动后端服务
      // @ts-ignore
      backendProcess = spawn('javaw', ['-jar', jarPath], {
        cwd: installPath,
        env: {
          ...process.env,
          DATA_PATH: dataPath,
        },
        stdio: 'inherit',
      });

      // 监听后端服务退出
      // @ts-ignore
      backendProcess.on('exit', (code) => {
        console.log(`后端服务退出，代码: ${code}`);
        backendProcess = null;
      });

      // 简单延迟确保服务启动（实际项目可能需要更可靠的检查）
      setTimeout(() => {
        resolve(true);
      }, 3000);
    } catch (error) {
      console.error('启动后端服务失败:', error);
      reject(error);
    }
  });
};

// 停止后端服务
export const stopBackendService = () => {
  if (backendProcess) {
    console.log('停止后端服务');
    // @ts-ignore
    // backendProcess.kill();
    // backendProcess = null;

    // 尝试优雅关闭
    // @ts-ignore
    backendProcess.kill('SIGINT');

    // 5秒后强制终止
    setTimeout(() => {
      if (backendProcess) {
        // @ts-ignore
        backendProcess.kill('SIGKILL');
      }
    }, 5000);

    backendProcess = null;
  }
};

// import { app, dialog } from 'electron';
// import { exec, spawn } from 'child_process';
// import path from 'path';
// import fs from 'fs-extra';
// import os from 'os';
//
// let backendProcess = null;
// let javaPath = '';
//
// // 检测系统中已安装的Java环境（支持JDK1.8）
// export const detectSystemJava = async () => {
//   return new Promise((resolve) => {
//     // 优先从JAVA_HOME环境变量查找
//     const javaHome = process.env.JAVA_HOME;
//     if (javaHome) {
//       // @ts-ignore
//       javaPath = path.join(javaHome, 'bin', os.platform() === 'win32' ? 'java.exe' : 'java');
//
//       // 验证Java版本是否为1.8
//       // @ts-ignore
//       exec(`"${javaPath}" -version`, (error, stdout, stderr) => {
//         if (!error && stderr.includes('1.8.')) {
//           resolve(javaPath);
//           return;
//         }
//         // JAVA_HOME版本不符合，继续搜索系统PATH
//         searchJavaInPath(resolve);
//       });
//       return;
//     }
//
//     // 从系统PATH中搜索Java
//     searchJavaInPath(resolve);
//   });
// };
//
// // 显示Java安装指引对话框
// export const showJavaInstallGuide = () => {
//   const guideText = `未检测到JDK 1.8环境，这是运行本程序的必要条件。
//
//   请安装JDK 1.8并确保配置正确的环境变量：
//   1. 下载地址：https://www.oracle.com/java/technologies/javase/javase8-archive-downloads.html
//   2. 安装时勾选"添加到PATH"选项
//   3. 安装完成后重启本程序`;
//
//   dialog
//     .showMessageBox({
//       type: 'error',
//       title: '缺少Java环境',
//       message: guideText,
//       buttons: ['打开下载页', '取消'],
//       defaultId: 0,
//     })
//     .then((result) => {
//       if (result.response === 0) {
//         // 打开Java下载页面
//         require('electron').shell.openExternal('https://www.oracle.com/java/technologies/javase/javase8-archive-downloads.html');
//       }
//     });
// };
//
// // 在系统PATH中搜索Java
// function searchJavaInPath(resolve) {
//   const cmd = os.platform() === 'win32' ? 'where java' : 'which java';
//
//   exec(cmd, (error, stdout) => {
//     if (error) {
//       resolve(null);
//       return;
//     }
//
//     // 处理可能的多个结果，取第一个
//     const javaPaths = stdout.trim().split(os.EOL);
//     for (const javaPath of javaPaths) {
//       // @ts-ignore
//       exec(`"${javaPath}" -version`, (verError, verStdout, verStderr) => {
//         if (!verError && verStderr.includes('1.8.')) {
//           resolve(javaPath);
//           return;
//         }
//       });
//     }
//
//     // 找不到符合要求的Java
//     resolve(null);
//   });
// }
//
// // 获取应用安装目录
// export const getAppInstallPath = () => {
//   if (app.isPackaged) {
//     return path.dirname(app.getPath('exe'));
//   }
//   return app.getAppPath();
// };
//
// // 检查Java环境
// export const checkJavaEnv = async () => {
//   const javaPath = path.join(getAppInstallPath(), 'jdk1.8', 'bin', 'java.exe');
//
//   return new Promise((resolve) => {
//     exec(`"${javaPath}" -version`, (error) => {
//       if (error) {
//         console.error('Java环境检查失败:', error);
//         resolve(false);
//       } else {
//         resolve(true);
//       }
//     });
//   });
// };
//
// // 检查后端服务端口是否已监听
// function checkBackendPort(port, timeout) {
//   return new Promise((resolve, reject) => {
//     const startTime = Date.now();
//     const checkInterval = 1000; // 每秒检查一次
//
//     const check = () => {
//       // 超时判断
//       if (Date.now() - startTime > timeout) {
//         reject(new Error(`后端服务启动超时（${timeout / 1000}秒）`));
//         return;
//       }
//
//       // 尝试连接端口
//       const net = require('net');
//       const client = new net.Socket();
//
//       client.connect(port, 'localhost', () => {
//         client.end();
//         resolve(true);
//       });
//
//       client.on('error', () => {
//         // 连接失败，继续检查
//         setTimeout(check, checkInterval);
//       });
//     };
//
//     // 开始检查
//     check();
//   });
// }
//
// // 启动后端服务
// // export const startBackendService = async () => {
// //   return new Promise((resolve, reject) => {
// //     try {
// //       const installPath = getAppInstallPath();
// //       const javaPath = path.join(installPath, 'jdk1.8', 'bin', 'java.exe');
// //       const jarPath = path.join(installPath, 'app.jar');
// //       const dataPath = path.join(installPath, 'data');
// //
// //       // 确保data目录存在
// //       fs.ensureDirSync(dataPath);
// //
// //       console.log('启动后端服务:', `"${javaPath}" -jar "${jarPath}"`);
// //
// //       // 启动后端服务
// //       // @ts-ignore
// //       backendProcess = spawn(javaPath, ['-jar', jarPath], {
// //         cwd: installPath,
// //         env: {
// //           ...process.env,
// //           DATA_PATH: dataPath,
// //           JAVA_HOME: path.join(installPath, 'jdk1.8'),
// //         },
// //         stdio: 'inherit',
// //       });
// //
// //       // 监听后端服务退出
// //       // @ts-ignore
// //       backendProcess.on('exit', (code) => {
// //         console.log(`后端服务退出，代码: ${code}`);
// //         backendProcess = null;
// //       });
// //
// //       // 简单延迟确保服务启动（实际项目可能需要更可靠的检查）
// //       setTimeout(() => {
// //         resolve(true);
// //       }, 3000);
// //     } catch (error) {
// //       console.error('启动后端服务失败:', error);
// //       reject(error);
// //     }
// //   });
// // };
//
// // 启动后端服务（使用系统Java）
// export const startBackendService = async () => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       // 检测系统Java
//       const javaPath = await detectSystemJava();
//       if (!javaPath) {
//         showJavaInstallGuide();
//         reject(new Error('未找到有效的JDK 1.8环境'));
//         return;
//       }
//
//       const installPath = getAppInstallPath();
//       const jarPath = path.join(installPath, 'app.jar');
//       const dataPath = path.join(installPath, 'data');
//
//       // 检查必要文件
//       if (!fs.existsSync(jarPath)) {
//         reject(new Error(`未找到后端程序: ${jarPath}`));
//         return;
//       }
//
//       // 确保data目录存在
//       fs.ensureDirSync(dataPath);
//
//       console.log(`启动后端服务: "${javaPath}" -jar "${jarPath}"`);
//
//       // 启动后端服务
//       // @ts-ignore
//       backendProcess = spawn(javaPath, ['-jar', jarPath], {
//         cwd: installPath,
//         env: {
//           ...process.env,
//           DATA_PATH: dataPath,
//           // 传递检测到的Java路径
//           // @ts-ignore
//           JAVA_HOME: path.dirname(path.dirname(javaPath)),
//         },
//         stdio: 'inherit',
//       });
//
//       // 监听后端服务退出
//       // @ts-ignore
//       if (null != backendProcess) {
//         // @ts-ignore
//         backendProcess.on('exit', (code) => {
//           console.log(`后端服务退出，代码: ${code}`);
//           backendProcess = null;
//         });
//       }
//
//       // 验证服务是否真正启动（改进版：监听端口）
//       checkBackendPort(8080, 30000) // 30秒超时
//         .then(() => resolve(true))
//         .catch((err) => reject(err));
//     } catch (error) {
//       console.error('启动后端服务失败:', error);
//       reject(error);
//     }
//   });
// };
//
// // 停止后端服务
// export const stopBackendService = () => {
//   if (backendProcess) {
//     console.log('停止后端服务');
//     // 尝试优雅关闭
//     // @ts-ignore
//     backendProcess.kill('SIGINT');
//
//     // 5秒后强制终止
//     setTimeout(() => {
//       if (backendProcess) {
//         // @ts-ignore
//         backendProcess.kill('SIGKILL');
//       }
//     }, 5000);
//
//     backendProcess = null;
//   }
// };
