/*
 * @Description: vue相关声明
 * @Author: ahl
 * @Date: 2021-09-29 10:43:20
 * @LastEditTime: 2021-11-25 17:16:31
 */

import QjSensors from '@/track/sensors';
import dayjs from 'dayjs';

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $dayjs: typeof dayjs;
    $img: (name: string) => string;
    $sa: QjSensors;
    $const: { roadshowCover: string };
  }
}
