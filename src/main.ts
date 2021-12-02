import router from '@/router';
// 时间插件
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
// 加载 svg 图标
import 'virtual:svg-icons-register';
import { App, createApp } from 'vue';
import AppVue from './App.vue';
import registerDirectives from './directives';
import useImage from './hooks/useImg';
import './styles/index.scss';
// 神策统计
import QjSensors from './track/sensors';

const app: App<Element> = createApp(AppVue);

app.use(router);

// dayjs 时间库
dayjs.locale('zh-cn');
app.config.globalProperties.$dayjs = dayjs;
app.config.globalProperties.$img = useImage;
app.config.globalProperties.$const = {
  // 路演默认图片
  roadshowCover: 'https://rs.p5w.net/theme/default/images/road_show_detail/road_cover.png'
};
app.config.globalProperties.$sa = new QjSensors();

// 注册全局指令
registerDirectives(app);

app.config.errorHandler = (error, vm, info) => {
  console.error('抛出全局异常', error, info);
};

app.mount('#app');
