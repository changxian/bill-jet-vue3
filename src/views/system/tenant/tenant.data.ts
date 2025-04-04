import { BasicColumn, FormSchema } from '/@/components/Table';
import { render } from '/@/utils/common/renderUtils';
import { rules } from '/@/utils/helper/validator';

export const columns: BasicColumn[] = [
  {
    title: '企业名称',
    dataIndex: 'name',
    width: 200,
    resizable: true,
    align: 'left',
  },
  {
    title: '企业编号',
    dataIndex: 'id',
    width: 100,
    resizable: true,
  },
  {
    title: '企业类别',
    dataIndex: 'category_dictText',
    width: 100,
    resizable: true,
  },
  {
    title: '企业联系人',
    dataIndex: 'contact',
    width: 100,
    resizable: true,
  },
  {
    title: '联系方式',
    dataIndex: 'contactMethod',
    width: 180,
    resizable: true,
  },
  {
    title: '企业LOGO',
    dataIndex: 'companyLogo',
    width: 100,
    resizable: true,
    customRender: ({ text }) => {
      if (!text) {
        return text;
      }
      return render.renderImage({ text });
    },
  },
  // {
  //   title: '支付宝收款码',
  //   dataIndex: 'zfbPaymentCode',
  //   width: 120,
  //   customRender: ({ text }) => {
  //     if (!text) {
  //       return text;
  //     }
  //     return render.renderImage({ text });
  //   },
  // },
  // {
  //   title: '微信收款码',
  //   dataIndex: 'wxPaymentCode',
  //   width: 120,
  //   customRender: ({ text }) => {
  //     if (!text) {
  //       return text;
  //     }
  //     return render.renderImage({ text });
  //   },
  // },
  {
    title: '客服二维码',
    dataIndex: 'customerServiceQrcode',
    width: 120,
    resizable: true,
    customRender: ({ text }) => {
      if (!text) {
        return text;
      }
      return render.renderImage({ text });
    },
  },
  {
    dataIndex: 'trade_dictText',
    title: '所属行业',
    width: 150,
    resizable: true,
  },
  // {
  //   dataIndex: 'companySize_dictText',
  //   title: '企业规模',
  //   width: 100,
  // },
  // {
  //   dataIndex: 'houseNumber',
  //   title: '门牌号',
  //   width: 100,
  // },
  /*{
    dataIndex: 'position_dictText',
    title: '职级',
    width: 150,
  },
  {
    dataIndex: 'department_dictText',
    title: '部门',
    width: 150,
  },*/
  {
    title: '定制模板',
    dataIndex: 'customizedTemp',
    width: 100,
    resizable: true,
    slots: { customRender: 'customizedTemp_dictText' },
    /*customRender: ({text}) => {
      if (text === 0) {
        return '不需要';
      }
      return '需要';
    },*/
  },
  {
    dataIndex: 'createBy_dictText',
    title: '创建者',
    width: 120,
    resizable: true,
  },
  {
    title: '状态',
    dataIndex: 'status_dictText',
    width: 80,
    resizable: true,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '企业名称',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'customizedTemp',
    label: '定制模板',
    component: 'Select',
    componentProps: {
      options: [
        { label: '需要', value: 1 },
        { label: '不需要', value: 0 },
      ],
    },
    colProps: { span: 6 },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '正常', value: 1 },
        { label: '冻结', value: 0 },
      ],
    },
    colProps: { span: 6 },
  },
  // {
  //   field: 'fieldTime',
  //   component: 'RangePicker',
  //   label: '时间字段',
  //   componentProps: {
  //     valueType: 'Date',
  //   },
  //   colProps: {
  //     span: 8,
  //   },
  // },
];

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '企业名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'id',
    label: '企业编号',
    component: 'InputNumber',
    required: true,
    ifShow: ({ values }) => {
      return values.id != null;
    },
  },
  {
    field: 'companyLogo',
    label: '企业LOGO',
    component: 'JImageUpload',
    componentProps: {
      text: 'logo',
    },
  },
  {
    field: 'trade',
    label: '所属行业',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'trade',
    },
  },
  // {
  //   field: 'companySize',
  //   label: '企业规模',
  //   component: 'JDictSelectTag',
  //   componentProps: {
  //     dictCode: 'company_size',
  //   },
  // },
  {
    field: 'companyAddress',
    label: '企业地址',
    component: 'InputTextArea',
    componentProps: {
      placeholder: '请输入企业地址',
      rows: 1,
    },
  },
  {
    field: 'contact',
    label: '企业联系人',
    component: 'Input',
  },
  {
    field: 'contactMethod',
    label: '联系方式',
    component: 'InputTextArea',
    componentProps: {
      placeholder: '请输入手机号、微信号等联系方式',
      rows: 2,
    },
  },
  //  {
  //   field: 'beginDate',
  //   label: '开始时间',
  //   component: 'DatePicker',
  //   componentProps: {
  //     showTime: true,
  //     valueFormat: 'YYYY-MM-DD HH:mm:ss',
  //     getPopupContainer: getAutoScrollContainer,
  //   },
  // },
  // {
  //   field: 'endDate',
  //   label: '结束时间',
  //   component: 'DatePicker',
  //   componentProps: {
  //     showTime: true,
  //     valueFormat: 'YYYY-MM-DD HH:mm:ss',
  //     getPopupContainer: getAutoScrollContainer,
  //   },
  // },
  // {
  //   field: 'houseNumber',
  //   label: '门牌号',
  //   component: 'Input',
  //   dynamicDisabled: true,
  //   ifShow: ({ values }) => {
  //     return values.id != null;
  //   },
  // },
  /*{
    field: 'position',
    label: '职级',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'company_rank',
    },
  },
  {
    field: 'department',
    label: '部门',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'company_department',
    },
  },*/
  {
    field: 'customizedTemp',
    label: '定制模板',
    component: 'RadioButtonGroup',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '需要', value: 1 },
        { label: '不需要', value: 0 },
      ],
    },
  },
  {
    field: 'category',
    label: '企业类型',
    component: 'RadioButtonGroup',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '分销商', value: 5 },
        { label: '客户', value: 0 },
      ],
    },
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '正常', value: 1 },
        { label: '冻结', value: 0 },
      ],
    },
  },
];

