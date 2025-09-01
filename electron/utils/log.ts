/*
 * @Date: 2024-03-08 13:05:10
 * @LastEditors: admin@54xavier.cn
 * @LastEditTime: 2024-03-09 12:53:03
 */
const { app } = require('electron');
const { access, appendFile, constants, writeFile } = require('node:fs');

const logs = app.getPath('logs');

app.setAppLogsPath(logs);

/**
 * 日期格式化函数
 * @param {Date} [date=new Date()] - 要格式化的日期对象
 * @param {string} [format='YYYY-MM-DD'] - 格式字符串
 * @returns {string} 格式化后的日期字符串
 *
 * 支持的占位符：
 * YYYY - 四位年份
 * MM    - 两位月份（01-12）
 * DD    - 两位日期（01-31）
 * HH    - 24小时制小时（00-23）
 * mm    - 分钟（00-59）
 * ss    - 秒（00-59）
 * ms    - 毫秒（000-999）
 * Q     - 季度（1-4）
 * E     - 星期几（1-7）
 * EEE   - 星期缩写（Mon-Sun）
 * EEEE  - 星期全称（Monday-Sunday）
 * MMM   - 月份缩写（Jan-Dec）
 * MMMM  - 月份全称（January-December）
 */
function formatDate(date = new Date(), format = 'YYYY-MM-DD') {
  // @ts-ignore
  if (!(date instanceof Date) || isNaN(date)) {
    throw new Error('Invalid date object');
  }

  const pad = (n, len = 2) => n.toString().padStart(len, '0');
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const replacements = {
    YYYY: () => date.getFullYear(),
    MM: () => pad(date.getMonth() + 1),
    DD: () => pad(date.getDate()),
    HH: () => pad(date.getHours()),
    mm: () => pad(date.getMinutes()),
    ss: () => pad(date.getSeconds()),
    ms: () => pad(date.getMilliseconds(), 3),
    Q: () => Math.ceil((date.getMonth() + 1) / 3),
    E: () => date.getDay() + 1,
    EEE: () => date.toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 3),
    EEEE: () => weekdays[date.getDay()],
    MMM: () => date.toLocaleDateString('en-US', { month: 'short' }),
    MMMM: () => months[date.getMonth()],
  };

  return Object.entries(replacements).reduce((result, [pattern, fn]) => result.replace(new RegExp(pattern, 'g'), fn()), format);
}

/**
 * This function checks if a log file exists. If it does not exist, a new log file will be created.
 * @returns {Promise} A Promise object that resolves if the file exists, or rejects if creating the file fails.
 */
function checkLogFile() {
  const filePath = `${logs}/${formatDate(new Date(), 'YYYY-MM-DD')}.log`;
  return new Promise((resolve, reject) => {
    access(filePath, constants.F_OK, (err) => {
      if (err) {
        writeFile(filePath, '', (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(1);
          }
        });
      } else {
        resolve(1);
      }
    });
  });
}

/**
 * Writes log message to log file.
 * @param {string} message - The log message to be written.
 * @returns {Promise} - A Promise object that resolves when writing is successful, or rejects when writing fails.
 */
export function log(message) {
  const filePath = `${logs}/${formatDate(new Date(), 'YYYY-MM-DD')}.log`;
  return new Promise((resolve, reject) => {
    checkLogFile()
      .then(() => {
        const logMessage = `${formatDate(new Date(), 'YYYY/MM/DD HH:mm:ss')}: ${message}\n`;
        appendFile(filePath, logMessage, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(1);
          }
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
}
