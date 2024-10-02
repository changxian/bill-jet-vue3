<template>
  <a-spin :spinning="confirmLoading">
    <JFormContainer :disabled="formData.disabled">
      <template #detail>
        <a-card>
          <div style="display: flex; flex-direction: column">
            <a-space style="margin-bottom: 10px">
              <div>纸张调整:</div>
              <a-button type="text" @click="changeScale(false)">
                <span class="glyphicon glyphicon-minus"></span>
              </a-button>
              <a-input-number
                :value="scaleValue"
                :min="scaleMin"
                :max="scaleMax"
                :step="0.1"
                disabled
                style="width: 70px"
                :formatter="(value) => `${(value * 100).toFixed(0)}%`"
                :parser="(value) => value.replace('%', '')"
              />
              <a-button type="text" @click="changeScale(true)">
                <span class="glyphicon glyphicon-plus"></span>
              </a-button>
            </a-space>
            <a-space style="margin-bottom: 10px">
              <div>模板操作:</div>
              <json-view :template="template" />
              <a-button type="primary" @click="exportPdf('pdfobjectnewwindow')"> 导出查看pdf</a-button>
              <a-button type="primary" @click="preView">预览</a-button>
            </a-space>
            <a-space style="margin-bottom: 10px">
              <div>模板类型<span style="color: red"> *</span>：</div>
              <a-select
                v-model:value="formData.category"
                mode="combobox"
                style="width: 140px"
                readonly="readonly"
                placeholder="请选择模板类型"
                option-label-prop="label"
              >
                <a-select-option value="10" label="送货开单"> &nbsp;&nbsp;送货开单</a-select-option>
                <a-select-option value="20" label="进货开单"> &nbsp;&nbsp;进货开单</a-select-option>
                <a-select-option value="60" label="送货退货开单"> &nbsp;&nbsp;送货退货开单</a-select-option>
                <a-select-option value="70" label="进货退货开单"> &nbsp;&nbsp;进货退货开单</a-select-option>
              </a-select>
              <div>模板名称<span style="color: red"> *</span>：</div>
              <a-input v-model:value="formData.name" style="width: 328px" readonly="readonly" placeholder="请输入模板名称" />
            </a-space>
          </div>
          <!-- 预览 -->
          <print-preview ref="preView" />
        </a-card>
      </template>
    </JFormContainer>
  </a-spin>
</template>

