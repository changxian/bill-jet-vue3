<template>
  <a-row :class="['p-4']" :gutter="10" style="overflow: hidden; background-color: rgb(236 236 236); width: 1192px">
    <a-col :xl="6" :lg="8" :md="10" :sm="24" style="flex: 1">
      <a-card :bordered="false" style="height: 100%">
        <left @select="onTreeSelect" @jxcLimit="jxcLimit" :data="data" />
      </a-card>
    </a-col>
    <a-col :xl="18" :lg="16" :md="14" :sm="24" style="flex: 1" class="goods-tbl-wrap">
      <preview ref="preView" />
    </a-col>
  </a-row>
</template>

<script defer>
  import '../../public/css/bootstrap.min.css';
  import '../../public/css/print-lock.css';
  import printData from '@/views/template/view/print-data';
  import { getTemplateData, roil } from '@/views/template/view/components/index.api';
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
        tempData: undefined,
        data: {
          templateList: [],
          templateId: '',
          printData: {},
          find: {},
        },
        form: {
          id: '',
          category: '',
        },
      };
    },
    watch: {
      formData: {
        handler: async function (newVal, oldVal) {
          // 从开单进来 传 id, category
          this.form.id = newVal.id;
          this.form.category = newVal.category;

          // 从设置那里进来如何操作
          // 从设置进来 只传 templateId, 可能为空
          this.form.templateId = newVal.templateId;

          // 获取模板信息 和 获取打印预览的数据信息
          this.data = await getTemplateData(this.form);

          // 处理预览数据
          {
            // 未设置模板时 或在模板列表中找不到模板信息，则选择第一个模板来预览
            if ('' === this.data.templateId || null == (this.data.find = this.data.templateList.find((item) => item.id === this.data.templateId))) {
              this.data.find = this.data.templateList[0];
            }
            if (!this.form.id) {
              // 从设置进来,用测试数据渲染表单
              this.data.printData = printData;
            }

            this.tempData = this.data.find.data;
            if ('string' == typeof this.tempData) {
              this.tempData = JSON.parse(this.tempData);
            }
          }

          // 处理表格信息：多个表的列名不同，但取值为同一属性，对这些数据进行处理。多属性配置在 roil.config.ts 中
          roil(this.data.printData['table'], 1);
          // 初始化打印预览插件
          await this.init();
          // 渲染打印表单
          this.preView();
        },
        immediate: true, // 立即执行
      },
    },
    mounted() {
      // this.preView();
    },
    methods: {
      async init() {
        hiprint = vuePluginHiprint.hiprint;
        defaultElementTypeProvider = vuePluginHiprint.defaultElementTypeProvider;

        hiprint.init({
          providers: [new defaultElementTypeProvider()],
          lang: 'cn',
        });
        // 还原配置
        hiprint.setConfig();
        let panels = {
          // ...this.formData,
          ...this.tempData,
        };

        this.template = hiprintTemplate = new hiprint.PrintTemplate({
          template: panels,
        });
      },
      preView() {
        // this.$refs.preView.show(hiprintTemplate, this.formData.data);
        this.$refs.preView.show(hiprintTemplate, this.data.printData, this.data.templateId);
      },
      jxcLimit(v, templateId) {
        this.$refs.preView.handleChange(v, templateId);
      },
      onTreeSelect(o) {
        console.info('onTreeSelect---------------');
        console.info(o);
        if (o['data']) {
          this.tempData = JSON.parse(o['data']);
          this.init();
          this.preView();
        }
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

<style lang="less" scoped>
  :where(.css-dev-only-do-not-override-1hajlzy).ant-card .ant-card-body {
    padding: 2px;
    border-radius: 0 0 4px 4px;
  }
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
