<template>
  <div class="account-padding" :class="[`${prefixCls}`]">
    <div class="user-setting-top">
      <div class="account-avatar">
        <CropperAvatar
          :uploadApi="uploadImg"
          :showBtn="false"
          :value="avatar"
          :btnProps="{ preIcon: 'ant-design:cloud-upload-outlined' }"
          @change="updateAvatar"
          width="80"
        />
        <div class="account-right">
          <div v-if="!isEdit">
            <span class="font-size-17 account-name">{{ userInfo.realname }}</span>
            <a-tooltip content="编辑姓名">
              <Icon class="pointer font-size-17 gray-bd account-icon" icon="ant-design:edit-outlined"
                    @click="editHandleClick" />
            </a-tooltip>
          </div>
          <div v-else>
            <a-input ref="accountNameEdit" :maxlength="100" v-model:value="userInfo.realname" @blur="editRealName" />
          </div>
          <div class="use-day">
            使用：<span>{{ userInfo.createTimeText }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="account-data">
      <!-- 详细资料 -->
      <div class="account-detail">
        <div class="font-size-15 font-bold font-color-gray" style="margin-bottom: 16px">详细资料</div>
        <div class="margin-bottom-10 font-size-13">
          <span class="gray-75 item-label">生日</span>
          <span class="gray-3">{{ userInfo.birthday }}</span>
        </div>
        <div class="margin-bottom-10 font-size-13">
          <span class="gray-75 item-label">性别</span>
          <span class="gray-3">{{ userInfo.sexText }}</span>
        </div>
        <div class="font-size-13">
          <span class="item-label"></span>
          <span class="item-label pointer" style="color:#1e88e5" @click="openEditModal">编辑</span>
        </div>
      </div>
      <!-- 联系信息 -->
      <div class="account-info">
        <div class="font-size-15 font-bold font-color-gray" style="margin-bottom: 16px">联系信息</div>
        <div class="margin-bottom-10 font-size-13">
          <span class="gray-75 item-label">邮箱</span>
          <span class="gray-3">{{ userInfo.email ? userInfo.email : '未填写' }}</span>
        </div>
        <div class="margin-bottom-10 font-size-13">
          <span class="gray-75 item-label">手机</span>
          <span class="gray-3">{{ userInfo.phone ? userInfo.phone : '未填写' }}</span>
        </div>
      </div>
    </div>

    <!-- 套餐购买信息即服务商信息 -->
    <div class="account-data" v-if="myTenant?.category == 0">
      <div class="account-detail">
        <div class="font-size-15 font-bold font-color-gray" style="margin-bottom: 16px">套餐资料</div>
        <div class="margin-bottom-10 font-size-13">
          <span class="gray-75 item-label">套餐类型</span>
          <span class="gray-3">{{ packInfo?.packType == 1 ? '送货单版' : '进销存版' }}</span>
        </div>
        <div class="margin-bottom-10 font-size-13">
          <span class="gray-75 item-label">套餐价格</span>
          <span class="gray-3">￥ {{ packInfo?.price }} 元</span>
        </div>
        <div class="margin-bottom-10 font-size-13">
          <span class="gray-75 item-label">商品数量</span>
          <span class="gray-3">支持 {{ packInfo?.goodsNum }} 个商品</span>
        </div>
        <div class="margin-bottom-10 font-size-13">
          <span class="gray-75 item-label">公司数量</span>
          <span class="gray-3">支持 {{ packInfo?.orgNum }} 个公司</span>
        </div>
        <div class="margin-bottom-10 font-size-13">
          <span class="gray-75 item-label">账户数量</span>
          <span class="gray-3">支持 {{ packInfo?.accountNum }} 个账户</span>
        </div>
        <div class="margin-bottom-10 font-size-13">
          <span class="gray-75 item-label">有效期起</span>
          <span class="gray-3">{{ packInfo?.beginDate }}</span>
        </div>
        <div class="margin-bottom-10 font-size-13">
          <span class="gray-75 item-label">有效期止</span>
          <span class="gray-3">{{ packInfo?.endDate }}</span>
        </div>
      </div>
      <!-- 我的运营商（分销商）联系信息 -->
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
          <span class="gray-75 item-label">收款码</span>
          <template v-if="serverTenant?.wxPaymentCode || serverTenant?.zfbPaymentCode">
            <a-image-preview-group>
              <img v-if="serverTenant?.wxPaymentCode" :width="120" :src="getFileAccessHttpUrl(serverTenant?.wxPaymentCode)" alt="微信收款码" />
              <img v-if="serverTenant?.zfbPaymentCode" :width="120" :src="getFileAccessHttpUrl(serverTenant?.wxPaymentCode)" alt="支付宝收款码" style="margin-left: 10px;" />
            </a-image-preview-group>
          </template>
          <span class="gray-3" v-else>未设置收款码</span>
        </div>
      </div>
    </div>
  </div>
  <UserAccountModal @register="registerModal" @success="getUserDetail"></UserAccountModal>
</template>
<script lang="ts" setup>
  import { computed, onMounted, ref } from 'vue';
  import { type CropendResult, CropperAvatar } from "/@/components/Cropper";
  import { useMessage } from '/@/hooks/web/useMessage';
  import headerImg from '/@/assets/images/header.jpg';
  import { useUserStore } from '/@/store/modules/user';
  import { uploadImg } from '/@/api/sys/upload';
  import { getFileAccessHttpUrl } from '/@/utils/common/compUtils';
  import dayjs from 'dayjs';
  import { ajaxGetDictItems, getDictItemsByCode, initDictOptions } from '/@/utils/dict';
  import {
    userEdit,
    getUserData,
    queryNameByCodes,
    getCurrentUserServerTenant, getCurrentUserTenant
  } from "./UserSetting.api";
  import UserAccountModal from './commponents/UserAccountModal.vue';
  import { useModal } from '/@/components/Modal';
  import { cloneDeep } from 'lodash-es';
  import { useDesign } from '/@/hooks/web/useDesign';
  import CropperImage from "@/components/Cropper/src/Cropper.vue";
  import type { Cropper } from "@/components/Cropper/src/typing";
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
/*
  function handleCropend({ imgBase64 }: CropendResult) {
    previewSource.value = imgBase64;
  }

  function handleReady(cropperInstance: Cropper) {
    cropper.value = cropperInstance;
  }

  //企业数据
  const companyLogo = computed(() => {
    return getFileAccessHttpUrl(serverTenant.value.companyLogo);
  });
  //企业微信收款码
  const wxPaymentCode = computed(() => {
    return getFileAccessHttpUrl(serverTenant.value.wxPaymentCode);
  });
  //企业支付宝收款码
  const zfbPaymentCode = computed(() => {
    return getFileAccessHttpUrl(serverTenant.value.zfbPaymentCode);
  });
  //企业客服微信二维码
  const customerServiceQrcode = computed(() => {
    return getFileAccessHttpUrl(serverTenant.value.customerServiceQrcode);
  });
*/

  /**
   * 编辑按钮点击事件
   */
  function editHandleClick() {
    isEdit.value = true;
    setTimeout(() => {
      accountNameEdit.value.focus();
    }, 100);
  }

  /**
   * 修改真实姓名
   */
  function editRealName() {
    if (userInfo.value.realname) {
      updateUserInfo({ realname: userInfo.value.realname, id: userInfo.value.id });
      userStore.setUserInfo(userInfo.value);
    } else {
      createMessage.warn('请输入姓名');
    }
    isEdit.value = false;
  }

  /**
   * 获取生日信息
   */
  function getBirthDay(val) {
    if (val) {
      return dayjs(val).format('YYYY-MM-DD');
    } else {
      return '未填写';
    }
  }

  /**
   * 获取性别
   * @param val
   */
  function getSex(val) {
    let findOption = sexOption.find(item => parseInt(item.value) === val);
    let sex = '未填写';
    if (findOption) {
      sex = findOption.text;
    }
    return sex;
  }

  /**
   * 打开编辑弹窗
   */
  function openEditModal() {
    let value = cloneDeep(userInfo.value);
    openModal(true, {
      record: value,
    });
  }

  /**
   * 获取用户信息
   */
  function getUserDetail() {
    getUserData().then((async res => {
      if (res.success) {
        if (res.result) {
          res.result.sexText = getSex(res.result.sex);
          res.result.birthday = getBirthDay(res.result.birthday);
          res.result.createTimeText = getDiffDay(res.result.createTime);
          userInfo.value = res.result;
        } else {
          userInfo.value = {};
        }
      }
    }));
  }

  /**
   * 获取我的运营商（分销商）信息
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
   * 获取我的运营商（分销商）信息
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

  /**
   * 获取使用时间
   * @param date
   */
  function getDiffDay(date) {
    // 计算两个日期之间的天数差值
    let totalDays, diffDate;
    let createDate = Date.parse(date);
    let nowDate = new Date().getTime();
    // 将两个日期都转换为毫秒格式，然后做差
    diffDate = Math.abs(nowDate - createDate); // 取相差毫秒数的绝对值
    totalDays = Math.floor(diffDate / (1000 * 3600 * 24)); // 向下取整
    return totalDays + ' 天';
  }
  onMounted(async () => {
    getUserDetail();
    getMyTenantDetail();
    getServerTenantDetail();
  });
</script>

<style lang="less">
  // update-begin-author:liusq date:20230625 for: [issues/563]暗色主题部分失效
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
