<template>
  <Tooltip placement="top" v-bind="getBindProps">
    <template #title>
      <span>{{ t('component.table.settingColumn') }}</span>
    </template>
    <Popover
      v-model:open="popoverVisible"
      placement="bottomLeft"
      trigger="click"
      @open-change="handleVisibleChange"
      :overlayClassName="`${prefixCls}__cloumn-list`"
      :getPopupContainer="getPopupContainer"
    >
      <template #title>
        <div :class="`${prefixCls}__popover-title`">
          <Checkbox :indeterminate="indeterminate" v-model:checked="checkAll" @change="onCheckAllChange">
            {{ t('component.table.settingColumnShow') }}
          </Checkbox>

          <Checkbox v-model:checked="checkIndex" @change="handleIndexCheckChange">
            {{ t('component.table.settingIndexColumnShow') }}
          </Checkbox>

          <!--                    <Checkbox-->
          <!--                            v-model:checked="checkSelect"-->
          <!--                            @change="handleSelectCheckChange"-->
          <!--                            :disabled="!defaultRowSelection"-->
          <!--                    >-->
          <!--                        {{ t('component.table.settingSelectColumnShow') }}-->
          <!--                    </Checkbox>-->
        </div>
      </template>

      <template #content>
        <ScrollContainer>
          <CheckboxGroup v-model:value="checkedList" @change="onChange" ref="columnListRef">
            <template v-for="item in plainOptions" :key="item.value">
              <div :class="`${prefixCls}__check-item`" v-if="!('ifShow' in item && !item.ifShow)">
                <DragOutlined class="table-column-drag-icon" />
                <Checkbox :value="item.value">
                  {{ item.label }}
                </Checkbox>

                <Tooltip placement="bottomLeft" :mouseLeaveDelay="0.4" :getPopupContainer="getPopupContainer">
                  <template #title>
                    {{ t('component.table.settingFixedLeft') }}
                  </template>
                  <Icon
                    icon="line-md:arrow-align-left"
                    :class="[
                      `${prefixCls}__fixed-left`,
                      {
                        active: item.fixed === 'left',
                        disabled: !checkedList.includes(item.value),
                      },
                    ]"
                    @click="handleColumnFixed(item, 'left')"
                  />
                </Tooltip>
                <Divider type="vertical" />
                <Tooltip placement="bottomLeft" :mouseLeaveDelay="0.4" :getPopupContainer="getPopupContainer">
                  <template #title>
                    {{ t('component.table.settingFixedRight') }}
                  </template>
                  <Icon
                    icon="line-md:arrow-align-left"
                    :class="[
                      `${prefixCls}__fixed-right`,
                      {
                        active: item.fixed === 'right',
                        disabled: !checkedList.includes(item.value),
                      },
                    ]"
                    @click="handleColumnFixed(item, 'right')"
                  />
                </Tooltip>
              </div>
            </template>
          </CheckboxGroup>
        </ScrollContainer>
        <div :class="`${prefixCls}__popover-footer`">
          <a-button size="small" @click="reset">
            {{ t('common.resetText') }}
          </a-button>
          <a-button size="small" type="primary" @click="saveSetting"> 保存 </a-button>
        </div>
      </template>
      <SettingOutlined />
    </Popover>
  </Tooltip>
