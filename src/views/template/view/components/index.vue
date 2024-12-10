<template>
  <a-row :class="['p-4']" :gutter="10">
    <a-col :xl="6" :lg="8" :md="10" :sm="24" style="flex: 1">
      <a-card :bordered="false" style="height: 100%; overflow: auto">
        <left :id="form.id" />
<!--        <Left @select="onTreeSelect" :id="formData.id" />-->
      </a-card>
    </a-col>
    <a-col :xl="18" :lg="16" :md="14" :sm="24" style="flex: 1" class="goods-tbl-wrap">
      <a-card :bordered="false" style="height: 100%">
        <preview ref="preView" />
      </a-card>
    </a-col>
  </a-row>
</template>

<script defer>
  import '../../public/css/bootstrap.min.css';
  import '../../public/css/print-lock.css';
  import tempData from '../temp-data';
  import printData from '../print-data';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createMessage } = useMessage();

  import * as vuePluginHiprint from '../../components/index.js';
  import left from './Left.vue';
  import preview from './View.vue';
  var hiprint, defaultElementTypeProvider;
  let hiprintTemplate;

  export default {
    name: 'TemplatePreView',
    components: { left, preview },
    props: {
      formData: {
        type: Object,
        default: () => {
          return {
            id: null,
            template: null,
            data: null,
          };
        },
      },
    },
    data() {
      return {
        template: null,
        form: {
          id: '',
        },
      };
    },
    watch: {
      formData: {
        handler: function (newVal, oldVal) {
          debugger;
          console.info(newVal);
          console.log(oldVal);
          this.form.id = newVal.id;
        },
        immediate: true, // 立即执行
      },
    },
    emits: ['ok'],
    computed: {
      curPaperType() {
        let type = 'other';
        let types = this.paperTypes;
        for (const key in types) {
          let item = types[key];
          let { width, height } = this.curPaper;
          if (item.width === width && item.height === height) {
            type = key;
          }
        }
        return type;
      },
    },
    mounted() {
      hiprint = vuePluginHiprint.hiprint;
      defaultElementTypeProvider = vuePluginHiprint.defaultElementTypeProvider;
      this.init();
      this.preView();
    },
    methods: {
      init() {
        hiprint.init({
          providers: [new defaultElementTypeProvider()],
          lang: 'cn',
        });
        // 还原配置
        hiprint.setConfig();

        let panels = {
          // ...this.formData,
          ...tempData,
        };
        this.template = hiprintTemplate = new hiprint.PrintTemplate({
          template: panels,
          // 图片选择功能
          onImageChooseClick: (target) => {
            // 测试 3秒后修改图片地址值
            setTimeout(() => {
              target.refresh(
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAtAAAAIIAQMAAAB99EudAAAABlBMVEUmf8vG2O41LStnAAABD0lEQVR42u3XQQqCQBSAYcWFS4/QUTpaHa2jdISWLUJjjMpclJoPGvq+1WsYfiJCZ4oCAAAAAAAAAAAAAAAAAHin6pL9c6H/fOzHbRrP0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0u/SY9LS0tLS0tLS0tLS0n+edm+UlpaWlpaWlpaWlpaW/tl0Ndyzbno7/+tPTJdd1wal69dNa6abx+Lq6TSeYtK7BX/Diek0XULSZZrakPRtV0i6Hu/KIt30q4fM0pvBqvR9mvsQkZaW9gyJT+f5lsnzjR54xAk8mAUeJyMPwYFH98ALx5Jr0kRLLndT7b64UX9QR/0eAAAAAAAAAAAAAAAAAAD/4gpryzr/bja4QgAAAABJRU5ErkJggg==',
                {
                  real: true, // 根据图片实际尺寸调整(转pt)
                }
              );
            }, 1000);
          },
        });
      },
      preView() {
        // this.$refs.preView.show(hiprintTemplate, this.formData.data);
        this.$refs.preView.show(hiprintTemplate, printData);
      },
      print() {
        this.doOperationWhenClientConnected(() => {
          const printerList = hiprintTemplate.getPrinterList();
          console.log(printerList);
          hiprintTemplate.print2(printData, { printer: '', title: 'hiprint测试打印' });
        });
      },
      doOperationWhenClientConnected(operation) {
        if (window['hiwebSocket'] && window['hiwebSocket'].opened) {
          operation?.();
          return;
        }
        createMessage.error({
          content: '客户端未连接',
          duration: 2,
        });
      },
    },
  };
</script>

<style lang="less">
  @import 'index.less';
  .goods-tbl-wrap {
    .ant-row {
      width: 100% !important;
    }
    .ant-col {
      max-width: 100% !important;
    }
  }
</style>