//定义用户表格列
export const userColumns: BasicColumn[] = [
  {
    title: '用户账号',
    dataIndex: 'username',
    width: 100,
    align: 'left',
  },
  {
    title: '用户姓名',
    dataIndex: 'realname',
    width: 100,
  },
  {
    title: '性别',
    dataIndex: 'sex_dictText',
    width: 100,
  },
  {
    title: '手机号码',
    dataIndex: 'phone',
    width: 100,
  },
];

//邀请用户搜索表单
export const userSearchFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: '账号',
    component: 'Input',
  },
  {
    field: 'realname',
    label: '姓名',
    component: 'Input',
  },
];

//企业套餐管理列表字段
export const packColumns: BasicColumn[] = [
  {
    title: '企业名称',
    dataIndex: 'tenantIdName',
    width: 200,
    resizable: true,
  },
  {
    title: '企业编号',
    dataIndex: 'tenantId',
    width: 80,
    resizable: true,
  },
  {
    title: '套餐名称',
    dataIndex: 'packName',
    width: 120,
    resizable: true,
  },
  {
    title: '套餐类型',
    dataIndex: 'packType',
    width: 100,
    resizable: true,
    customRender: ({ text }) => {
      if (text === 1) {
        return '送货单版';
      } else {
        return '进销存版';
      }
    },
  },
  {
    title: '套餐类别',
    dataIndex: 'packCategory',
    width: 100,
    resizable: true,
    customRender: ({ text }) => {
      if (text === 1) {
        return '单机版';
      } else {
        return '云端版';
      }
    },
  },
  {
    title: '价格',
    dataIndex: 'price',
    width: 80,
    resizable: true,
  },
  {
    title: '支持机构数',
    dataIndex: 'orgNum',
    width: 100,
    resizable: true,
  },
  {
    title: '支持客户数',
    dataIndex: 'customerNum',
    width: 100,
    resizable: true,
  },
  {
    title: '支持用户数',
    dataIndex: 'accountNum',
    width: 100,
    resizable: true,
  },
  {
    title: '支持商品数',
    dataIndex: 'goodsNum',
    width: 100,
    resizable: true,
  },
  {
    title: '开始时间',
    dataIndex: 'beginDate',
    // sorter: true,
    width: 150,
    resizable: true,
  },
  {
    title: '到期时间',
    dataIndex: 'endDate',
    // sorter: true,
    width: 150,
    resizable: true,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 60,
    resizable: true,
    customRender: ({ text }) => {
      if (text === '1') {
        return '开启';
      } else {
        return '关闭';
      }
    },
  },
  {
    title: '备注',
    dataIndex: 'remarks',
    width: 120,
    resizable: true,
  },
];

