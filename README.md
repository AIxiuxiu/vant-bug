# 路演天下移动端

## 环境搭建

### 安装 Node 环境

下载最新稳定版本安装即可（node12 以上版本）
安装 node.js [下载地址](https://nodejs.org/zh-cn/download/)https://nodejs.org/zh-cn/
打开命令端输入 `node -v 和 npm -v` 打印版本号即安装成功

### 安装依赖

npm 默认和 node 一起安装，但使用时需要代理，不然有些可能无法下载，推荐使用[yarn](https://yarn.bootcss.com/)

```shell
# 安装yarn
npm install -g yarn
# 查看版本
yarn -v
```

## 启动

```shell
# web端启动
yarn start
# electron端启动
yarn dev
```

## 移动端 1px 边框
- 问题分析：有些手机的屏幕分辨率较高，是 2-3 倍屏幕。css 样式中 border:1px solid red;在 2 倍屏下，显示的并不是 1 个物理像素，而是 2 个物理像素。解决方案如下：
- 利用 css 的 伪元素::after + transfrom 进行缩放
- 使用

```scss
.box {
  @include all-border-1px(#eeeeee, 0); //使用
}
```
