'use strict';

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
import { log } from './log';
const TaskRunner = require('concurrent-tasks');

// 打印窗口
global.PRINT_WINDOW = null;
// 打印队列，解决打印并发崩溃问题
global.PRINT_RUNNER = new TaskRunner({ concurrency: 1 });
// 打印队列 done 集合
global.PRINT_RUNNER_DONE = {};

/**
 * @description: 创建打印窗口
 * @return {BrowserWindow} PRINT_WINDOW 打印窗口
 */
async function createPrintWindow() {
  const windowOptions = {
    width: 100, // 窗口宽度
    height: 100, // 窗口高度
    show: false, // 不显示
    webPreferences: {
      contextIsolation: false, // 设置此项为false后，才可在渲染进程中使用electron api
      nodeIntegration: true,
    },
    // 为窗口设置背景色可能优化字体模糊问题
    // https://www.electronjs.org/zh/docs/latest/faq#文字看起来很模糊这是什么原因造成的怎么解决这个问题呢
    backgroundColor: '#fff',
  };

  // 创建打印窗口
  global.PRINT_WINDOW = new BrowserWindow(windowOptions);

  // 加载打印渲染进程页面
  const printHtml = path.join('file://', app.getAppPath(), '/assets/print.html');
  await global.PRINT_WINDOW.webContents.loadURL(printHtml);

  // 绑定窗口事件
  initPrintEvent();

  return global.PRINT_WINDOW;
}

/**
 * @description: 绑定打印窗口事件
 * @return {Void}
 */
