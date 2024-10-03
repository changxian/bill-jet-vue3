<template>
  <a-row style="height: 80px">
    <!-- 空白表格 -->
    <a-col :span="12" class="drag_item_box">
      <div>
        <a class="ep-draggable-item" tid="defaultModule.table1">
          <span class="glyphicon glyphicon-th" aria-hidden="true"></span>
          <p class="glyphicon-class">空白</p>
        </a>
      </div>
    </a-col>
    <a-col :span="12" class="drag_item_box">
      <div>
        <a class="ep-draggable-item" tid="defaultModule.table2_2">
          <img src="../public/static/43.png" alt="" />
          <p class="glyphicon-class">页小计</p>
        </a>
      </div>
    </a-col>
  </a-row>
  <a-row style="height: 80px">
    <a-col :span="12" class="drag_item_box">
      <div>
        <a class="ep-draggable-item" tid="defaultModule.table2">
          <img src="../public/static/43.png" alt="" />
          <p class="glyphicon-class">页合计1</p>
        </a>
      </div>
    </a-col>
    <a-col :span="12" class="drag_item_box">
      <div>
        <a class="ep-draggable-item" tid="defaultModule.table2_1">
          <img src="../public/static/43.png" alt="" />
          <p class="glyphicon-class">页合计2</p>
        </a>
      </div>
    </a-col>
  </a-row>
  <a-row style="height: 80px">
    <a-col :span="12" class="drag_item_box">
      <div>
        <a class="ep-draggable-item" tid="defaultModule.table3">
          <img src="../public/static/43.png" alt="" />
          <p class="glyphicon-class">页合计3</p>
        </a>
      </div>
    </a-col>
    <a-col :span="12" class="drag_item_box">
      <div>
        <a class="ep-draggable-item" tid="defaultModule.table2_1_1">
          <img src="../public/static/43.png" alt="页合计、数量合计" />
          <p class="glyphicon-class">页合计4</p>
        </a>
      </div>
    </a-col>
  </a-row>
  <a-row style="height: 80px">
    <a-col :span="12" class="drag_item_box">
      <div>
        <a class="ep-draggable-item" tid="defaultModule.table2_1_2">
          <img src="../public/static/43.png" alt="页合计金额、数量合计" />
          <p class="glyphicon-class">页合计5</p>
        </a>
      </div>
    </a-col>
    <a-col :span="12" class="drag_item_box">
      <div>
        <a class="ep-draggable-item" tid="defaultModule.table2_1_3">
          <img src="../public/static/43.png" alt="页合计金额、数量合计" />
          <p class="glyphicon-class">页合计6-繁体</p>
        </a>
      </div>
    </a-col>
  </a-row>
  <a-row style="height: 80px">
    <a-col :span="12" class="drag_item_box">
      <div>
        <a class="ep-draggable-item" tid="defaultModule.table2_1_4">
          <img src="../public/static/43.png" alt="大写金额、总重量、总金额" />
          <p class="glyphicon-class">页合计-重量</p>
        </a>
      </div>
    </a-col>
  </a-row>
  <a-row style="height: 80px">
    <a-col :span="12" class="drag_item_box">
      <div>
        <a class="ep-draggable-item" tid="defaultModule.table4">
          <img src="../public/static/43.png" alt="" />
          <p class="glyphicon-class">总合计</p>
        </a>
      </div>
    </a-col>
    <a-col :span="12" class="drag_item_box">
      <div>
        <a class="ep-draggable-item" tid="defaultModule.table4_1">
          <img src="../public/static/43.png" alt="" />
          <p class="glyphicon-class">总合计2</p>
        </a>
      </div>
    </a-col>
  </a-row>
  <a-row style="height: 80px">
    <a-col :span="12" class="drag_item_box">
      <div>
        <a class="ep-draggable-item" tid="defaultModule.table5">
          <img src="../public/static/43.png" alt="" />
          <p class="glyphicon-class">总合计3</p>
        </a>
      </div>
    </a-col>
    <a-col :span="12" class="drag_item_box">
      <div>
        <a class="ep-draggable-item" tid="defaultModule.table4_2">
          <img src="../public/static/43.png" alt="总合计、页小计、地址、售后热线、开票人" />
          <p class="glyphicon-class">售后热线</p>
        </a>
      </div>
    </a-col>
  </a-row>
  <a-row style="height: 80px">
    <a-col :span="12" class="drag_item_box">
      <div>
        <a class="ep-draggable-item" tid="defaultModule.table6">
          <img src="../public/static/43.png" alt="页小计，尾页合计" />
          <p class="glyphicon-class">尾合计</p>
        </a>
      </div>
    </a-col>
    <a-col :span="12" class="drag_item_box">
      <div>
        <a class="ep-draggable-item" tid="defaultModule.table6_1">
          <img src="../public/static/43.png" alt="尾合计2" />
          <p class="glyphicon-class">尾合计2</p>
        </a>
      </div>
    </a-col>
  </a-row>
  <a-row style="height: 80px">
    <a-col :span="12" class="drag_item_box">
      <div>
        <a class="ep-draggable-item" tid="defaultModule.table6_2">
          <img src="../public/static/43.png" alt="尾合计3" />
          <p class="glyphicon-class">尾合计3</p>
        </a>
      </div>
    </a-col>
    <a-col :span="12" class="drag_item_box">
      <div>
        <a class="ep-draggable-item" tid="defaultModule.table">
          <span class="glyphicon glyphicon-th" aria-hidden="true"></span>
          <p class="glyphicon-class">表格</p>
        </a>
      </div>
    </a-col>
  </a-row>
</template>

<style lang="less" scoped>
  // 拖拽
  .drag_item_box {
    height: 100%;
  }

  .drag_item_box > div {
    height: 100%;
    width: 100%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .drag_item_box > div > a {
    text-align: center;
    text-decoration-line: none;
  }

  .drag_item_box > div > a > span {
    font-size: 28px;
  }

  .drag_item_box > div > a > img {
    height: 50px;
    padding: 1px;
  }

  .drag_item_box > div > a > p {
    margin: 0;
  }

  .drag_item_title {
    font-size: 16px;
    padding: 12px 6px 0 6px;
    font-weight: bold;
  }

  // 默认图片
  :deep(.hiprint-printElement-image-content) {
    img {
      content: url('/public/logo.png');
    }
  }

  // 辅助线样式
  :deep(.toplineOfPosition) {
    border: 0;
    border-top: 1px dashed purple;
  }

  :deep(.bottomlineOfPosition) {
    border: 0;
    border-top: 1px dashed purple;
  }

  :deep(.leftlineOfPosition) {
    border: 0;
    border-left: 1px dashed purple;
  }

  :deep(.rightlineOfPosition) {
    border: 0;
    border-left: 1px dashed purple;
  }

  // 设计容器
  .card-design {
    overflow: hidden;
    overflow-x: auto;
    overflow-y: auto;
  }
</style>
<script setup lang="ts">
</script>
