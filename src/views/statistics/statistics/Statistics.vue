<template>
  <div class="statistics-page">
    <!--      <form>-->
    <!--        <input v-model:value="formData.name">&ndash;&gt;-->

    <!--        <TestInput v-model="val"  />-->
    <!--        <TestInput v-model="formData.remark2"   />-->
    <!--        <TestInput v-model="formData.remark3"   />-->
    <!--      </form>-->
    <!--      <button @click="aaa">button</button>-->
    <ModuleTotal/>
    <ModuleDateTotal/>
    <HotGoods/>
  </div>
</template>

<script lang="ts" setup>

import ModuleTotal from './ModuleTotal.vue'
import ModuleDateTotal from './ModuleDateTotal.vue'
import HotGoods from './HotGoods.vue'
import {reactive, ref} from "vue";

const formData = reactive({
  remark: 'aaa',
  remark2: '22',
  remark3: 'aa33a',
  name: "22",
})
const val = ref('aa')

function aaa() {
  console.log("====aaa======", formData);
}

</script>
<style lang="less" scoped>
.statistics-page {
  margin-left: 10px;
}

</style>
