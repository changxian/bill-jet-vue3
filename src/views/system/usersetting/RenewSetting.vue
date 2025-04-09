<template>
  <div class="account-padding" :class="[`${prefixCls}`]">
    <!-- 套餐购买信息即服务商信息 -->
    <div class="account-data" v-if="myTenant?.category == 0">
      <div class="account-detail">
        <div class="font-size-15 font-bold font-color-gray" style="margin-bottom: 16px">套餐资料</div>
        <div class="margin-bottom-10 font-size-13">
          <span class="gray-75 item-label">套餐类型</span>
          <span class="gray-3">{{ packInfo?.packCategory == 1 ? '单机版' : '云端版' }} {{ packInfo?.packType == 1 ? '销售单' : '进销存' }}</span>
        </div>
        <div class="margin-bottom-10 font-size-13">
          <span class="gray-75 item-label">套餐价格</span>
          <span class="gray-3">￥ {{ packInfo?.price }} 元</span>
        </div>
        <div class="margin-bottom-10 font-size-13">
          <span class="gray-75 item-label">公司数量</span>
          <span class="gray-3">最多支持 {{ packInfo?.orgNum }} 个公司</span>
        </div>
        <div class="margin-bottom-10 font-size-13">
          <span class="gray-75 item-label">账户数量</span>
          <span class="gray-3">最多支持 {{ packInfo?.accountNum }} 个账户</span>
        </div>
        <div class="margin-bottom-10 font-size-13">
          <span class="gray-75 item-label">商品数量</span>
          <span class="gray-3">最多支持 {{ packInfo?.goodsNum }} 个商品</span>
        </div>
        <div class="margin-bottom-10 font-size-13">
          <span class="gray-75 item-label">客户数量</span>
          <span class="gray-3">最多支持 {{ packInfo?.customerNum }} 个客户</span>
        </div>
        <div class="margin-bottom-10 font-size-13">
          <span class="gray-75 item-label">有效期起</span>
          <span class="gray-3">{{ packInfo?.beginDate }}</span>
        </div>
        <div class="margin-bottom-10 font-size-13" style="font-weight: bold">
          <span class="gray-75 item-label">有效期止</span>
          <span class="gray-3">{{ packInfo?.endDate }}</span>
        </div>
        <div class="margin-bottom-10 font-size-13" style="margin-top: 50px; font-weight: 500; width: 50%; color: #0a8fe9">
          <p class="gray-3" style="text-indent: 2em">套餐需要续费时，请添加右侧微信客服，扫右侧收款码后，将支付信息和上面的套餐资料信息一起发给客服完成续费。</p>
        </div>
      </div>
      <!-- 我的运营商（代理商）联系信息 -->
      <div class="account-info">
        <div class="font-size-15 font-bold font-color-gray" style="margin-bottom: 16px">服务商信息</div>
        <div class="margin-bottom-10 font-size-13">
          <span class="gray-75 item-label">服 务 商</span>
          <span class="gray-3">{{ serverTenant?.name ? serverTenant?.name : '' }}</span>
        </div>
        <div class="margin-bottom-10 font-size-13">
          <span class="gray-75 item-label">服务商LOGO</span>
          <!--<span class="gray-3">{{ serverTenant.email ? userInfo.email : '未填写' }}</span>-->
          <!--<CropperImage v-if="serverTenant?.companyLogo" :src="companyLogo" :isReady="true" height="100px" :circled="true" />-->
          <span class="gray-3" v-if="serverTenant?.companyLogo">
            <img v-if="serverTenant?.companyLogo" :width="120" :src="getFileAccessHttpUrl(serverTenant?.companyLogo)" alt="服务商LOGO" />
          </span>
          <span class="gray-3" v-else>未设置服务商LOGO</span>
        </div>
        <div class="margin-bottom-10 font-size-13">
          <span class="gray-75 item-label">微信客服</span>
          <span class="gray-3" v-if="serverTenant?.customerServiceQrcode">
            <img :width="120" :src="getFileAccessHttpUrl(serverTenant?.customerServiceQrcode)" />
          </span>
          <span class="gray-3" v-else>未设置客服二维码</span>
        </div>
        <div class="margin-bottom-10 font-size-13">
          <span class="gray-75 item-label">微信收款码</span>
          <template v-if="serverTenant?.wxPaymentCode || serverTenant?.zfbPaymentCode">
            <a-image-preview-group>
              <img v-if="serverTenant?.wxPaymentCode" :width="120" :src="getFileAccessHttpUrl(serverTenant?.wxPaymentCode)" alt="微信收款码" />
            </a-image-preview-group>
          </template>
          <span class="gray-3" v-else>未设置收款码</span>
        </div>
        <div class="margin-bottom-10 font-size-13">
          <span class="gray-75 item-label">支付宝收款码</span>
          <template v-if="serverTenant?.zfbPaymentCode || serverTenant?.zfbPaymentCode">
            <a-image-preview-group>
              <img v-if="serverTenant?.zfbPaymentCode" :width="120" :src="getFileAccessHttpUrl(serverTenant?.zfbPaymentCode)" alt="支付宝收款码" style="margin-left: 10px;" />
            </a-image-preview-group>
          </template>
          <span class="gray-3" v-else>未设置收款码</span>
        </div>
      </div>
    </div>
    <div class="account-data" v-if="myTenant?.category == 5">
      <div class="renew-detail">
        <div class="font-size-15 font-bold font-color-gray" style="margin-bottom: 120px">套餐续费</div>
        <div class="margin-bottom-10 font-size-13">
          <span class="gray-3">您是运营代理商，账号不涉及续费问题，请放心使用！</span>
        </div>
      </div>
    </div>
    <div class="account-data" v-else>
      <div class="renew-detail">
        <div class="font-size-15 font-bold font-color-gray" style="margin-bottom: 120px">套餐续费</div>
        <div class="margin-bottom-10 font-size-13">
          <span class="gray-3">您是运营服务商，账号不涉及续费问题，请放心使用！</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { computed, onMounted, ref } from 'vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import headerImg from '/@/assets/images/header.jpg';
  import { useUserStore } from '/@/store/modules/user';
  import { getFileAccessHttpUrl } from '/@/utils/common/compUtils';
  import dayjs from 'dayjs';
  import { getDictItemsByCode } from '/@/utils/dict';
  import { userEdit, getUserData, getCurrentUserServerTenant, getCurrentUserTenant } from './UserSetting.api';
  import { useModal } from '/@/components/Modal';
  import { cloneDeep } from 'lodash-es';
  import { useDesign } from '/@/hooks/web/useDesign';
  import type { Cropper } from '@/components/Cropper/src/typing';
  //TODO 当字典企业隔离时，数据会查不到，默认一个
  const sexOption = getDictItemsByCode('sex') || [{text:'男',value:'1'},{text:'女',value:'2'}];
  const { createMessage } = useMessage();
  const userStore = useUserStore();
  const { prefixCls } = useDesign('j-base-setting-container');
  //是否编辑
  const isEdit = ref<boolean>(false);
  //用户信息
  const userInfo = ref<any>({});
  //当前租户信息
  const tenant = userStore.getTenant;
  //我的企业信息
  const myTenant = ref<any>({});
  // 运营商信息
  const serverTenant = ref<any>({});
  //套餐信息
  const packInfo = userStore.getTenantPack;
  //编辑时input触发事件
  const accountNameEdit = ref();
  const previewSource = ref('');
  const cropper = ref<Cropper>();
  const [registerModal, { openModal }] = useModal();
  //头像动态计算
  const avatar = computed(() => {
    return getFileAccessHttpUrl(userInfo.value.avatar) || headerImg;
  });

  /**
   * 更新用户头像
   */
  function updateAvatar(src: string, data: string) {
    const userinfo = userStore.getUserInfo;
    userinfo.avatar = data;
    userStore.setUserInfo(userinfo);
    if (data) {
      updateUserInfo({ avatar: data, id: userinfo.id });
    }
  }

  /**
   * 更新用户信息
   * @params 参数
   */
  function updateUserInfo(params) {
    userEdit(params).then((res) => {
      if (!res.success) {
        createMessage.warn(res.message);
      }
    });
  }
  /**
   * 获取我的运营商（代理商）信息
   */
  function getServerTenantDetail() {
    getCurrentUserServerTenant().then((async res => {
      if (res.success) {
        if (res.result.data) {
          serverTenant.value = res.result.data;
        } else {
          serverTenant.value = {};
        }
        console.log('serverTenant=====>', serverTenant);
      }
    }));
  }

  /**
   * 获取我的运营商（代理商）信息
   */
  function getMyTenantDetail() {
    getCurrentUserTenant().then((res) => {
      if (res.success) {
        if (res.result.list && res.result.list.length>0) {
          myTenant.value = res.result.list[0];
        } else {
          myTenant.value = {};
        }
        console.log('myTenant=====>', myTenant);
      }
    });
  }

  onMounted(async () => {
    getMyTenantDetail();
    getServerTenantDetail();
  });
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-j-base-setting-container';

  .@{prefix-cls}{
    .user-setting-top {
      padding-top: 40px;
      width: 100%;
      border-bottom: 1px solid @border-color-base;
      display: flex;
      padding-bottom: 40px;
    }

    .account-avatar {
      align-items: center;
      display: flex;
      margin-right: 30px;
      flex: 1;
    }

    .change-avatar {
      img {
        display: block;
        margin-bottom: 15px;
        border-radius: 50%;
      }
    }

    .account-right {
      margin-left: 25px !important;
    }

    .font-size-15 {
      font-size: 15px;
    }

    .font-size-17 {
      font-size: 17px;
    }

    .pointer {
      cursor: pointer;
    }

    .account-name {
      white-space: nowrap;
      overflow: hidden;
      width: 200px;
      text-overflow: ellipsis;
      line-height: 32px !important;
      /*begin 兼容暗夜模式*/
      color: @text-color;
      /*end 兼容暗夜模式*/
      font-weight: 500;
    }

    .gray-bd {
      color: #bdbdbd;
    }

    .account-icon {
      margin-left: 4px;
    }

    .account-data {
      width: 100% !important;
      display: flex;
      min-width: 0;
    }

    .account-detail {
      width: 40%;
      display: flex;
      flex-direction: column;
      padding: 40px 0;
      border-bottom: 1px solid @border-color-base;

      .item-label {
        display: inline-block;
        text-align: left;
        width: 100px;
      }
    }
    .renew-detail {
      width: 95%;
      padding: 40px 0;
      border-bottom: 1px solid @border-color-base;

      .item-label {
        display: inline-block;
        text-align: left;
        width: 100px;
      }
    }

    .font-bold {
      font-weight: 700 !important;
    }

    .margin-bottom-10 {
      margin-bottom: 10px;
    }

    .account-info {
      width: 60%;
      display: flex;
      flex-direction: column;
      padding: 40px 0;
      box-sizing: border-box;
      margin-left: 10px;
      border-bottom: 1px solid @border-color-base;

      .item-label {
        display: inline-block;
        text-align: left;
        width: 80px;
      }
    }

    .nowarp {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .account-padding {
      padding-left: 20px !important;
      padding-right: 40px !important;
    }

    .use-day {
      /*begin 兼容暗夜模式*/
      color: @text-color;
      /*end 兼容暗夜模式*/
      margin-top: 10px;
      font-size: 13px;
      span {
        color: #1e88e5;
        margin-left: 5px;
      }
    }
    .font-size-13 {
      font-size: 13px;
    }
  }
  // update-end-author:liusq date:20230625 for: [issues/563]暗色主题部分失效
</style>
