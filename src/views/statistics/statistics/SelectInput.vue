<template>
  <div class="main">
    <AutoComplete
      style="width: 100%"
      :value="modelValue"
      :options="options"
      @search="onSelect"
      placeholder="请输入"
      @select="onSelect"/>
  </div>
</template>
<script lang="ts" setup>
  import { AutoComplete } from 'ant-design-vue';
  import { defineEmits, defineProps, ref } from 'vue';
  import { listAll } from '@/views/setting/quickinfo/QuickInfo.api';
  import { useUserStore } from '@/store/modules/user';

  const props = defineProps({
    modelValue: {
      type: String,
      default: '',
    },
  });
  const emits = defineEmits(['update:modelValue']);

  const userStore = useUserStore();
  // 系统开单设置
  const systemSetting = userStore.getSystemSetting;
  const noQuickInfoPrompts = ref(false);
  if (systemSetting) {
    noQuickInfoPrompts.value = !!systemSetting.noQuickInfoPrompts;
  }
  // const queryValue = ref('');
  const options = ref<any>([]);
  function onSearch() {
    if (noQuickInfoPrompts.value !== true) {
      // 启用快捷信息提示
      listAll().then((res) => {
        options.value = [];
        console.log('res', res);
        res.forEach((item) => {
          options.value.push({
            value: item.info,
            text: item.info,
          });
        });
      });
    }
  }
  onSearch();
  function onSelect(value) {
    console.log('查询参数value: ', value);
    emits('update:modelValue', value);
  }
</script>
