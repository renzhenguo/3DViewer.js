# 3DViewer.js

3D模型的处理库


### 组件

three.js
tween.js


### 引用方式

##### 方法1. 使用 webpack 的引入

安装:

~~~
配置项目package.json 的 dependencies 模块
"3DViewer.js": "git+https://github.com/frogRen/3DViewer.js.git#master"

cnpm install
~~~

引用:

~~~
全部引用
import * as Viewer from '3DViewer.js'
~~~

##### 方法2. 普通 JavaScript 标签引入

安装:

~~~
下载源码 https://github.com/frogRen/3DViewer.js
~~~

引用:

~~~
用 script 标签引入 build/Viewer.js
<script src="build/Viewer.js"></script>
~~~

---

### 使用方式

##### 模型展示

~~~
var draw = new Viewer.Draw('domID');
draw.load({
  'type' : 'glTF2',
  'file' : '模型url地址,注意跨域问题',
}).then(r => {
}).catch(r => {
});
~~~

examples 中有 vue 和 普通 JavaScript 标签引入的示例

### 文档

#### Viewer.Draw

* 构造函数

    domID: 承载内容的容器ID

* load方法

  作用: 加载模型
  返回: Promise对象

  参数: {} 对象
  ~~~
  type: 文件类型, 目前仅支持glTF2
  file: 文件地址, 注意跨域加载问题
  ~~~

* debug方法

  作用: 开启调试信息,包含: 轴线、javascript运行情况、自动旋转
  参数、返回: 无

### 其他介绍

  没有提交npm
