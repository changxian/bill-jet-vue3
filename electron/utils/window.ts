import type { BrowserWindowConstructorOptions } from 'electron';
import { app, BrowserView, BrowserWindow, dialog, Notification } from 'electron';
const httpServer = require('http').createServer();
const { Server } = require('socket.io');
const path = require('path');
const { getPaperSizeInfo, getPaperSizeInfoAll } = require('win32-pdf-printer');
import { _PATHS } from '../paths';
import { $env, isDev } from '../env';
import { createTray } from './tray';
import { log } from './log';
import { printSetup } from './print';
const { v7: uuIdv7 } = require('uuid');

// socket.io 服务端
global.SOCKET_SERVER = null;
// 打印队列 done 集合
global.PRINT_RUNNER_DONE = {};

// 创建窗口
export function createBrowserWindow(options?: BrowserWindowConstructorOptions) {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(_PATHS.preloadRoot, 'index.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    // 应用图标
    icon: isDev ? _PATHS.appIcon : void 0,
    ...options,
  });
  // update-begin--author:liaozhiyang---date:20250725---for：【JHHB-13】桌面应用消息通知
  if (process.platform === 'darwin') {
    // 仅 macOS 生效
    if (app.dock) {
      app.dock.setIcon(path.join(_PATHS.electronRoot, './icons/mac/dock.png').replace(/[\\/]dist[\\/]/, '/'));
    }
  }
  // update-end--author:liaozhiyang---date:20250725---for：【JHHB-13】桌面应用消息通知
  // 设置窗口打开处理器
  win.webContents.setWindowOpenHandler(({ url }) => {
    const win = createBrowserWindow();
    win.loadURL(url).then((r) => {
      console.info(r);
    });
    // 阻止创建新窗口，因为已经被接管
    return { action: 'deny' };
  });

  // 当 beforeunload 阻止窗口关闭时触发
  win.webContents.on('will-prevent-unload', () => {
    const choice = dialog.showMessageBoxSync(win, {
      type: 'question',
      title: '确认关闭吗？',
      message: '系统可能不会保存您所做的更改。',
      buttons: ['关闭', '取消'],
      defaultId: 1,
      cancelId: 1,
      noLink: true,
    });
    // 用户选择了关闭，直接销毁窗口
    if (choice === 0) {
      win.destroy();
    }
  });

  return win;
}

/**
 * @description: 抛出当前客户端信息，提供更多有价值的信息，逐步替换原有 address
 * @param {io.Socket} socket
 * @return {void}
 */
function emitClientInfo(socket) {
  socket.emit('clientInfo', {
    hostname: 'os.hostname()', // 主机名
    version: app.getVersion(), // 版本号
    platform: process.platform, // 平台
    arch: process.arch, // 系统架构
    mac: 'mac', // mac 地址
    ip: '_address.ip()', // ip 地址
    ipv6: '_address.ipv6()', // ipv6 地址
    clientUrl: 'http://localhost:17521}', // 客户端地址
    machineId: 'machineIdSync({ original: true })', // 客户端唯一id
    nickName: 'store.get("nickName")', // 客户端昵称
  });
}

/**
 * @description: 作为本地服务端时绑定的 socket 事件
 * @param {*} server
 * @return {void}
 */
function initServeEvent(server) {
  // 必须传入实体
  if (!server) return false;

  /**
   * @description: 校验 token
   */
  // @ts-ignore
  server.use((socket, next) => {
    next();
  });

  /**
   * @description: 新的 web client 连入，绑定 socket 事件
   */
  server.on('connect', async (socket) => {
    log(`==> 插件端 New Connected: ${socket.id}`);

    // 通知渲染进程已连接
    global.MAIN_WINDOW.webContents.send('serverConnection', server.engine.clientsCount);

    {
      // 弹出连接成功通知
      const notification = new Notification({
        title: '新的连接',
        body: `已建立新的连接，当前连接数：${server.engine.clientsCount}`,
      });
      // 显示通知
      notification.show();
    }

    // 向 client 发送打印机列表
    socket.emit('printerList', await global.MAIN_WINDOW.webContents.getPrintersAsync());

    // 向 client 发送客户端信息
    emitClientInfo(socket);

    /**
     * @description: client 请求客户端信息
     */
    socket.on('getClientInfo', () => {
      log(`插件端 ${socket.id}: getClientInfo`);
      emitClientInfo(socket);
    });

    /**
     * @description: client请求 address ，获取本机 IP、IPV6、MAC 地址
     * @description: addressType 为 null 时，返回所有地址
     * @description: 逐步废弃该 api
     * @param {String} addressType ip、ipv6、mac、all === null
     */
    socket.on('address', (addressType) => {
      log(`插件端 ${socket.id}: get address(${addressType || '未指定类型'})`);
      socket.emit('address', addressType, null, 'no address message.');
    });

    /**
     * @description: client 请求刷新打印机列表
     */
    socket.on('refreshPrinterList', async () => {
      log(`插件端 ${socket.id}: refreshPrinterList`);
      socket.emit('printerList', await global.MAIN_WINDOW.webContents.getPrintersAsync());
    });

    /**
     * @description: client 获取打印机纸张信息
     */
    socket.on('getPaperSizeInfo', (printer) => {
      log(`插件端 ${socket.id}: getPaperSizeInfo`);
      if (process.platform === 'win32') {
        const fun = printer ? getPaperSizeInfo : getPaperSizeInfoAll;
        const paper = fun();
        paper && socket.emit('paperSizeInfo', paper);
      }
    });

    /**
     * @description: client 调用 ipp 打印 详见：https://www.npmjs.com/package/ipp
     */
    socket.on('ippPrint', () => {
      log(`插件端 ${socket.id}: 无ippPrint`);
    });

    /**
     * @description: client ipp request 详见：https://www.npmjs.com/package/ipp
     */
    socket.on('ippRequest', () => {
      log(`插件端 ${socket.id}: 无ippRequest`);
    });

    /**
     * @description: client 常规打印任务
     */
    socket.on('news', (data) => {
      if (data) {
        global.PRINT_RUNNER.add((done) => {
          data.socketId = socket.id;
          data.taskId = uuIdv7();
          data.clientType = 'local';
          global.PRINT_WINDOW.webContents.send('print-new', data);
          global.MAIN_WINDOW.webContents.send('printTask', true);
          global.PRINT_RUNNER_DONE[data.taskId] = done;
        });
      }
    });

    /**
     * @description: client 分批打印任务
     */
    socket.on('printByFragments', () => {
      log(`插件端 ${socket.id}: 无分批打印.`);
    });

    /**
     * @description: client 断开连接
     */
    socket.on('disconnect', () => {
      log(`==> 插件端 Disconnect: ${socket.id}`);
      global.MAIN_WINDOW?.webContents?.send('serverConnection', server.engine.clientsCount);
    });
  });
}

