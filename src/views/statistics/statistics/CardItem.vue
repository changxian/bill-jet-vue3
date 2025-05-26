<template>
  <a-card class="card-item item1" :style="{ width: '300px', color: props.color }" style="width: 300px">
    <div class="main">
      <div class="left">
        <img class="img" :src="props.imgSrc" alt="" />
      </div>
      <div class="right">
        <div class="more" @click="clickMore">更多 <DoubleRightOutlined /></div>
        <div class="title">{{ props.title }}</div>
      </div>
    </div>
    <div class="bdr color1" :style="{ borderColor: props.color }"></div>
    <div class="num">￥{{ props.num }}</div>
  </a-card>
</template>
<script lang="ts" setup>
  import imgSrc1 from '../../../assets/images/statistics/1.png';
  import { DoubleRightOutlined } from '@ant-design/icons-vue';
  import { queryTimeObj } from './Statistics.data';
  import { router } from '/@/router';
  const props = defineProps({
    color: { type: String, default: 'red' },
    title: { type: String, default: '' },
    imgSrc: { type: String, default: imgSrc1 },
    path: { type: String, default: '' },
    timeType: { type: String, default: '' },
    num: { type: Number, default: 0 },
  });

  function clickMore() {
    const time = queryTimeObj[props.timeType]();
    console.log('time:', time);
    const [startDate, endDate] = time;
    router.push({
      path: props.path,
      query: {
        startDate,
        endDate,
      },
    });
  }
</script>
<style lang="less" scoped>
  .part {
    margin-top: 20px;
  }
  .card-item {
    margin-right: 20px;
    margin-bottom: 20px;

    .img {
      width: 78px;
      height: 52px;
    }

    .bdr {
      margin: 10px 0;
      border: 1px dashed #dddddd;
    }
    .num {
      transform: translateY(-6px);
      font-size: 20px;
      text-align: center;
      font-weight: 500;
      margin-bottom: -15px;
    }
    .main {
      // position: relative;
      display: flex;

      .left {
        width: 80px;
      }
      .right {
        flex: 1;
        text-align: right;
        padding-right: 10px;
        font-weight: 400;
        font-size: 16px;

        .title {
          margin-top: 12px;
        }
        .more {
          text-align: right;
          cursor: pointer;
          font-size: 12px;
          margin-top: -6px;
          margin-right: -2px;
        }
      }
    }
  }
 
</style>
