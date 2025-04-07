<!-- src/views/system/protocol/ProtocolModel.vue -->
<template>
  <BasicModal @register="registerModal" width="980px" :height="620" title="购买须知及使用协议" @ok="handleOk" destroyOnClose :canFullscreen="false">
    <a-card class="protocol-container">
      <div class="protocol-header">
        <h1>《购买须知及使用协议》</h1>
        <div class="effective-date">生效日期：2025年4月8日</div>
      </div>

      <div class="protocol-content">
        <section class="chapter">
          <article class="clause">
            <p>尊敬的客户：</p>
            <p>感谢您选择贵州鑫泓瀛科技有限公司（以下简称“本公司”）的产品与服务。在购买或使用本公司软件前，请仔细阅读本《购买须知及使用协议》（以下简称“协议”）。本协议是您（个人或企业，以下简称“用户”或“客户”）与本公司之间的法律合同，明确双方的权利与义务。若您不同意以下任何条款，请勿购买或使用本软件；一旦完成购买、安装或使用，即视为您已充分理解并接受本协议的全部内容。</p>
          </article>
        </section>

        <section class="chapter">
          <h2>第一部分 购买须知</h2>
          <article class="clause">
            <h3>第一条 产品说明</h3>
            <p>计算机运行程序及有关的其他文件（存储于服务器、云盘或其他磁性介质中）</p>
            <p>本公司提供的软件产品（以下简称“本软件”）包括但不限于：</p>
            <p>软件授权许可（需根据购买版本确定使用权限）</p>
            <p>技术支持服务，更新与维护（以购买时约定的服务期限为准）。</p>
          </article>
          <article class="clause">
            <h3>第二条 购买流程</h3>
            <p>授权方式：本软件采用许可证授权模式，用户需通过官网或授权代理商购买正版授权码。</p>
            <p>发票与凭证：购买后请妥善保存订单号、电子发票及授权文件，作为售后服务的依据。</p>
            <p>退款政策：数字产品一经激活或下载，若非质量问题，原则上不予退款。若因技术兼容性问题无法使用，需在购买后7日内联系客服并提供有效证明。</p>
          </article>
        </section>

        <section class="chapter">
          <h2>第二部分 使用协议</h2>
          <article class="clause">
            <h3>第一条 软件许可</h3>
            <p>许可范围：本公司授予用户非独占、不可转让的有限使用权，仅限用户在协议约定的范围内使用。禁止拆分许可、出租、转售或用于未经授权的商业用途。</p>
            <p>授权类型：</p>
            <p>云端版：需根据实际购买授权数量绑定设备或用户。</p>
            <p>单机版：仅限单一用户在一台设备上使用，自己备份数据。</p>
          </article>
          <article class="clause">
            <h3>第二条 用户义务</h3>
            <p>合法使用：不得利用本软件从事违法活动（如黑客攻击、数据窃取等），禁止反向工程、修改、破解软件或绕过许可证验证。</p>
            <p>信息安全：若软件需注册账户，用户需提供真实信息并妥善保管账号密码。</p>
          </article>
          <article class="clause">
            <h3>第三条 隐私与数据</h3>
            <p>您同意个人隐私信息是指那些能够对您进行个人辨识或涉及个人通信的信息，包括：姓名、身份证号、电子邮件地址信息、财务及业务数据和信息。我公司不会收集您的前述个人隐私信息。非个人隐私信息是指您对本软件产品的License文件及相关信息、操作状态、使用习惯等一些在上述个人隐私信息之外的普通信息。我公司将可能基于下列原因需要收集您的前述普通信息。</p>
            <p>1、执行软件验证服务。</p>
            <p>2、执行软件升级服务。</p>
            <p>3、网络同步服务。</p>
            <p>4、提高用户的使用安全性并提供客户支持。</p>
            <p>5、因用户使用本软件特定功能或因用户要求我公司或代理商、经销商提供特定服务时，我公司或代理商、经销商需要把用户的信息提供给与此相关联的第三方。</p>
            <p>6、其他有利于用户和我公司利益的。我公司将采取措施保护您的上述普通信息，除依据法律规定或有法律赋予权限的政府部门要求或您同意或为了维护我公司的合法权益等原因外，我公司未经您的同意不会向第三方提供、公开、透露您的普通信息，但因下列原因而披露给第三方的除外：</p>
            <p>（1）基于国家法律法规的规定而对外披露；</p>
            <p>（2）应国家司法机关及其他有关机关基于法定程序的要求而披露；</p>
            <p>（3）为保护我公司或您的合法权益而披露；</p>
            <p>（4）在紧急情况下，为保护其他用户及第三方人身安全而披露；</p>
            <p>（5）用户本人或用户监护人授权披露的；</p>
            <p>（6）应用户监护人合法要求而提供用户个人身份信息时。</p>
          </article>
          <article class="clause">
            <h3>第四条 免责声明</h3>
            <p>1.我公司或其经销商、代理商对您所承担的赔偿责任以您所支付的本软件产品使用许可费用金额为限。</p>
            <p>2.本软件按“现状”提供，本公司不承诺其完全无缺陷或适用于所有场景。</p>
            <p>因用户操作不当、设备故障或不可抗力导致的数据损失，本公司不承担责任。</p>
            <p>3.如果您停止使用本软件或本服务，或因您违反法律法规或本协议而被取消或终止使用本服务，我公司有权从服务器上永久地删除您的数据。您的服务停止、终止或取消后，我公司没有义务向您返还任何数据，不承担因此所产生的间接损害赔偿责任。</p>
          </article>
          <article class="clause">
            <h3>第五条 服务与支持</h3>
            <p>技术支持：付费用户可享受协议期内免费技术咨询（服务范围以购买时约定为准）。</p>
            <p>软件更新：在服务期内，用户可免费获取功能更新；重大版本升级可能需要额外购买。</p>
          </article>
          <article class="clause">
            <h3>第六条 协议变更与终止</h3>
            <p>本公司有权根据业务需要修订本协议，并通过官网或邮件通知用户。</p>
            <p>若用户违反协议，本公司有权终止许可并追究法律责任。</p>
          </article>
        </section>

        <section class="chapter">
          <h2>第三部分 其他条款</h2>
          <article class="clause">
            <p>知识产权：本软件的所有权、著作权、商标权归鑫泓软件独家所有。</p>
            <p>法律适用：本协议受中华人民共和国法律管辖，争议提交本公司所在地法院诉讼解决，本协议的各项条款具有可分割性，如果某一条款被适用法律认定为无效，则其他条款不受影响，应继续有效并执行。</p>
            <p>联系方式：15599182688</p>
            <p>客服邮箱：3968309150@qq.com</p>
            <p>官方网址：www.xinhsoft.com</p>
          </article>
          <article class="clause">
            <h3>最后提示：</h3>
            <p>请务必在购买前确认软件版本、授权范围及售后服务条款。</p>
            <p>建议留存本协议副本以备查阅。</p>
            <p>生效日期：2025年4月8日</p>
            <p>版本号：V2.0</p>
          </article>
        </section>
      </div>
      <div class="protocol-footer">
        <p>最终解释权归贵州鑫泓瀛科技有限公司所有</p>
      </div>
    </a-card>
  </BasicModal>
