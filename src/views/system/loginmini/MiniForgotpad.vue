<template>
  <div class="aui-content">
    <div class="aui-container">
      <div class="aui-form">
        <div class="aui-image" style="padding: 20px; position: relative">
          <div style="display: flex; flex-direction: column; justify-content: space-between">
            <div style="display: flex; flex-direction: row; justify-content: inherit; align-items: center; flex: 2"><div><img src="/src/assets/images/logo.png" height="100" width="100" /></div>
              <div style="display: flex; justify-content: center; align-items: center; text-align: center; font-weight: 800; font-size: 45px; padding-right: 28%; color: white">鑫 泓 软 件</div>
            </div>
            <div style="margin-top: 30px; padding-left: 15px; padding-right: 15px; font-size: 15px">
              <p style="color: white; text-indent: 2em; margin-top: 10px">鑫泓软件进销存管理系统彻底告别传统客户端安装模式，通过浏览器即可实现采购→库存→送货全链路数字化管控，让企业运营效率提升100%！</p>
              <p style="color: white; text-indent: 2em; margin-top: 10px">核心产品：云端智能管理平台。鑫泓软件进销存管理系统是基于浏览器运行的云端平台，打破传统安装限制，只要有网络和浏览器，用户就能随时随地办公，实时掌控企业运营数据。数据保存在云服务器，永不丢失。</p>
              <p style="color: white; text-indent: 2em; margin-top: 10px">多平台通用：支持Windows、苹果系统、微信小程序和平板电脑，数据实时同步，无区域限制办公。还能一键批量导入导出客户、商品信息，提升数据录入效率。客户和商品储存数据都升级到各5千个、还能根据需求升级到各1万个。</p>
              <p style="color: white; text-indent: 2em; margin-top: 10px">广泛应用与服务承诺：适用于各类有采购、库存、送货业务等中小企业，如物流行业，可高效管理货物出入库等，实现降本增效。鑫泓软件始终以客户需求为导向，不断优化产品，提供优质技术支持与售后。</p>
              <p style="color: white; text-indent: 2em; margin-top: 10px">欢迎您联系我们了解详情或申请免费试用，视频教程学习，一对一教学包教包会，一起让企业管理更简单、更高效！</p>
            </div>
            <div style="justify-content: center; position: absolute; bottom: 20px; font-size: 14px">
              <p style="color: white; padding-left: 50px">联系我们&nbsp;&nbsp;微信号:xinhsoft18&nbsp;&nbsp;QQ号:474300263&nbsp;&nbsp;邮箱:474300263@qq.com</p>
            </div>
          </div>
        </div>
        <div class="aui-formBox">
          <div class="aui-formWell">
            <div class="aui-step-box">
              <div class="aui-step-item" :class="activeKey === 1 ? 'activeStep' : ''">
                <div class="aui-step-tags">
                  <em>1</em>
                  <p>{{t('sys.login.authentication')}}</p>
                </div>
              </div>
              <div class="aui-step-item" :class="activeKey === 2 ? 'activeStep' : ''">
                <div class="aui-step-tags">
                  <em>2</em>
                  <p>{{t('sys.login.resetLoginPassword')}}</p>
                </div>
              </div>
              <div class="aui-step-item" :class="activeKey === 3 ? 'activeStep' : ''">
                <div class="aui-step-tags">
                  <em>3</em>
                  <p>{{t('sys.login.resetSuccess')}}</p>
                </div>
              </div>
            </div>
            <div class="" style="height: 230px; position: relative">
              <a-form ref="formRef" :model="formData" v-if="activeKey === 1">
                <!-- 身份验证 begin -->
                <div class="aui-account aui-account-line aui-forgot">
                  <a-form-item>
                    <div class="aui-input-line">
                      <a-input type="text" :placeholder="t('sys.login.mobile')" v-model:value="formData.mobile" />
                    </div>
                  </a-form-item>
                  <div class="aui-input-line">
                    <a-form-item>
                      <a-input type="text" :placeholder="t('sys.login.smsCode')" v-model:value="formData.smscode" />
                    </a-form-item>
                    <div v-if="showInterval" class="aui-code-line" @click="getLoginCode">{{t('component.countdown.normalText')}}</div>
                    <div v-else class="aui-code-line">{{t('component.countdown.sendText',[unref(timeRuning)])}}</div>
                  </div>
                </div>
                <!-- 身份验证 end -->
              </a-form>
              <a-form ref="pwdFormRef" :model="pwdFormData" v-else-if="activeKey === 2">
                <!-- 重置密码 begin -->
                <div class="aui-account aui-account-line aui-forgot">
                  <a-form-item>
                    <div class="aui-input-line">
                      <a-input type="password" :placeholder="t('sys.login.passwordPlaceholder')" v-model:value="pwdFormData.password" />
                    </div>
                  </a-form-item>
                  <a-form-item>
                    <div class="aui-input-line">
                      <a-input type="password" :placeholder="t('sys.login.confirmPassword')" v-model:value="pwdFormData.confirmPassword" />
                    </div>
                  </a-form-item>
                </div>
                <!-- 重置密码 end -->
              </a-form>
                <!-- 重置成功 begin -->
                <div class="aui-success" v-else>
                  <div class="aui-success-icon">
                    <img :src="successImg"/>
                  </div>
                  <h3>恭喜您，重置密码成功！</h3>
                </div>
                <!-- 重置成功 end -->
            </div>
            <div class="aui-formButton" style="padding-bottom: 40px">
              <div class="aui-flex" v-if="activeKey === 1 || activeKey === 2">
                <a class="aui-link-login aui-flex-box" @click="nextStepClick">{{t('sys.login.nextStep')}}</a>
              </div>
              <div class="aui-flex" v-else>
                <a class="aui-linek-code aui-flex-box" @click="toLogin">{{t('sys.login.goToLogin')}}</a>
              </div>
              <div class="aui-flex">
                <a class="aui-linek-code aui-flex-box" @click="goBack"> {{ t('sys.login.backSignIn') }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 图片验证码弹窗 -->
  <CaptchaModal @register="captchaRegisterModal" @ok="getLoginCode" />
</template>
<script lang="ts" name="mini-forgotpad" setup>
  import { reactive, ref, toRaw, unref } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { SmsEnum, useFormRules, useFormValid, useLoginState } from '/@/views/sys/login/useLogin';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { getCaptcha, passwordChange, phoneVerify } from '/@/api/sys/user';
  import logoImg from '/@/assets/loginmini/icon/jeecg_logo.png'
  import adTextImg from '/@/assets/loginmini/icon/jeecg_ad_text.png'
  import successImg from '/@/assets/loginmini/icon/icon-success.png'
  import CaptchaModal from '@/components/jeecg/captcha/CaptchaModal.vue';
  import { useModal } from "@/components/Modal";
  import { ExceptionEnum } from "@/enums/exceptionEnum";
  const [captchaRegisterModal, { openModal: openCaptchaModal }] = useModal();

  //下一步控制
  const activeKey = ref<number>(1);
  const { t } = useI18n();
  const { handleBackLogin } = useLoginState();
  const { notification, createMessage, createErrorModal } = useMessage();
  //是否显示获取验证码
  const showInterval = ref<boolean>(true);
  //60s
  const timeRuning = ref<number>(60);
  //定时器
  const timer = ref<any>(null);
  const formRef = ref();
  const pwdFormRef = ref();
  //账号数据
  const accountInfo = reactive<any>({});
  //手机号表单
  const formData = reactive({
    mobile: '',
    smscode: '',
  });
  //密码表单
  const pwdFormData = reactive<any>({
    password: '',
    confirmPassword: '',
  });
  const emit = defineEmits(['go-back', 'success', 'register']);

  /**
   * 下一步
   */
  async function handleNext() {
    if (!formData.mobile) {
      createMessage.warn(t('sys.login.mobilePlaceholder'));
      return;
    }
    if (!formData.smscode) {
      createMessage.warn(t('sys.login.smsPlaceholder'));
      return;
    }
    const resultInfo = await phoneVerify(
      toRaw({
        phone: formData.mobile,
        smscode: formData.smscode,
      })
    );
    if (resultInfo.success) {
      Object.assign(accountInfo, {
        username: resultInfo.result.username,
        phone: formData.mobile,
        smscode: formData.smscode,
      });
      activeKey.value = 2;
      setTimeout(()=>{
        pwdFormRef.value.resetFields();
      },300)
    } else {
      notification.error({
        message: '错误提示',
        description: resultInfo.message || t('sys.api.networkExceptionMsg'),
        duration: 3,
      });
    }
  }

  /**
   * 完成修改密码
   */
  async function finishedPwd() {
    if (!pwdFormData.password) {
      createMessage.warn(t('sys.login.passwordPlaceholder'));
      return;
    }
    if (!pwdFormData.confirmPassword) {
      createMessage.warn(t('sys.login.confirmPassword'));
      return;
    }
    if (pwdFormData.password !== pwdFormData.confirmPassword) {
      createMessage.warn(t('sys.login.diffPwd'));
      return;
    }
    const resultInfo = await passwordChange(
      toRaw({
        username: accountInfo.username,
        password: pwdFormData.password,
        smscode: accountInfo.smscode,
        phone: accountInfo.phone,
      })
    );
    if (resultInfo.success) {
      accountInfo.password = pwdFormData.password;
      //修改密码
      activeKey.value = 3;
    } else {
      //错误提示
      createErrorModal({
        title: t('sys.api.errorTip'),
        content: resultInfo.message || t('sys.api.networkExceptionMsg'),
      });
    }
  }
  /**
   * 下一步
   */
  function nextStepClick() {
    if (unref(activeKey) == 1) {
      handleNext();
    } else if (unref(activeKey) == 2) {
      finishedPwd();
    }
  }

  /**
   * 去登录
   */
  function toLogin() {
    emit('success', { username: accountInfo.username, password: accountInfo.password });
    initForm();
  }

  /**
   * 返回
   */
  function goBack() {
    emit('go-back');
    initForm();
  }

  /**
   * 获取手机验证码
   */
  async function getLoginCode() {
    if (!formData.mobile) {
      createMessage.warn(t('sys.login.mobilePlaceholder'));
      return;
    }
    //update-begin---author:wangshuai---date:2024-04-18---for:【QQYUN-9005】同一个IP，1分钟超过5次短信，则提示需要验证码---
    const result = await getCaptcha({ mobile: formData.mobile, smsmode: SmsEnum.FORGET_PASSWORD }).catch((res) =>{
      if(res.code === ExceptionEnum.PHONE_SMS_FAIL_CODE){
        openCaptchaModal(true, {});
      }
    });
    //update-end---author:wangshuai---date:2024-04-18---for:【QQYUN-9005】同一个IP，1分钟超过5次短信，则提示需要验证码---
    if (result) {
      const TIME_COUNT = 60;
      if (!unref(timer)) {
        timeRuning.value = TIME_COUNT;
        showInterval.value = false;
        timer.value = setInterval(() => {
          if (unref(timeRuning) > 0 && unref(timeRuning) <= TIME_COUNT) {
            timeRuning.value = timeRuning.value - 1;
          } else {
            showInterval.value = true;
            clearInterval(unref(timer));
            timer.value = null;
          }
        }, 1000);
      }
    }
  }

  /**
   * 初始化表单
   */
  function initForm() {
    activeKey.value = 1;
    Object.assign(formData, { phone: '', smscode: '' });
    Object.assign(pwdFormData, { password: '', confirmPassword: '' });
    Object.assign(accountInfo, {});
    if(unref(timer)){
      clearInterval(unref(timer));
      timer.value = null;
      showInterval.value = true;
    }
    setTimeout(()=>{
      formRef.value.resetFields();
    },300)
  }

  defineExpose({
    initForm,
  });
</script>
<style lang="less" scoped>
@import '/@/assets/loginmini/style/home.less';
@import '/@/assets/loginmini/style/base.less';
</style>
