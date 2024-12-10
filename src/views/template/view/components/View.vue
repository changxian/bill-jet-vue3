<template>
  <div class="p-2" style="overflow: hidden">
    <!--查询区域-->
    <a-card style="width: 100%">
      <p>控制区域</p>
    </a-card>
    <!-- 预览 -->
    <a-card style="width: 100%; margin-top: 5px ">
      <div id="preview_content_design" style="overflow-y: scroll"></div>
    </a-card>
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
