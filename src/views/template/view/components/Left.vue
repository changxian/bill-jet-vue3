<template>
  <div>
    <div class="bg-white m-4 mr-0 overflow-hidden" style="height: 640px; overflow-y: scroll">
      <a-spin :spinning="loading">
        <BasicTree
          v-if="!treeReloading"
          title="可选有模板列表信息"
          checkable
          showLine
          :checkStrictly="true"
          :clickRowToExpand="true"
          :treeData="treeData"
          :checkedKeys="checkedKeys"
          :selectedKeys="selectedKeys"
          :expandedKeys="expandedKeys"
          :autoExpandParent="autoExpandParent"
          @check="onSelect"
          @select="onSelect"
          @expand="onExpand"
        />
      </a-spin>
    </div>
    <div>
      <span>打印限制:</span>
      <a-select v-model:value="value" label-in-value style="width: 160px" :options="options" @change="handleChange" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { BasicTree } from '/@/components/Tree';

  const emit = defineEmits(['select', 'jxcLimit']);

  const props = defineProps({
    templateList: { type: Array, default: () => [] },
    data: { type: Object, default: () => {} },
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
  // 树的选择节点信息
  const checkedKeys = ref<any>([]);
  // 是否自动展开父级
  let autoExpandParent = ref<boolean>(true);
  // 树组件重新加载
  let treeReloading = ref<boolean>(false);

  let value = ref('1');
  const options = [
    {
      value: '1',
      label: '正常',
    },
    {
      value: '2',
      label: '空白',
    },
    {
      value: '3',
      label: '无单价、金额',
    },
    {
      value: '4',
      label: '无单价、数量、金额',
    },
  ];

  watch(
    () => props.data,
    () => {
      if (0 < props.data.templateList.length) {
        treeData.value = props.data.templateList;
      }
      if ('' != props.data.templateId) {
        templateId.value = props.data.templateId;

        setSelectedKey(
          templateId.value,
          treeData.value.find((item) => item.id === templateId.value)
        );
        setTimeout(() => {
          document.getElementsByClassName('ant-tree-treenode-checkbox-checked')[0].scrollIntoView({ behavior: 'smooth' });
        }, 200);
      }
    },
    {
      immediate: true,
    }
  );

  function handleChange(v) {
    console.log(v);
    value.value = v.value;
    emit('jxcLimit', v);
  }

  /**
   * 设置当前选中的行
   */
  function setSelectedKey(key: string, data?: object) {
    console.log('------------------------setSelectedKey: ' + key);
    selectedKeys.value = [key];
    checkedKeys.value = [key];
    if (data) {
      emit('select', data);
    }
  }

  /**
   * 树点击事件
   * src/views/system/role/components/RolePermissionDrawer.vue 有完整的数操作逻辑
   *
   * @param selKeys {"checked":["1842056974677499906"],"halfChecked":[]} 选中第二条数据如 {"checked":["1842056974677499906","1842074443005747201"],"halfChecked":[]}
   * @param e event.node为整体数据信息 event.node.data是表单模板数据
   */
  function onSelect(selKeys, e) {
    if (selKeys == 0) {
      return;
    }
    setSelectedKey(e.node.key, e.node);
  }

  // 树展开事件
  function onExpand(keys) {
    expandedKeys.value = keys;
    autoExpandParent.value = false;
  }
</script>
<style lang="less" scoped>
  :where(.ant-card-body) {
    padding: 4px;
    border-radius: 0 0 4px 4px;
  }
  /*升级antd3后，查询框与树贴的太近，样式优化*/
  :deep(.jeecg-tree-header) {
    margin-bottom: 6px;
  }
</style>
