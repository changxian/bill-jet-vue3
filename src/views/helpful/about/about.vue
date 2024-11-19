<template>
  <PageWrapper title="关于我们">
    <template #headerContent>
      <div class="flex justify-between items-center">
        <div class="ant-result-title">手机端小程序请在微信里搜索“XXXXXXX”开始应用，或者打开微信扫描二维码开始使用。</div>
      </div>
      <div class="flex items-center ant-result" style="padding: 48px 32px">
        <div class="ant-result-icon">
          <img src="/src/assets/images/mobile/mobile.png" />
        </div>
        <div class="ant-result-icon" style="margin-left: 80px">
          <img src="/src/assets/images/mobile/qrcode.png" />
        </div>
      </div>
    </template>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
</script>
