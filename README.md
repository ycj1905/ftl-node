freemarker server
========================

ftl-node 是一个通过界面可配置的前静态资源服务器。其可对某个目录进行配置成为一个可访问的服务目录，针对目录下的所有ftl文件（后缀以.ft结尾的文件freemarker编译后返回编译内容）

支持代理功能，当开启代理功能后可以当代理服务器使用

## 说明
1. 访问freemarker，即以.ftl结尾的文件则自动编译成html返回
2. 访问前端资源，即以.js, css等结尾的文件自动添加文件类型返回文件
3. 采用界面配置当前的项目目录，可同时配置多个项目目录，并且同时运行
4. 可动态切换当前的服务目录，及静态资源的目录
5. freemarker的错误日志会在浏览器端的调试工具中 以console.warn打印出来
6. 支持java的request对象的部分方法直接获取数据(为什么会有这个，因为在struts2等框架中，前端人员可以直接访问request对象，在某些紧急情况下，可能需要前端获取参数或者获取ua去做一些判断)
7. 支持代理功能，可当成代理服务器使用
8. 支持代理服务器的转发功能，可对转发域名做指定的转发处理
9. 可以通过简单配置在页面中嵌入 werinre
10. 可以禁止页缓存

## 更新
1. [更新日志](docs/updateInfo.md)

## License
MIT
