<template>
  <a-divider orientation="left"> 数据备份 </a-divider>
  <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol" name="DataBackupForm">
    <a-row>
      <a-col :span="8">
        <a-form-item label="备份路径：" v-bind="validateInfos.backPath" id="DataBackupForm-backPath" name="backPath">
          <a-input v-model:value="formData.backPath" style="width: 100%" class="underLine-text" placeholder="请选择备份路径" />
        </a-form-item>
      </a-col>
      <a-col :span="10">
        <a-button type="primary" :icon="h(SearchOutlined)" @click="readDir">选路径</a-button>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="8">
        <a-form-item label="备份周期：" v-bind="validateInfos.backCycle" id="DataBackupForm-backCycle" name="backCycle">
          <j-dict-select-tag v-model:value="formData.backCycle" dictCode="" :options="backCycleOptions" placeholder="请选择备份周期" />
        </a-form-item>
      </a-col>
      <a-col :span="10">
        <a-form-item label="循环备份文件数：" v-bind="validateInfos.backFilesNum" id="DataBackupForm-backFilesNum" name="backFilesNum">
          <j-dict-select-tag v-model:value="formData.backFilesNum" dictCode="" :options="backFilesNumOptions" placeholder="循环备份文件数" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row style="margin-bottom: 120px">
      <a-col :span="24">
        <a-form-item :wrapper-col="{ offset: 1, span: 4 }">
          <a-button type="primary" style="margin-left: 20px" @click="">备份</a-button>
          <a-button type="primary" style="margin-left: 20px" @click="">恢复</a-button>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script lang="ts" setup>
  import { ref, defineExpose, defineProps, h } from 'vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  import { getDataBackupParam, saveDataBackup, execDataBackup, execDataRestore } from '../index.api';
  import { Form } from 'ant-design-vue';
  import { SearchOutlined } from '@ant-design/icons-vue';

  const props = defineProps({
    formDisabled: { type: Boolean, default: false },
    formBpm: { type: Boolean, default: true },
  });
  const formRef = ref();

  const formData = ref<Record<any>>({});
  function init(){
  }
  init();
  const useForm = Form.useForm;
  const emit = defineEmits(['register', 'ok']);
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  const { validate, validateInfos } = useForm(formData, { immediate: false });

  const backCycleOptions = ref([
    { value: 1, label: '1天一次' },
    { value: 2, label: '2天一次' },
    { value: 3, label: '3天一次' },
  ]);
  const backFilesNumOptions = ref([
    { value: 1, label: '1' },
    { value: 3, label: '3' },
    { value: 5, label: '5' },
  ]);

  function readDir() {
    var savePath;
    var objSrc = new ActiveXObject('Shell.Application').BrowserForFolder(0, '请选择数据库备份路径：', 0);
    if(objSrc != null) {
      savePath = objSrc.Self.path;
      formData.backFilesNum = objSrc.Self.backFilesNum;
    }
  }

  defineExpose({
    readDir,
    formData,
  });
</script>

<style lang="less" scoped>
  .antd-modal-form {
    padding: 14px;
  }
  .underLine-label{
    width: 25%;
    text-align: right;
    display: inline-block;
  }
  .underLine-text {
    border: none; /* 移除默认边框 */
    border-bottom: 1px solid #bdacac; /* 设置下划线 */
    outline: none; /* 移除点击输入框时的默认轮廓 */
    margin-left: 10px;
    width: 60%;
  }
</style>
