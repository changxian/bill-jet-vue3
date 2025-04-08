<template>
  <div>
    <!--查询区域-->
    <div class="jeecg-basic-table-form-container">
      <a-form ref="formRef" @keyup.enter.native="searchQuery" :model="queryParam" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row :gutter="24">
          <a-col :lg="8">
            <a-form-item label="搜索" name="goodsName">
              <JInput v-model:value="queryParam.goodsName" class="query-group-cust" allow-clear></JInput>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
              <a-col :lg="6">
                <a-button type="primary" preIcon="ant-design:search-outlined" @click="searchQuery">查询</a-button>
                <a-button type="primary" preIcon="ant-design:reload-outlined" @click="searchReset" style="margin-left: 8px">重置</a-button>
              </a-col>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!--引用表格-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection" @dblclick="handleOk">
      <!--插槽:table标题-->
      <template v-if="billType != 'deliver' && billType != 'purchase'" #tableTitle>
        <a-button type="primary" v-auth="'bill:jxc_goods:add'" @click="handleAdd" preIcon="ant-design:plus-outlined"> 新增</a-button>
        <a-button type="primary" v-auth="'bill:jxc_goods:add'" @click="handleCustPrice" :disabled="selectedRowKeys.length != 1" preIcon="ant-design:account-book-outlined"> 客户价</a-button>
        <a-button type="primary" v-auth="'bill:jxc_goods:edit'" @click="handleModify('category')" :disabled="selectedRowKeys.length != 1" preIcon="ant-design:edit-outlined"> 改类别</a-button>
        <a-button type="primary" v-auth="'bill:jxc_goods:add'" @click="handleModify('updateCost')" :disabled="selectedRowKeys.length > 1" preIcon="ant-design:edit-outlined"> 更新成本</a-button>
        <a-button type="primary" v-auth="'bill:jxc_goods:add'" @click="handleModify('updateStocks')" :disabled="selectedRowKeys.length != 1" preIcon="ant-design:edit-outlined"> 变动库存</a-button>
        <a-button type="primary" v-auth="'bill:jxc_goods:add'" @click="handleStockDetail" :disabled="selectedRowKeys.length > 1" preIcon="ant-design:plus-outlined"> 库存明细</a-button>
        <a-button type="primary" v-auth="'bill:jxc_goods:exportXls'" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
        <j-upload-button type="primary" v-auth="'bill:jxc_goods:importExcel'" preIcon="ant-design:import-outlined" @click="onImportXls"> 导入</j-upload-button>
        <a-button type="link" preIcon="ant-design:export-outlined" target="_blank" style="margin-left: 10px; padding-top: 5px" @click="onTemplateXls"> 商品信息导入模板下载</a-button>
        <p style="font-size: 14px">为了数据导入顺利，请在正式导入数据之前先下载模板，然后再从准备好的excel表格里把信息复制到下载的模板里，再点击导入选择有数据的模板文件将数据导进来。<br/>
          <span style="font-weight: bold">请注意：模板第一行标题请不要修改，模板列只能删除不能增加、不能修改。</span>
        </p>
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="batchHandleDelete">
                <Icon icon="ant-design:delete-outlined" />
                删除
              </a-menu-item>
            </a-menu>
          </template>
          <a-button v-auth="'bill:jxc_goods:deleteBatch'"
            >批量操作
            <Icon icon="mdi:chevron-down" />
          </a-button>
        </a-dropdown>
      </template>
      <!--操作栏-->
      <template v-if="billType != 'deliver' && billType != 'purchase'" #action="{ record }">
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)" />
      </template>
    </BasicTable>
    <!-- 表单区域 -->
    <GoodsModal @register="registerModal" @success="handleSuccess" />
    <!-- 客户价表单 -->
    <CustPriceList @register="registerCustPriceModal" />
    <!-- 商品信息修改 -->
    <ModifyModal ref="modifyModalRef" @refresh="handleSuccess" />
    <!-- 商品库存明细 -->
    <GoodsInventoryRecordList @register="registerRecordModal" />
  </div>
</template>

