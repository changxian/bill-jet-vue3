<template>
  <PageWrapper>
    <div class="card-container">
      <a-tabs v-model:activeKey="activeKey" type="card">
        <a-tab-pane key="1" tab="打印设置">
          <PrintSettingForm :loading="loading" class="enter-y" :formBpm="false"></PrintSettingForm>
        </a-tab-pane>
        <a-tab-pane key="2" tab="开单设置">
          <BillingSettingForm :loading="loading" class="enter-y" :formBpm="false"></BillingSettingForm>
        </a-tab-pane>
        <a-tab-pane key="3" tab="其他属性显示设置">
          其他属性显示设置
        </a-tab-pane>
        <a-tab-pane key="4" tab="系统设置">
          <SystemSettingForm :loading="loading" class="enter-y" :formBpm="false"></SystemSettingForm>
        </a-tab-pane>
      </a-tabs>
    </div>
  </PageWrapper>
</template>
<script setup>
  import { ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import PrintSettingForm from './components/PrintSettingForm.vue';
  import SystemSettingForm from './components/SystemSettingForm.vue';
  import BillingSettingForm from './components/BillingSettingForm.vue';
  import {getInitData} from "@/views/setting/system/index.api";
  import {queryTreeListForRole} from "@/views/system/role/role.api";

  // const disableSubmit = ref<boolean>(false);
  const activeKey = ref('1');

  const loading = ref(true);

  //初始化数据
  // const roleResult = await getInitData();
  // console.log(roleResult,22222222222222222);
</script>

<style lang="less">
  @import 'index.less';
  .card-container p {
    margin: 0;
  }
  .card-container > .ant-tabs-card .ant-tabs-content {
    margin-top: -16px;
  }
  .card-container > .ant-tabs-card .ant-tabs-content > .ant-tabs-tabpane {
    padding: 16px;
    background: #fff;
  }
  .card-container > .ant-tabs-card > .ant-tabs-nav::before {
    display: none;
  }
  .card-container > .ant-tabs-card .ant-tabs-tab,
  [data-theme='compact'] .card-container > .ant-tabs-card .ant-tabs-tab {
    background: transparent;
    border-color: transparent;
  }
  .card-container > .ant-tabs-card .ant-tabs-tab-active,
  [data-theme='compact'] .card-container > .ant-tabs-card .ant-tabs-tab-active {
    background: #fff;
    border-color: #fff;
  }
  #components-tabs-demo-card-top .code-box-demo {
    padding: 24px;
    overflow: hidden;
    background: #f5f5f5;
  }
  [data-theme='compact'] .card-container > .ant-tabs-card .ant-tabs-content {
    height: 120px;
    margin-top: -8px;
  }
  [data-theme='dark'] .card-container > .ant-tabs-card .ant-tabs-tab {
    background: transparent;
    border-color: transparent;
  }
  [data-theme='dark'] #components-tabs-demo-card-top .code-box-demo {
    background: #000;
  }
  [data-theme='dark'] .card-container > .ant-tabs-card .ant-tabs-content > .ant-tabs-tabpane {
    background: #141414;
  }
  [data-theme='dark'] .card-container > .ant-tabs-card .ant-tabs-tab-active {
    background: #141414;
    border-color: #141414;
  }
</style>
