freemarker server
========================

ftl-node 是一个通过界面可配置的 前静态资源其中实现了，可对某个目录进行配置成为一个可访问的服务目录，
针对目录下的所有ftl文件（后缀以.ft结尾的文件freemarker编译后返回编译内容）.
其次在开启代理功能后,可以作为一个代理服务器使用，支持 http,https2种模式

## 主要功能
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

## 安装
```
npm install ftl-node  -g 
```
## 使用

输入命令 `ftl-node`, 浏览器端会打开一个界面,通过界面配置即可

输入命令 `ftl-node -p 8080` 可指定端口打开页面,端口会记住，下次打开会默认上次的端口

## 帮助
`ftl-node -h`

## [ui界面配置说明](static/help.md)

## [假数据配置说明](static/mock.md)

## [代理服务器说明](static/proxy.md)

## 支持request调用的方法
```
${request.getRequestURI()}
${request.getRequestURL()}
${request.getCookies()}
${request.getHeaderNames()}
${request.getHeader(String headerName)}
${request.getQueryString()}
${request.getParameter()}
${request.getParameterMap()}
${request.getParameterNames(String parName)}
${request.getServerName()}
${request.getServerPort()}
${request.getProtocol()}
${request.getScheme()}
```

## 注意事项
1. 环境依赖于nodejs,最低版本4.0.0
2. 环境依赖java的jdk或者jre
3. 配置将记录于系统缓存文件中，请确保运行时有对系统缓存目录修改的权限,并注意如果缓存目录清除，将会删除配置文件
4. freemarker.jar文件在目录下地jar目录下，可以自己做配置，改变freemarker的版本，具体请看[假数据配置说明](static/mock.md)

## 其他
1. [更新日志](./updateInfo.md)

## License
MIT
