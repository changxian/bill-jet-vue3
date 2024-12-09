<template>
  <div class="bg-white m-4 mr-0 overflow-hidden">
    <a-spin :spinning="loading">
      <BasicTree
        v-if="!treeReloading"
        title=""
        showLine
        :checkStrictly="true"
        :clickRowToExpand="false"
        :treeData="treeData"
        :selectedKeys="selectedKeys"
        :expandedKeys="expandedKeys"
        :autoExpandParent="autoExpandParent"
        @select="onSelect"
        @expand="onExpand"
      />
    </a-spin>
  </div>
</template>

<script lang="ts" setup>
  import { nextTick, ref, watch } from 'vue';
  import { BasicTree } from '/@/components/Tree';
  import { tempList } from '@/views/template/view/components/index.api';

  const emit = defineEmits(['select']);

  const props = defineProps({
    id: { type: String, default: () => '' },
  });

  // eslint-disable-next-line vue/no-dupe-keys
  const templateId = ref('');

  let loading = ref<boolean>(false);
  // 商品树列表数据
  let treeData = ref<any[]>([]);
  // 当前展开的项
  let expandedKeys = ref<any[]>([]);
  // 当前选中的项
  let selectedKeys = ref<any[]>([]);
  // 是否自动展开父级
  let autoExpandParent = ref<boolean>(true);
  // 树组件重新加载
  let treeReloading = ref<boolean>(false);

  watch(
    () => props.id,
    () => {
      if (props.id) {
        templateId.value = props.id;

        // if (props.data['list']) {
        //   treeData.value = [];
        //   treeData.value = props.data['list'];
        //   autoExpandParentNode();
        // }
        autoExpandParentNode(templateId.value);
      }
    },
    {
      immediate: true,
    }
  );

  async function load() {
    treeData.value = await tempList({});
    return treeData.value;
  }
  load();

  // 自动展开父节点，只展开一级
  async function autoExpandParentNode(key: any) {
    let keys: Array<any> = [];
    if (treeData.value.length == 0) {
      await load();
    }
    treeData.value.forEach((item, index) => {
      if (item.children && item.children.length > 0) {
        keys.push(item.key);
      }
      if ('' == key) {
        if (index === 0) {
          // 默认选中第一个
          setSelectedKey(item.id, item);
        }
      } else {
        if (item.key === key) {
          setSelectedKey(item.id, item);
        }
      }
    });
    if (keys.length > 0) {
      reloadTree();
      expandedKeys.value = keys;
    }
  }

  // 重新加载树组件，防止无法默认展开数据
  async function reloadTree() {
    await nextTick();
    treeReloading.value = true;
    await nextTick();
    treeReloading.value = false;
  }

  /**
   * 设置当前选中的行
   */
  function setSelectedKey(key: string, data?: object) {
    selectedKeys.value = [key];
    if (data) {
      emit('select', data);
    }
  }

  // 树选择事件
  function onSelect(selKeys, event) {
    if (selKeys.length > 0 && selectedKeys.value[0] !== selKeys[0]) {
      setSelectedKey(selKeys[0], event.selectedNodes[0]);
    } else {
      // 这样可以防止用户取消选择
      setSelectedKey(selectedKeys.value[0]);
    }
  }

  // 树展开事件
  function onExpand(keys) {
    expandedKeys.value = keys;
    autoExpandParent.value = false;
  }
</script>
<style lang="less" scoped>
  /*升级antd3后，查询框与树贴的太近，样式优化*/
  :deep(.jeecg-tree-header) {
    margin-bottom: 6px;
  }
</style>