</template>

<script>
  import { BasicModal, useModalInner } from "@/components/Modal";
  import { defineComponent } from "vue";

  export default defineComponent({
    name: 'ProtocolModel',
    components: { BasicModal },
    setup(props, { emit }) {
      //表单赋值
      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        setModalProps({ confirmLoading: false });
      });
      /**
       * 第三方配置点击事件
       */
      function handleOk() {
        closeModal();
      }
      /**
       * 关闭弹窗
       */
      function handleCancel() {
        closeModal();
      }
      return {
        registerModal,
        handleOk,
      };
    }
  });
</script>

<style scoped lang="less">
.protocol-container {
  max-width: 1000px;
  height: 540px;

  .protocol-header {
    text-align: center;
    margin-bottom: 30px;

    h1 {
      font-size: 24px;
      color: #333;
    }

    .effective-date {
      color: #666;
      font-size: 14px;
      margin-top: 10px;
    }
  }

  .protocol-content {
    line-height: 1.8;
    font-size: 15px;
    max-height: 400px;
    overflow-y: auto;
    padding: 0 10px;

    .chapter {
      margin-bottom: 30px;

      h2 {
        font-size: 20px;
        color: #444;
        border-left: 4px solid #1890ff;
        padding-left: 10px;
        margin: 20px 0;
      }

      .clause {
        margin: 15px 0;

        h3 {
          font-size: 16px;
          color: #666;
          margin: 10px 0;
        }

        p {
          text-indent: 2em;
          margin: 8px 0;
          color: #555;
        }
      }
    }
  }

  .protocol-footer {
    text-align: center;
    margin-top: 30px;
    color: #999;
    font-size: 14px;
  }

  @media (max-width: 768px) {
    margin: 10px;
    .protocol-header h1 {
      font-size: 20px;
    }
    .protocol-content {
      font-size: 14px;
    }
  }
}
</style>
