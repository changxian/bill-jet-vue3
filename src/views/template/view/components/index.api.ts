import { defHttp } from '/@/utils/http/axios';
import { default as fieldConfig } from '@/views/template/view/components/roil.config';

enum Api {
  tempList = '/bill/template/pre/list',
  printData = '/bill/template/print/data',
  templateData = '/bill/template/data',

  treeList = '/bill/goods/queryGoodsTreeList',
  searchBy = '/bill/goods/category/searchBy',
  editCategory = '/bill/goods/editCategory',
  list = '/bill/goods/list',
  save = '/bill/goods/add',
  edit = '/bill/goods/edit',
  deleteOne = '/bill/goods/delete',
  deleteBatch = '/bill/goods/deleteBatch',
  importExcel = '/bill/goods/importExcel',
  exportXls = '/bill/goods/exportXls',
}

/**
 * 根据关键字搜索部门
 */
export const tempList = (params) => defHttp.get({ url: Api.tempList, params });
/**
 * 根据送货单id，获取打印数据
 */
export const getPrintData = (params) => defHttp.get({ url: Api.printData, params });
/**
 * 根据送货单id，获取打印数据
 */
export const getTemplateData = (params) => defHttp.get({ url: Api.templateData, params });

/**
 * 导出api
 * @param params
 */
export const getExportUrl = Api.exportXls;

function find(obj, name) {
  const conf = obj[name];
  if (null == conf || 1 === conf.n) {
    return null;
  }

  const attrArray = [];
  for (let i = 1; i <= conf.n; i++) {
    const attr = name + i;
    // @ts-ignore
    attrArray.push(attr);
  }

  return attrArray;
}
/**
 * 加工打印的数据
 */
export const roil = (o: any, n) => {
  if (n > 2) {
    // 防止死循环
    return;
  }
  if (o instanceof Array) {
    for (let i = 0; i < o.length; i++) {
      roil(o[i], n + 1);
    }
  } else {
    for (const a in o) {
      const attrArray = find(fieldConfig, a);
      if (null != attrArray) {
        for (let i = 0; i < attrArray.length; i++) {
          o[attrArray[i]] = o[a];
        }
      }
    }
  }
};

function roil2(o: any, n) {
  if (n > 2) {
    // 防止死循环
    return;
  }
  if (o instanceof Array) {
    for (let i = 0; i < o.length; i++) {
      roil2(o[i], n + 1);
    }
  } else {
    for (const a in o) {
      if (typeof o[a] == 'string' || typeof o[a] == 'number') {
        o[a] = '';
      }
    }
  }
}

// 打印限制的属性
const arr = ['price', 'amount', 'count'];
function m(str, reg) {
  return -1 < str.indexOf(reg);
}
function m2(a) {
  return m(a, arr[0]) || m(a, arr[1]);
}
function m3(a) {
  return m(a, arr[0]) || m(a, arr[1]) || m(a, arr[2]);
}

function roil3(o: any, n, f) {
  if (n > 2) {
    // 防止死循环
    return;
  }
  // 无单价、金额
  for (const a in o) {
    if (typeof o[a] == 'string' || typeof o[a] == 'number') {
      if (f(a)) {
        o[a] = '';
      }
    } else if (o[a] instanceof Array) {
      for (let i = 0; i < o[a].length; i++) {
        roil3(o[a][i], n + 1, f);
      }
    }
  }
}

export const printLimit = (n: any, o: any) => {
  if (!n) {
    n = '0';
  }
  switch (n) {
    case '2': {
      // 空白
      roil2(o['table'], 1);
      break;
    }
    case '3': {
      // 无单价、金额
      roil3(o, 1, m2);
      break;
    }
    case '4': {
      // 无单价、金额、数量
      roil3(o, 1, m3);
      break;
    }
    default: {
    }
  }
};
