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
          <LineMulti :chartData="purchaseDateTypeData" height="400px" :option="purchaseDateTypeOption" type="line"></LineMulti>
          <div class="total-wrap">
            <span class="total">总计</span>
            <span class="txt">数量：</span> <span class="val">{{ purchaseDateTypeTotal.count }}</span>
            <span v-if="showWeightCol" class="txt">重量：</span> <span v-if="showWeightCol" class="val">{{ purchaseDateTypeTotal.weight }}</span>
            <span v-if="showAreaCol" class="txt">面积：</span> <span v-if="showAreaCol" class="val">{{ purchaseDateTypeTotal.area }}</span>
            <span v-if="showVolumeCol" class="txt">体积：</span> <span v-if="showVolumeCol" class="val">{{ purchaseDateTypeTotal.volume }}</span>
            <span class="txt">金额：</span> <span class="val">{{ purchaseDateTypeTotal.amount }}</span>
            <span class="txt">欠款：</span> <span class="val">{{ purchaseDateTypeTotal.debtAmount }}</span>
          </div>
        </a-card>
        <a-card class="right">
          <LineMulti :chartData="purchaseReturnDateTypeData" height="400px" :option="purchaseReturnDateTypeOption" type="line"></LineMulti>
          <div class="total-wrap">
            <span class="total">总计</span>
            <span class="txt">数量：</span> <span class="val">{{ purchaseReturnDateTypeTotal.count }}</span>
            <span v-if="showWeightCol" class="txt">重量：</span> <span v-if="showWeightCol" class="val">{{ purchaseReturnDateTypeTotal.weight }}</span>
            <span v-if="showAreaCol" class="txt">面积：</span> <span v-if="showAreaCol" class="val">{{ purchaseReturnDateTypeTotal.area }}</span>
            <span v-if="showVolumeCol" class="txt">体积：</span> <span v-if="showVolumeCol" class="val">{{ purchaseReturnDateTypeTotal.volume }}</span>
            <span class="txt">金额：</span> <span class="val">{{ purchaseReturnDateTypeTotal.amount }}</span>
            <span class="txt">欠款：</span> <span class="val">{{ purchaseReturnDateTypeTotal.debtAmount }}</span>
          </div>
        </a-card>
      </div>
      <div class="part-main" style="margin-top: 10px">
        <a-card class="left">
          <LineMulti :chartData="deliverDateTypeData" height="400px" :option="deliverDateTypeOption" type="line"></LineMulti>
          <div class="total-wrap">
            <span class="total">总计</span>
            <span class="txt">数量：</span> <span class="val">{{ deliverDateTypeTotal.count }}</span>
            <span v-if="showWeightCol" class="txt">重量：</span> <span v-if="showWeightCol" class="val">{{ deliverDateTypeTotal.weight }}</span>
            <span v-if="showAreaCol" class="txt">面积：</span> <span v-if="showAreaCol" class="val">{{ deliverDateTypeTotal.area }}</span>
            <span v-if="showVolumeCol" class="txt">体积：</span> <span v-if="showVolumeCol" class="val">{{ deliverDateTypeTotal.volume }}</span>
            <span class="txt">金额：</span> <span class="val">{{ deliverDateTypeTotal.amount }}</span>
            <span class="txt">欠款：</span> <span class="val">{{ deliverDateTypeTotal.debtAmount }}</span>
          </div>
        </a-card>
        <a-card class="right">
          <LineMulti :chartData="deliverReturnDateTypeData" height="400px" :option="deliverReturnDateTypeOption" type="line"></LineMulti>
          <div class="total-wrap">
            <span class="total">总计</span>
            <span class="txt">数量：</span> <span class="val">{{ deliverReturnDateTypeTotal.count }}</span>
            <span v-if="showWeightCol" class="txt">重量：</span> <span v-if="showWeightCol" class="val">{{ deliverReturnDateTypeTotal.weight }}</span>
            <span v-if="showAreaCol" class="txt">面积：</span> <span v-if="showAreaCol" class="val">{{ deliverReturnDateTypeTotal.area }}</span>
            <span v-if="showVolumeCol" class="txt">体积：</span> <span v-if="showVolumeCol" class="val">{{ deliverReturnDateTypeTotal.volume }}</span>
            <span class="txt">金额：</span> <span class="val">{{ deliverReturnDateTypeTotal.amount }}</span>
            <span class="txt">欠款：</span> <span class="val">{{ deliverReturnDateTypeTotal.debtAmount }}</span>
          </div>
        </a-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { queryTimeObj } from './Statistics.data';
  import LineMulti from '/@/components/chart/LineMulti.vue';
  import { ref } from 'vue';
  import { moduleDateTotal } from '@/views/statistics/statistics/Statistics.api';
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
  const total = {
    count: 0,
    weight: 0,
    area: 0,
    volume: 0,
    amount: 0,
    debtAmount: 0,
  };
  const purchaseDateTypeTotal = ref(total);
  const purchaseReturnDateTypeTotal = ref(total);
  const deliverDateTypeTotal = ref(total);
  const deliverReturnDateTypeTotal = ref(total);

  const purchaseDateTypeOption = {
    title: { text: '进货数据', left: 'center' },
  };
  const purchaseReturnDateTypeOption = {
    title: { text: '进货退货数据', left: 'center' },
  };
  const deliverDateTypeOption = {
    title: { text: '销售数据', left: 'center' },
  };
  const deliverReturnDateTypeOption = {
    title: { text: '销售退货数据', left: 'center' },
  };

  const purchaseDateTypeData = ref([]);
  const purchaseReturnDateTypeData = ref([]);
  const deliverDateTypeData = ref([]);
  const deliverReturnDateTypeData = ref([]);

  const queryTime = ref('day30');
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
    moduleDateTotal(param).then((res) => {
      purchaseDateTypeData.value = res.purchaseDateTypeData;
      purchaseDateTypeTotal.value = res.purchaseDateTypeTotal;
      purchaseReturnDateTypeData.value = res.purchaseReturnDateTypeData;
      purchaseReturnDateTypeTotal.value = res.purchaseReturnDateTypeTotal;
      deliverDateTypeData.value = res.deliverDateTypeData;
      deliverDateTypeTotal.value = res.deliverDateTypeTotal;
      deliverReturnDateTypeData.value = res.deliverReturnDateTypeData;
      deliverReturnDateTypeTotal.value = res.deliverReturnDateTypeTotal;
    });
  }
  loadData();
</script>
<style lang="less" scoped>
  .part {
    margin-top: 20px;
  }
  .part-main {
    display: flex;
    .left {
      width: 55%;
      margin-right: 10px;
    }
    .right {
      width: 45%
    }
    .tbl-title {
      text-align: center;
      font-size: 18px;
      font-weight: 600;
    }
    .total-wrap {
      margin-left: 40px;
      .txt {
        margin-left: 20px;
      }
      .val {
        margin-left: -6px;
      }
    }
  }
</style>
