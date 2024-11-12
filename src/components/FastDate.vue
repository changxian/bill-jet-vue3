<template>
  <a-col :lg="6" :md="8" :sm="12">
    <a-form-item name="type" label="快速日期">
      <a-select v-model:value="queryParam.type" style="width: 100%" placeholder="请选择" :options="options" @change="handleChange" allowClear></a-select>
    </a-form-item>
  </a-col>
  <a-col :lg="6">
    <a-form-item name="date" label="日期">
      <a-range-picker value-format="YYYY-MM-DD" v-model:value="queryParam.date" @change="changeDate" />
    </a-form-item>
  </a-col>
</template>

<script lang="ts" setup>
  import { ref, reactive, defineEmits, defineProps, watch, computed } from 'vue';
  import dayjs from 'dayjs';
  import { string } from 'vue-types';

  const props = defineProps({
    modelValue: {
      type: Object,
      default: { startDate: '', endDate: '' },
    },
    startDateKey: {
      type: string,
      default: 'startDate',
    },
    endDateKey: {
      type: string,
      default: 'endDate',
    },
    fastDateType: {
      type: String,
      default: '',
    },
  });
  // 快速日期默认选项
  // const fastDateType = computed(() => {
  //   if (props.fastDateType != '') {
  //     return props.fastDateType;
  //   }
  // });
  const emits = defineEmits(['update:modelValue', 'update']);
  const queryParam = reactive<any>({
    date: [props.modelValue[props.startDateKey], props.modelValue[props.endDateKey]],
  });
  const dateOptions = [
    { label: '今天', value: 'today' },
    { label: '昨天', value: 'yesterday' },
    { label: '前天', value: 'beforeYesterday' },
    { label: '最近三天', value: 'day3' },
    { label: '本月', value: 'month' },
    { label: '上月', value: 'lastMonth' },
    { label: '最近三月', value: 'month3' },
    { label: '最近六月', value: 'month6' },
  ];
  const options = ref(dateOptions);

  function handleDate(val) {
    const obj = {
      today: function () {
        const s = dayjs().format('YYYY-MM-DD');
        return [s, s];
      },
      yesterday: function () {
        const s = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
        return [s, s];
      },
      beforeYesterday: function () {
        const s = dayjs().subtract(2, 'day').format('YYYY-MM-DD');
        return [s, s];
      },
      day3: function () {
        const s = dayjs().subtract(2, 'day').format('YYYY-MM-DD');
        const d = dayjs().format('YYYY-MM-DD');
        return [s, d];
      },
      month: function () {
        const s = dayjs().startOf('month').format('YYYY-MM-DD');
        const d = dayjs().endOf('month').format('YYYY-MM-DD');
        return [s, d];
      },
      month3: function () {
        const s = dayjs().startOf('month').subtract(2, 'month').format('YYYY-MM-DD');
        const d = dayjs().endOf('month').format('YYYY-MM-DD');
        return [s, d];
      },
      month6: function () {
        const s = dayjs().startOf('month').subtract(5, 'month').format('YYYY-MM-DD');
        const d = dayjs().endOf('month').format('YYYY-MM-DD');
        return [s, d];
      },
      lastMonth: function () {
        const s = dayjs().startOf('month').subtract(1, 'month').format('YYYY-MM-DD');
        const d = dayjs().endOf('month').subtract(1, 'month').format('YYYY-MM-DD');
        return [s, d];
      },
    };
    return obj[val] ? obj[val]() : ['', ''];
  }

  watch(()=>props.modelValue[props.startDateKey],(newVal)=>{
    queryParam.date = [newVal ,props.modelValue[props.endDateKey]]
  });
  watch(()=>props.modelValue[props.endDateKey],(newVal)=>{
    queryParam.date = [props.modelValue[props.startDateKey] ,newVal]
  });
  function handleChange(type) {
    const date = handleDate(type);
    queryParam.date = handleDate(type);
    props.modelValue[props.startDateKey] = date[0];
    props.modelValue[props.endDateKey] = date[1];
    //emits('update:modelValue', { startDate: date[0], endDate: date[1] });
    //emits('update', { startDate: date[0], endDate: date[1] });
  }
  function changeDate(val) {
    // console.log('val1:', val);
    let date = ['', ''];
    if (val) {
      date = val;
    } else {
      date = ['', ''];
    }
    props.modelValue[props.startDateKey] = date[0];
    props.modelValue[props.endDateKey] = date[1];
    // emits('update:modelValue', { startDate: date[0], endDate: date[1] });
  }
  // 设置默认值
  if (props.fastDateType && options.value.length > 0) {
    queryParam.type = props.fastDateType;
    handleChange(queryParam.type);
  }
</script>

<style lang="less" scoped>
</style>
