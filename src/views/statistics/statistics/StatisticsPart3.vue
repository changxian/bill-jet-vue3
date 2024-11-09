<template>
    <div>
        <div class="part">
            <div class="query">
                <a-radio-group v-model:value="queryTime" :style="{ marginBottom: '8px' }" @change="changeQueryTime">
                <a-radio-button value="day30">近30天</a-radio-button>
                <a-radio-button value="thisMonth">本月</a-radio-button>
                <a-radio-button value="lastMonth">上月</a-radio-button>
                <a-radio-button value="thisYear">今年</a-radio-button>
                <a-radio-button value="lastYear">去年</a-radio-button>
                </a-radio-group>
            </div>
            <div class="part-main">
                <a-card class="left">
                    <div class="tbl-title">畅销商品</div>
                    <a-table :dataSource="dataSource" :columns="columns" :pagination="false" size="small" />
                 </a-card>
                <a-card class="right">
                     <pie :chartData="pieData" height="400px" :option="{ series, title: { text: '企业销售额', left: 'center' } }" />
                 </a-card> 
            </div>
        </div>
    </div> 
</template>

<script lang="ts" setup>
 import Pie from '/@/components/chart/Pie.vue';
 import LineMulti from '/@/components/chart/LineMulti.vue';
 import { ref } from 'vue';
 import {queryTimeObj} from './Statistics.data'

const queryTime = ref('day30')

 const dataSource = ref([
          {
            key: '1',
            name: '胡彦斌',
            code: 32,
          },
          {
            key: '2',
            name: '胡彦祖',
            code: 42,
          },
        ])

        const columns = [
          { title: "序号", key: 'index', width: 70, customRender: ({ index}) => index + 1
          },
          {
            title: '编号(条码)',
            dataIndex: 'code',
            key: 'code',
          },
          {
            title: '商品名',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: '规格',
            dataIndex: 'type',
            key: 'type',
          },
         {
            title: '单位',
            dataIndex: 'unit',
            key: 'unit',
          },
          {
            title: '数量',
            dataIndex: 'stock',
            key: 'stock',
          },
        {
            title: '重量',
            dataIndex: 'weight',
            key: 'weight',
          },
            {
            title: '面积',
            dataIndex: 'area',
            key: 'area',
          },
        {
            title: '体积',
            dataIndex: 'volume',
            key: 'volume',
          },
            {
            title: '金额',
            dataIndex: 'costAmount',
            key: 'costAmount',
          },
        ]
 const series = [
          {
            type: 'pie',
            radius : ['40%', '70%'],
            center: ['50%', '65%'],
            data: [],
            labelLine: { show: true },
            label: {
              show: true,
              formatter: '{b} \n ({d}%)',
              color: '#B1B9D3',
            },
          },
        ]
 
  const pieData = ref([
    { value: 335, name: '客服电话' },
    { value: 310, name: '奥迪官网' },
    { value: 234, name: '媒体曝光' },
    { value: 135, name: '质检总局' },
    { value: 105, name: '其他' },
  ]);
  
  function changeQueryTime(){
    console.log('queryTime', queryTime.value)
    console.log(queryTimeObj[queryTime.value]())
}
</script>
<style lang="less" scoped>
.part {
    margin-top:20px;
    margin-bottom:20px
}
.part-main {
    display:flex;
    .left{
        width:55%;
        margin-right:10px;
    }
    .right{
        width:45%
    }
    .tbl-title{
        text-align: center;
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 10px;
    }
}
</style>
