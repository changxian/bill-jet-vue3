<template>
  <div style="overflow: hidden; height: 750px">
    <a-card style="width: 100%; margin-top: 5px; height: 730px; overflow-y: scroll">
      <div id="preview_content_design" :style="previewContentStyle" style="overflow: auto"></div>
    </a-card>
  </div>
</template>

<script>
import { printLimit } from '../index.api';
import { useMessage } from '/@/hooks/web/useMessage';
import JUploadButton from '@/components/Button/src/JUploadButton.vue';
const { createMessage } = useMessage();

import * as vuePluginHiprint from '@/views/template/components';
import tempData from '../temp-data';
import printData from '../print-data';

let hiprint, defaultElementTypeProvider;

export default {
  name: 'PrintView',
  components: { JUploadButton },
  props: {
    printSetting: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['setting'],
  data() {
    return {
      previewContentStyle: {}, // 放大缩小样式
      hTemplate: null,
      printData: null,
      // 渲染的模板
      template: {},
    };
  },
  computed: {
  },
  watch: {},
  created() {
  },
  mounted() {
    this.init(tempData);
    this.show(printData, tempData);
  },
  methods: {
    init(_tempData) {
      hiprint = vuePluginHiprint.hiprint;
      defaultElementTypeProvider = vuePluginHiprint.defaultElementTypeProvider;

      hiprint.init({
        providers: [new defaultElementTypeProvider()],
        lang: 'cn',
      });
      // 还原配置
      hiprint.setConfig();
      let panels = {
        ..._tempData,
      };

      this.hTemplate = new hiprint.PrintTemplate({
        template: panels,
      });
    },
    show(printData, template, bool = true) {
      this.template = {
        ...template,
      };
      if (bool) {
        this.printData = printData;
      }

      setTimeout(() => {
        const html = this.hTemplate.getHtml(printData);
        document.getElementById('preview_content_design').innerHTML = html[0].innerHTML;
      }, 10);
    },
  },
};
</script>

<style lang="less" scoped>
.jcx-card {
  box-shadow:
    0 1px 2px 0 rgba(0, 0, 0, 0.03),
    0 1px 6px -1px rgba(0, 0, 0, 0.02),
    0 2px 4px 0 rgba(0, 0, 0, 0.02);
  box-sizing: border-box;
  margin: 0;
  padding: 5px;
  color: rgba(51, 51, 51, 0.88);
  font-size: 14px;
  line-height: 1.5714285714285714;
  list-style: none;
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    Segoe UI,
    PingFang SC,
    Hiragino Sans GB,
    Microsoft YaHei,
    Helvetica Neue,
    Helvetica,
    Arial,
    sans-serif,
    Apple Color Emoji,
    Segoe UI Emoji,
    Segoe UI Symbol;
  position: relative;
  background: #ffffff;
  border-radius: 4px;
}
:where(.view-modal-preview).ant-card .ant-card-body {
  padding: 2px;
  border-radius: 0 0 4px 4px;
}
.jeecg-basic-table-form-container {
  padding: 0;
  .table-page-search-submitButtons {
    display: block;
    margin-bottom: 24px;
    white-space: nowrap;
  }
  .query-group-cust {
    min-width: 100px !important;
  }
  .query-group-split-cust {
    width: 30px;
    display: inline-block;
    text-align: center;
  }
  .ant-form-item:not(.ant-form-item-with-help) {
    margin-bottom: 16px;
    height: 32px;
  }
  :deep(.ant-picker),
  :deep(.ant-input-number) {
    width: 100%;
  }
}
</style>
