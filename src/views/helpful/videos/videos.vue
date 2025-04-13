<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>
  </div>
  <div>
    <a-modal title="视频播放" :visible="visible" @ok="handleOk" @cancel="handleCancel" footer="">
      <video ref="video" controls width="100%" :src="videoSrc"></video>
    </a-modal>
  </div>
</template>
<script lang="ts" name="monitor-route" setup>
  import { ref } from 'vue';
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  // 列表页面公共参数、方法
  const { tableContext } = useListPage({
    tableProps: {
      title: '视频教程',
      api: getVideosList,
      useSearchForm: false,
      clickToRowSelect: true,
      showIndexColumn: true,
      columns: [
        {
          title: '视频文件',
          dataIndex: 'videosName',
          width: 200,
        },
      ],
    },
  });

  const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext;

  let visible = ref(false);
  let videoSrc = ref(false);
  let video = ref();

  function getVideosList() {
    return [
      { id: 1, videosName: '01.添加企业信息.mp4', src: 'https://www.xinhsoft.com/sys/common/static/video/0810d9dde928c7abac499499bee4dbaf.mp4' },
      { id: 2, videosName: '02.销售开单.mp4', src: 'https://www.xinhsoft.com/sys/common/static/video/d624d3f872070f3fe1a4d3bfec2cfe0a.mp4' },
      { id: 3, videosName: '03.销售统计、销售队长单、进货统计和进货对账单.mp4', src: 'https://www.xinhsoft.com/sys/common/static/video/14c96a130ce8f8eaacb2af9c91ba699a.mp4' },
      { id: 4, videosName: '04.统计分析操作方法.mp4', src: 'https://www.xinhsoft.com/sys/common/static/video/ee5316793875d49154f4d658fb948682.mp4' },
      { id: 5, videosName: '05.导入客户信息和商品信息.mp4', src: 'https://www.xinhsoft.com/sys/common/static/video/1b44c52c660a66464a146484feeb3f1b.mp4' },
      { id: 6, videosName: '06.打印客户端安装.mp4', src: 'https://www.xinhsoft.com/sys/common/static/video/81c4b4604d269bcd34b629585ed52963.mp4' },
      // { id: 7, videosName: '07.客户价演示.mp4' },
    ];
  }
  /**
   * 操作栏
   */
  function getTableAction(record) {
    return [
      {
        label: '播放',
        onClick: handleEdit.bind(null, record),
      },
    ];
  }

  /**
   * 编辑事件
   */
  function handleEdit(record: Recordable) {
    visible.value = true;
    videoSrc.value = record.src;
    video.value.play();
  }
  function handleOk() {
    stopVideo();
    visible.value = false;
  }
  function handleCancel() {
    stopVideo();
    visible.value = false;
  }
  function stopVideo() {
    video.value.pause();
  }
</script>
