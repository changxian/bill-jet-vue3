import { app, BrowserWindow, ipcMain, Menu, Notification } from 'electron';
import { createMainWindow } from './utils/window';
import { getAppInfo } from './utils';
import './ipc';

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

function appQuit() {
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
    // 销毁所有窗口、托盘、退出应用
    appQuit();
  }

  // 当运行第二个实例时,聚焦到 MAIN_WINDOW 这个窗口
  app.on('second-instance', () => {
    if (global.MAIN_WINDOW) {
      if (global.MAIN_WINDOW.isMinimized()) {
        // 将窗口从最小化状态恢复到以前的状态
        global.MAIN_WINDOW.restore();
      }
      global.MAIN_WINDOW.focus();
    }
  });

  // 允许渲染进程创建通知
  ipcMain.on('notification', (event, data) => {
    const notification = new Notification(data);
    // 显示通知
    notification.show();
  });

  await createMainWindow();

  // update-begin--author:liaozhiyang---date:20250725---for：【JHHB-13】桌面应用消息通知
  global.MAIN_WINDOW.on('focus', () => {
    // 清除任务栏闪烁
    if (process.platform === 'win32') {
      global.MAIN_WINDOW!.flashFrame(false);
    }
  });

  // update-end--author:liaozhiyang---date:20250725---for：【JHHB-13】桌面应用消息通知
  return global.MAIN_WINDOW;
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// 生命周期管理
app.whenReady().then(() => {
  // 获取应用信息
  const $appInfo = getAppInfo();
  if ($appInfo?.productName && $appInfo?.appId) {
    app.setName($appInfo.productName);
    app.setAppUserModelId($appInfo.appId);
  }

  // 创建浏览器窗口
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      // 创建浏览器窗口
      createWindow();
    }
  });
});
