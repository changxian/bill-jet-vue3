<template>
  <div class="p-2">
    <div class="jeecg-basic-table-form-container">
      <a-form ref="formRef" @keyup.enter.native="searchQuery" :model="queryParam" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row :gutter="24">
          <FastDate v-model:modelValue="fastDateParam" />
          <a-col :lg="6">
            <a-form-item name="name" label="筛选">
              <JInput v-model:value="queryParam.supplierName" class="query-group-cust" allow-clear></JInput>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :lg="6">
              <a-form-item label="类型" name="type">
                <a-select v-model:value="queryParam.type" allow-clear>
                  <a-select-option value="">所有</a-select-option>
                  <a-select-option value="1">进货还款</a-select-option>
                  <a-select-option value="2">退货还款</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
              <a-col :lg="6">
              <a-form-item label="公司" name="companyId">
                <j-select-company v-model:value="queryParam.companyId" @change="changeCompany" allow-clear />
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
        <a-row :gutter="24" style="padding: 0 0 10px 20px">
           <a-radio-group v-model:value="queryParam.queryType" @change="changeType">
                <a-radio value="goodsCountColumns">按商品</a-radio>
                <a-radio value="typeCountColumns">按类别</a-radio>
                <a-radio value="supplierCountColumns">按供应商</a-radio>
                <a-radio value="userCountColumns">按用户</a-radio>
                <a-radio value="careNoCountColumns">按车号</a-radio>
              </a-radio-group>
        </a-row>
      </a-form>
    </div>
    <!--引用表格-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection" :columns="columns">
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-button type="primary" v-auth="'purchase.bill:jxc_purchase_bill:exportXls'" preIcon="ant-design:export-outlined" @click="onExportXls">
          导出</a-button
        >

        <!-- 高级查询 -->
        <!-- <super-query :config="superQueryConfig" @search="handleSuperQuery" /> -->
      </template>
      <!-- 明细 -->
      <template #detail="{ record }">
         <a-button @click="lookDetail(record)" preIcon="ant-design:container-outlined"></a-button>
      </template>
      <template #count="{ record }">
         <a-button @click="lookTotal(record)" preIcon="ant-design:credit-card-outlined"></a-button>
      </template>
    </BasicTable>
    <DetailDialog ref="detailDialogRef" />
    <TotalDialog ref="totalDialogRef" />
  </div>
</template>

<script lang="ts" name="purchase.statistics-PurchaseStatistics" setup>

 import {ref, defineExpose, reactive, defineEmits} from 'vue'
    import JModal from '/@/components/Modal/src/JModal/JModal.vue';
    import { BasicTable, useTable } from '/@/components/Table';
    import { useListPage } from '/@/hooks/system/useListPage';
    import { goodsCountColumns, typeCountColumns, supplierCountColumns,userCountColumns, careNoCountColumns } from './PurchaseStatistics.data';
    import {list, getExportUrl} from './PurchaseStatistics.api'
    import {JInput} from "@/components/Form";
    import FastDate from '/@/components/FastDate.vue';
    import JSelectCompany from '/@/components/Form/src/jeecg/components/JSelectCompany.vue';
    import DetailDialog from './components/DetailDialog.vue'
    import TotalDialog from './components/TotalDialog.vue'
 

 const queryParam = reactive<any>({queryType: 'goodsCountColumns', companyId: '', companyName: ''});
 const fastDateParam = reactive<any>({startDate: '', endDate: ''});
 const formRef = ref()
 const columnObj = {
  goodsCountColumns, typeCountColumns, supplierCountColumns,userCountColumns, careNoCountColumns
 }
  function getColumns(){
     return columnObj[queryParam.queryType]
  }

  function changeCompany(val, selectRows) {
  console.log(' changeCompany val', val, 'selectRows:', selectRows);
  // if (selectRows?.length > 0) {
  //   queryParam.companyName = selectRows[0].compName;
  // }
}

const columns = ref(goodsCountColumns)
   const toggleSearchStatus = ref<boolean>(false);
  //注册table数据
  const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: '进货开单',
      api: list,
      // columns: typeCountColumns,
      canResize:false,
      useSearchForm: false,
      showActionColumn:false,
      clickToRowSelect: true,
      showIndexColumn: true,
      actionColumn: {
        width: 120,
        fixed: 'right',
      },
      beforeFetch: async (params) => {
        return Object.assign(params, queryParam, fastDateParam);
      },
      rowSelection: { type: 'radio'}, 
    },
    exportConfig: {
      name: "进货开单",
      url: getExportUrl,
      params: queryParam,
    },

  });
  const [registerTable, { reload }, { rowSelection, selectedRows, selectedRowKeys }] = tableContext;
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

function changeType(){
  columns.value = columnObj[queryParam.queryType]
  reload()
}
   const detailDialogRef = ref()
   function lookDetail(record){
    detailDialogRef.value.show(queryParam.queryType, record)
   }
    const totalDialogRef = ref()
   function lookTotal(record){
      totalDialogRef.value.show(record)
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
    fastDateParam.startDate = ''
    fastDateParam.endDate = ''
    selectedRowKeys.value = [];
    //刷新数据
    reload();
  }
 
    defineExpose({
       
    })

</script>

<style lang="less" scoped>
     .table-page-search-submitButtons {
      display: block;
      margin-bottom: 24px;
      white-space: nowrap;
    }
</style>
