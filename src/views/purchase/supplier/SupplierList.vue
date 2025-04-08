<template>
  <div class="p-2">
    <!--查询区域-->
    <div class="jeecg-basic-table-form-container">
      <a-form ref="formRef" @keyup.enter.native="searchQuery" :model="queryParam" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row :gutter="24">
          <a-col :lg="6">
            <a-form-item name="orgName">
              <template #label><span title="供应商名称">供应商名</span></template>
              <JInput v-model:value="queryParam.orgName" class="query-group-cust"></JInput>
            </a-form-item>
          </a-col>
          <a-col :lg="6">
            <a-form-item name="cellPhone">
              <template #label><span title="手机">手机</span></template>
              <JInput v-model:value="queryParam.cellPhone" class="query-group-cust"></JInput>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :lg="6">
              <a-form-item name="phone">
                <template #label><span title="电话">电话</span></template>
                <JInput v-model:value="queryParam.phone" class="query-group-cust"></JInput>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item name="contact">
                <template #label><span title="联系人">联系人</span></template>
                <JInput v-model:value="queryParam.contact" class="query-group-cust"></JInput>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item name="qq">
                <template #label><span title="QQ">QQ</span></template>
                <JInput v-model:value="queryParam.qq" class="query-group-cust"></JInput>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item name="wechat">
                <template #label><span title="微信">微信</span></template>
                <JInput v-model:value="queryParam.wechat" class="query-group-cust"></JInput>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item name="email">
                <template #label><span title="邮箱">邮箱</span></template>
                <JInput v-model:value="queryParam.email" class="query-group-cust"></JInput>
              </a-form-item>
            </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
              <a-col :lg="6">
                <a-button type="primary" preIcon="ant-design:search-outlined" @click="searchQuery">查询</a-button>
                <a-button type="primary" preIcon="ant-design:reload-outlined" @click="searchReset" style="margin-left: 8px">重置</a-button>
                <a @click="toggleSearchStatus = !toggleSearchStatus" style="margin-left: 8px">
                  {{ toggleSearchStatus ? '收起' : '展开' }}
                  <Icon :icon="toggleSearchStatus ? 'ant-design:up-outlined' : 'ant-design:down-outlined'" />
                </a>
              </a-col>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!--引用表格-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-button type="primary" v-auth="'purchase.supplier:jxc_supplier:add'" @click="handleAdd" preIcon="ant-design:plus-outlined"> 新增</a-button>
        <a-button type="primary" v-auth="'purchase.supplier:jxc_supplier:repayment_detail'" @click="handleAdd" preIcon="ant-design:plus-outlined"> 还款明细</a-button>
        <a-button type="primary" v-auth="'purchase.supplier:jxc_supplier:exportXls'" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
        <j-upload-button type="primary" v-auth="'purchase.supplier:jxc_supplier:importExcel'" preIcon="ant-design:import-outlined" @click="onImportXls">导入</j-upload-button>
        <a-button type="link" preIcon="ant-design:export-outlined" target="_blank" style="margin-left: 10px; padding-top: 5px" @click="onTemplateXls"> 供应商信息导入模板下载</a-button>
        <p style="font-size: 14px">为了数据导入顺利，请在正式导入数据之前先下载模板，然后再从准备好的excel表格里把信息复制到下载的模板里，再点击导入选择有数据的模板文件将数据导进来。<br/>
          <span style="font-weight: bold">请注意：模板第一行标题请不要修改，模板列只能删除不能增加、不能修改。</span>
        </p>
        <a-dropdown v-if="false">
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="batchHandleDelete">
                <Icon icon="ant-design:delete-outlined"></Icon>
                删除
              </a-menu-item>
            </a-menu>
          </template>
          <a-button v-auth="'purchase.supplier:jxc_supplier:deleteBatch'">批量操作
            <Icon icon="mdi:chevron-down"></Icon>
          </a-button>
        </a-dropdown>
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)"/>
      </template>
      <template v-slot:bodyCell="{ column, record, index, text }">
      </template>
    </BasicTable>
    <!-- 表单区域 -->
    <SupplierModal ref="registerModal" @success="handleSuccess"></SupplierModal>
  </div>
</template>