function initPrintEvent() {
  ipcMain.on('do', async (event, data) => {
    let socket = null;
    if (data.clientType === 'local') {
      socket = global.SOCKET_SERVER.sockets.sockets.get(data.socketId);
    } else {
      socket = global.SOCKET_CLIENT;
    }
    const printers = await global.PRINT_WINDOW.webContents.getPrintersAsync();
    let defaultPrinter = data.printer || '';
    let printerError = false;
    printers.forEach((element) => {
      // 获取默认打印机
      if (element.isDefault && (defaultPrinter == '' || defaultPrinter == void 0)) {
        defaultPrinter = element.name;
      }
      // 判断打印机是否存在
      if (element.name === defaultPrinter) {
        // todo: 打印机状态对照表
        // win32: https://learn.microsoft.com/en-us/windows/win32/printdocs/printer-info-2
        // cups: https://www.cups.org/doc/cupspm.html#ipp_status_e
        if (process.platform === 'win32') {
          if (element.status != 0) {
            printerError = true;
          }
        } else {
          if (element.status != 3) {
            printerError = true;
          }
        }
      }
    });
    if (printerError) {
      log(`${data.replyId ? '中转服务' : '插件端'} ${socket.id} 模板 【${data.templateId}】 打印失败，打印机异常，打印机：${data.printer}`);
      socket &&
        socket.emit('error', {
          msg: data.printer + '打印机异常',
          templateId: data.templateId,
          replyId: data.replyId,
        });
      if (data.taskId && global.PRINT_RUNNER_DONE[data.taskId]) {
        // 通过 taskMap 调用 task done 回调
        global.PRINT_RUNNER_DONE[data.taskId]();
        delete global.PRINT_RUNNER_DONE[data.taskId];
      }
      global.MAIN_WINDOW.webContents.send('printTask', global.PRINT_RUNNER.isBusy());
      return;
    }
    const deviceName = defaultPrinter;

    // pdf 打印
    const isPdf = data.type && `${data.type}`.toLowerCase() === 'pdf';
    if (isPdf) {
      // const pdfPath = path.join(os.tmpdir(), 'cx', dayjs().format(`YYYY_MM_DD HH_mm_ss_`) + `${uuIdv7()}.pdf`);
      // fs.mkdirSync(path.dirname(pdfPath), {
      //   recursive: true,
      // });
      // PRINT_WINDOW.webContents
      //   .printToPDF({
      //     landscape: data.landscape ?? false, // 横向打印
      //     displayHeaderFooter: data.displayHeaderFooter ?? false, // 显示页眉页脚
      //     printBackground: data.printBackground ?? false, // 打印背景色
      //     scale: data.scale ?? 1, // 渲染比例 默认 1
      //     pageSize: data.pageSize,
      //     margins: data.margins ?? {
      //       marginType: 'none',
      //     }, // 边距
      //     pageRanges: data.pageRanges, // 打印页数范围
      //     headerTemplate: data.headerTemplate, // 页头模板 (html)
      //     footerTemplate: data.footerTemplate, // 页脚模板 (html)
      //     preferCSSPageSize: data.preferCSSPageSize ?? false,
      //   })
      //   .then((pdfData) => {
      //     fs.writeFileSync(pdfPath, pdfData);
      //     printPdf(pdfPath, deviceName, data)
      //       .then(() => {
      //         log(
      //           `${data.replyId ? '中转服务' : '插件端'} ${socket.id} 模板 【${
      //             data.templateId
      //           }】 打印成功，打印类型：PDF，打印机：${deviceName}，页数：${data.pageNum}`
      //         );
      //         if (socket) {
      //           const result = {
      //             msg: '打印成功',
      //             templateId: data.templateId,
      //             replyId: data.replyId,
      //           };
      //           socket.emit('success', result);
      //         }
      //       })
      //       .catch((err) => {
      //         log(
      //           `${data.replyId ? '中转服务' : '插件端'} ${socket.id} 模板 【${
      //             data.templateId
      //           }】 打印失败，打印类型：PDF，打印机：${deviceName}，原因：${err.message}`
      //         );
      //         socket &&
      //           socket.emit('error', {
      //             msg: '打印失败: ' + err.message,
      //             templateId: data.templateId,
      //             replyId: data.replyId,
      //           });
      //       })
      //       .finally(() => {
      //         if (data.taskId && PRINT_RUNNER_DONE[data.taskId]) {
      //           // 通过taskMap 调用 task done 回调
      //           PRINT_RUNNER_DONE[data.taskId]();
      //           // 删除 task
      //           delete PRINT_RUNNER_DONE[data.taskId];
      //         }
      //         global.MAIN_WINDOW.webContents.send('printTask', PRINT_RUNNER.isBusy());
      //       });
      //   });
      // return;
    }
    // url_pdf 打印
    const isUrlPdf = data.type && `${data.type}`.toLowerCase() === 'url_pdf';
    if (isUrlPdf) {
      // printPdf(data.pdf_path, deviceName, data)
      //   .then(() => {
      //     log(
      //       `${data.replyId ? '中转服务' : '插件端'} ${socket.id} 模板 【${
      //         data.templateId
      //       }】 打印成功，打印类型：URL_PDF，打印机：${deviceName}，页数：${data.pageNum}`
      //     );
      //     if (socket) {
      //       const result = {
      //         msg: '打印成功',
      //         templateId: data.templateId,
      //         replyId: data.replyId,
      //       };
      //       socket.emit('success', result);
      //     }
      //   })
      //   .catch((err) => {
      //     log(
      //       `${data.replyId ? '中转服务' : '插件端'} ${socket.id} 模板 【${
      //         data.templateId
      //       }】 打印失败，打印类型：URL_PDF，打印机：${deviceName}，原因：${err.message}`
      //     );
      //     socket &&
      //       socket.emit('error', {
      //         msg: '打印失败: ' + err.message,
      //         templateId: data.templateId,
      //         replyId: data.replyId,
      //       });
      //   })
      //   .finally(() => {
      //     if (data.taskId && PRINT_RUNNER_DONE[data.taskId]) {
      //       // 通过 taskMap 调用 task done 回调
      //       PRINT_RUNNER_DONE[data.taskId]();
      //       // 删除 task
      //       delete PRINT_RUNNER_DONE[data.taskId];
      //     }
      //     global.MAIN_WINDOW.webContents.send('printTask', PRINT_RUNNER.isBusy());
      //   });
      return;
    }

    // 打印 详见https://www.electronjs.org/zh/docs/latest/api/web-contents
    global.PRINT_WINDOW.webContents.print(
      {
        silent: data.silent ?? true, // 静默打印
        printBackground: data.printBackground ?? false, // 是否打印背景
        deviceName: deviceName, // 打印机名称
        color: data.color ?? true, // 是否打印颜色
        margins: data.margins ?? {
          marginType: 'none',
        }, // 边距
        landscape: data.landscape ?? false, // 是否横向打印
        scaleFactor: data.scaleFactor ?? 100, // 打印缩放比例
        pagesPerSheet: data.pagesPerSheet ?? 1, // 每张纸的页数
        collate: data.collate ?? true, // 是否排序
        copies: data.copies ?? 1, // 打印份数
        pageRanges: data.pageRanges ?? {}, // 打印页数
        duplexMode: data.duplexMode, // 打印模式 simplex,shortEdge,longEdge
        dpi: data.dpi ?? 300, // 打印机DPI
        header: data.header, // 打印头
        footer: data.footer, // 打印尾
        pageSize: data.pageSize, // 打印纸张
      },
      (success, failureReason) => {
        if (success) {
          log(
            `${data.replyId ? '中转服务' : '插件端'} ${socket?.id} 模板 【${
              data.templateId
            }】 打印成功，打印类型 HTML，打印机：${deviceName}，页数：${data.pageNum}`
          );
        } else {
          log(
            `${data.replyId ? '中转服务' : '插件端'} ${socket?.id} 模板 【${
              data.templateId
            }】 打印失败，打印类型 HTML，打印机：${deviceName}，原因：${failureReason}`
          );
        }
        if (socket) {
          if (success) {
            const result = {
              msg: '打印成功',
              templateId: data.templateId,
              replyId: data.replyId,
            };
            socket.emit('success', result);
          } else {
            socket.emit('error', {
              msg: failureReason,
              templateId: data.templateId,
              replyId: data.replyId,
            });
          }
        }
        // 通过 taskMap 调用 task done 回调
        if (data.taskId && global.PRINT_RUNNER_DONE[data.taskId]) {
          global.PRINT_RUNNER_DONE[data.taskId]();
          // 删除 task
          delete global.PRINT_RUNNER_DONE[data.taskId];
        }
        global.MAIN_WINDOW.webContents.send('printTask', global.PRINT_RUNNER.isBusy());
      }
    );
  });
}

export async function printSetup() {
  // 创建打印窗口
  await createPrintWindow();
}
