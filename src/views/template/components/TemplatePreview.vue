<template>
  <a-modal :visible="visible" :maskClosable="false" @cancel="hideModal" :width="width + 'mm'">
    <a-spin :spinning="spinning" style="min-height: 100px">
      <div id="preview_content_design"></div>
    </a-spin>
    <template #title>
      <a-space>
        <div style="margin-right: 20px">打印预览</div>
        <!--<a-button :loading="waitShowPrinter" type="primary" icon="printer" @click.stop="print">打印</a-button>-->
        <!--<a-button type="primary" icon="printer" @click.stop="toPdf">pdf</a-button>-->
        <a-button type="primary" icon="" @click.stop="toImage">PNG</a-button>
      </a-space>
    </template>
    <template #footer>
      <a-button key="close" type="info" @click="hideModal"> 关闭 </a-button>
    </template>
  </a-modal>
</template>

<script>
  import { roil } from '@/views/template/view/index.api';
  import html2canvas from 'html2canvas';
  import JSZip from 'jszip';
  import FileSaver from 'file-saver';

  export default {
    name: 'PrintPreview',
    props: {},
    data() {
      return {
        visible: false,
        spinning: true,
        waitShowPrinter: false,
        // 纸张宽 mm
        width: 0,
        // 模板
        hiprintTemplate: {},
        // 数据
        printData: {},
      };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      hideModal() {
        this.visible = false;
      },
      show(hiprintTemplate, printData, width = '210') {
        this.visible = true;
        this.spinning = true;
        this.width = hiprintTemplate.editingPanel ? hiprintTemplate.editingPanel.width : width;
        this.hiprintTemplate = hiprintTemplate;

        roil(printData['table'], 1);
        this.printData = printData;
        setTimeout(() => {
          // eslint-disable-next-line no-undef
          let html = hiprintTemplate.getHtml(printData);
          $('#preview_content_design').html(html);
          this.spinning = false;
        }, 500);
      },
      print() {
        this.waitShowPrinter = true;
        this.hiprintTemplate.print(
          this.printData,
          {},
          {
            callback: () => {
              console.log('callback');
              this.waitShowPrinter = false;
            },
          }
        );
      },
      toPdf(type = 'pdfobjectnewwindow') {
        this.hiprintTemplate.toPdf(this.printData, '打印预览', { isDownload: false, type: type });
      },
      //base64转blob
      dataURLtoBlob(dataurl) {
        return new Promise((resolve, reject) => {
          var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          resolve(new Blob([u8arr], { type: mime }));
        });
      },
      filesToRar(arrImages, filename) {
        let _this = this;
        let zip = new JSZip();
        let cache = {};
        let promises = [];
        _this.title = '正在加载压缩文件';
        for (let item of arrImages) {
          const promise = _this.dataURLtoBlob(item.fileUrl).then((data) => {
            // 下载文件, 并存成ArrayBuffer对象(blob)
            zip.file(item.renameFileName, data, { binary: true }); // 逐个添加文件
            cache[item.renameFileName] = data;
          });
          promises.push(promise);
        }
        Promise.all(promises)
          .then(() => {
            zip.generateAsync({ type: 'blob' }).then((content) => {
              _this.title = '正在压缩';
              // 生成二进制流
              console.dir(new Date());
              FileSaver.saveAs(content, filename); // 利用file-saver保存文件 自定义文件名
              _this.title = '压缩完成';
            });
          })
          .catch((res) => {
            _this.$message.error('文件压缩失败');
          });
      },
      toImage() {
        var _this = this;
        var objs = document.querySelectorAll('.hiprint-printPaper');
        //多个文件夹里面包含png文件
        // let blogTitle = this.fileName;
        // let zip = new JSZip();
        var srcs = [];
        objs.forEach(function (item, n) {
          //整个图片转换完并赋值给图片容器
          html2canvas(item, {
            useCORS: true, // 开启跨域配置
            height: item.scrollHeight, //canvas高
            width: item.scrollWidth, //canvas宽
            scale: 4, //按比例增加分辨率 (2=双倍).
            dpi: window.devicePixelRatio * 4, //设备像素比
          }).then((canvas) => {
            const base64 = canvas.toDataURL('image/png');
            if (objs.length === 1) {
              const link = document.createElement('a');
              link.href = base64;
              link.setAttribute('download', _this.fileName);
              link.click();
            } else {
              var img = {
                renameFileName: '图片' + (n + 1) + '.jpg',
                fileUrl: base64,
              };
              srcs.push(img);
              if (srcs.length === objs.length) {
                _this.filesToRar(srcs, _this.fileName);
              }
            }
          });
        });
      },
    },
  };
</script>
<style lang="less" scoped>
  :deep(.ant-modal-body) {
    padding: 0px;
  }

  :deep(.ant-modal-content) {
    margin-bottom: 24px;
  }
</style>
