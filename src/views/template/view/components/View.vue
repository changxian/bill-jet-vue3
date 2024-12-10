<template>
  <div class="p-2">
    <!--查询区域-->
    <div>
      <a-card style="width: 100%">
        <p>控制区域</p>
        <p>Card content</p>
        <p>Card content</p>
      </a-card>
    </div>
    <!-- 预览 -->
    <div style="width: 100%; padding-top: 5px;">
      <a-card style="width: 100%">
        <div id="preview_content_design" style="width: 100%"></div>
      </a-card>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PrintPreview',
    props: {},
    data() {
      return {};
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      hideModal() {
        this.visible = false;
      },
      show(hiprintTemplate, printData) {
        setTimeout(() => {
          debugger;
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
