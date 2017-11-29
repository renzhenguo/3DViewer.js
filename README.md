# ThreePlay

3D模型的处理库


### 组件
核心: three.js

打包: webpack

### 引用方式

##### 方法1. 使用 webpack 的引入

安装:

~~~
配置项目package.json 的 dependencies 模块

cnpm install
~~~

引用:

~~~
global.THREE  = require('three');
var ThreePlay = require('threeplay');
~~~

##### 方法2. 普通 JavaScript 标签引入

安装:

~~~
下载源码 https://git.duxze.com/renzhenguo/ThreePlay.js
cnpm install
npm run build
~~~

引用:

~~~
用 script 标签引入 build/three.min.js 和 build/ThreePlay.js

<script src="build/three.min.js"></script>
<script src="build/ThreePlay.js"></script>
~~~

---

### 使用方式

~~~
var draw = new ThreePlay.Draw({
  'dom'    : document.getElementById("div"),
  'type'   : 'glTF2',
  'file'   : '模型文件地址',
  'onLoad' : function(data) {},
  'onError': function(err) {},
});
~~~

~~~
dom: html节点
type: 文件类型, 目前仅支持glTF2
file: 文件地址, 注意跨域加载问题
onLoad: 加载完成的回调
onError: 加载异常的回调
~~~

examples 中有 vue 和 标签引入的示例

### 其他介绍
