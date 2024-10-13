/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
import dayjs from 'dayjs';

const DATE_TIME_SSS_FORMAT_s = 'YYYYMMDDHHmmssSSS';
const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const DATE_FORMAT = 'YYYY-MM-DD';
const DATE_FORMAT_s = 'YYYYMMDD';
const MONTH_FORMAT_s = 'YYYYMM';
export function formatToDateTime(date: dayjs.Dayjs | undefined = undefined, format = DATE_TIME_FORMAT): string {
  return dayjs(date).format(format);
}

export function formatToDate(date: dayjs.Dayjs | undefined = undefined, format = DATE_FORMAT): string {
  return dayjs(date).format(format);
}
export function formatToDateTimeSSS(date: dayjs.Dayjs | undefined = undefined, format = DATE_TIME_SSS_FORMAT_s): string {
  return dayjs(date).format(format);
}
export function formatToDateS(date: dayjs.Dayjs | undefined = undefined, format = DATE_FORMAT_s): string {
  return dayjs(date).format(format);
}
export function formatToMonthS(date: dayjs.Dayjs | undefined = undefined, format = MONTH_FORMAT_s): string {
  return dayjs(date).format(format);
}
export const dateUtil = dayjs;
