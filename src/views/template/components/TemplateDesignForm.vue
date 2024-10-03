<template>
  <a-card>
    <div style="display: flex; flex-direction: column">
      <a-space style="margin-bottom: 10px">
        <div>纸张设置:</div>
        <a-button-group>
          <template v-for="(value, type) in paperTypes" :key="type">
            <a-button :type="curPaperType === type ? 'primary' : 'default'" @click="setPaper(type, value)">{{ type }}</a-button>
          </template>
          <a-popover v-model:visible="paperPopVisible" title="设置纸张宽高(mm)" trigger="click">
            <template #content>
              <div>
                <a-input-group compact style="margin: 10px 0px">
                  <a-input type="number" v-model:value="paperWidth" style="width: 100px; text-align: center" placeholder="宽(mm)" />
                  <a-input style="width: 30px; border-left: 0; pointer-events: none; backgroundcolor: #fff" placeholder="~" disabled />
                  <a-input type="number" v-model:value="paperHeight" style="width: 100px; text-align: center; border-left: 0" placeholder="高(mm)" />
                </a-input-group>
                <a-button style="width: 100%" @click="otherPaper">确定</a-button>
              </div>
            </template>
            <a-button :type="'other' === curPaperType ? 'primary' : 'default'">自定义纸张</a-button>
          </a-popover>
        </a-button-group>
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
        <div>选中设置:</div>
        <a-popover v-model:visible="elsSpaceVisible" title="设置水平间距(mm)" trigger="click">
          <template #content>
            <div>
              <a-input-group compact style="margin: 5px 0">
                <a-input type="number" v-model:value="elsSpace" style="width: 100%; text-align: center" placeholder="水平间距(mm)" />
              </a-input-group>
              <a-button style="width: 100%" @click="setElsSpace(true, elsSpace)">确定</a-button>
            </div>
          </template>
          <a-button type="primary">水平间距</a-button>
        </a-popover>
        <a-popover v-model:visible="verSpaceVisible" title="设置垂直间距(mm)" trigger="click">
          <template #content>
            <div>
              <a-input-group compact style="margin: 5px 0">
                <a-input type="number" v-model:value="verSpace" style="width: 100%; text-align: center" placeholder="垂直间距(mm)" />
              </a-input-group>
              <a-button style="width: 100%" @click="setElsSpace(false, verSpace)">确定</a-button>
            </div>
          </template>
          <a-button type="primary">垂直间距</a-button>
        </a-popover>
        <a-radio-group>
          <a-radio-button @click="setElsAlign('left')" title="左对齐">
            <span class="glyphicon glyphicon-object-align-left"> 左对齐</span>
          </a-radio-button>
          <a-radio-button @click="setElsAlign('vertical')" title="居中">
            <span class="glyphicon glyphicon-object-align-vertical"> 居中</span>
          </a-radio-button>
          <a-radio-button @click="setElsAlign('right')" title="右对齐">
            <span class="glyphicon glyphicon-object-align-right"> 右对齐</span>
          </a-radio-button>
          <a-radio-button @click="setElsAlign('top')" title="顶部对齐">
            <span class="glyphicon glyphicon-object-align-top"> 顶部对齐</span>
          </a-radio-button>
          <a-radio-button @click="setElsAlign('horizontal')" title="垂直居中">
            <span class="glyphicon glyphicon-object-align-horizontal"> 垂直居中</span>
          </a-radio-button>
          <a-radio-button @click="setElsAlign('bottom')" title="底部对齐">
            <span class="glyphicon glyphicon-object-align-bottom"> 底部对齐</span>
          </a-radio-button>
          <a-radio-button @click="setElsAlign('distributeHor')" title="横向分散">
            <span class="glyphicon glyphicon-resize-horizontal"> 横向分散</span>
          </a-radio-button>
          <a-radio-button @click="setElsAlign('distributeVer')" title="纵向分散">
            <span class="glyphicon glyphicon-resize-vertical"> 纵向分散</span>
          </a-radio-button>
        </a-radio-group>
      </a-space>
      <a-space style="margin-bottom: 10px">
        <div>模板操作:</div>
        <json-view :template="template" />
        <a-button type="primary" @click="exportPdf('pdfobjectnewwindow')"> 导出查看pdf</a-button>
        <a-button type="primary" @click="preView">预览</a-button>
        <a-button type="primary" @click="print"> 直接打印 </a-button>
        <a-textarea
          style="width: 24.2vw"
          v-model:value="jsonIn"
          @press-enter="updateJson"
          placeholder="复制json模板到此后 点击右侧更新"
          allow-clear
        />
        <a-button type="primary" @click="updateJson"> 更新模板 </a-button>
        <a-popconfirm title="是否确认清空?" okType="danger" okText="确定清空" @confirm="clearPaper">
          <template #icon>
            <a-icon type="question-circle-o" style="color: red" />
          </template>
          <a-button type="primary" danger>清空设计板<a-icon type="close" /></a-button>
        </a-popconfirm>
      </a-space>
      <a-space style="margin-bottom: 10px">
        <div>模板类型<span style="color: red"> *</span>：</div>
        <a-select v-model:value="form.category" mode="combobox" style="width: 140px" placeholder="请选择模板类型" option-label-prop="label">
          <a-select-option :value="10" label="送货开单"> &nbsp;&nbsp;送货开单</a-select-option>
          <a-select-option :value="20" label="进货开单"> &nbsp;&nbsp;进货开单</a-select-option>
          <a-select-option :value="60" label="送货退货开单"> &nbsp;&nbsp;送货退货开单</a-select-option>
          <a-select-option :value="70" label="进货退货开单"> &nbsp;&nbsp;进货退货开单</a-select-option>
        </a-select>
        <div>模板名称<span style="color: red"> *</span>：</div>
        <a-input v-model:value="form.name" style="width: 328px" placeholder="请输入模板名称" />
      </a-space>
    </div>
    <a-row :gutter="[8, 0]">
      <a-col :span="4">
        <a-card style="height: 80vh">
          <a-row>
            <a-col :span="24" class="rect-printElement-types hiprintEpContainer">
              <a-row class="drag_item_title">拖拽组件列表</a-row>
              <div style="height: 21vh; width: 180px; overflow: auto">
                <TemplateTableProvider />
              </div>
              <a-row class="drag_item_title">基础组件</a-row>
              <a-row style="height: 80px">
                <a-col :span="8" class="drag_item_box">
                  <div>
                    <a class="ep-draggable-item" tid="defaultModule.text">
                      <span class="glyphicon glyphicon-text-width" aria-hidden="true"></span>
                      <p class="glyphicon-class">文本</p>
                    </a>
                  </div>
                </a-col>
                <a-col :span="8" class="drag_item_box">
                  <div>
                    <a class="ep-draggable-item" tid="defaultModule.image">
                      <span class="glyphicon glyphicon-picture" aria-hidden="true"></span>
                      <p class="glyphicon-class">图片</p>
                    </a>
                  </div>
                </a-col>
                <a-col :span="8" class="drag_item_box">
                  <div>
                    <a class="ep-draggable-item" tid="defaultModule.longText">
                      <span class="glyphicon glyphicon-subscript" aria-hidden="true"></span>
                      <p class="glyphicon-class">长文</p>
                    </a>
                  </div>
                </a-col>
              </a-row>
              <a-row class="drag_item_title">辅助</a-row>
              <a-row style="height: 80px">
                <a-col :span="8" class="drag_item_box">
                  <div>
                    <a class="ep-draggable-item" tid="defaultModule.hline">
                      <span class="glyphicon glyphicon-resize-horizontal" aria-hidden="true"></span>
                      <p class="glyphicon-class">横线</p>
                    </a>
                  </div>
                </a-col>
                <a-col :span="8" class="drag_item_box">
                  <div>
                    <a class="ep-draggable-item" tid="defaultModule.vline">
                      <span class="glyphicon glyphicon-resize-vertical" aria-hidden="true"></span>
                      <p class="glyphicon-class">竖线</p>
                    </a>
                  </div>
                </a-col>
                <a-col :span="8" class="drag_item_box">
                  <div>
                    <a class="ep-draggable-item" tid="defaultModule.rect">
                      <span class="glyphicon glyphicon-unchecked" aria-hidden="true"></span>
                      <p class="glyphicon-class">矩形</p>
                    </a>
                  </div>
                </a-col>
              </a-row>
              <a-row style="height: 80px">
                <a-col :span="8" class="drag_item_box">
                  <div>
                    <a class="ep-draggable-item" tid="defaultModule.oval">
                      <span class="glyphicon glyphicon-record" aria-hidden="true"></span>
                      <p class="glyphicon-class">椭圆</p>
                    </a>
                  </div>
                </a-col>
                <a-col :span="8" class="drag_item_box">
                  <div>
                    <a class="ep-draggable-item" tid="defaultModule.barcode">
                      <span class="glyphicon glyphicon-barcode" aria-hidden="true"></span>
                      <p class="glyphicon-class">条形码</p>
                    </a>
                  </div>
                </a-col>
                <a-col :span="8" class="drag_item_box">
                  <div>
                    <a class="ep-draggable-item" tid="defaultModule.qrcode">
                      <span class="glyphicon glyphicon-qrcode" aria-hidden="true"></span>
                      <p class="glyphicon-class">二维码</p>
                    </a>
                  </div>
                </a-col>
              </a-row>
              <a-row style="height: 80px">
                <a-col :span="8" class="drag_item_box">
                  <div>
                    <a class="ep-draggable-item" tid="defaultModule.html">
                      <span class="glyphicon glyphicon-header" aria-hidden="true"></span>
                      <p class="glyphicon-class">html</p>
                    </a>
                  </div>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
      <a-col :span="15">
        <a-card class="card-design">
          <div id="hiprint-printTemplate" class="hiprint-printTemplate"></div>
        </a-card>
      </a-col>
      <a-col :span="5" class="params_setting_container">
        <a-card>
          <a-row class="hinnn-layout-sider">
            <div id="PrintElementOptionSetting"></div>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
    <!-- 预览 -->
    <print-preview ref="preView" />
  </a-card>
