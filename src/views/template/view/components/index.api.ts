import { defHttp } from '/@/utils/http/axios';
import { useMessage } from '/@/hooks/web/useMessage';

const { createConfirm } = useMessage();

enum Api {
  tempList = '/bill/template/pre/list',

  treeList = '/bill/goods/queryGoodsTreeList',
  searchBy = '/bill/goods/category/searchBy',
  editCategory = '/bill/goods/editCategory',
}

/**
 * 根据关键字搜索部门
 */
export const tempList = (params) => defHttp.get({ url: Api.tempList, params });

/**
 * 获取部门树列表
 */
export const queryGoodsCategoryList = (params?) => defHttp.get({ url: Api.treeList, params }, { isTransformResponse: false });

/**
 * 根据关键字搜索部门
 */
export const searchByKeywords = (params) => defHttp.get({ url: Api.searchBy, params });

/**
 * 修改商品的类别
 */
export const editCategory = (params) => {
  return defHttp.post({ url: Api.editCategory, params }, { isTransformResponse: false });
};

enum Api {
  list = '/bill/goods/list',
  save = '/bill/goods/add',
  edit = '/bill/goods/edit',
  deleteOne = '/bill/goods/delete',
  deleteBatch = '/bill/goods/deleteBatch',
  importExcel = '/bill/goods/importExcel',
  exportXls = '/bill/goods/exportXls',
}

/**
 * 导出api
 * @param params
 */
export const getExportUrl = Api.exportXls;

/**
 * 导入api
 */
export const getImportUrl = Api.importExcel;

/**
 * 列表接口
 * @param params
 */
export const list = (params) => defHttp.get({ url: Api.list, params });

/**
 * 删除单个
 * @param params
 * @param handleSuccess
 */
export const deleteOne = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.deleteOne, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};

/**
 * 批量删除
 * @param params
 * @param handleSuccess
 */
export const batchDelete = (params, handleSuccess) => {
  createConfirm({
    iconType: 'warning',
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({ url: Api.deleteBatch, data: params }, { joinParamsToUrl: true }).then(() => {
        handleSuccess();
      });
    },
  });
};

/**
 * 保存或者更新
 * @param params
 * @param isUpdate
 */
export const saveOrUpdate = (params, isUpdate) => {
  const url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({ url: url, params }, { isTransformResponse: false });
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
  // 空白，所有打印 列表数据的值全赋值为 ''
  // for (const a in o) {
  //   if (typeof o[a] == 'string' || typeof o[a] == 'number') {
  //     o[a] = '';
  //   } else if (o[a] instanceof Array) {
  //     for (let i = 0; i < o[a].length; i++) {
  //       roil2(o[a][i], n + 1);
  //     }
  //   }
  // }
}

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
