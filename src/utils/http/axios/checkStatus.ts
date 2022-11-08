import type { ErrorMessageMode } from '/#/axios';
import { useMessage } from '/@/hooks/web/useMessage';
// import router from '/@/router';
// import { PageEnum } from '/@/enums/pageEnum';
import { useAdminStoreWithOut } from '/@/store/modules/admin';
import projectSetting from '/@/settings/projectSetting';
import { SessionTimeoutProcessingEnum } from '/@/enums/appEnum';

const { createMessage, createErrorModal } = useMessage();
const error = createMessage.error!;
const stp = projectSetting.sessionTimeoutProcessing;

export function checkStatus(
  status: number,
  msg: string,
  errorMessageMode: ErrorMessageMode = 'message',
): void {
  const adminStore = useAdminStoreWithOut();
  let errMessage = '';

  switch (status) {
    case 400:
      errMessage = `${msg}`;
      break;
    // 401: Not logged in
    // Jump to the login page if not logged in, and carry the path of the current page
    // Return to the current page after successful login. This step needs to be operated on the login page.
    case 401:
      adminStore.setToken(undefined);
      errMessage = msg || '用户没有权限（令牌、用户名、密码错误）!';
      if (stp === SessionTimeoutProcessingEnum.PAGE_COVERAGE) {
        adminStore.setSessionTimeout(true);
      } else {
        adminStore.logout(true);
      }
      break;
    case 403:
      errMessage = msg || '用户得到授权，但是访问是被禁止的!';
      break;
    // 404请求不存在
    case 404:
      errMessage = msg || '网络请求错误,未找到该资源!';
      break;
    case 405:
      errMessage = msg || '网络请求错误,请求方法未允许!';
      break;
    case 408:
      errMessage = msg || '网络请求超时!';
      break;
    case 500:
      errMessage = msg || '服务器错误,请联系管理员!';
      break;
    case 501:
      errMessage = msg || '网络未实现!';
      break;
    case 502:
      errMessage = msg || '网络错误!';
      break;
    case 503:
      errMessage = msg || '服务不可用，服务器暂时过载或维护!';
      break;
    case 504:
      errMessage = msg || '网络超时!';
      break;
    case 505:
      errMessage = msg || 'http版本不支持该请求!';
      break;
    default:
  }

  if (errMessage) {
    if (errorMessageMode === 'modal') {
      createErrorModal({ title: '错误提示', content: errMessage });
    } else if (errorMessageMode === 'message') {
      error({ content: errMessage, key: `global_error_message_status_${status}` });
    }
  }
}
