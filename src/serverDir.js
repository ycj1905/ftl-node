// 解析目录，将目录解析成一个html文件，方便访问
// 解析url模块
var parseurl = require('parseurl');
var path = require('path');
var fs = require('fs');
var Promise = require('bluebird');
var log = require('../src/log');
var parsePath = require('../src/parsePath');
exports = module.exports = function serveStatic() {
  return function serveStatic(req, res, next) {
	// 如果不是get请求或者 是head， 就直接到下一个请求
	if (req.method !== 'GET' && req.method !== 'HEAD') {
	  return next();
	}
	var url  = parseurl(req);
	var port = req.app.get("port");
	var fullUrl = req.protocol + '://' + req.get("host") + req.path;
	// 获取路径
	var pathname = path.normalize(url.pathname);
	var absPath, headers;
	try{
		pathObject = parsePath(fullUrl);
		if (pathObject && pathObject.fullPath) {
			absPath = pathObject.fullPath;
			var status = fs.lstatSync(absPath);
			if (!status.isDirectory()) {
				next();
				return;
			}
			// 第一步读取目录下的所有文件的文件名称
			new Promise(function(resolve, reject) {
				fs.readdir(absPath, function(err, files) {
					if (err) {
						reject(err);
					} else {
						resolve(files);
						// log.debug(files);
					}
				});
			})
			// 第三部根据文件名循环遍历得到文件信息
			.then(function(files) {
				return getFileInfo(files, absPath);
			// 第四部渲染页面
			}).then(function(filesInfo){
				res.set('Full-Path', absPath);
				res.render("list", {
					url: req.url,
					data: filesInfo
				});
			}).catch(function(e){// 出错，直接抛出到页面
				if (typeof (e) == "string") {
					e = new Error(e);
				}
				log.error(e);
				next(e);
			});
		} else {
			res.status(404);
			res.render("404", {
				message: '没有找到对应的路径,请查看server.json配置文件,当前文件相对路径' +  pathname
			});
		}
	}catch(e) {
		next(e);
	}
  };
};


/*
*  读取指定列表的所有文件的文件信息
* @param {Array} files
* @return {Array} 返回一个带有每个文件描述的数组列表 如[{name: "", size: "", mtime: ""}]
*/
var getFileInfo = function(files, basePath) {
	var index = 0;
	var get = function(result) {
		if (!files || !files.length || !files[index]) {
			return new Promise(function(resolve) {
				resolve(result);
			});
		} else {
			return new Promise(function(resolve, reject) {
				var one = files[index];
				var nameTest = /^\.+/;
				index = index + 1;
				fs.lstat(path.resolve(basePath, one), function(err, status) {
					// 当前目录如果读取错误，直接忽略
					if (err) {
						resolve(result);
					} else {
						if (!nameTest.test(one)) {
							result.push({
								name: one,
								size: status.size,
								mtime: status.mtime,
								isDirectory: status.isDirectory()
							});
						}
						resolve(result);
					}
				});
			}).then(get);
		}
	};
	return get([]);
};
