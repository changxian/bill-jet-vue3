<template>
  <div style="overflow: hidden; height: 100%">
    <a-card style="width: 100%; margin-top: 5px; height: 100%; overflow-y: scroll"> 测试页面 </a-card>
    <div class="s-bottom">
      <a class="s-link">主动发postMessage</a>
      <a-button @click="copy">主动发window.parent.postMessage</a-button>
      <a-button @click="copy">主动发window.postMessage</a-button>
    </div>
  </div>
</template>

<script>
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createMessage } = useMessage();

  (function () {
    const script = document.createElement('script');
    script.src = 'https://res.wx.qq.com/open/js/jweixin-1.3.2.js';
    script.async = true;
    document.head.appendChild(script);
  })();

  export default {
    name: 'PostMessageTest',
    components: {},
    props: {
      printSetting: {
        type: Object,
        default: () => ({}),
      },
    },
    emits: ['setting'],
    data() {
      return {
        previewContentStyle: {}, // 放大缩小样式
        hTemplate: null,
        printData: null,
        // 渲染的模板
        template: {},
        copyText: '',
        copyName: '',
      };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
      this.autoInvoke();
    },
    methods: {
      async copy() {
        try {
          createMessage.success('开始发 wx.miniProgram.postMessage');
          wx.miniProgram.postMessage({ data: { foo: 'bar' } });
          createMessage.success('已发 wx.miniProgram.postMessage');
        } catch (e) {
          createMessage.error(JSON.stringify(e));
        }
        try {
          window.parent.postMessage(
            { data: { action: 'fromH5', value: 'window.parent.postMessage! copy try2.', env: window.__wxjs_environment } },
            '*'
          );
        } catch (e) {
          createMessage.error(JSON.stringify(e));
        }
      },
      autoInvoke() {
        try {
          window.postMessage({ data: { action: 'fromH5', value: 'window.postMessage! autoInvoke1. ', env: window.__wxjs_environment } }, '*');
        } catch (e) {
          createMessage.error(JSON.stringify(e));
        }
        try {
          if (window.__wxjs_environment === 'miniprogram') {
            window.parent.postMessage({ data: { action: 'fromH5', value: 'window.parent.postMessage! autoInvoke2. ', env: window.__wxjs_environment } }, '*');
          } else {
            createMessage.warn('不在小程序环境中');
          }
        } catch (e) {
          createMessage.error(JSON.stringify(e));
        }
      },
    },
  };
</script>

<style lang="less" scoped>
  :deep(.ant-card-body) {
    padding: 0 !important;
  }
  :deep(.hiprint-printPaper) {
    transform: scale(0.42);
    transform-origin: left top 0;
  }
  .jcx-card {
    box-shadow:
      0 1px 2px 0 rgba(0, 0, 0, 0.03),
      0 1px 6px -1px rgba(0, 0, 0, 0.02),
      0 2px 4px 0 rgba(0, 0, 0, 0.02);
    box-sizing: border-box;
    margin: 0;
    padding: 5px;
    color: rgba(51, 51, 51, 0.88);
    font-size: 14px;
    line-height: 1.5714285714285714;
    list-style: none;
    font-family:
      -apple-system,
      BlinkMacSystemFont,
      Segoe UI,
      PingFang SC,
      Hiragino Sans GB,
      Microsoft YaHei,
      Helvetica Neue,
      Helvetica,
      Arial,
      sans-serif,
      Apple Color Emoji,
      Segoe UI Emoji,
      Segoe UI Symbol;
    position: relative;
    background: #ffffff;
    border-radius: 4px;
  }
  :where(.view-modal-preview).ant-card .ant-card-body {
    padding: 2px;
    border-radius: 0 0 4px 4px;
  }
  .jeecg-basic-table-form-container {
    padding: 0;
    .table-page-search-submitButtons {
      display: block;
      margin-bottom: 24px;
      white-space: nowrap;
    }
    .query-group-cust {
      min-width: 100px !important;
    }
    .query-group-split-cust {
      width: 30px;
      display: inline-block;
      text-align: center;
    }
    .ant-form-item:not(.ant-form-item-with-help) {
      margin-bottom: 16px;
      height: 32px;
    }
    :deep(.ant-picker),
    :deep(.ant-input-number) {
      width: 100%;
    }
  }
  .s-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 15px;
    box-shadow: -1px -1px 5px 5px #eeeeee;
  }
  .s-link {
    word-wrap: break-word;
    margin-right: 15px;
  }
</style>