//企业套餐管理列表搜索表单
export const packFormSchema: FormSchema[] = [
  {
    field: 'tenantName',
    label: '企业名称',
    component: 'JInput',
    colProps: {xxl: 5},
  },
  {
    field: 'packName',
    label: '套餐名称',
    component: 'JInput',
    colProps: {xxl: 5},
  },
];

//回收站列表
export const recycleColumns: BasicColumn[] = [
  {
    title: '企业名称',
    dataIndex: 'name',
    width: 100,
    align: 'left',
  },
  {
    title: '企业编号(ID)',
    dataIndex: 'id',
    width: 100,
  },
  {
    title: '组织LOGO',
    dataIndex: 'companyLogo',
    width: 100,
    customRender: ({ text }) => {
      if (!text) {
        return text;
      }
      return render.renderImage({ text });
    },
  },
  {
    dataIndex: 'houseNumber',
    title: '门牌号',
    width: 100,
  },
];

//企业回收站搜索表单
export const searchRecycleFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '企业名称',
    component: 'Input',
  },
  {
    field: 'houseNumber',
    label: '门牌号',
    component: 'Input',
  },
];

//套餐用户列表
export const tenantPackUserColumns: BasicColumn[] = [
  {
    title: '用户',
    dataIndex: 'realname',
    width: 200,
  },
  {
    title: '部门',
    dataIndex: 'departNames',
    width: 200,
    ellipsis: true,
    slots: { customRender: 'departNames' },
  },
  {
    title: '职位',
    dataIndex: 'positionNames',
    ellipsis: true,
    width: 200,
    slots: { customRender: 'positionNames' },
  },
];

/**
 * 用户企业新增编辑表单
 */
export const tenantUserSchema: FormSchema[] = [
  { field: 'id', label: 'id', component: 'Input', show: false },
  { field: 'username', label: '用户账号', component: 'Input', show: true },
  {
    field: 'realname',
    label: '姓名',
    component: 'Input',
    dynamicDisabled: ({ values }) => {
      return !!values.id;
    },
  },
  {
    field: 'phone',
    label: '手机',
    component: 'Input',
    dynamicRules: ({ model, schema}) => {
      if (model.id) {
        return [];
      }
      return [{ ...rules.phone(true)[0] }, { ...rules.duplicateCheckRule('sys_user', 'phone', model, schema, false)[0] }];
    },
    dynamicDisabled: ({ values}) => {
      return !!values.id;
    },
  },
  {
    field: 'email',
    label: '邮箱',
    component: 'Input',
    dynamicRules: ({ model, schema}) => {
      if (model.id) {
        return [];
      }
      return [{ ...rules.email(true)[0] }, { ...rules.duplicateCheckRule('sys_user', 'email', model, schema, false)[0] }];
    },
    dynamicDisabled: ({ values}) => {
      return !!values.id;
    },
  },
  // {
  //   field: 'selecteddeparts',
  //   label: '部门',
  //   component: 'JSelectDept',
  //   componentProps: {checkStrictly: true}
  // },
  // {
  //   field: 'post',
  //   label: '职位',
  //   component: 'JSelectPosition',
  // },
  // {
  //   field: 'workNo',
  //   label: '工号',
  //   component: 'Input',
  //   dynamicRules: ({ model, schema }) => {
  //     return [{ required: true, message: '请输入工号' }, { ...rules.duplicateCheckRule('sys_user', 'work_no', model, schema, false)[0] }];
  //   },
  // },
  { field: 'relTenantIds', label: '企业', component: 'Input', show: false },
  { field: 'selectedroles', label: '角色', component: 'Input', show: false },
  {
    field: 'loginClient',
    component: 'JCheckbox',
    label: '登录客户端',
    defaultValue: '1,2',
    componentProps: {
      options: [
        { label: 'PC', value: '1' },
        { label: '小程序', value: '2' },
      ],
    },
  },
];