<script lang="ts" name="purchase.supplier-supplier" setup>
  import { reactive, ref } from 'vue';
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { columns } from './Supplier.data';
  import { batchDelete, deleteOne, getExportUrl, getImportUrl, list } from './Supplier.api';
  import SupplierModal from './components/SupplierModal.vue';
  import { useUserStore } from '/@/store/modules/user';
  import { cloneDeep } from 'lodash-es';
  import { JInput } from '@/components/Form';
  import { useMessage } from '@/hooks/web/useMessage';

  const { createMessage } = useMessage();
  const formRef = ref();
  const queryParam = reactive<any>({});
  const toggleSearchStatus = ref<boolean>(false);
  const registerModal = ref();
  const userStore = useUserStore();
  //注册table数据
  const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: '供应商',
      api: list,
      columns,
      canResize: false,
      cols: userStore.getCols, // 添加列备注信息
      dynamicCols: userStore.getDynamicCols['jxc_supplier'], // 添加扩展列信息
      useSearchForm: false,
      actionColumn: {
        width: 120,
        fixed: 'right',
      },
      beforeFetch: async (params) => {
        // let rangerQuery = await setRangeQuery();
        // return Object.assign(params, rangerQuery);
        return Object.assign(params, queryParam);
      },
    },
    exportConfig: {
      name: '供应商',
      url: getExportUrl,
      params: queryParam,
    },
	  importConfig: {
	    url: getImportUrl,
	    success: handleSuccess
	  },
  });
  const [registerTable, { reload, collapseAll, updateTableDataRecord, findTableDataRecord, getDataSource }, { rowSelection, selectedRowKeys }] = tableContext;
  const labelCol = reactive({
    xs:24,
    sm:4,
    xl:6,
    xxl:4
  });
  const wrapperCol = reactive({
    xs: 24,
    sm: 20,
  });

  /**
   * 供应商信息导入模板下载事件
   */
  function onTemplateXls() {
    // 创建隐藏的下载链接
    const link = document.createElement('a');
    link.href = '/templates/supplierTemplate.xls?t=${Date.now()}'; // 文件路径
    link.download = '供应商信息导入模板.xlsx'; // 自定义下载文件名
    link.style.display = 'none';

    // 触发点击下载
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    createMessage.success('模板文件正在下载中！');
  }

  /**
   * 新增事件
   */
  function handleAdd() {
    registerModal.value.disableSubmit = false;
    registerModal.value.add();
  }

  /**
   * 编辑事件
   */
  function handleEdit(record: Recordable) {
    registerModal.value.disableSubmit = false;
    registerModal.value.edit(record);
  }

  /**
   * 详情
   */
  function handleDetail(record: Recordable) {
    registerModal.value.disableSubmit = true;
    registerModal.value.edit(record);
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
   * 操作栏
   */
  function getTableAction(record) {
    return [
      {
        label: '编辑',
        onClick: handleEdit.bind(null, record),
        auth: 'purchase.supplier:jxc_supplier:edit'
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
      }, {
        label: '删除',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
          placement: 'topLeft',
        },
        auth: 'purchase.supplier:jxc_supplier:delete'
      }
    ]
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
  



  
  let rangeField = ''
  
  /**
   * 设置范围查询条件
   */
  async function setRangeQuery(){
    let queryParamClone = cloneDeep(queryParam);
    if (rangeField) {
      let fieldsValue = rangeField.split(',');
      fieldsValue.forEach(item => {
        if (queryParamClone[item]) {
          let range = queryParamClone[item];
          queryParamClone[item+'_begin'] = range[0];
          queryParamClone[item+'_end'] = range[1];
          delete queryParamClone[item];
        } else {
          queryParamClone[item+'_begin'] = '';
          queryParamClone[item+'_end'] = '';
        }
      })
    }
    return queryParamClone;
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
    .query-group-cust{
      min-width: 100px !important;
    }
    .query-group-split-cust{
      width: 30px;
      display: inline-block;
      text-align: center
    }
    .ant-form-item:not(.ant-form-item-with-help){
      margin-bottom: 16px;
      height: 32px;
    }
    :deep(.ant-picker),:deep(.ant-input-number){
      width: 100%;
    }
  }
</style>