</template>

<script defer>
  import '../public/css/bootstrap.min.css';
  import '../public/css/print-lock.css';
  import * as vuePluginHiprint from './index';
  import panel from './panel.empty';
  import printData from './print-data';
  import printPreview from './TemplatePreview.vue';
  import TemplateTableProvider from './TemplateTableProvider.vue';
  import jsonView from './json-view.vue';
  import { saveOrUpdate } from '../Template.api';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createMessage } = useMessage();
  // vuePluginHiprint.disAutoConnect();
  var hiprint, defaultElementTypeProvider;
  let hiprintTemplate;

  export default {
    name: 'TemplateDesignForm',
    components: { printPreview, jsonView, TemplateTableProvider },
    props: {
      formData: {
        type: Object,
        default: () => {
          return {
            disabled: false,
            category: null,
            id: '',
            name: '',
            data: '',
            status: '1',
          };
        },
      },
    },
    emits: ['ok'],
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
        form: {
          disabled: false,
          category: null,
          id: '',
          name: '',
          data: '',
          status: '1',
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
    watch: {
      ['formData.data']() {
        this.init();
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

        this.form = {
          ...this.formData,
        };
        let panels;
        if (this.form && this.form.data) {
          panels = JSON.parse(this.form.data);
        } else {
          panels = panel;
        }
        $('#hiprint-printTemplate').empty();
        this.template = hiprintTemplate = new hiprint.PrintTemplate({
          template: panels,
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
      print() {
        this.doOperationWhenClientConnected(() => {
          const printerList = hiprintTemplate.getPrinterList();
          console.log(printerList);
          hiprintTemplate.print2(printData, { printer: '', title: 'hiprint测试打印' });
        });
      },
      doOperationWhenClientConnected(operation) {
        if (window['hiwebSocket'] && window['hiwebSocket'].opened) {
          operation?.();
          return;
        }
        createMessage.error({
          content: '客户端未连接',
          duration: 2,
        });
      },
      submitForm() {
        if (!this.form.category) {
          createMessage.error(`模板类型不能为空`);
          return;
        }
        if (!this.form.name) {
          createMessage.error(`模板名称不能为空`);
          return;
        }
        this.exportJson();
        if (!this.form.data) {
          createMessage.error(`模板数据生成异常！`);
          return;
        }
        this.form.spec = JSON.stringify(this.curPaper);
        saveOrUpdate(this.form, this.form.id).then(() => {
          this.$emit('ok');
        });
      },
      disConnect() {
        window.hiwebSocket && window.hiwebSocket.hasIo() && window.hiwebSocket.stop();
      },
      clearPaper() {
        try {
          hiprintTemplate.clear();
        } catch (error) {
          createMessage.error(`操作失败: ${error}`);
        }
      },
      exportPdf(type) {
        hiprintTemplate.toPdf(printData, '测试导出pdf', { isDownload: false, type: type }).then((res) => {
          console.log('type:', type);
          console.log(res);
        });
      },
      updateJson() {
        if (hiprintTemplate) {
          try {
            hiprintTemplate.update(JSON.parse(this.jsonIn));
          } catch (e) {
            createMessage.error(`更新失败: ${e}`);
          }
        }
      },
      exportJson() {
        if (hiprintTemplate) {
          this.form.data = JSON.stringify(hiprintTemplate.getJson() || {});
        }
      },
      setElsAlign(e) {
        hiprintTemplate.setElsAlign(e);
      },
      setElsSpace(h, size) {
        this.elsSpaceVisible = false;
        this.verSpaceVisible = false;
        hiprintTemplate.setElsSpace(size >>> 0, h);
      },
      setEleSelectByField() {
        hiprintTemplate.selectElementsByField(['name']);
      },
      getSelectEls() {
        let els = hiprintTemplate.getSelectEls();
        console.log(els);
      },
      updateFontSize() {
        hiprintTemplate.updateOption('fontSize', 12);
      },
      updateFontWeight() {
        hiprintTemplate.updateOption('fontWeight', 'bolder');
      },
    },
  };
</script>

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
