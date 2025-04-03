<template>
  <a-row :class="['p-4', `${prefixCls}--box`]" :gutter="10">
    <a-col :xl="6" :lg="8" :md="10" :sm="24" style="flex: 1">
      <a-card :bordered="false" style="height: 100%">
        <GoodsTree @select="onTreeSelect" />
      </a-card>
    </a-col>
    <a-col :xl="18" :lg="16" :md="14" :sm="24" style="flex: 1" class="goods-tbl-wrap">
      <a-card :bordered="false" style="height: 100%">
        <GoodsList :data="categoryData" :billType="billType" :customerId="customerId" :goodsIds="goodsIds" :goodsName="goodsName" @db-ok="emits('db-ok')" @get-select="getSelect" />
      </a-card>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup name="system-depart-user">
  import { computed, provide, ref } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';

  import GoodsTree from './components/GoodsTree.vue';
  import GoodsList from './components/GoodsList.vue';

  const { prefixCls } = useDesign('depart-user');
  provide('prefixCls', prefixCls);
  const emits = defineEmits(['get-select', 'db-ok']);
  // 当前选中的类别信息
  let categoryData = ref({});

  const props = defineProps({
    billType: { type: String, default: '' },
    customerId: { type: String, default: '' },
    goodsIds: { type: String, default: '' },
    goodsName: { type: String, default: '' },
  });
  const billType = computed(() => props?.billType);
  const customerId = computed(() => props?.customerId);
  const goodsIds = computed(() => props?.goodsIds);
  const goodsName = computed(() => props?.goodsName);
  // 左侧树选择后触发
  function onTreeSelect(data: any) {
    categoryData.value = data;
  }
  function getSelect(rows, ids) {
    emits('get-select', rows, ids);
  }

  defineExpose({
    billType,
    customerId,
    goodsIds,
    goodsName,
  });
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
