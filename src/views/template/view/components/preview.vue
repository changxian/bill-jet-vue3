<template>
  <div style="overflow: hidden; height: 100%">
    <a-card style="width: 100%; margin-top: 5px; height: 100%; overflow-y: scroll">
      <div id="preview_content_design" :style="previewContentStyle" style="overflow: auto"></div>
    </a-card>
  </div>
</template>

<script>
import { uploadPdfFile } from "/@/api/common/api";
  import { getPrintInfo } from '/@/api/common/api';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createMessage } = useMessage();
  import { useUserStore } from '/@/store/modules/user';
  const userStore = useUserStore();

  import * as vuePluginHiprint from '@/views/template/components';
  import printData from '../print-data';
  import { roil } from '@/views/template/view/index.api';

  let hiprint, defaultElementTypeProvider;

  export default {
    name: 'PrintView',
    components: {},
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
    computed: {},
    watch: {},
    created() {},
    mounted() {
      window.autoConnect = false;
      this.templateGet();
      this.enableZoom();
    },
    methods: {
      printPdf(printData, params) {
        // 生成blob文件
        this.hTemplate.toPdf(printData, '测试导出pdf', { isDownload: false, type: '' }).then((res) => {
          console.log(res);
          params.file = res;
          params.filename = params.id + '.pdf';

          // 生成pdf文件
          uploadPdfFile(params, function (res) {
            console.log(res);
          });
        });
      },
      // 获取模板数据和打印预览数据
      loadPrintInfo(params) {
        this.printData = printData;
        getPrintInfo(params)
          .then((res) => {
            console.log('预览数据', res);

            this.template = JSON.parse(res.template.data);
            this.printData = res.printData || printData;

            this.init(this.template);
            roil(this.printData['table'], 1);

            this.printPdf(this.printData, params);
            this.show(this.printData, this.template);
          })
          .catch((e) => {
            createMessage.warning(e);
          });
      },
      templateGet() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const templateId = urlParams.get('templateId');
        const category = urlParams.get('category');
        const id = urlParams.get('id');
        const tenantId = urlParams.get('txId');

        userStore.setTenant(tenantId);
        console.log(templateId, '模板id'); // 输出: 123
        console.log(category, '类型（1：送货单，2：进货单'); // 输出: 123
        console.log(id, '业务id'); // 输出: 123

        if (!templateId) {
          return createMessage.warning('模板id不能为空！');
        }

        this.loadPrintInfo({ templateId: templateId, category: category, id: id });
      },
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
      enableZoom() {
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
          viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=yes');
        } else {
          const meta = document.createElement('meta');
          meta.name = 'viewport';
          meta.content = 'width=device-width, initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=yes';
          document.getElementsByTagName('head')[0].appendChild(meta);
        }
      },
    },
  };
</script>

<style lang="less" scoped>
  :deep(.ant-card-body) {
    padding: 0 !important;
  }
  :deep(.hiprint-printPaper) {
    transform: scale(0.42);
    transform-origin: left top 0;
  }
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
