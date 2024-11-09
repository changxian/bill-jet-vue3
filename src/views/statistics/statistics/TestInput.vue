<template>

    <div class="main">
            <AutoComplete
             style="width:300px"
             v-model:value="queryValue"
            :options="options"
            @search="onSearch"
            placeholder="请输入关键字"
            @select="onSelect"/>
         <a-button @click="getVal">获取输入值</a-button>
    </div>
     
</template>
<script lang="ts" setup>
import  { AutoComplete } from 'ant-design-vue';
 import { ref} from 'vue';

const queryValue = ref('')
const options = ref<any>([])
     function onSearch(value) {
        console.log('查询参数value: ', value )
        if(value.length < 4){
            options.value = !value ? [] : [value, value + '1', value + '2'].map(val => ({
                value: val,
                text: val,
            }));
        }else {
            options.value = []
        }
    }
    function onSelect(value) {
      console.log('选中的值:', value);
      console.log('queryValue', queryValue.value)
    }
    function getVal(){
         console.log('queryValue', queryValue.value)
    }
</script>
<style lang="less" scoped>

 
</style>
