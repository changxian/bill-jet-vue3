<template>
    <div>
        <div class="part">
            <div class="query">
                <a-radio-group v-model:value="queryTime" :style="{ marginBottom: '8px' }" @change="changeQueryTime">
                <a-radio-button value="today">今天</a-radio-button>
                <a-radio-button value="yesterday">昨天</a-radio-button>
                <a-radio-button value="beforeYesterday">前天</a-radio-button>
                <a-radio-button value="thisWeek">本周</a-radio-button>
                <a-radio-button value="thisMonth">本月</a-radio-button>
                <a-radio-button value="lastMonth">上月</a-radio-button>
                </a-radio-group>
            </div>
            <div class="part-main">
                <div class="deliver">
                    <CardItem title="送货金额" path="/deliver/bill/deliverBillList" :num="num" color="#c44e52" :timeType="queryTime" :imgSrc="imgSrc1"/>
                    <CardItem title="送货欠款" path="/deliver/bill/deliverBillList" :num="num" color="#8172b3" :timeType="queryTime" :imgSrc="imgSrc2"/>
                    <CardItem title="送货数量" path="/deliver/bill/deliverBillList" :num="num" color="#55a868" :timeType="queryTime" :imgSrc="imgSrc3"/>
                    <CardItem title="送货重量" path="/deliver/bill/deliverBillList" :num="num" color="#8c6245" :timeType="queryTime" :imgSrc="imgSrc4"/>
                    <CardItem title="送货面积" path="/deliver/bill/deliverBillList" :num="num" color="#d5bb67" :timeType="queryTime" :imgSrc="imgSrc5"/>
                    <CardItem title="送货体积" path="/deliver/bill/deliverBillList" :num="num" color="#4878d0" :timeType="queryTime" :imgSrc="imgSrc6"/>
                    <CardItem title="送货退款" path="/deliver/bill/deliverBillList" :num="num" color="#e58128" :timeType="queryTime" :imgSrc="imgSrc7"/>

                </div>
                <div class="purchase">
                    <CardItem title="进货金额" path="/purchase/bill/purchaseBillList" :num="num" color="#c44e52" :timeType="queryTime" :imgSrc="imgSrc1"/>
                    <CardItem title="进货欠款" path="/purchase/bill/purchaseBillList" :num="num" color="#8172b3" :timeType="queryTime" :imgSrc="imgSrc2"/>
                    <CardItem title="进货数量" path="/purchase/bill/purchaseBillList" :num="num" color="#55a868" :timeType="queryTime" :imgSrc="imgSrc3"/>
                    <CardItem title="进货重量" path="/purchase/bill/purchaseBillList" :num="num" color="#8c6245" :timeType="queryTime" :imgSrc="imgSrc4"/>
                    <CardItem title="进货面积" path="/purchase/bill/purchaseBillList" :num="num" color="#d5bb67" :timeType="queryTime" :imgSrc="imgSrc5"/>
                    <CardItem title="进货体积" path="/purchase/bill/purchaseBillList" :num="num" color="#4878d0" :timeType="queryTime" :imgSrc="imgSrc6"/>
                    <CardItem title="进货退款" path="/purchase/bill/purchaseBillList" :num="num" color="#e58128" :timeType="queryTime" :imgSrc="imgSrc7"/>
                </div>
            </div>
        </div>
    </div> 
</template>

<script lang="ts" setup>
import {DoubleRightOutlined} from '@ant-design/icons-vue';
import CardItem from './CardItem.vue'
 import { ref} from 'vue';
 import {queryTimeObj} from './Statistics.data'
import imgSrc1 from '../../../assets/images/statistics/1.png'
import imgSrc2 from '../../../assets/images/statistics/2.png'
import imgSrc3 from '../../../assets/images/statistics/3.png'
import imgSrc4 from '../../../assets/images/statistics/4.png'
import imgSrc5 from '../../../assets/images/statistics/5.png'
import imgSrc6 from '../../../assets/images/statistics/6.png'
import imgSrc7 from '../../../assets/images/statistics/7.png'


const num = ref(1200)
 const queryTime = ref('today')
function changeQueryTime(){
 
     console.log('queryTime', queryTime.value)
    console.log(queryTimeObj[queryTime.value]())
  
}
 
</script>
<style lang="less" scoped>

.part {
    margin-top:20px;

    .deliver {
        display:flex;
        flex-wrap: wrap;
    }
    .purchase {
        display:flex;
        flex-wrap: wrap;
    }
}
 
</style>
