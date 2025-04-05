<template>
  <BasicModal v-bind="$attrs" @register="registerModal" destroyOnClose :title="title" width="1200px" :height="790" @ok="handleSubmit">
    <a-row :class="['p-4']" :gutter="10" style="overflow: hidden; background-color: rgb(236 236 236); width: 1192px">
      <a-col :xl="6" :lg="8" :md="10" :sm="24" style="flex: 1">
        <a-card :bordered="false" style="height: 100%">
          <Left @select="onTreeSelect" @jxcLimit="jxcLimit" :data="data" />
        </a-card>
      </a-col>
      <a-col :xl="18" :lg="16" :md="14" :sm="24" style="flex: 1" class="goods-tbl-wrap">
        <Preview ref="preView" :printSetting="data.printSetting" @setting="setting" @paperConfig="paperConfig"/>
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
  // 中间表格预览对象
  const preView = ref();
  // 当前使用该模板渲染表格 /左侧模板列表选中时传过来的模板数据
  const curTemplate = ref({});

  // index全移到这里来
  const data = ref({
    // 左侧的模板列表信息
    templateList: [],
    // 预览的模板id
    templateId: '',
    // 打印预览的数据信息
    printData: {},
    // 打印设置信息
    printSetting: {},
  });

  // 页面跳传过来的数据信息
  const form = ref({
    // 开单页面跳转只传且必传以下两个
    id: '',
    category: '',
    // 参数设置跳转只传且必传以下两个 templateId可能为空
    templateId: '',
    name: '',
  });

  function reset() {
    curTemplate.value = {};
  }

  function view() {
    if (null != preView.value) {
      preView.value.show(hiprintTemplate, data.value.printData, curTemplate.value);
    }
  }

  // 左侧限制打印的配置信息回调，并调预览窗口，处理数据渲染
  function jxcLimit(v) {
    if (null != preView.value) {
      preView.value.handleChange(v);
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

  function paperConfig(config) {

  }

  function onTreeSelect(o) {
    curTemplate.value = {
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
    const loadData = await getTemplateData(form.value);
    data.value = {
      ...loadData,
    };

    // 处理预览数据
    {
      // 通过 data.vlaue.templateId 从templateList 找模板数据，若找不到则取第一个来渲染预览表格
      let _find;
      // 未设置模板时 或在模板列表中找不到模板信息，则选择第一个模板来预览
      if (!data.value.templateId || null == (_find = data.value.templateList.find((item) => item['id'] === data.value.templateId))) {
        _find = data.value.templateList[0];
      }
      if (!form.value.id) {
        // 从设置进来,用测试数据渲染表单
        data.value.printData = printData;
      }

      if (_find && _find['data']) {
        tempData = _find['data'];
        if ('string' == typeof tempData) {
          tempData = JSON.parse(tempData);
        }
      }

      curTemplate.value = {
        ..._find,
      };
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

  // 表单提交事件
  async function handleSubmit() {
    if (null == curTemplate.value) {
      return createMessage.warning('请先选择模板');
    }
    emit('success', curTemplate.value, form.value.name);
    closeModal();
    // registerForm.value.submitForm();
  }

  // 设置为送单模板/设置为销售退货单模板
  async function setting(d, name) {
    emit('success', d, name);
    closeModal();
    // registerForm.value.submitForm();
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
