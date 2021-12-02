/*!
 * https://eslint.bootcss.com/docs/rules/
 * https://eslint.vuejs.org/rules/
 *
 * - 0: off
 * - 1: warn
 * - 2: error
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  extends: [
    'eslint:recommended', // 这个是 eslint 的推荐规则
    'plugin:vue/vue3-recommended', // vue3 推荐规则，如果需要 vue2 的官方文档也有说明
    'plugin:@typescript-eslint/recommended', // @typescript-eslint 推荐规则， 注意他也是带 plugin 前缀， 所以不需要在 plugins 字段中配置
    'plugin:prettier/recommended' // 这个同理， prettier 的推荐规则 ， 注意， 它必须放在数组的最后 ，因为它可以保证能够覆盖前面的那些配置，也就可以解决 与eslint 的冲突
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser', // 指定ESlint的解析器
    ecmaVersion: 12, // 允许使用ES语法
    sourceType: 'module' // 允许使用import
  },
  // eslint-plugin-vue @typescript-eslint/eslint-plugin 的缩写
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    indent: 'off',
    'no-use-before-define': 'off',
    'no-useless-escape': 'off',
    'vue/no-lone-template': 'off',
    'vue/no-multiple-template-root': 'off', // 关闭多根节点的校验
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-unused-vars': ['off', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/ban-ts-comment': [
      'warn',
      {
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': 'allow-with-description',
        'ts-nocheck': 'allow-with-description',
        'ts-check': 'allow-with-description'
      }
    ],
    'prettier/prettier': ['error', { vueIndentScriptAndStyle: false }, { usePrettierrc: true }]
  },
  // https://eslint.bootcss.com/docs/user-guide/configuring#specifying-globals
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    $store: 'readonly'
  }
};