<script lang="ts" name="bill-goods" setup>
  import { computed, reactive, ref, unref, watch } from 'vue';
  import { BasicColumn, BasicTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage';
  import GoodsModal from './GoodsModal.vue';
  import { getGoodsColumns } from './goods.data';
  import {
    batchDelete,
    deleteOne,
    getExportUrl,
    getImportUrl,
    list,
    tenantGoodsNum
  } from "./goods.api";
  import { useUserStore } from '/@/store/modules/user';
  import { useMessage } from '@/hooks/web/useMessage';
  import CustPriceList from './CustPriceList.vue';
  import ModifyModal from './ModifyModal.vue';
  import GoodsInventoryRecordList from '../GoodsInventoryRecordList.vue';
  import { JInput } from '@/components/Form';

  const queryParam = reactive<any>({});
  const userStore = useUserStore();
  const { createMessage } = useMessage();
  const formRef = ref();
  const modifyModalRef = ref();
  //注册model
  const [registerModal, { openModal }] = useModal();
  const [registerCustPriceModal, { openModal: custPriceModal }] = useModal();
  const [registerRecordModal, { openModal: recordModal }] = useModal();
  const labelCol = reactive({
    xs: 24,
    sm: 4,
    xl: 6,
    xxl: 4,
  });
  const wrapperCol = reactive({
    xs: 24,
    sm: 20,
  });

  const props = defineProps({
    data: {
      type: Object,
      required: true,
      defaultValue: () => {},
    },
    billType: { type: String, default: '' },
    goodsName: { type: String, default: '' },
    customerId: { type: String, default: '' },
    goodsIds: { type: String, default: '' },
  });
  // 开单类型【销售开单：deliver，进货开单：purchase】
  const billType = computed(() => props?.billType);
  // 搜索框内容
  const goodsName = computed(() => props?.goodsName);
  queryParam.goodsName = goodsName.value;
  // 开单时选择的客户
  const customerId = computed(() => props?.customerId);
  // 已经添加过的商品Id
  const goodsIds = computed(() => props?.goodsIds);
  // 当前选中的类别ID，可能会为空，代表未选择类别
  const categoryId = computed(() => props.data?.id);
  console.log('billType is:' + billType.value, '   customerId is:' + customerId.value, '   goodsName is:' + goodsName.value);
  const emits = defineEmits(['get-select', 'db-ok']);
  const columns = getGoodsColumns(billType.value);
  // 商品总条数
  const total = ref(0);

  // 注册table数据
  const { tableContext, onExportXls, onImportXls } = useListPage( reactive({
    tableProps: {
      title: '商品信息',
      api: list,
      columns,
      cols: userStore.getCols, // 添加列备注信息
      dynamicCols: userStore.getDynamicCols['jxc_goods'], // 添加扩展列信息
      canResize: false,
      showTableSetting: false,
      clickToRowSelect: false,
      showIndexColumn: true,
      formConfig: {
        labelWidth: 120,
        // schemas: searchFormSchema,
        autoSubmitOnEnter: true,
        showAdvancedButton: true,
        fieldMapToNumber: [],
        fieldMapToTime: [],
      },
      actionColumn: {
        width: 120,
        fixed: 'right',
      } as BasicColumn,
      beforeFetch: (params) => {
        params['categoryId'] = categoryId.value;
        params['billType'] = billType.value;
        params['custId'] = customerId.value;
        params['id'] = goodsIds.value;
        params['goodsName'] = goodsName.value;
        return Object.assign(params, queryParam);
      },
      rowSelection: {
        type: 'checkbox',
        onChange: function (ids, rows) {
          emits('get-select', rows, ids);
        },
      },
    },
    exportConfig: {
      name: '商品信息',
      url: getExportUrl,
      params: () => {
        queryParam['categoryId'] = categoryId.value;
        return queryParam;
      },
    },
    importConfig: {
      url: getImportUrl,
      success: handleSuccess,
    },
  }));

  const [registerTable, { reload }, { rowSelection, selectedRows, selectedRowKeys }] = tableContext;

  function handleOk() {
    console.log('=======', 'get-select', selectedRows.value, selectedRowKeys.value);
    if (selectedRowKeys.value.length > 0) {
      emits('get-select', selectedRows.value, selectedRowKeys.value);
      emits('db-ok');
    }
  }
  watch(
    () => props.data,
    () => reload()
  );

  /**
   * 商品信息导入模板下载事件
   */
  function onTemplateXls() {
    // 创建隐藏的下载链接
    const link = document.createElement('a');
    link.href = '/templates/goodsTemplate.xls?t=${Date.now()}'; // 文件路径
    link.download = '商品信息导入模板.xlsx'; // 自定义下载文件名
    link.style.display = 'none';

    // 触发点击下载
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    createMessage.success('模板文件正在下载中！');
  }

  // 租户套餐信息
  const tenantPack = userStore.getTenantPack;
  /**
   * 新增事件
   */
  function handleAdd() {
    tenantGoodsNum().then((res) => {
      total.value = res.total;
    });
    // 如果商品数量小于套餐内规定数量，则可以继续添加
    if (tenantPack.goodsNum == null || tenantPack.goodsNum > total.value) {
      let record = {
        dynamicFields: userStore.getDynamicCols['jxc_goods'],
      };
      openModal(true, {
        record,
        isUpdate: false,
        showFooter: true,
        categoryId: categoryId.value,
      });
    } else {
      createMessage.warning('商品数量已达上限！如果还想添加更多商品，请联系运营商扩容！');
    }
  }
  /**
   * 编辑事件
   */
  function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
      showFooter: true,
      categoryId: categoryId.value,
    });
  }
  /**
   * 新增客户价
   */
  function handleCustPrice() {
    if (unref(selectedRowKeys).length != 1) {
      createMessage.warn('请选择一个商品');
      return;
    }
    console.log(selectedRowKeys.value, selectedRows.value[0]);
    custPriceModal(true, {
      goodsName: unref(selectedRows.value[0].name),
      row: selectedRows.value[0],
    });
  }
  /**
   * 编辑类别
   */
  function handleModify(type) {
    let row: Recordable = {};
    if (unref(selectedRowKeys).length > 0) {
      row = selectedRows.value[0];
    }
    modifyModalRef.value.show(type, row);
  }
  /**
   * 库存明细[可以选择一个商品 或者 不选商品]
   */
  function handleStockDetail() {
    let goodsName = '';
    if (unref(selectedRowKeys).length > 0) {
      goodsName = selectedRows.value[0].name;
    }
    recordModal(true, {
      goodsName: unref(goodsName),
    });
  }
  /**
   * 详情
   */
  function handleDetail(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
      showFooter: false,
    });
  }
  /**
   * 删除事件
   */
  async function handleDelete(record) {
    await deleteOne({ id: record.id }, handleSuccess);
  }
  /**
   * 批量删除事件
   */
  async function batchHandleDelete() {
    await batchDelete({ ids: selectedRowKeys.value }, handleSuccess);
  }
  /**
   * 成功回调
   */
  function handleSuccess() {
    (selectedRowKeys.value = []) && reload();
  }

  /**
   * 查询
   */
  function searchQuery() {
    reload();
  }
  /**
   * 重置
   */
  function searchReset() {
    formRef.value.resetFields();
    selectedRowKeys.value = [];
    //刷新数据
    reload();
  }
  /**
   * 操作栏
   */
  function getTableAction(record) {
    return [
      {
        label: '编辑',
        onClick: handleEdit.bind(null, record),
        auth: 'bill:jxc_goods:edit', // 权限控制
      },
    ];
  }
  /**
   * 下拉操作栏
   */
  function getDropDownAction(record) {
    return [
      {
        label: '详情',
        onClick: handleDetail.bind(null, record),
      },
      {
        label: '删除',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
          placement: 'topLeft',
        },
        auth: 'bill:jxc_goods:delete', // 权限控制
      },
    ];
  }
</script>

<style lang="less" scoped>
  .jeecg-basic-table-form-container {
    padding: 0;
    .table-page-search-submitButtons {
      display: block;
      margin-bottom: 24px;
      white-space: nowrap;
    }
  }
  :deep(.ant-picker),
  :deep(.ant-input-number) {
    width: 100%;
  }
</style>
