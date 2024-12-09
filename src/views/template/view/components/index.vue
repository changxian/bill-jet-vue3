<template>
  <a-row :class="['p-4', `${prefixCls}--box`]" :gutter="10">
    <a-col :xl="6" :lg="8" :md="10" :sm="24" style="flex: 1">
      <a-card :bordered="false" style="height: 100%; overflow: auto">
        <Left @select="onTreeSelect" :id="formData.id" />
      </a-card>
    </a-col>
    <a-col :xl="18" :lg="16" :md="14" :sm="24" style="flex: 1" class="goods-tbl-wrap">
      <a-card :bordered="false" style="height: 100%">
        <View :data="formData" />
      </a-card>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup name="system-depart-user">
  import { provide, reactive, watch } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import tempData from '../temp-data';
  import tempList from '../temp-list';
  import printData from '../print-data';

  import Left from './Left.vue';
  import View from './View.vue';

  const { prefixCls } = useDesign('depart-user');
  provide('prefixCls', prefixCls);
  const emits = defineEmits(['get-select', 'db-ok']);

  const props = defineProps({
    formData: { type: Object, default: () => ({}) },
  });

  // eslint-disable-next-line vue/no-dupe-keys
  const formData = reactive<Record<string, any>>({
    tempData: null,
    data: null,
    id: null,
  });
  watch(
    () => props.formData,
    () => {
      formData.id = props.formData.id;
    },
    {
      immediate: true,
    }
  );

  // 左侧树选择后触发
  function onTreeSelect(data: any) {
    formData.tempData = data;
  }
  function getSelect(rows, ids) {
    emits('get-select', rows, ids);
  }

  defineExpose({});
</script>

<style lang="less">
  @import 'index.less';
  .goods-tbl-wrap {
    .ant-row {
      width: 100% !important;
    }
    .ant-col {
      max-width: 100% !important;
    }
  }
</style>
