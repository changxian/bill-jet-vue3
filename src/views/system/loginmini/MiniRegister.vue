<template>
  <div class="aui-content">
    <div class="aui-container">
      <div class="aui-form">
        <div class="aui-image" style="padding: 20px; position: relative">
          <div style="display: flex; flex-direction: column; justify-content: space-between">
            <div class="" style="display: flex; flex-direction: row; justify-content: inherit; align-items: center; flex: 2"><div><img src="/src/assets/images/logo.png" height="100" width="100" title="鑫泓软件logo" /></div>
              <div style="display: flex; justify-content: center; align-items: center; text-align: center; font-weight: 800; font-size: 23px; padding-right: 28%; color: white"><h1>鑫 泓 软 件</h1></div>
            </div>
            <div style="margin-top: 50px; padding-left: 15px; padding-right: 15px; font-size: 15px">
              <p style="color: white; text-indent: 2em; margin-top: 10px">贵州鑫泓瀛科技有限公司</p>
              <p style="color: white; text-indent: 2em; margin-top: 25px">鑫泓软件《前身始于2016年、深耕行业8年》专注云端智能管理软件研发，其核心进销存管理系统由送货单打印软件升级迭代而来。新增智能数据存储及供应链协同功能、通过浏览器+小程序实现采购-库存-销售全链路数字化管控。系统采用银行级云存储及智能备份机制，支持多终端实时数据同步与批量数据导入、赋能中小企业运营效率高速提升、现持有35类、42类2项商标及多项原研软著，累计服务超10万+企业、客户转介率达63.8%、年新增客户增速57.5%、口碑见证，值得托付、以“免费试用+全周期服务”助力企业降本增效。 </p>
              <p style="color: white; margin-top: 20px">硬核优势：</p>
              <p style="color: white; text-indent: 2em; margin-top: 10px">✓ 零安装云端系统：全平台即开即用、数据实时同步</p>
              <p style="color: white; text-indent: 2em; margin-top: 6px">✓ 极速数据引擎：&nbsp;&nbsp;&nbsp;批量导入功能节省90%人工耗时</p>
              <p style="color: white; text-indent: 2em; margin-top: 6px">✓ 军工级数据盾：&nbsp;&nbsp;&nbsp;智能备份+多重加密防护</p>
              <p style="color: white; text-indent: 2em; margin-top: 6px">✓ 超长服务链：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;24小时响应+实操视频库+专业实操手册</p>
              <p style="color: white; padding-left: 12em; margin-top: 50px">1V1专业教学、包教包会</p>
            </div>
            <div style="justify-content: center; position: absolute; bottom: 20px; font-size: 14px">
              <p style="color: white; padding-left: 50px">联系我们&nbsp;&nbsp;微信号:xinhsoft18&nbsp;&nbsp;QQ号:474300263&nbsp;&nbsp;邮箱:474300263@qq.com</p>
            </div>
          </div>
        </div>
        <div class="aui-formBox">
          <div class="aui-formWell">
            <a-form ref="formRef" :model="formData">
              <div class="aui-flex aui-form-nav aui-clear-left">
                <div class="aui-flex-box activeNav on">{{t('sys.login.signUpFormTitle')}}</div>
              </div>
              <div class="aui-form-box">
                <div class="aui-account aui-account-line" style="padding-bottom: 10px">
                  <a-form-item>
                    <div class="aui-input-line">
                      <Icon class="aui-icon" icon="ant-design:user-outlined" />
                      <a-input class="fix-auto-fill" type="text" :placeholder="t('sys.login.userName')" v-model:value="formData.username" />
                    </div>
                  </a-form-item>
                  <!--<a-form-item>
                    <div class="aui-input-line">
                      <Icon class="aui-icon" icon="ant-design:user-outlined" />
                      <a-input class="fix-auto-fill" type="text" :placeholder="t('sys.login.email')" v-model:value="formData.email" />
                    </div>
                  </a-form-item>-->
                  <a-form-item>
                    <div class="aui-input-line">
                      <Icon class="aui-icon" icon="ant-design:mobile-outlined" />
                      <a-input class="fix-auto-fill" type="text" :placeholder="t('sys.login.mobile')" v-model:value="formData.mobile" />
                    </div>
                  </a-form-item>
                  <a-form-item>
                    <div class="aui-input-line">
                      <Icon class="aui-icon" icon="ant-design:mail-outlined" />
                      <a-input class="fix-auto-fill" type="text" :placeholder="t('sys.login.smsCode')" v-model:value="formData.smscode" />
                      <div v-if="showInterval" class="aui-code-line" @click="getLoginCode">{{t('component.countdown.normalText')}}</div>
                      <div v-else class="aui-code-line">{{t('component.countdown.sendText',[unref(timeRuning)])}}</div>
                    </div>
                  </a-form-item>
                  <a-form-item>
                    <div class="aui-input-line">
                      <Icon class="aui-icon" icon="ant-design:lock-outlined" />
                      <a-input class="fix-auto-fill" :type="pwdIndex==='close'?'password':'text'" :placeholder="t('sys.login.password')" v-model:value="formData.password" />
                      <div class="aui-eye">
                        <img :src="eyeKImg" alt="开启" v-if="pwdIndex === 'open'" @click="pwdClick('close')" />
                        <img :src="eyeGImg" alt="关闭" v-else-if="pwdIndex === 'close'" @click="pwdClick('open')" />
                      </div>
                    </div>
                  </a-form-item>
                  <a-form-item>
                    <div class="aui-input-line">
                      <Icon class="aui-icon" icon="ant-design:lock-outlined" />
                      <a-input class="fix-auto-fill" :type="confirmPwdIndex==='close'?'password':'text'" :placeholder="t('sys.login.confirmPassword')" v-model:value="formData.confirmPassword" />
                      <div class="aui-eye">
                        <img :src="eyeKImg" alt="开启" v-if="confirmPwdIndex === 'open'" @click="confirmPwdClick('close')" />
                        <img :src="eyeGImg" alt="关闭" v-else-if="confirmPwdIndex === 'close'" @click="confirmPwdClick('open')" />
                      </div>
                    </div>
                  </a-form-item>
                  <a-form-item>
                    <div class="aui-input-line">
                      <Icon class="aui-icon" icon="ant-design:user-add-outlined" />
                      <a-input class="fix-auto-fill" type="number" :placeholder="t('sys.login.invite')" v-model:value="formData.invite" />
                    </div>
                  </a-form-item>
                  <a-form-item name="policy">
                    <div class="aui-flex">
                      <div class="aui-flex-box">
                        <div class="aui-choice">
                          <a-checkbox v-model:checked="formData.policy" />
                          <span style="color: #1b90ff; margin-left: 4px">
                            <a-button type="link" target="_blank" @click="openProtocol">{{ t('sys.login.policy') }}</a-button>
                          </span>
                        </div>
                      </div>
                    </div>
                  </a-form-item>
                  <a-form-item name="policy">
                    <div class="aui-flex">
                      <div class="aui-flex-box">
                        <div class="aui-choice">
                          <span style="color: grey; margin-left: 4px">
                            注册即代表已阅读并同意我们的<a-button type="link" style="color: #1b90ff; margin: 0 3px" target="_blank" @click="openProtocol">购买须知及使用协议</a-button>，请知悉。
                          </span>
                        </div>
                      </div>
                    </div>
                  </a-form-item>
                </div>
              </div>
              <div class="aui-formButton">
                <div class="aui-flex">
                  <a class="aui-link-login aui-flex-box" @click="registerHandleClick"> {{ t('sys.login.registerButton') }}</a>
                </div>
                <div class="aui-flex">
                  <a class="aui-linek-code aui-flex-box" @click="goBackHandleClick">{{ t('sys.login.backSignIn') }}</a>
                </div>
              </div>
            </a-form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div style=" flex-direction: row; justify-content: space-around; align-items: center; text-align: center; position: absolute; width: 100%; margin: -50px auto; font-size: 13px">
    <span style="margin-right: 20px">贵州鑫泓瀛科技有限公司</span>
    <span style="margin-right: 20px">Copyright © 2025 xinhsoft. All rights reserved</span>
    <span><a href="https://beian.miit.gov.cn" target="_blank">黔ICP备2025045723号</a></span>
  </div>
  <!-- 图片验证码弹窗 -->
  <CaptchaModal @register="captchaRegisterModal" @ok="getLoginCode" />
  <ProtocolModel @register="registerProtocolModel" />
