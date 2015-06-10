freemarker server
========================

一个专门为了方便前端童鞋测试freemarker的服务器工具

## 主要功能
1. 访问freemarker，即以.ftl结尾的文件则自动编译成html返回
2. 访问前端资源，即以.js, css等结尾的文件自动添加文件类型返回文件
3. 采用界面配置当前的项目目录，可同时配置多个项目目录，并且同时运行
4. 可动态切换当前的服务目录，及静态资源的目录
5. freemarker的错误日志会在浏览器端的调试工具中 以console.warn打印出来
6. 支持java的request对象的部分方法直接获取数据(为什么会有这个，因为在struts2等框架中，前端人员可以直接访问request对象，在某些紧急情况下，可能需要前端获取参数或者获取ua去做一些判断)


## 使用方法
### 安装
```
npm install ftl-node  -g 
```
### 使用
输入命令 ftl-node, 浏览器端会打开一个界面,通过界面配置即可
输入命令 ftl-node -p 8080 可指定端口打开页面,端口会记住，下次打开会默认上次的端口
## License

MIT