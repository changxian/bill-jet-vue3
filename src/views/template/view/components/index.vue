<template>
  <a-row :class="['p-4']" :gutter="10" style="overflow: hidden; background-color: rgb(236 236 236); width: 1192px">
    <a-col :xl="6" :lg="8" :md="10" :sm="24" style="flex: 1">
      <a-card :bordered="false" style="height: 100%">
        <left @select="onTreeSelect" @jxcLimit="jxcLimit" :templateId="form.templateId" :templateList="data.templateList" />
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
  import tempData from '../temp-data';
  // import printData from '../print-data';
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
          templateId: undefined,
          printData: {},
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
          console.info(newVal);
          console.log('------分隔线------');
          console.info(oldVal);
          this.form.id = newVal.id;
          this.form.templateId = newVal.templateId;
          this.form.category = newVal.category;

          // TODO 从设置那里进来如何操作，？？？？

          // 获取模板信息 和 获取打印预览的数据信息
          this.data = await getTemplateData(this.form);
          // 未设置模板时，则选择第一个模板

          const tmpList = this.data.templateList;
          let find;
          if ('' === this.data.templateId || null == (find = tmpList.find((item) => (item.id = this.data.templateId)))) {
            // 未设置模板，或模板列表中不存在该模板，取第一个模板
            const tmp = this.data.templateList[0];
            this.form.templateId = this.data.templateId = tmp.id;
            this.tempData = tmp.data;
          } else {
            this.tempData = find.data;
          }
          this.tempData = find.data;

          roil(this.data.printData['table'], 1);
          this.preView();
        },
        immediate: true, // 立即执行
      },
    },
    mounted() {
      hiprint = vuePluginHiprint.hiprint;
      defaultElementTypeProvider = vuePluginHiprint.defaultElementTypeProvider;
      this.template = {
        ...tempData,
      };
      this.init();
      // this.preView();
    },
    methods: {
      async init() {
        hiprint.init({
          providers: [new defaultElementTypeProvider()],
          lang: 'cn',
        });
        // 还原配置
        hiprint.setConfig();
        let panels = {
          // ...this.formData,
          ...this.template,
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
        console.info(o);
        if (o['data']) {
          this.template = JSON.parse(o['data']);
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
