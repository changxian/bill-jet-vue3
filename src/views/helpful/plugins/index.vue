<template>
  <PageWrapper title="插件下载">
    <template #headerContent>
      <div class="flex justify-between items-center">
        <div class="ant-result-title">（必须）请下载与本台电脑操作系统对应的插件进行安装。</div>
      </div>
      <div class="flex items-center ant-result" style="padding: 48px 32px">
        <div class="ant-result-icon">
          <a href="https://www.xinhsoft.com/plugins/hiprint_win_x64-1.0.11.exe">hiprint_win_x64-1.0.11.exe</a>
        </div>
        <div class="ant-result-icon" style="margin-left: 80px">
          <a href="https://www.xinhsoft.com/plugins/hiprint_win_x32-1.0.11.exe">hiprint_win_x32-1.0.11.exe</a>
        </div>
        <div class="ant-result-icon" style="margin-left: 80px">
          <a href="https://www.xinhsoft.com/plugins/hiprint_mac_x64-1.0.11.dmg">hiprint_mac_x64-1.0.11.dmg</a>
        </div>
        <div class="ant-result-icon" style="margin-left: 80px">
          <a href="https://www.xinhsoft.com/plugins/hiprint_mac_arm64-1.0.11.dmg">hiprint_mac_arm64-1.0.11.dmg</a>
        </div>
      </div>
    </template>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
</script>
