<template>
  <div style="overflow: hidden; height: 740px">
    <!--查询区域-->
    <div class="jcx-card">
      <a-button type="primary" style="">打印</a-button>
      <a-button type="primary" style="margin-left: 10px;">设置为送货模板</a-button>
      <a-button type="primary" style="margin-left: 10px;">设置为退货模板</a-button>
      <a-button type="primary" style="margin-left: 10px;">导出模板</a-button>
      <a-button type="primary" style="margin-left: 10px;">导入模板</a-button>
      <a-button type="primary" style="margin-left: 10px;">设置</a-button>
    </div>
    <!--<a-card style="width: 100%; height: 60px;" class="view-modal-preview">-->
    <!--  <a-button type="primary" style=" position: relative; top: -10px;">打印</a-button>-->
    <!--  <a-button type="primary" style="margin-left: 10px; position: relative; top: -10px;">设置为送货模板</a-button>-->
    <!--  <a-button type="primary" style="margin-left: 10px; position: relative; top: -10px;">设置为退货模板</a-button>-->
    <!--  <a-button type="primary" style="margin-left: 10px; position: relative; top: -10px;">导出模板</a-button>-->
    <!--  <a-button type="primary" style="margin-left: 10px; position: relative; top: -10px;">导入模板</a-button>-->
    <!--  <a-button type="primary" style="margin-left: 10px; position: relative; top: -10px;">设置</a-button>-->
    <!--</a-card>-->
    <!-- 预览 -->
    <a-card style="width: 100%; margin-top: 5px; height: 680px; overflow-y: scroll">
      <div id="preview_content_design"></div>
    </a-card>
  </div>
</template>

<script>
  import { printLimit } from './index.api';

  export default {
    name: 'PrintPreview',
    props: {},
    data() {
      return {
        hiprintTemplate: null,
        printData: null,
        limitData: null,
        value: '',
        options: [
          {
            value: '1',
            label: '正常',
          },
          {
            value: '2',
            label: '空白',
          },
          {
            value: '3',
            label: '无单价、金额',
          },
          {
            value: '4',
            label: '无单价、数量、金额',
          },
        ],
      };
    },
    computed: {},
    watch: {},
    created() {
      this.value = this.options[0];
    },
    mounted() {},
    methods: {
      handleChange(value) {
        console.log(value);
        this.limitData = JSON.parse(JSON.stringify(this.printData));
        printLimit(value.value, this.limitData);
        this.show(this.hiprintTemplate, this.limitData, false);
      },
      hideModal() {
        this.visible = false;
      },
      show(hiprintTemplate, printData, bool = true) {
        if (bool) {
          this.printData = printData;
          this.hiprintTemplate = hiprintTemplate;
        }

        setTimeout(() => {
          const html = hiprintTemplate.getHtml(printData);
          document.getElementById('preview_content_design').innerHTML = html[0].innerHTML;
        }, 500);
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
