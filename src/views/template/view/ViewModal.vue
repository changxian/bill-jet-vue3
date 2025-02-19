<template>
  <BasicModal v-bind="$attrs" @register="registerModal" destroyOnClose :title="title" width="1200px" :height="760" @ok="handleSubmit">
    <a-row :class="['p-4']" :gutter="10" style="overflow: hidden; background-color: rgb(236 236 236); width: 1192px">
      <a-col :xl="6" :lg="8" :md="10" :sm="24" style="flex: 1">
        <a-card :bordered="false" style="height: 100%">
          <Left @select="onTreeSelect" @jxcLimit="jxcLimit" :data="data" />
        </a-card>
      </a-col>
      <a-col :xl="18" :lg="16" :md="14" :sm="24" style="flex: 1" class="goods-tbl-wrap">
        <Preview ref="preView" />
      </a-col>
    </a-row>
  </BasicModal>
</template>
<!--
  本模块：
    Modal：用封装表单(BasicForm)的Modal
    Form：用原生表单(a-form)的form，form需要动态添加数据项，用原生表单比较容易扩展
    （这里是尝试结合使用）
    （请单位使用 “封装表单”，或单独使用 “原生表单”）
 -->

<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { getTemplateData, roil } from '@/views/template/view/index.api';
  import printData from '@/views/template/view/print-data';
  import * as vuePluginHiprint from '@/views/template/components';
  import Left from '@/views/template/view/components/Left.vue';
  import Preview from '@/views/template/view/components/View.vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createMessage } = useMessage();

  let hiprint, defaultElementTypeProvider;
  let hiprintTemplate;

  // Emits声明
  const emit = defineEmits(['register', 'success']);
  const isUpdate = ref(false);
  const isDetail = ref(false);
  const preView = ref();
  const template = ref({});

  // index全移到这里来
  const data = ref({
    templateList: [],
    templateId: '',
    printData: {},
    find: undefined,
  });
  const form = ref({
    id: '',
    category: '',
    templateId: '',
    name: '',
  });

  function reset() {
    template.value = {};
  }

  function view() {
    if (null != preView.value) {
      preView.value.show(hiprintTemplate, data.value.printData, data.value.templateId);
    }
  }
  function jxcLimit(v, templateId) {
    if (null != preView.value) {
      preView.value.handleChange(v, templateId);
    }
  }

  async function init(tempData) {
    hiprint = vuePluginHiprint.hiprint;
    defaultElementTypeProvider = vuePluginHiprint.defaultElementTypeProvider;

    hiprint.init({
      providers: [new defaultElementTypeProvider()],
      lang: 'cn',
    });
    // 还原配置
    hiprint.setConfig();
    let panels = {
      ...tempData,
    };

    hiprintTemplate = new hiprint.PrintTemplate({
      template: panels,
    });
  }

  function onTreeSelect(o) {
    template.value = {
      ...o,
    };
    console.info('onTreeSelect---------------');
    console.info(o);
    if (o['data']) {
      let tempData = JSON.parse(o['data']);
      if ('string' == typeof tempData) {
        tempData = JSON.parse(tempData);
      }
      init(tempData);
      view();
    }
  }

  async function run(newVal) {
    let tempData;
    // 从开单进来 传 id, category
    form.value.id = newVal.id;
    form.value.category = newVal.category;

    // 从设置那里进来如何操作
    // 从设置进来 只传 templateId(可能为空) 和 name
    form.value.templateId = newVal.templateId;
    form.value.name = newVal.name;

    // 获取模板信息 和 获取打印预览的数据信息
    data.value = await getTemplateData(form.value);

    // 处理预览数据
    {
      // 未设置模板时 或在模板列表中找不到模板信息，则选择第一个模板来预览
      if (!data.value.templateId || null == (data.value.find = data.value.templateList.find((item) => item['id'] === data.value.templateId))) {
        data.value.find = data.value.templateList[0];
      }
      if (!form.value.id) {
        // 从设置进来,用测试数据渲染表单
        data.value.printData = printData;
      }

      if (data.value.find && data.value.find['data']) {
        tempData = data.value.find['data'];
        if ('string' == typeof tempData) {
          tempData = JSON.parse(tempData);
        }
      }
    }

    // 处理表格信息：多个表的列名不同，但取值为同一属性，对这些数据进行处理。多属性配置在 roil.config.ts 中
    if (data.value.printData['table']) {
      roil(data.value.printData['table'], 1);
      // 初始化打印预览插件
      await init(tempData);
      // 渲染打印表单
      view();
    }
  }

  //表单赋值
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: false, showCancelBtn: !!data?.showFooter, showOkBtn: !!data?.showFooter });
    isDetail.value = !!data?.showFooter;
    isUpdate.value = !!data?.isUpdate;

    reset();
    await run({ ...data.record });
  });
  //设置标题
  const title = computed(() => (!unref(isUpdate) ? '预览' : !unref(isDetail) ? '预览' : '预览'));

  //表单提交事件
  async function handleSubmit() {
    if (null == template.value) {
      return createMessage.warning('请先选择模板');
    }
    emit('success', template.value, form.value.name);
    closeModal();
    // registerForm.value.submitForm();
  }

  /**
   * form保存回调事件
   */
  function selected(o) {
    template.value = o;
    if (!template.value) {
      createMessage.error({
        content: '请选择一个模板！',
        duration: 3,
      });
      return;
    }
    emit('success', template.value, form.value.name);
    closeModal();
  }
</script>

<style lang="less" scoped>
  /** 时间和数字输入框样式 */
  :deep(.ant-input-number) {
    width: 100%;
  }

  :deep(.ant-calendar-picker) {
    width: 100%;
  }
</style>
