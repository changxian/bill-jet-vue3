<template>
  <div class="p-2">
    <div class="jeecg-basic-table-form-container">
      <a-form ref="formRef" @keyup.enter.native="searchQuery" :model="queryParam" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row :gutter="24">
          <FastDate v-model:modelValue="fastDateParam" />
            <a-col :lg="6">
              <a-form-item label="单类型" name="type">
                <a-select v-model:value="queryParam.type" allow-clear placeholder="请选择" >
                  <a-select-option value="">所有</a-select-option>
                  <a-select-option value="1">进货还款</a-select-option>
                  <a-select-option value="2">退货还款</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :lg="6">
              <a-form-item label="欠款单" name="hasDebt">
                  <a-radio-group v-model:value="queryParam.hasDebt" name="radioGroup">
                    <a-radio value="">所有</a-radio>
                    <a-radio value="1">是</a-radio>
                    <a-radio value="2">否</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
              <a-col :lg="6">
              <a-form-item label="公司" name="companyId">
                <j-select-company v-model:value="queryParam.companyId" @change="changeCompany" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item label="供应商名称" id="PurchaseBillForm-supplierId" name="supplierId">
                <j-select-supplier v-model:value="queryParam.supplierId" @change="changeSupplier" allow-clear />
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item label="供应商电话"  id="PurchaseBillForm-supplierPhone" name="supplierPhone">
                <a-input v-model:value="queryParam.supplierPhone" placeholder="请输入供应商电话" allow-clear></a-input>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item label="供应商联系人"  id="PurchaseBillForm-supplierContact" name="supplierContact">
                <a-input v-model:value="queryParam.supplierContact" placeholder="请输入供应商联系人" allow-clear></a-input>
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
    <BasicTable @register="registerTable" :columns="columns">
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-button type="primary" v-auth="'purchase.checkBill:jxc_purchase_checkBill:exportXls'" preIcon="ant-design:export-outlined" @click="onExportXls">
          导出</a-button
        >

        <!-- 高级查询 -->
        <!-- <super-query :config="superQueryConfig" @search="handleSuperQuery" /> -->
      </template>
    </BasicTable>
  </div>
</template>

<script lang="ts" name="purchase.checkbill-PurchaseCheckBill" setup>

 import {ref, defineExpose, reactive} from 'vue'
    import { BasicTable } from '/@/components/Table';
    import { useListPage } from '/@/hooks/system/useListPage';
    import { columns} from './PurchaseCheckBill.data';
    import FastDate from '/@/components/FastDate.vue';
    import JSelectSupplier from '/@/components/Form/src/jeecg/components/JSelectSupplier.vue';
    import JSelectCompany from '/@/components/Form/src/jeecg/components/JSelectCompany.vue';
 import {getExportUrl, list} from "@/views/purchase/checkbill/PurchaseCheckBill.api";

 const queryParam = reactive<any>({ companyId: '', companyName: ''});
 const fastDateParam = reactive<any>({startDate: '', endDate: ''});
 const formRef = ref()
 

  function changeCompany(val, selectRows) {
  console.log(' changeCompany val', val, 'selectRows:', selectRows);
  if (selectRows?.length > 0) {
    queryParam.companyName = selectRows[0].compName;
  }
}
function changeSupplier(val, selectRows) {
  console.log(' changeSupplier val', val, 'selectRows:', selectRows);
  if (selectRows?.length > 0) {
    queryParam.supplierId = selectRows[0].id;
    queryParam.supplierName = selectRows[0].orgName;
    queryParam.supplierPhone = selectRows[0].phone;
    queryParam.supplierContact = selectRows[0].contact;
  }
}

  const toggleSearchStatus = ref<boolean>(false);
  //注册table数据
  const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: '进货对账单',
      api: list,
      canResize:false,
      columns,
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
      }
    },
    exportConfig: {
      name: "进货对账单",
      url: getExportUrl,
      params: queryParam,
    },

  });
  const [registerTable, { reload }, { rowSelection, selectedRows, selectedRowKeys }] = tableContext;
  const labelCol = reactive({
    xs:24,
    sm:5,
    xl:6,
    xxl:5
  });
    const wrapperCol = reactive({
    xs: 24,
    sm: 19,
  });

  
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
