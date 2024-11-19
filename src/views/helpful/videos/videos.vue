<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts" name="monitor-route" setup>
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  // 列表页面公共参数、方法
  const { prefixCls, tableContext } = useListPage({
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

  function getVideosList() {
    return [
      { id: 1, videosName: '01.快捷开单.mp4' },
      { id: 2, videosName: '02.基本操作.mp4' },
      { id: 3, videosName: '03.批量复制开单.mp4' },
      { id: 4, videosName: '04.导入客户与商品.mp4' },
      { id: 5, videosName: '05.导入模板.mp4' },
      { id: 6, videosName: '06.导入对账单模板.mp4' },
      { id: 7, videosName: '07.客户价演示.mp4' },
    ];
  }
  /**
   * 操作栏
   */
  function getTableAction(record) {
    return [
      {
        label: '播放',
        // onClick: handleEdit.bind(null, record),
        auth: 'deliver.bill:jxc_deliver_bill:play',
      },
    ];
  }

  /**
   * 编辑事件
   */
  // function handleEdit(record: Recordable) {
    // registerModal.value.disableSubmit = false;
    // registerModal.value.edit(record);
  // }
</script>
