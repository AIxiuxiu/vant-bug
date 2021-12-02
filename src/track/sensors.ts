import sensors from 'sa-sdk-javascript';
import { version } from '../../package.json';

const initSDK = () => {
  // 初始化
  sensors.init({
    // 神策系统配置
    server_url: import.meta.env.VITE_APP_SA_URL?.toString(), // 数据接收地址
    cross_subdomain: false,
    is_track_single_page: true, // 单页应用页面浏览事件采集(url改变就触发)
    use_client_time: true, // 使用客户端系统时间
    send_type: 'beacon', // 表示使用 beacon 请求方式发数据，可选使用 'image' 图片 get 请求方式发 数据
    // 默认不开启批量发送
    batch_send: false,
    show_log: true, // 控制台显示数据开
    heatmap: {
      // 热图设置 default开启 not_collect关闭（详细配置解释看官方文档）
      clickmap: 'default', // 点击热图，收集点击事件
      scroll_notice_map: 'default' // 视区热图，收集页面区域停留时间
    }
  });

  /*设置事件公共属性,所有上报的事件都会添加一个from属性，且值为“路演天下”*/
  sensors.registerPage({
    current_url: location.href,
    referrer: document.referrer,
    platform_type: 'PC',
    from: '路演天下',
    version
  });

  /* autoTrack 表示开启全埋点并自动收集⻚面浏览事件*/
  sensors.quick('autoTrack');
};

export default class QjSensors {
  constructor() {
    initSDK();
  }
  /**
   * 登录
   * @param userInfo 用户信息
   */
  login(userInfo) {
    this.setProfile({
      userId: userInfo.userId,
      user_name: userInfo.realname
    });
    sensors.login(userInfo.userId);
  }
  /**
   * 退出
   */
  logout() {
    this.clearProfile();
    sensors.logout();
  }
  /**
   * 设定用户属性，同一个 key 多次设置时，value 值会进行覆盖替换
   * @param options 用户属性
   */
  setProfile(options: Record<string, any>) {
    sensors.setProfile(options);
  }
  /**
   * 删除当前用户的一些属性
   * @param key array 或者 string
   */
  deleteProfile(key: string | string[]) {
    sensors.unsetProfile(key as any);
  }
  /**
   * 删除当前用户及他的所有属性
   */
  clearProfile() {
    sensors.deleteProfile();
  }
  /**
   * 自定义事件
   * @param eventName 事件名
   * @param data 数据
   */
  track(eventName: string, data?: Record<string, any>) {
    sensors.track(eventName, data);
  }
}