<script defer>
  import '../public/css/bootstrap.min.css';
  import '../public/css/print-lock.css';
  import JFormContainer from '/@/components/Form/src/container/JFormContainer.vue';
  import * as vuePluginHiprint from './index';
  import panel from './panel.empty';
  import printData from './print-data';
  import printPreview from './TemplatePreview.vue';
  import jsonView from './json-view.vue';
  import { defineComponent } from 'vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createMessage } = useMessage();
  // disAutoConnect();
  var hiprint, defaultElementTypeProvider;
  let hiprintTemplate;

  export default defineComponent({
    name: 'TemplateDesignForm',
    components: { printPreview, jsonView, JFormContainer },
    data() {
      return {
        template: null,
        curPaper: {
          type: '三等分',
          width: 210,
          height: 93,
        },
        paperTypes: {
          三等分: {
            width: 210,
            height: 93,
          },
          二等分: {
            width: 210,
            height: 140,
          },
          一等分: {
            width: 210,
            height: 280,
          },
          A3: {
            width: 420,
            height: 296.6,
          },
          A4: {
            width: 210,
            height: 296.6,
          },
          A5: {
            width: 210,
            height: 147.6,
          },
          B3: {
            width: 500,
            height: 352.6,
          },
          B4: {
            width: 250,
            height: 352.6,
          },
          B5: {
            width: 250,
            height: 175.6,
          },
        },
        // 自定义纸张
        paperPopVisible: false,
        elsSpaceVisible: false,
        verSpaceVisible: false,
        elsSpace: 10,
        verSpace: 10,
        paperWidth: '210',
        paperHeight: '93',
        // 缩放
        scaleValue: 1,
        scaleMax: 5,
        scaleMin: 0.5,
        // 导入导出json
        jsonIn: '',
        confirmLoading: false,
        formData: {
          disabled: false,
          category: null,
          name: '',
          data: '',
        },
      };
    },
    computed: {
      curPaperType() {
        let type = 'other';
        let types = this.paperTypes;
        for (const key in types) {
          let item = types[key];
          let { width, height } = this.curPaper;
          if (item.width === width && item.height === height) {
            type = key;
          }
        }
        return type;
      },
    },
    mounted() {
      hiprint = vuePluginHiprint.hiprint;
      defaultElementTypeProvider = vuePluginHiprint.defaultElementTypeProvider;
      this.init();
    },
    methods: {
      init() {
        hiprint.init({
          providers: [new defaultElementTypeProvider()],
          lang: 'cn',
        });
        // 还原配置
        hiprint.setConfig();
        // 设置左侧拖拽事件
        hiprint.PrintElementTypeManager.buildByHtml($('.ep-draggable-item'));
        $('#hiprint-printTemplate').empty();
        this.template = hiprintTemplate = new hiprint.PrintTemplate({
          template: panel,
          // 图片选择功能
          onImageChooseClick: (target) => {
            // 测试 3秒后修改图片地址值
            setTimeout(() => {
              target.refresh(
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAtAAAAIIAQMAAAB99EudAAAABlBMVEUmf8vG2O41LStnAAABD0lEQVR42u3XQQqCQBSAYcWFS4/QUTpaHa2jdISWLUJjjMpclJoPGvq+1WsYfiJCZ4oCAAAAAAAAAAAAAAAAAHin6pL9c6H/fOzHbRrP0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0u/SY9LS0tLS0tLS0tLS0n+edm+UlpaWlpaWlpaWlpaW/tl0Ndyzbno7/+tPTJdd1wal69dNa6abx+Lq6TSeYtK7BX/Diek0XULSZZrakPRtV0i6Hu/KIt30q4fM0pvBqvR9mvsQkZaW9gyJT+f5lsnzjR54xAk8mAUeJyMPwYFH98ALx5Jr0kRLLndT7b64UX9QR/0eAAAAAAAAAAAAAAAAAAD/4gpryzr/bja4QgAAAABJRU5ErkJggg==',
                {
                  real: true, // 根据图片实际尺寸调整(转pt)
                }
              );
            }, 1000);
          },
          // 自定义可选字体
          // 或者使用 hiprintTemplate.setFontList([])
          // 或元素中 options.fontList: []
          fontList: [
            { title: '微软雅黑', value: 'Microsoft YaHei' },
            { title: '黑体', value: 'STHeitiSC-Light' },
            { title: '思源黑体', value: 'SourceHanSansCN-Normal' },
            { title: '王羲之书法体', value: '王羲之书法体' },
            { title: '宋体', value: 'SimSun' },
            { title: '华为楷体', value: 'STKaiti' },
            { title: 'cursive', value: 'cursive' },
          ],
          dataMode: 1, // 1:getJson 其他：getJsonTid 默认1
          history: true, // 是否需要 撤销重做功能
          willOutOfBounds: false, // 是否允许组件内的控件超出范围
          qtDesigner: true, // 是否开启类似QT Designer的唯一field生成模式
          onDataChanged: (type, json) => {
            console.log(type); // 新增、移动、删除、修改(参数调整)、大小、旋转
            console.log(json); // 返回 template
          },
          onUpdateError: (e) => {
            console.log(e);
          },
          settingContainer: '#PrintElementOptionSetting',
          paginationContainer: '.hiprint-printPagination',
        });
        hiprintTemplate.design('#hiprint-printTemplate', { grid: true });
        console.log(hiprintTemplate);
        // 获取当前放大比例, 当zoom时传true 才会有
        this.scaleValue = hiprintTemplate.editingPanel.scale || 1;
      },
      /**
       * 设置纸张大小
       * @param type [A3, A4, A5, B3, B4, B5, other]
       * @param value {width,height} mm
       */
      setPaper(type, value) {
        try {
          if (Object.keys(this.paperTypes).includes(type)) {
            this.curPaper = { type: type, width: value.width, height: value.height };
            hiprintTemplate.setPaper(value.width, value.height);
          } else {
            this.curPaper = { type: 'other', width: value.width, height: value.height };
            hiprintTemplate.setPaper(value.width, value.height);
          }
        } catch (error) {
          createMessage.error(`操作失败: ${error}`);
        }
      },
      otherPaper() {
        let value = {
          width: this.paperWidth,
          height: this.paperHeight,
        };
        this.paperPopVisible = false;
        this.setPaper('other', value);
      },
      changeScale(big) {
        let scaleValue = this.scaleValue;
        if (big) {
          scaleValue += 0.1;
          if (scaleValue > this.scaleMax) scaleValue = 5;
        } else {
          scaleValue -= 0.1;
          if (scaleValue < this.scaleMin) scaleValue = 0.5;
        }
        if (hiprintTemplate) {
          // scaleValue: 放大缩小值, false: 不保存(不传也一样), 如果传 true, 打印时也会放大
          hiprintTemplate.zoom(scaleValue);
          this.scaleValue = scaleValue;
        }
      },
      preView() {
        // 测试, 点预览更新拖拽元素
        hiprint.updateElementType('defaultModule.text', (type) => {
          type.title = '这是更新后的元素';
          return type;
        });
        // 测试, 通过socket刷新打印机列表； 默认只有连接的时候才会获取到最新的打印机列表
        hiprint.refreshPrinterList((list) => {
          console.log('refreshPrinterList');
          console.log(list);
        });
        // 测试, 获取IP、IPV6、MAC地址、DNS
        // 参数格式：
        // 1. 类型（ip、ipv6、mac、dns、all、interface、vboxnet）
        // 2. 回调 data => {addr, e}  addr: 返回的数据 e:错误信息
        // 3. 其他参数 ...args
        hiprint.getAddress('ip', (data) => {
          console.log('ip');
          console.log(data);
        });
        hiprint.getAddress('ipv6', (data) => {
          console.log('ipv6');
          console.log(data);
        });
        hiprint.getAddress('mac', (data) => {
          console.log('mac');
          console.log(data);
        });
        hiprint.getAddress('dns', (data) => {
          console.log('dns');
          console.log(data);
        });
        hiprint.getAddress('all', (data) => {
          console.log('all');
          console.log(data);
        });
        // 各个平台不一样, 用法见: https://www.npmjs.com/package/address
        hiprint.getAddress(
          'interface',
          (data) => {
            console.log('interface');
            console.log(data);
          },
          'IPv4',
          'eth1'
        );
        this.$refs.preView.show(hiprintTemplate, printData);
      },
      exportPdf(type) {
        hiprintTemplate.toPdf(printData, '测试导出pdf', { isDownload: false, type: type }).then((res) => {
          console.log('type:', type);
          console.log(res);
        });
      },
      setElsAlign(e) {
        hiprintTemplate.setElsAlign(e);
      },
      setElsSpace(h, size) {
        this.elsSpaceVisible = false;
        this.verSpaceVisible = false;
        hiprintTemplate.setElsSpace(size >>> 0, h);
      },
    },
  });
</script>

<style lang="less" scoped>
  // 拖拽
  .drag_item_box {
    height: 100%;
    padding: 6px;
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
