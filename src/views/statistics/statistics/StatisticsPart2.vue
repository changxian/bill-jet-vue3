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
                    <LineMulti :chartData="chartData1" height="400px" :option="multiBarOption1" type="line"></LineMulti>
                    <div class="total-wrap">
                        <span class="total">总计</span> 
                        <span class="txt">数量：</span> <span class="val">{{total1.num}}</span> 
                        <span class="txt">重量：</span> <span class="val">{{total1.weight}}</span> 
                        <span class="txt">面积：</span> <span class="val">{{total1.area}}</span> 
                        <span class="txt">体积：</span> <span class="val">{{total1.volume}}</span> 
                        <span class="txt">金额：</span> <span class="val">{{total1.amount}}</span> 
                        <span class="txt">欠款：</span> <span class="val">{{total1.debtAmount}}</span> 
                    </div>
                 </a-card>
                <a-card class="right">
                    <LineMulti :chartData="chartData2" height="400px" :option="multiBarOption2" type="line"></LineMulti>
                    <div class="total-wrap">
                        <span class="total">总计</span> 
                        <span class="txt">数量：</span> <span class="val">{{total2.num}}</span> 
                        <span class="txt">重量：</span> <span class="val">{{total2.weight}}</span> 
                        <span class="txt">面积：</span> <span class="val">{{total2.area}}</span> 
                        <span class="txt">体积：</span> <span class="val">{{total2.volume}}</span> 
                        <span class="txt">金额：</span> <span class="val">{{total2.amount}}</span> 
                        <span class="txt">欠款：</span> <span class="val">{{total2.debtAmount}}</span> 
                    </div>
                 </a-card> 
            </div>
            <div class="part-main" style="margin-top:10px">
                <a-card class="left">
                    <LineMulti :chartData="chartData3" height="400px" :option="multiBarOption3" type="line"></LineMulti>
                    <div class="total-wrap">
                        <span class="total">总计</span> 
                        <span class="txt">数量：</span> <span class="val">{{total3.num}}</span> 
                        <span class="txt">重量：</span> <span class="val">{{total3.weight}}</span> 
                        <span class="txt">面积：</span> <span class="val">{{total3.area}}</span> 
                        <span class="txt">体积：</span> <span class="val">{{total3.volume}}</span> 
                        <span class="txt">金额：</span> <span class="val">{{total3.amount}}</span> 
                        <span class="txt">欠款：</span> <span class="val">{{total3.debtAmount}}</span> 
                    </div>
                 </a-card>
                <a-card class="right">
                    <LineMulti :chartData="chartData4" height="400px" :option="multiBarOption4" type="line"></LineMulti>
                    <div class="total-wrap">
                        <span class="total">总计</span> 
                        <span class="txt">数量：</span> <span class="val">{{total4.num}}</span> 
                        <span class="txt">重量：</span> <span class="val">{{total4.weight}}</span> 
                        <span class="txt">面积：</span> <span class="val">{{total4.area}}</span> 
                        <span class="txt">体积：</span> <span class="val">{{total4.volume}}</span> 
                        <span class="txt">金额：</span> <span class="val">{{total4.amount}}</span> 
                        <span class="txt">欠款：</span> <span class="val">{{total4.debtAmount}}</span> 
                    </div>
                 </a-card> 
            </div>
        </div>
    </div> 
</template>

<script lang="ts" setup>
import {queryTimeObj} from './Statistics.data'
 import LineMulti from '/@/components/chart/LineMulti.vue';
 import { reactive, ref } from 'vue';
 
 const total = {
    num: 10,
    weight: 100,
    area: 200,
    volume: 300,
    amount: 6763,
    debtAmount: 63
 }
 const total1 = reactive(total)
 const total2 = reactive(total)
 const total3 = reactive(total)
 const total4 = reactive(total)

  const multiBarOption1 = {
    title: { text: '送货数据', left: 'center' },
  };
    const multiBarOption2 = {
    title: { text: '送货退货数据', left: 'center' },
  };
    const multiBarOption3 = {
    title: { text: '进货数据', left: 'center' },
  };
    const multiBarOption4 = {
    title: { text: '进货退货数据', left: 'center' },
  };
const barMultiData = [
    {
         "name": "1月",
         "value": 320,
         "type": "2021"
     },
     {
         "name": "2月",
         "value": 457,
         "type": "2021"
     },
     {
         "name": "3月",
         "value": 182,
         "type": "2021"
     },
      
     {
          "name": "1月",
          "value": 240,
          "type": "2022"
      },
      {
          "name": "2月",
          "value": 357,
          "type": "2022"
      },
      {
          "name": "3月",
          "value": 456,
          "type": "2022"
      },
         {
         "name": "1月",
         "value": 328,
         "type": "2023"
     },
     {
         "name": "2月",
         "value": 417,
         "type": "2023"
     },
     {
         "name": "3月",
         "value": 82,
         "type": "2023"
     },
]

const chartData1 = ref(barMultiData)
const chartData2 = ref(barMultiData)
const chartData3 = ref(barMultiData)
const chartData4 = ref(barMultiData)

 const queryTime = ref('day30')
function changeQueryTime(){

    console.log('queryTime', queryTime.value)
    console.log(queryTimeObj[queryTime.value]())

}

 
</script>
<style lang="less" scoped>
.part {
    margin-top:20px
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
    }
    .total-wrap{
        margin-left:40px;
        .txt {
            margin-left:20px;
        }
        .val {
            margin-left:-6px;
        }
    }
}
</style>
