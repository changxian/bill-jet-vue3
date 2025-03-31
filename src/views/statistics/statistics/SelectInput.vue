<template>
  <div class="main">
    <AutoComplete
      style="width: 100%"
      :value="modelValue"
      :options="options"
      @focus="queryFn"
      placeholder="请输入"
      @select="onSelect"/>
  </div>
</template>
<script lang="ts" setup>
  import { AutoComplete } from 'ant-design-vue';
  import { defineEmits, defineProps, ref } from 'vue';
  import { listAll } from '@/views/setting/quickinfo/QuickInfo.api';

  const props = defineProps({
    modelValue: {
      type: String,
      default: '',
    },
  });
  const emits = defineEmits(['update:modelValue']);

  // const queryValue = ref('');
  const options = ref<any>([]);
  async function queryFn() {
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

  function onSelect(value) {
    console.log('查询参数value: ', value);
    emits('update:modelValue', value);
  }
</script>
