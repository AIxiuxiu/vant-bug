/**
 * Inject 类型说明
 */

import { InjectionKey } from 'vue';

/**
 * 刷新
 */
export const InjectReloadKey: InjectionKey<Function> = Symbol('Reload');
