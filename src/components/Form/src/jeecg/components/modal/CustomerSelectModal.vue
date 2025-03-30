<!--公司选择框-->
<template>
  <div>
    <BasicModal
      v-bind="$attrs"
      @register="register"
      :title="modalTitle"
      :width="'1400px'"
      wrapClassName="j-user-select-modal"
      @ok="handleOk"
      @cancel="handleCancel"
      :maxHeight="maxHeight"
      :centered="true"
      destroyOnClose
      @visible-change="visibleChange"
    >
      <a-row>
        <BasicTable
          @register="registerTable"
          ref="tableRef"
          :columns="columns"
          :scroll="tableScroll"
          v-bind="getBindValue"
          :useSearchForm="true"
          @dblclick="handleOk"
          :formConfig="formConfig"
          :api="getCustomerList"
          :searchInfo="searchInfo"
          :rowSelection="rowSelection"
          :indexColumnProps="indexColumnProps"
          :afterFetch="afterFetch"
          :beforeFetch="beforeFetch"
        >
          <template #tableTitle></template>
        </BasicTable>
      </a-row>
    </BasicModal>
  </div>
</template>
<script lang="ts">
import {defineComponent, unref, ref, watch, reactive} from 'vue';
import {BasicModal, useModalInner} from '/@/components/Modal';
import {getCustomerList} from '/@/api/common/api';
import {createAsyncComponent} from '/@/utils/factory/createAsyncComponent';
import {useSelectBiz} from '/@/components/Form/src/jeecg/hooks/useSelectBiz';
import {useAttrs} from '/@/hooks/core/useAttrs';
import {selectProps} from '/@/components/Form/src/jeecg/props/props';
import {addDynamicCols} from '/@/hooks/system/useListPage';
import {useUserStore} from '/@/store/modules/user';

const userStore = useUserStore();

export default defineComponent({
  name: 'CustomerSelectModal',
  components: {
    //此处需要异步加载BasicTable
    BasicModal,
    BasicTable: createAsyncComponent(() => import('/@/components/Table/src/BasicTable.vue'), {
      loading: true,
    }),
  },
  props: {
    ...selectProps,
    //选择框标题
    modalTitle: {
      type: String,
      default: '选择客户',
    },
    //排除用户id的集合
    excludeCustomerIdList: {
      type: Array,
      default: [],
    },
  },
  emits: ['register', 'getSelectResult', 'close'],
  setup(props, {emit, refs}) {
    const tableScroll = ref<any>({x: false});
    const tableRef = ref();
    const maxHeight = ref(600);
    /**
     * 确定选择
     */
    function registerTable(tableActon,formActions) {

    }
//查询form
    const formConfig =ref({
      baseColProps: {
        xs: 24,
        sm: 6,
        md: 6,
        lg: 6,
        xl: 6,
        xxl: 6,
      },
      actionColOptions: {
        xs: 24,
        sm: 6,
        md: 6,
        lg: 6,
        xl: 6,
        xxl: 6,
      },
      schemas: [
        {
          label: '客户名',
          field: 'orgName',
          component: 'JInput',
          defaultValue:'',
        },
        {
          label: '电话',
          field: 'phone',
          component: 'JInput',
        },
        {
          label: '联系人',
          field: 'contact',
          component: 'JInput',
        },
      ],
    }) ;
    //注册弹框
    const [register, {closeModal}] = useModalInner(async (data) => {
      if (window.innerWidth < 900) {
        tableScroll.value = {x: 900};
      } else {
        tableScroll.value = {x: false};
      }
      if(data && data.record){
        formConfig.value.schemas[0].defaultValue=data.record.custName
      }
      setTimeout(() => {
        if (tableRef.value) {
          tableRef.value.setSelectedRowKeys(selectValues['value'] || []);
        }
      }, 800);
    });
    const attrs = useAttrs();
    //表格配置
    const config = {
      canResize: false,
      bordered: true,
      size: 'small',
    };
    const getBindValue = Object.assign({}, unref(props), unref(attrs), config);
    const [{
      rowSelection,
      visibleChange,
      selectValues,
      indexColumnProps,
      getSelectResult,
      handleDeleteSelected,
      selectRows
    }] = useSelectBiz(
      getCustomerList,
      getBindValue,
      emit
    );
    const searchInfo = ref(props.params);
    watch(rowSelection.selectedRowKeys, (newVal) => {
      if (tableRef.value) {
        tableRef.value.setSelectedRowKeys(newVal);
      }
    });

    //定义表格列
    const dynamicCols = userStore.getDynamicCols['jxc_customer']  // 添加扩展列信息

    const columns = addDynamicCols([
      {
        title: '客户名',
        align: 'center',
        sorter: true,
        dataIndex: 'orgName',
      },
      {
        title: '电话',
        align: 'center',
        dataIndex: 'phone',
      },
      {
        title: '手机',
        align: 'center',
        dataIndex: 'cellPhone',
      },
      {
        title: '联系人',
        align: 'center',
        dataIndex: 'contact',
      },
      {
        title: '地址',
        align: 'center',
        dataIndex: 'address',
      },
      {
        title: '传真',
        align: 'center',
        dataIndex: 'faxes',
      },
      {
        title: 'QQ',
        align: 'center',
        dataIndex: 'qq',
      },
      {
        title: '微信',
        align: 'center',
        dataIndex: 'wechat',
      },
      {
        title: '邮箱',
        align: 'center',
        dataIndex: 'email',
      },
      {
        title: '备注',
        align: 'center',
        dataIndex: 'remark',
      },
    ], dynamicCols);
    //已选择的table信息
    const selectedTable = {
      pagination: false,
      showIndexColumn: false,
      scroll: {y: 390},
      size: 'small',
      canResize: false,
      bordered: true,
      rowKey: 'id',
      columns: [
        {
          title: '客户名',
          dataIndex: 'orgName',
          width: 40,
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          width: 40,
          slots: {customRender: 'action'},
        },
      ],
    };

    /**
     * 确定选择
     */
    function handleOk() {
      getSelectResult((options, values, selectRows) => {
        //回传选项和已选择的值
        console.log('options, values:::', options, values, selectRows);
        emit('getSelectResult', options, values, selectRows);
        //关闭弹窗
        closeModal();
      });
    }

    /**
     * 用户返回结果逻辑查询
     */
    function afterFetch(record) {
      let excludeList = props.excludeCustomerIdList;
      if (!excludeList) {
        return record;
      }
      let arr: any[] = [];
      //如果存在过滤用户id集合，并且后台返回的数据不为空
      if (excludeList.length > 0 && record && record.length > 0) {
        for (let item of record) {
          if (excludeList.indexOf(item.id) < 0) {
            arr.push({...item});
          }
        }
        return arr;
      }
      return record;
    }

    const handleCancel = () => {
      emit('close');
    };

    const clientHeight = document.documentElement.clientHeight * 200;
    maxHeight.value = clientHeight > 600 ? 600 : clientHeight;

    /**
     * 请求之前根据创建时间排序
     *
     * @param params
     */
    function beforeFetch(params) {
      return Object.assign({column: 'createTime', order: 'desc'}, params);
    }

    return {
      //config,
      handleOk,
      searchInfo,
      register,
      indexColumnProps,
      visibleChange,
      getBindValue,
      getCustomerList,
      formConfig,
      columns,
      rowSelection,
      selectRows,
      selectedTable,
      handleDeleteSelected,
      tableScroll,
      tableRef,
      afterFetch,
      handleCancel,
      maxHeight,
      beforeFetch,
      registerTable,
    };
  },
});
</script>