</template>

<script lang="ts" setup name="mini-register">
  import { ref, reactive, unref, toRaw } from 'vue';
  import { getCaptcha, register } from '/@/api/sys/user';
  import { SmsEnum } from '/@/views/sys/login/useLogin';
  import { useMessage } from '/@/hooks/web/useMessage';
  import eyeKImg from '/@/assets/loginmini/icon/icon-eye-k.png';
  import eyeGImg from '/@/assets/loginmini/icon/icon-eye-g.png';
  import { useI18n } from '/@/hooks/web/useI18n';
  import CaptchaModal from '@/components/jeecg/captcha/CaptchaModal.vue';
  import { useModal } from '@/components/Modal';
  import { ExceptionEnum } from '@/enums/exceptionEnum';
  import ProtocolModel from '@/views/system/protocol/ProtocolModal.vue';

  const { t } = useI18n();
  const { notification, createMessage } = useMessage();
  const emit = defineEmits(['go-back', 'success', 'register']);
  const formRef = ref();
  const formData = reactive<any>({
    username: '',
    email: '',
    mobile: '',
    invite: '',
    smscode: '',
    password: '',
    confirmPassword: '',
    policy: false,
  });
  //是否显示获取验证码
  const showInterval = ref<boolean>(true);
  //60s
  const timeRuning = ref<number>(60);
  //定时器
  const timer = ref<any>(null);
  //密码眼睛打开关闭
  const pwdIndex = ref<string>('close');
  //确认密码眼睛打开关闭
  const confirmPwdIndex = ref<string>('close');
  const [captchaRegisterModal, { openModal: openCaptchaModal }] = useModal();
  const [registerProtocolModel, { openModal: openProtocolModel }] = useModal();

  /**
   * 查看用户协议
   */
  function openProtocol() {
    openProtocolModel(true, {});
  }

  /**
   * 同意隐私政策
   */
  function policyChecked() {
    formData.policy = true;
  }

  /**
   * 返回
   */
  function goBackHandleClick() {
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
    const result = await getCaptcha({ mobile: formData.mobile, email: formData.email, smsmode: SmsEnum.REGISTER }).catch((res) => {
      if (res && res.code === ExceptionEnum.PHONE_SMS_FAIL_CODE) {
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

  function registerHandleClick() {
    if (!formData.username) {
      createMessage.warn(t('sys.login.accountPlaceholder'));
      return;
    }
    if (!formData.mobile) {
      createMessage.warn(t('sys.login.mobilePlaceholder'));
      return;
    }
    // if (!formData.email) {
    //   createMessage.warn(t('sys.login.emailPlaceholder'));
    //   return;
    // }
    if (!formData.smscode) {
      createMessage.warn(t('sys.login.smsPlaceholder'));
      return;
    }
    if (!formData.password) {
      createMessage.warn(t('sys.login.passwordPlaceholder'));
      return;
    }
    if (!formData.confirmPassword) {
      createMessage.warn(t('sys.login.confirmPassword'));
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      createMessage.warn(t('sys.login.diffPwd'));
      return;
    }
    if (!formData.policy) {
      createMessage.warn(t('sys.login.policyPlaceholder'));
      return;
    }
    registerAccount();
  }

  /**
   * 注册账号
   */
  async function registerAccount() {
    try {
      const resultInfo = await register(
        toRaw({
          username: formData.username,
          password: formData.password,
          phone: formData.mobile,
          invite: formData.invite.trim(),
          email: formData.email,
          smscode: formData.smscode,
        })
      );
      if (resultInfo && resultInfo.data.success) {
        notification.success({
          description: resultInfo.data.message || t('sys.api.registerMsg'),
          duration: 3,
        });
        emit('success', { username: formData.username, password: formData.password });
        initForm();
      } else {
        notification.warning({
          message: t('sys.api.errorTip'),
          description: resultInfo.data.message || t('sys.api.networkExceptionMsg'),
          duration: 3,
        });
      }
    } catch (error) {
      notification.error({
        message: t('sys.api.errorTip'),
        description: error.message || t('sys.api.networkExceptionMsg'),
        duration: 3,
      });
    }
  }

  /**
   * 初始化表单
   */
  function initForm() {
    Object.assign(formData,{username: '', email: '', invite: '', mobile: '', smscode: '', password: '', confirmPassword: '', policy: false})
    if (!unref(timer)) {
      showInterval.value = true;
      clearInterval(unref(timer));
      timer.value = null;
    }
    formRef.value.resetFields();
  }

  /**
   * 密码打开或关闭
   * @param value
   */
  function pwdClick(value) {
    pwdIndex.value = value;
  }

  /**
   * 确认密码打开或关闭
   * @param value
   */
  function confirmPwdClick(value) {
    confirmPwdIndex.value = value;
  }

  defineExpose({
    initForm,
  });
</script>
<style lang="less" scoped>
  @import '/@/assets/loginmini/style/home.less';
  @import '/@/assets/loginmini/style/base.less';
  .aui-input-line .aui-icon {
    position: absolute;
    z-index: 2;
    top: 10px;
    left: 10px;
    font-size: 20px !important;
  }
</style>
