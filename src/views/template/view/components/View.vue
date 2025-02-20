<template>
  <div style="overflow: hidden; height: 750px">
    <!--查询区域-->
    <div class="jcx-card">
      <a-button type="primary" style="" preIcon="ant-design:printer-outlined">打印</a-button>
      <a-button type="primary" style="margin-left: 10px;" preIcon="ant-design:setting-filled" @click="setting(1, 1)">设为送货模板</a-button>
      <a-button type="primary" style="margin-left: 10px;" preIcon="ant-design:setting-filled" @click="setting(1, 2)">设为退货模板</a-button>
      <a-button type="primary" style="margin-left: 10px;" preIcon="ant-design:export-outlined">导出模板</a-button>
      <a-button type="primary" style="margin-left: 10px;" preIcon="ant-design:import-outlined">导入模板</a-button>
      <a-button type="primary" style="margin-left: 10px;" preIcon="ant-design:setting-twotone">设置</a-button>
    </div>
    <a-card style="width: 100%; margin-top: 5px; height: 730px; overflow-y: scroll">
      <div id="preview_content_design"></div>
    </a-card>
  </div>
</template>

<script>
  import { printLimit } from '../index.api';

  export default {
    name: 'PrintPreview',
    props: {},
    data() {
      return {
        hiprintTemplate: null,
        printData: null,
        limitData: null,
        value: '',
        templateId: '',
      };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      handleChange(value, templateId) {
        // 左侧打印限制的逻辑
        console.log(value);
        this.limitData = JSON.parse(JSON.stringify(this.printData));
        printLimit(value.value, this.limitData);
        this.show(this.hiprintTemplate, this.limitData, templateId, false);
      },
      hideModal() {
        this.visible = false;
      },
      show(hiprintTemplate, printData, templateId, bool = true) {
        console.log('show-templateId:' + templateId);
        this.templateId = templateId;
        if (bool) {
          this.printData = printData;
          this.hiprintTemplate = hiprintTemplate;
        }

        setTimeout(() => {
          const html = hiprintTemplate.getHtml(printData);
          document.getElementById('preview_content_design').innerHTML = html[0].innerHTML;
        }, 10);
      },
      setting(type, category) {
        return;
      },
      print() {
        this.waitShowPrinter = true;
        this.hiprintTemplate.print(
          this.printData,
          {},
          {
            callback: () => {
              console.log('callback');
              this.waitShowPrinter = false;
            },
          }
        );
      },
      toPdf() {
        this.hiprintTemplate.toPdf({}, '打印预览');
      },
    },
  };
</script>

<style lang="less" scoped>
  .jcx-card {
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
    box-sizing: border-box;
    margin: 0;
    padding: 5px;
    color: rgba(51, 51, 51, 0.88);
    font-size: 14px;
    line-height: 1.5714285714285714;
    list-style: none;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
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
