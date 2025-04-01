<template>
  <div class="main">
    <AutoComplete
      style="width:300px"
      :value="modelValue"
      :options="options"
      @search="onSearch"
      placeholder="请输入关键字"
      @select="onSelect"/>
<!--    <a-button @click="getVal">获取输入值</a-button>-->
  </div>

</template>
<script lang="ts" setup>
import {AutoComplete} from 'ant-design-vue';
import {defineEmits, defineProps, ref} from 'vue';
import {string} from "vue-types";

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  }
});
const emits = defineEmits(['update:modelValue']);

const queryValue = ref('')
const options = ref<any>([])
function debounce (fn, delay = 1000) {
  let time = null
  return function () {
    // 获取当前this
    let that = this
    // 判断是否已经存在，如果存在直接清除
    if (time) {
      clearTimeout(time)
    }
    time = setTimeout(() => {
      // 使fn 中this，执行当前调用者，并传入参数
      fn.apply(that, arguments)
    }, delay)
  }
}
let nowTime = new Date().getTime()
let lastTime = new Date().getTime()
function queryFn(){
  console.log('queryFn======',props.modelValue)
  const value = props.modelValue
  lastTime = new Date().getTime()
   debounce(queryFn,2000)()
    options.value.push({
      value: value+"bbb",
      text: value+"bbb",
    })

}
function onSearch(value) {
  console.log('查询参数value: ', value)
  emits('update:modelValue', value)
  nowTime = new Date().getTime()
  if(nowTime - lastTime > 2 * 1000 ){
    queryFn()
  }

}

function onSelect(value) {
  emits('update:modelValue', value)
}

function getVal() {
  console.log('queryValue', queryValue.value)
}
</script>
<style lang="less" scoped>


</style>
