import { app, BrowserWindow, ipcMain, Menu, Notification, dialog } from 'electron';
import { createMainWindow } from './utils/window';
import { getAppInfo } from './utils';
import './ipc';
// 导入后端服务管理工具
import { checkJavaEnv, startBackendService, stopBackendService } from './utils/backend';

// 主进程
global.MAIN_WINDOW = null;
// 托盘
global.APP_TRAY = null;
// 渲染窗口
global.RENDER_WINDOW = null;
// 打印日志窗口
global.PRINT_LOG_WINDOW = null;

// 隐藏所有菜单
Menu.setApplicationMenu(null);

// 修改退出逻辑，确保后端服务停止
function appQuit() {
  stopBackendService();
  global['PRINT_WINDOW'] && global['PRINT_WINDOW'].destroy();
  global['MAIN_WINDOW'] && global['MAIN_WINDOW'].destroy();
  global['APP_TRAY'] && global['APP_TRAY'].destroy();
  app.quit();
}

/**
 * @description: 创建渲染进程 主窗口
 * @return {BrowserWindow} MAIN_WINDOW 主窗口
 */
async function createWindow() {
  // 限制一个窗口
  const gotTheLock = app.requestSingleInstanceLock();
  if (!gotTheLock) {
    appQuit();
    return;
  }

  // 检查Java环境
  const javaReady = await checkJavaEnv();
  if (!javaReady) {
    dialog.showErrorBox('环境错误', '未找到Java环境，请先安装JRE或JDK 1.8及以上版本');
    appQuit();
    return;
  }

  // 启动后端服务
  try {
    await startBackendService();
    console.log('后端服务启动成功');
  } catch (error) {
    // @ts-ignore
    dialog.showErrorBox('启动失败', `后端服务启动失败: ${error.message}`);
    appQuit();
    return;
  }

  // 当运行第二个实例时,聚焦到 MAIN_WINDOW 这个窗口
  app.on('second-instance', () => {
    if (global.MAIN_WINDOW) {
      if (global.MAIN_WINDOW.isMinimized()) {
        global.MAIN_WINDOW.restore();
      }
      global.MAIN_WINDOW.focus();
    }
  });

  // 允许渲染进程创建通知
  // @ts-ignore
  ipcMain.on('notification', (event, data) => {
    const notification = new Notification(data);
    notification.show();
  });

  await createMainWindow();

  global.MAIN_WINDOW.on('focus', () => {
    if (process.platform === 'win32') {
      global.MAIN_WINDOW!.flashFrame(false);
    }
  });

  return global.MAIN_WINDOW;
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    appQuit();
  }
});

// 生命周期管理
app.whenReady().then(() => {
  const $appInfo = getAppInfo();
  if ($appInfo?.productName && $appInfo?.appId) {
    app.setName($appInfo.productName);
    app.setAppUserModelId($appInfo.appId);
  }

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// import { app, BrowserWindow, ipcMain, Menu, Notification, dialog } from 'electron';
// import { createMainWindow } from './utils/window';
// import { getAppInfo } from './utils';
// import './ipc';
// import { checkJavaEnv, startBackendService, stopBackendService } from './utils/backend';
//
// // 主进程
// global.MAIN_WINDOW = null;
// // 托盘
// global.APP_TRAY = null;
// // 渲染窗口
// global.RENDER_WINDOW = null;
// // 打印日志窗口
// global.PRINT_LOG_WINDOW = null;
//
// // 隐藏所有菜单
// Menu.setApplicationMenu(null);
//
// function appQuit() {
//   // 先停止后端服务
//   stopBackendService();
//
//   global['PRINT_WINDOW'] && global['PRINT_WINDOW'].destroy();
//   global['MAIN_WINDOW'] && global['MAIN_WINDOW'].destroy();
//   global['APP_TRAY'] && global['APP_TRAY'].destroy();
//   app.quit();
// }
// /**
//  * @description: 创建渲染进程 主窗口
//  * @return {BrowserWindow} MAIN_WINDOW 主窗口
//  */
// async function createWindow() {
//   // 限制一个窗口
//   const gotTheLock = app.requestSingleInstanceLock();
//   if (!gotTheLock) {
//     // 销毁所有窗口、托盘、退出应用
//     appQuit();
//   }
//
//   // 检查Java环境
//   const javaReady = await checkJavaEnv();
//   if (!javaReady) {
//     dialog.showErrorBox('环境错误', '未找到有效的Java环境，请确保应用安装目录下存在jdk1.8文件夹');
//     appQuit();
//     return;
//   }
//
//   // 启动后端服务
//   try {
//     await startBackendService();
//     console.log('后端服务启动成功');
//   } catch (error) {
//     dialog.showErrorBox('启动失败', `后端服务启动失败: ${error.message}`);
//     appQuit();
//     return;
//   }
//
//   // 当运行第二个实例时,聚焦到 MAIN_WINDOW 这个窗口
//   app.on('second-instance', () => {
//     if (global.MAIN_WINDOW) {
//       if (global.MAIN_WINDOW.isMinimized()) {
//         // 将窗口从最小化状态恢复到以前的状态
//         global.MAIN_WINDOW.restore();
//       }
//       global.MAIN_WINDOW.focus();
//     }
//   });
//
//   // 允许渲染进程创建通知
//   // @ts-ignore
//   ipcMain.on('notification', (event, data) => {
//     const notification = new Notification(data);
//     // 显示通知
//     notification.show();
//   });
//
//   await createMainWindow();
//
//   // update-begin--author:liaozhiyang---date:20250725---for：【JHHB-13】桌面应用消息通知
//   global.MAIN_WINDOW.on('focus', () => {
//     // 清除任务栏闪烁
//     if (process.platform === 'win32') {
//       global.MAIN_WINDOW!.flashFrame(false);
//     }
//   });
//
//   // update-end--author:liaozhiyang---date:20250725---for：【JHHB-13】桌面应用消息通知
//   return global.MAIN_WINDOW;
// }
//
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });
//
// // 生命周期管理
// app.whenReady().then(() => {
//   // 获取应用信息
//   const $appInfo = getAppInfo();
//   if ($appInfo?.productName && $appInfo?.appId) {
//     app.setName($appInfo.productName);
//     app.setAppUserModelId($appInfo.appId);
//   }
//
//   // 创建浏览器窗口
//   createWindow();
//
//   app.on('activate', () => {
//     if (BrowserWindow.getAllWindows().length === 0) {
//       // 创建浏览器窗口
//       createWindow();
//     }
//   });
// });
