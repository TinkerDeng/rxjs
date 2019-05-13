# rxjs

operator练习

## 目录

* [项目介绍](#项目介绍)
* [nodemon配置注意事项](#nodemon配置注意事项)
* [项目运行](#项目运行)

### 项目介绍

```
|-- 
  |-- package.json    项目依赖
	|-- index.js        各种operator测试文件
  |-- xxx.html        某个operator的实际应用
  |-- xxx.css         样式文件
  |-- babel.config.js 编辑es6+代码使其可以在node中运行
  |-- nodemon.json    实时更新代码
```

### nodemon配置注意事项

```javascript
  {
    "restartable": "rs",
    "ignore": [
        ".git",
        ".svn"
    ],
    "events": {
      "start": "cls || clear"  // nodemon热刷新过程中清空之前的日志
    },
    "verbose": true,
    "execMap": {
        "js": "node --harmony"
    },
    "env": {
        "NODE_ENV": "development"
    },
    "ext": "js json",
    "ignoreRoot": [".git", ".jpg", ".whatever"] // 这个配置很重要，如果你想实现更改node_modules实时刷新，这个一定要配置
  }
```

### 项目运行

```shell
  git clone https://github.com/TinkerDeng/rxjs.git
  npm i
  npm start
```
