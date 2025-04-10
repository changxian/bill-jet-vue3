<template>
  <PageWrapper title="打印客户端">
    <template #headerContent>
      <div class="flex justify-between items-center">
        <div class="ant-result-title">请下载电脑的操作系统对应的文件进行安装（只安装一次）。</div>
      </div>
      <div class="flex items-center ant-result" style="padding: 48px 32px">
        <div class="ant-result-icon">
          <a href="https://www.xinhsoft.com/plugins/hiprint_win_x64-1.0.11.exe">Windows系统64位（hiprint_win_x64-1.0.11.exe）</a>
        </div>
        <div class="ant-result-icon" style="margin-left: 80px">
          <a href="https://www.xinhsoft.com/plugins/hiprint_win_x32-1.0.11.exe">Windows系统32位（hiprint_win_x32-1.0.11.exe）</a>
        </div>
        <div class="ant-result-icon" style="margin-left: 80px">
          <a href="https://www.xinhsoft.com/plugins/hiprint_mac_arm64-1.0.11.dmg">苹果系统_苹果处理器（ hiprint_mac_arm64-1.0.11.dmg）</a>
        </div>
        <div class="ant-result-icon" style="margin-left: 80px">
          <a href="https://www.xinhsoft.com/plugins/hiprint_mac_x64-1.0.11.dmg">苹果系统_英特尔处理器（hiprint_mac_x64-1.0.11.dmg）</a>
        </div>
      </div>
    </template>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
</script>
