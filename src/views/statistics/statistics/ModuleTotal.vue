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
          <a-radio-button value="thisYear">今年</a-radio-button>
          <a-radio-button value="lastYear">去年</a-radio-button>
        </a-radio-group>
      </div>
      <div class="part-main">
        <div class="deliver">
          <CardItem title="销售金额" path="/deliver/bill/deliverBillList" :num="deliver.amount" color="#c44e52" :timeType="queryTime" :imgSrc="imgSrc1"/>
          <CardItem title="销售欠款" path="/deliver/bill/deliverBillList" :num="deliver.debtAmount" color="#8172b3" :timeType="queryTime" :imgSrc="imgSrc2"/>
          <CardItem title="销售数量" path="/deliver/bill/deliverBillList" :num="deliver.count" color="#55a868" :timeType="queryTime" :imgSrc="imgSrc3"/>
          <CardItem title="销售利润" path="/deliver/bill/deliverBillList" :num="deliver.profitAmount" color="#ff0000" :timeType="queryTime" :imgSrc="imgSrc8"/>
          <CardItem title="商品利润" path="/deliver/bill/deliverBillList" :num="deliver.profit" color="#ff0000" :timeType="queryTime" :imgSrc="imgSrc9"/>
          <CardItem v-if="showWeightCol" title="销售重量" path="/deliver/bill/deliverBillList" :num="deliver.weight" color="#8c6245" :timeType="queryTime" :imgSrc="imgSrc4"/>
          <CardItem v-if="showAreaCol" title="销售面积" path="/deliver/bill/deliverBillList" :num="deliver.area" color="#d5bb67" :timeType="queryTime" :imgSrc="imgSrc5"/>
          <CardItem v-if="showVolumeCol" title="销售体积" path="/deliver/bill/deliverBillList" :num="deliver.volume" color="#4878d0" :timeType="queryTime" :imgSrc="imgSrc6"/>
          <CardItem title="销售退款" path="/deliver/bill/deliverBillList" :num="deliver.amountReturn" color="#e58128" :timeType="queryTime" :imgSrc="imgSrc7"/>
        </div>
        <div class="purchase">
          <CardItem title="进货金额" path="/purchase/bill/purchaseBillList" :num="purchase.amount" color="#c44e52" :timeType="queryTime" :imgSrc="imgSrc1"/>
          <CardItem title="进货欠款" path="/purchase/bill/purchaseBillList" :num="purchase.debtAmount" color="#8172b3" :timeType="queryTime" :imgSrc="imgSrc2"/>
          <CardItem title="进货数量" path="/purchase/bill/purchaseBillList" :num="purchase.count" color="#55a868" :timeType="queryTime" :imgSrc="imgSrc3"/>
          <CardItem v-if="showWeightCol" title="进货重量" path="/purchase/bill/purchaseBillList" :num="purchase.weight" color="#8c6245" :timeType="queryTime" :imgSrc="imgSrc4"/>
          <CardItem v-if="showAreaCol" title="进货面积" path="/purchase/bill/purchaseBillList" :num="purchase.area" color="#d5bb67" :timeType="queryTime" :imgSrc="imgSrc5"/>
          <CardItem v-if="showVolumeCol" title="进货体积" path="/purchase/bill/purchaseBillList" :num="purchase.volume" color="#4878d0" :timeType="queryTime" :imgSrc="imgSrc6"/>
          <CardItem title="进货退款" path="/purchase/bill/purchaseBillList" :num="purchase.amountReturn" color="#e58128" :timeType="queryTime" :imgSrc="imgSrc7"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import CardItem from './CardItem.vue';
  import { ref } from 'vue';
  import { queryTimeObj } from './Statistics.data';
  import imgSrc1 from '../../../assets/images/statistics/1.png';
  import imgSrc2 from '../../../assets/images/statistics/2.png';
  import imgSrc3 from '../../../assets/images/statistics/3.png';
  import imgSrc4 from '../../../assets/images/statistics/4.png';
  import imgSrc5 from '../../../assets/images/statistics/5.png';
  import imgSrc6 from '../../../assets/images/statistics/6.png';
  import imgSrc7 from '../../../assets/images/statistics/7.png';
  import imgSrc8 from '../../../assets/images/statistics/8.png';
  import imgSrc9 from '../../../assets/images/statistics/9.png';
  import { moduleTotal } from '@/views/statistics/statistics/Statistics.api';
  import { useUserStore } from '@/store/modules/user';

  const userStore = useUserStore();
  // 显示重量列【合计 和 列表皆显示，0不显示，1显示】
  const showWeightCol = ref(false);
  // 显示面积列【合计 和 列表皆显示】
  const showAreaCol = ref(false);
  // 显示体积列【合计 和 列表皆显示】
  const showVolumeCol = ref(false);
  // 系统开单设置
  const billSetting = userStore.getBillSetting;
  if (billSetting) {
    showWeightCol.value = !!billSetting.showWeightCol;
    showAreaCol.value = !!billSetting.showAreaCol;
    showVolumeCol.value = !!billSetting.showVolumeCol;
  }
  const deliver = ref({ amount: 0, debtAmount: 0, count: 0, weight: 0, area: 0, volume: 0, profitAmount: 0, profit: 0, amountReturn: 0 });
  const purchase = ref({ amount: 0, debtAmount: 0, count: 0, weight: 0, area: 0, volume: 0, amountReturn: 0 });
  const queryTime = ref('today');
  function changeQueryTime() {
    loadData();
  }

  function loadData() {
    let time = queryTimeObj[queryTime.value]();
    let param = {
      timeType: queryTime.value,
      startDate: time[0],
      endDate: time[1],
    };
    moduleTotal(param).then((res) => {
      purchase.value = res.purchase;
      deliver.value = res.deliver;
    });
  }
  loadData();
</script>
<style lang="less" scoped>
  .part {
    margin-top: 10px;

    .deliver {
      display: flex;
      flex-wrap: wrap;
    }
    .purchase {
      display: flex;
      flex-wrap: wrap;
    }
  }
</style>
