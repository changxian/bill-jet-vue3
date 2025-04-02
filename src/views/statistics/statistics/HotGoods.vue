<template>
  <div>
    <div class="part">
      <div class="query">
        <a-radio-group v-model:value="queryTime" :style="{ marginBottom: '8px' }"
                       @change="changeQueryTime">
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
          <a-table :dataSource="hotGoodsData" :columns="columns" :pagination="false" size="small" />
        </a-card>
        <a-card class="right">
          <pie :chartData="pieData" height="400px"
               :option="{ series, title: { text: '企业销售额', left: 'center' } }"/>
        </a-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import Pie from '/@/components/chart/Pie.vue';
  import { ref } from 'vue';
  import { queryTimeObj } from './Statistics.data';
  import { hotGoods } from '@/views/statistics/statistics/Statistics.api';
  import { useUserStore } from '@/store/modules/user';

  const userStore = useUserStore();
  const queryTime = ref('day30');
  const hotGoodsData = ref([]);

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
  const columns = [
    {
      title: '序号',
      key: 'index',
      width: 70,
      customRender: ({index}) => index + 1
    },
    {
      title: '编号(条码)',
      dataIndex: 'goodsCode',
      key: 'goodsCode',
    },
    {
      title: '商品名',
      dataIndex: 'goodsName',
      key: 'goodsName',
    },
    {
      title: '规格',
      dataIndex: 'goodsType',
      key: 'goodsType',
    },
    {
      title: '单位',
      dataIndex: 'goodsUnit',
      key: 'goodsUnit',
    },
    {
      title: '数量',
      dataIndex: 'countTotal',
      key: 'countTotal',
    },
    {
      title: '重量',
      dataIndex: 'weightTotal',
      key: 'weightTotal',
      ifShow: showWeightCol,
    },
    {
      title: '面积',
      dataIndex: 'areaTotal',
      key: 'areaTotal',
      ifShow: showAreaCol,
    },
    {
      title: '体积',
      dataIndex: 'volumeTotal',
      key: 'volumeTotal',
      ifShow: showVolumeCol,
    },
    {
      title: '金额',
      dataIndex: 'amountTotal',
      key: 'amountTotal',
    },
  ];
  const series = [
    {
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '65%'],
      data: [],
      labelLine: {show: true},
      label: {
        show: true,
        formatter: '{b} \n ({d}%)',
        color: '#B1B9D3',
      },
    },
  ];

  const pieData = ref([]);

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
    hotGoods(param).then(res => {
      hotGoodsData.value = res.hotGoodsData;
      pieData.value = res.pieData;
    });
  }

  loadData();
</script>
<style lang="less" scoped>
  .part {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .part-main {
    display: flex;

    .left {
      width: 55%;
      margin-right: 10px;
    }

    .right {
      width: 45%;
    }

    .tbl-title {
      text-align: center;
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 10px;
    }
  }
</style>
