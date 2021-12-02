# 埋点

## 神策埋点
神策分析平台：https://analysis.p5w.net
登录账号：chaidong@p5w.net
登录密码：dT13670#

文档: https://manual.sensorsdata.cn/sa/latest/tech_sdk_client_web-7548149.html
## 常用方法
* sensors.registerPage() 注册公共属性
* sensors.setProfile(data对象) 设置用户属性
* sensors.track(events, data) 设置事件
> 注：如果在你埋点事件的地方涉及到链接跳转的话 ， 注意 要在外层加上一层setTimeout延迟跳转页面，给 SDK 发送数据提供时间，时间最好设置在500ms

* sensors.login(id) 登录ID
