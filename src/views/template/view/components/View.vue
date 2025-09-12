<template>
  <div style="overflow: hidden; height: 750px">
    <!--查询区域-->
    <div class="jcx-card">
      <a-button type="primary" style="margin-left: 15px" preIcon="ant-design:printer-outlined" @click="print">打印</a-button>
      <a-button type="primary" style="margin-left: 15px" preIcon="ant-design:printer-outlined" @click="printPdf('pdfobjectnewwindow')">导出PDF打印</a-button>
      <a-button type="primary" style="margin-left: 15px" preIcon="ant-design:setting-filled" @click="setting(1)">设为销售模板</a-button>
      <a-button type="primary" style="margin-left: 15px" preIcon="ant-design:setting-filled" @click="setting(2)">设为销售退货模板</a-button>
      <a-button type="primary" style="margin-left: 15px; margin-right: 15px" preIcon="ant-design:export-outlined" @click="onExport"
        >导出模板</a-button
      >
      <j-upload-button type="primary" preIcon="ant-design:import-outlined" @click="billInportXls">导入模板</j-upload-button>
      <a-button type="primary" style="margin-left: 15px" preIcon="ant-design:minus-outlined" @click="changeScale(false)">缩小</a-button>
      <a-button type="primary" style="margin-left: 15px; margin-top: 5px" preIcon="ant-design:plus-outlined" @click="changeScale(true)">放大</a-button>
      <!--<a-button type="primary" style="margin-left: 10px" preIcon="ant-design:setting-twotone" @click="setPaper">设置</a-button>-->
    </div>
    <a-card style="width: 100%; margin-top: 5px; height: 730px; overflow-y: scroll">
      <div id="preview_content_design" :style="previewContentStyle" style="overflow: auto"></div>
    </a-card>
  </div>
</template>

<script>
  import { printLimit } from '../index.api';
  import { selectiveSaveOrUpdatePrint, getBillExportUrl, getImportUrl } from '@/views/setting/system/index.api';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { useMessage } from '/@/hooks/web/useMessage';
  import JUploadButton from '@/components/Button/src/JUploadButton.vue';
  const { createMessage } = useMessage();
  import { useUserStore } from '/@/store/modules/user';
  const userStore = useUserStore();

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
        previewContentStyle: {},
        hiprintTemplate: null,
        printData: null,
        limitData: null,
        value: '',
        // 渲染的模板
        template: {},
        // 导出
        billExportXls: undefined,
        // 导入
        billInportXls: undefined,
        // 缩放
        scaleValue: 1,
        scaleMax: 1.5,
        scaleMin: 0.5,
      };
    },
    computed: {
      printSettings() {
        return {
          ...this.printSetting,
        };
      },
    },
    watch: {},
    created() {
      const { onImportXls, onBillExportXls } = useListPage({
        billExportConfig: {
          name: '导出为预览的模板',
          url: getBillExportUrl,
          params: {},
        },
        importConfig: {
          url: getImportUrl,
        },
      });
      this.billExportXls = onBillExportXls;
      this.billInportXls = onImportXls;
    },
    mounted() {},
    methods: {
      handleChange(value) {
        // 左侧打印限制的逻辑
        console.log(value);
        this.limitData = JSON.parse(JSON.stringify(this.printData));
        printLimit(value.value, this.limitData);
        this.show(this.hiprintTemplate, this.limitData, this.template, false);
      },
      hideModal() {
        this.visible = false;
      },
      show(hiprintTemplate, printData, template, bool = true) {
        this.template = {
          ...template,
        };
        if (bool) {
          this.printData = printData;
          this.hiprintTemplate = hiprintTemplate;
        }

        setTimeout(() => {
          const html = hiprintTemplate.getHtml(printData);
          document.getElementById('preview_content_design').innerHTML = html[0].innerHTML;
        }, 10);
      },
      setting(category) {
        let n = 1 === category ? 'deliveryBillTemp' : 'deliveryReturnTemp';

        let obj = {
          category: category,
          ...this.printSetting,
        };
        obj[n] = this.template.name;
        obj[n + 'Id'] = this.template.id;

        selectiveSaveOrUpdatePrint(obj).then((res) => {
          if (res.success) {
            createMessage.success(res.message);
            this.$emit('setting', this.template, n);
          } else {
            createMessage.warning(res.message);
          }
        });
      },
      setPaper() {
        let ht = this.hiprintTemplate;
        console.info(ht);
      },
      changeScale(big) {
        let scaleValue = this.scaleValue;
        if (big) {
          scaleValue += 0.1;
          if (scaleValue > this.scaleMax) scaleValue = this.scaleMax;
        } else {
          scaleValue -= 0.1;
          if (scaleValue < this.scaleMin) scaleValue = this.scaleMin;
        }
        this.previewContentStyle = {
          transform: 'scale(' + scaleValue + ')',
        };
        this.scaleValue = scaleValue;
      },
      printPdf(type) {
        this.hiprintTemplate.toPdf(this.printData, '导出pdf', { isDownload: false, type: type }).then((res) => {
          console.log('type:', type);
          console.log(res);
        });
      },
      print() {
        this.doOperationWhenClientConnected(() => {
          const printerList = this.hiprintTemplate.getPrinterList();
          console.log(printerList);

          let printer,
            printSetting = userStore.getPrintSetting;

          if (null != printSetting) {
            printer = printSetting.printer;
          }

          this.hiprintTemplate.print2(this.printData, {
            printer: {
              name: printer || '',
            },
            title: 'print打印',
          });
        });
        //
        // this.waitShowPrinter = true;
        // this.hiprintTemplate.print(
        //   this.printData,
        //   {},
        //   {
        //     callback: () => {
        //       console.log('callback');
        //       this.waitShowPrinter = false;
        //     },
        //   }
        // );
      },
      doOperationWhenClientConnected(operation) {
        if (window['hiwebSocket'] && window['hiwebSocket'].opened) {
          operation?.();
          return;
        }
        createMessage.error({
          content: '请先安装连接打印客户端。（下载位置：信息分享->打印客户端，选择电脑对应的文件下载）',
          duration: 20,
        });
      },
      toPdf() {
        this.hiprintTemplate.toPdf(this.printData, '打印预览');
      },
      onExport() {
        // 传选中的模板id
        this.billExportXls(this.template.id);
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