/**
 * @description: 加载等待页面，解决主窗口白屏问题
 * @param {Object} windowOptions 主窗口配置
 * @return {Void}
 */
function loadingView(windowOptions) {
  const loadingBrowserView = new BrowserView();
  global.MAIN_WINDOW.setBrowserView(loadingBrowserView);
  loadingBrowserView.setBounds({
    x: 0,
    y: 0,
    width: windowOptions.width,
    height: windowOptions.height,
  });

  const loadingHtml = path.join('file://', app.getAppPath(), 'src/assets/loading.html');
  loadingBrowserView.webContents.loadURL(loadingHtml);

  return loadingBrowserView;
}

// 创建主窗口、系统托盘、socket服务
export async function createMainWindow() {
  // socket.io 服务端，用于创建本地服务
  const ioServer = (global.SOCKET_SERVER = new Server(httpServer, {
    pingInterval: 10000,
    pingTimeout: 5000,
    maxHttpBufferSize: 10000000000,
    allowEIO3: true, // 兼容 Socket.IO 2.x
    // 跨域问题(Socket.IO 3.x 使用这种方式)
    cors: {
      // origin: "*",
      // 兼容 Socket.IO 2.x
      origin: (requestOrigin, callback) => {
        // 允许所有域名连接
        callback(null, requestOrigin);
      },
      methods: 'GET, POST, PUT, DELETE, OPTIONS',
      allowedHeaders: '*',
      // 详情参数见 https://www.npmjs.com/package/cors
      credentials: false,
    },
  }));

  const windowOptions = {
    width: 1500, // 窗口宽度
    height: 1000, // 窗口高度
    title: $env.VITE_GLOB_APP_TITLE!,
    useContentSize: true, // 窗口大小不包含边框
    center: true, // 居中
    resizable: true, // false不可缩放, true: 可缩放
    show: true, // 显示
    webPreferences: {
      // 设置此项为false后，才可在渲染进程中使用 electron api
      contextIsolation: false,
      nodeIntegration: true,
    },
    icon: path.join(__dirname, 'src/assets/images/logo.png'), // 窗口左上角图标
  };

  global.MAIN_WINDOW = createBrowserWindow(windowOptions);

  // 添加加载页面 解决白屏的问题
  const loadingBrowserView = loadingView(windowOptions);

  // 开发环境加载Vite服务，生产加载打包文件
  if (isDev) {
    global.MAIN_WINDOW.loadURL($env.VITE_DEV_SERVER_URL!);
    // 开发环境下，自动打开调试工具
    global.MAIN_WINDOW.webContents.openDevTools();
  } else {
    global.MAIN_WINDOW.loadFile(path.join(_PATHS.publicRoot, 'index.html'));
  }

  // 设置系统托盘图标
  createTray(global.MAIN_WINDOW);

  // 主窗口尝试关闭时，默认不直接退出应用，而是隐藏到托盘
  global.MAIN_WINDOW.on('close', (event) => {
    // 阻止窗口关闭
    event.preventDefault();
    // 隐藏任务栏
    global.MAIN_WINDOW.setSkipTaskbar(true);
    // 最小化到托盘
    global.MAIN_WINDOW.hide();
  });

  // 退出
  global.MAIN_WINDOW.on('closed', () => {
    global.MAIN_WINDOW = null;
    httpServer.close();
  });

  // 主窗口 Dom 加载完毕
  global.MAIN_WINDOW.webContents.on('dom-ready', async () => {
    try {
      // 未打包时打开开发者工具
      if (!app.isPackaged) {
        global.MAIN_WINDOW.webContents.openDevTools();
      }
      // 本地服务开启端口监听
      httpServer.listen(17521);
      // 初始化本地 服务端事件
      initServeEvent(ioServer);
    } catch (error) {
      console.error(error);
    }
    global.MAIN_WINDOW.removeBrowserView(loadingBrowserView);
  });

  // 打印窗口初始化
  await printSetup();

  return global.MAIN_WINDOW;
}