</template>
<script lang="ts">
  import type { BasicColumn, ColumnChangeParam } from '../../types/table';
  import { defineComponent, ref, reactive, toRefs, watchEffect, nextTick, unref, computed, watch } from 'vue';
  import { Tooltip, Popover, Checkbox, Divider } from 'ant-design-vue';
  import type { CheckboxChangeEvent } from 'ant-design-vue/lib/checkbox/interface';
  import { SettingOutlined, DragOutlined } from '@ant-design/icons-vue';
  import { Icon } from '/@/components/Icon';
  import { ScrollContainer } from '/@/components/Container';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useTableContext } from '../../hooks/useTableContext';
  import { useColumnsCache } from '../../hooks/useColumnsCache';
  import { useDesign } from '/@/hooks/web/useDesign';
  // import { useSortable } from '/@/hooks/web/useSortable';
  import { isFunction, isNullAndUnDef } from '/@/utils/is';
  import { getPopupContainer as getParentContainer } from '/@/utils';
  import { cloneDeep, omit } from 'lodash-es';
  import Sortablejs from 'sortablejs';
  import type Sortable from 'sortablejs';
  import { useLocaleStoreWithOut } from '/@/store/modules/locale';
  import { defHttp } from '/@/utils/http/axios';
  import { createLocalStorage } from '/@/utils/cache';
  import { CURRENT_PATH_KEY } from '/@/enums/cacheEnum';
  import { useUserStore } from '/@/store/modules/user';

  interface State {
    checkAll: boolean;
    isInit?: boolean;
    checkedList: string[];
    defaultCheckList: string[];
  }

  interface Options {
    label: string;
    value: string;
    fixed?: boolean | 'left' | 'right';
  }

  export default defineComponent({
    name: 'ColumnSetting',
    components: {
      SettingOutlined,
      Popover,
      Tooltip,
      Checkbox,
      CheckboxGroup: Checkbox.Group,
      DragOutlined,
      ScrollContainer,
      Divider,
      Icon,
    },
    props: {
      isMobile: Boolean,
    },
    emits: ['columns-change'],

    setup(props, { emit, attrs }) {
      const { t } = useI18n();
      const table = useTableContext();
      const popoverVisible = ref(false);
      // update-begin--author:sunjianlei---date:20221101---for: 修复第一次进入时列表配置不能拖拽
      // nextTick(() => popoverVisible.value = false);
      // update-end--author:sunjianlei---date:20221101---for: 修复第一次进入时列表配置不能拖拽
      const defaultRowSelection = omit(table.getRowSelection(), 'selectedRowKeys');
      let inited = false;

      const cachePlainOptions = ref<Options[]>([]);
      const plainOptions = ref<Options[] | any>([]);

      const plainSortOptions = ref<Options[]>([]);

      const columnListRef = ref<ComponentRef>(null);

      const restAfterOptions = {
        value: null,
      };

      const state = reactive<State>({
        checkAll: true,
        checkedList: [],
        defaultCheckList: [],
      });

      const checkIndex = ref(false);
      const checkSelect = ref(false);

      const { prefixCls } = useDesign('basic-column-setting');

      const getValues = computed(() => {
        return unref(table?.getBindValues) || {};
      });

      const getBindProps = computed(() => {
        let obj = {};
        if (props.isMobile) {
          obj['open'] = false;
        }
        return obj;
      });

      const userStore = useUserStore();
      const $ls = createLocalStorage();
      let sortable: Sortable;
      const sortableOrder = ref<string[]>();
      const localeStore = useLocaleStoreWithOut();
      // 列表字段配置缓存
      const { saveSetting, resetSetting } = useColumnsCache(
        {
          state,
          popoverVisible,
          plainOptions,
          plainSortOptions,
          sortableOrder,
          checkIndex,
          restAfterOptions,
        },
        setColumns,
        handleColumnFixed
      );

      watchEffect(() => {
        setTimeout(() => {
          const columns = table.getColumns();
          debugger;
          if (columns.length && !state.isInit) {
            init();
          }
        }, 0);
      });

      watchEffect(() => {
        const values = unref(getValues);
        checkIndex.value = !!values.showIndexColumn;
        checkSelect.value = !!values.rowSelection;
      });
      // update-begin--author:liaozhiyang---date:20240724---for：【issues/6908】多语言无刷新切换时，BasicColumn和FormSchema里面的值不能正常切换
      watch(localeStore, () => {
        const columns = getColumns();
        plainOptions.value = columns;
        plainSortOptions.value = columns;
        cachePlainOptions.value = columns;
      });
      // update-end--author:liaozhiyang---date:20240724---for：【issues/6908】多语言无刷新切换时，BasicColumn和FormSchema里面的值不能正常切换

      function getCategory() {
        const path = $ls.get(CURRENT_PATH_KEY);
        const arr = ['deliverBillAdd', 'purchaseBillAdd'];
        for (let i = 0; i < arr.length; i++) {
          if (path.indexOf(arr[i]) >= 0) {
            return i + 1;
          }
        }
        return -1;
      }

      function getColumns() {
        const ret: Options[] = [];
        let ctg = getCategory();

        const colsSortMap = userStore.getColsSortMap || {};
        const cols = colsSortMap[ctg];
        if (cols) {
          let columns = cols.columns;
          let checkedList = cols.checkedList;
          if (-1 != ctg && null != columns && 0 < columns.length) {
            if (checkedList) {
              state.checkedList = checkedList;
            }

            columns.forEach((item) => {
              ret.push({
                label: (item.title as string) || (item.customTitle as string),
                value: (item.dataIndex || item.title) as string,
                ...item,
              });
            });
            return ret;
          }
        }

        table.getColumns({ ignoreIndex: true, ignoreAction: true }).forEach((item) => {
          ret.push({
            label: (item.title as string) || (item.customTitle as string),
            value: (item.dataIndex || item.title) as string,
            ...item,
          });
        });
        return ret;
      }

      function init() {
        const columns = getColumns();

        const checkList = table
          .getColumns({ ignoreAction: true, ignoreIndex: true })
          .map((item) => {
            if (item.defaultHidden) {
              return '';
            }
            return item.dataIndex || item.title;
          })
          .filter(Boolean) as string[];

        if (!plainOptions.value.length) {
          plainOptions.value = columns;
          plainSortOptions.value = columns;
          cachePlainOptions.value = columns;
          state.defaultCheckList = checkList;
        } else {
          // const fixedColumns = columns.filter((item) =>
          //   Reflect.has(item, 'fixed')
          // ) as BasicColumn[];

          unref(plainOptions).forEach((item: BasicColumn) => {
            const findItem = columns.find((col: BasicColumn) => col.dataIndex === item.dataIndex);
            if (findItem) {
              item.fixed = findItem.fixed;
            }
          });
        }
        state.isInit = true;
        state.checkedList = checkList;
        // update-begin--author:liaozhiyang---date:20240612---for：【TV360X-105】列展示设置问题[列展示如果存在未勾选的列，保存并刷新后，列展示复选框样式会错乱]
        state.checkAll = columns.length === checkList.length;
        // update-end--author:liaozhiyang---date:20240612---for：【TV360X-105】列展示设置问题[列展示如果存在未勾选的列，保存并刷新后，列展示复选框样式会错乱]

        const arr = columns.filter((cItem) => state.checkedList.find((lItem) => lItem === cItem['value']));
        setColumns(arr);
      }

      // checkAll change
      function onCheckAllChange(e: CheckboxChangeEvent) {
        const checkList = plainOptions.value.map((item) => item.value);
        if (e.target.checked) {
          state.checkedList = checkList;

          const columns = getColumns();
          let arr = columns.filter((cItem) => state.checkedList.find((lItem) => lItem === cItem['value']));
          setColumns(arr);
        } else {
          state.checkedList = [];
          setColumns([]);
        }
      }

      const indeterminate = computed(() => {
        const len = plainOptions.value.length;
        let checkedLen = state.checkedList.length;
        // update-begin--author:liaozhiyang---date:20240612---for：【TV360X-105】列展示设置问题[列展示复选框不应该判断序号列复选框的状态]
        // unref(checkIndex) && checkedLen--;
        // update-end--author:liaozhiyang---date:20240612---for：【TV360X-105】列展示设置问题[列展示复选框不应该判断序号列复选框的状态]
        return checkedLen > 0 && checkedLen < len;
      });

      // Trigger when check/uncheck a column
      function onChange(checkedList: string[]) {
        const len = plainSortOptions.value.length;
        state.checkAll = checkedList.length === len;
        const sortList = unref(plainSortOptions).map((item) => item.value);
        checkedList.sort((prev, next) => {
          return sortList.indexOf(prev) - sortList.indexOf(next);
        });

        const columns = plainSortOptions.value;
        let arr = columns.filter((cItem) => checkedList.find((lItem) => lItem === cItem['value']));
        setColumns(arr);

        saveCols({
          cols: JSON.stringify({
            columns: columns,
            checkedList: checkedList,
          }),
        });
      }

      // reset columns
      function reset() {
        // update-begin--author:liaozhiyang---date:20240612---for：【TV360X-105】列展示设置问题[需要重置两次才回到初始状态]
        debugger;
        setColumns(table.getCacheColumns());
        setTimeout(() => {
          const columns = getColumns();
          // state.checkedList = [...state.defaultCheckList];
          // update-begin--author:liaozhiyang---date:20231103---for：【issues/825】tabel的列设置隐藏列保存后切换路由问题[重置没勾选]
          state.checkedList = table
            .getColumns({ ignoreAction: true })
            .map((item) => {
              return item.dataIndex || item.title;
            })
            .filter(Boolean) as string[];
          // update-end--author:liaozhiyang---date:20231103---for：【issues/825】tabel的列设置隐藏列保存后切换路由问题[重置没勾选]
          state.checkAll = true;
          plainOptions.value = unref(cachePlainOptions);
          plainSortOptions.value = unref(cachePlainOptions);
          restAfterOptions.value = columns;
          if (sortableOrder.value) {
            sortable.sort(sortableOrder.value);
          }
          resetSetting();
        }, 100);
        // update-end--author:liaozhiyang---date:20240612---for：【TV360X-105】列展示设置问题[需要重置两次才回到初始状态]
      }

      function getShowDataIndex(arr, idx) {
        let showIdx = 0;
        for (let i = 0; i < arr.length; i++) {
          const o = arr[i];
          if (false === o.ifShow) {
            continue;
          }
          if (showIdx >= idx) {
            // 必走这个逻辑
            return o.dataIndex;
          }
          showIdx++;
        }
        return '';
      }
      function roil(arr, idx) {
        let inc = 0;
        // 获取点击移动列的名称（唯一的）
        let dataIndex = getShowDataIndex(arr, idx);
        for (let i = 0; i < arr.length; i++) {
          const o = arr[i];
          if (false === o.ifShow) {
            // 记录有多少个隐藏列
            inc++;
          }
          if (o.dataIndex === dataIndex) {
            break;
          }
        }

        // 真实在下标 = 显示下标 + 前面的隐藏下标
        return idx + inc;
      }

      function saveCols(params: any) {
        params['category'] = getCategory();
        defHttp.post({ url: '/sys/cols/edit', params }, { isTransformResponse: false }).then((res) => {
          let obj = userStore.getColsSortMap;
          obj[params['category']] = JSON.parse(params.cols);
          userStore.setColsSortMap(obj);
        });
      }

      // Open the pop-up window for drag and drop initialization
      function handleVisibleChange() {
        if (inited) return;
        // update-begin--author:liaozhiyang---date:20240529---for：【TV360X-254】列设置闪现及苹果浏览器弹窗过长
        setTimeout(() => {
          // update-begin--author:liaozhiyang---date:20240529---for：【TV360X-254】列设置闪现及苹果浏览器弹窗过长
          const columnListEl = unref(columnListRef);
          if (!columnListEl) return;
          const el = columnListEl.$el as any;
          if (!el) return;
          // Drag and drop sort
          sortable = Sortablejs.create(unref(el), {
            animation: 500,
            delay: 400,
            delayOnTouchOnly: true,
            handle: '.table-column-drag-icon ',
            onEnd: (evt) => {
              // 列位置改变逻辑
              // 这个只是获取显示的列的下标（隐藏的并没有算，而columns里面包括隐藏列）
              const { oldIndex, newIndex } = evt;
              if (isNullAndUnDef(oldIndex) || isNullAndUnDef(newIndex) || oldIndex === newIndex) {
                return;
              }
              // Sort column
              const columns = cloneDeep(plainSortOptions.value);
              let oldIndex2 = roil(plainSortOptions.value, oldIndex);
              let newIndex2 = roil(plainSortOptions.value, newIndex);

              if (oldIndex2 > newIndex2) {
                columns.splice(newIndex2, 0, columns[oldIndex2]);
                columns.splice(oldIndex2 + 1, 1);
              } else {
                columns.splice(newIndex2 + 1, 0, columns[oldIndex2]);
                columns.splice(oldIndex2, 1);
              }

              saveCols({
                cols: JSON.stringify({
                  columns: columns,
                  checkedList: state.checkedList,
                }),
              });

              plainSortOptions.value = columns;
              // update-begin--author:liaozhiyang---date:20230904---for：【QQYUN-6424】table字段列表设置不显示后，再拖拽字段顺序，原本不显示的，又显示了
              // update-begin--author:liaozhiyang---date:20240522---for：【TV360X-108】刷新后勾选之前未勾选的字段拖拽之后该字段对应的表格列消失了
              let arr = columns.filter((cItem) => state.checkedList.find((lItem) => lItem === cItem['value']));
              setColumns(arr);
              // 最开始的代码
              // update-end--author:liaozhiyang---date:20240522---for：【TV360X-108】刷新后勾选之前未勾选的字段拖拽之后该字段对应的表格列消失了
              // update-end--author:liaozhiyang---date:20230904---for：【QQYUN-6424】table字段列表设置不显示后，再拖拽字段顺序，原本不显示的，又显示了
              // update-begin--author:liaozhiyang---date:20240611---for：【TV360X-105】列展示设置问题[重置之后保存的顺序还是上次的]
              restAfterOptions.value = null;
              // update-end--author:liaozhiyang---date:20240611---for：【TV360X-105】列展示设置问题[重置之后保存的顺序还是上次的]
            },
          });
          // 记录原始 order 序列
          if (!sortableOrder.value) {
            sortableOrder.value = sortable.toArray();
          }
          inited = true;
        }, 2000);
      }

      // Control whether the serial number column is displayed
      function handleIndexCheckChange(e: CheckboxChangeEvent) {
        table.setProps({
          showIndexColumn: e.target.checked,
        });
      }

      // Control whether the check box is displayed
      function handleSelectCheckChange(e: CheckboxChangeEvent) {
        table.setProps({
          rowSelection: e.target.checked ? defaultRowSelection : undefined,
        });
      }

      function handleColumnFixed(item: BasicColumn, fixed?: 'left' | 'right') {
        if (!state.checkedList.includes(item.dataIndex as string)) return;

        const columns = getColumns() as BasicColumn[];
        const isFixed = item.fixed === fixed ? false : fixed;
        const index = columns.findIndex((col) => col.dataIndex === item.dataIndex);
        if (index !== -1) {
          columns[index].fixed = isFixed;
        }
        item.fixed = isFixed;

        if (isFixed && !item.width) {
          item.width = 100;
        }
        table.setCacheColumnsByField?.(item.dataIndex as string, { fixed: isFixed });

        let arr = columns.filter((cItem) => state.checkedList.find((lItem) => lItem === cItem['value']));
        setColumns(arr);

        saveCols({
          cols: JSON.stringify({
            columns: columns,
            checkedList: state.checkedList,
          }),
        });
      }

      function setColumns(columns: BasicColumn[] | string[]) {
        table.setColumns(columns);
        const data: ColumnChangeParam[] = unref(plainSortOptions).map((col) => {
          const visible =
            columns.findIndex((c: BasicColumn | string) => c === col.value || (typeof c !== 'string' && c.dataIndex === col.value)) !== -1;
          return { dataIndex: col.value, fixed: col.fixed, visible };
        });

        emit('columns-change', data);
      }

      function getPopupContainer() {
        return isFunction(attrs.getPopupContainer) ? attrs.getPopupContainer() : getParentContainer();
      }

      return {
        getBindProps,
        t,
        ...toRefs(state),
        popoverVisible,
        indeterminate,
        onCheckAllChange,
        onChange,
        plainOptions,
        reset,
        saveSetting,
        prefixCls,
        columnListRef,
        handleVisibleChange,
        checkIndex,
        checkSelect,
        handleIndexCheckChange,
        handleSelectCheckChange,
        defaultRowSelection,
        handleColumnFixed,
        getPopupContainer,
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-basic-column-setting';

  .table-column-drag-icon {
    margin: 0 5px;
    cursor: move;
  }

  .@{prefix-cls} {
    &__popover-title {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    /* 卡片底部样式 */
    &__popover-footer {
      position: relative;
      top: 7px;
      text-align: right;
      padding: 4px 0 0;
      border-top: 1px solid #f0f0f0;

      .ant-btn {
        margin-right: 6px;
      }
    }

    &__check-item {
      display: flex;
      align-items: center;
      min-width: 100%;
      padding: 4px 16px 8px 0;

      .ant-checkbox-wrapper {
        width: 100%;

        &:hover {
          color: @primary-color;
        }
      }
    }

    &__fixed-left,
    &__fixed-right {
      color: rgba(0, 0, 0, 0.45);
      cursor: pointer;

      &.active,
      &:hover {
        color: @primary-color;
      }

      &.disabled {
        color: @disabled-color;
        cursor: not-allowed;
      }
    }

    &__fixed-right {
      transform: rotate(180deg);
    }

    &__cloumn-list {
      svg {
        width: 1em !important;
        height: 1em !important;
      }

      .ant-popover-inner-content {
        // max-height: 360px;
        padding-right: 0;
        padding-left: 0;
        // overflow: auto;
      }

      .ant-checkbox-group {
        // update-begin--author:liaozhiyang---date:20240118---for：【QQYUN-7887】表格列设置宽度过长
        // width: 100%;
        min-width: 260px;
        max-width: min-content;
        // update-end--author:liaozhiyang---date:20240118---for：【QQYUN-7887】表格列设置宽度过长
        // flex-wrap: wrap;
      }

      // update-begin--author:liaozhiyang---date:20240529---for：【TV360X-254】列设置闪现及苹果浏览器弹窗过长
      &.ant-popover,
      .ant-popover-content,
      .ant-popover-inner,
      .ant-popover-inner-content,
      .scroll-container,
      .scrollbar__wrap {
        max-width: min-content;
      }
      // update-end--author:liaozhiyang---date:20240529---for：【TV360X-254】列设置闪现及苹果浏览器弹窗过长
      .scrollbar {
        height: 220px;
      }
    }
  }
</style>
