/**
 * 模型渲染类
 *
 * @author [waiting...]
 * @author renzhenguo
 */

'use strict';

var loadfile = require('./loadfile.js');
var interact = require('./interact.js');
var aide     = require('./aide.js');
var css      = require('./css.js');

/**
 * @module ThreePlay.Draw
 */
function Draw (options) {
  this._initOpt(options);
  this._initRes();

  loadfile(this).then(data => {
    this.scene.add(data);
    this.containerDom.appendChild( this.canvasDom );

    // 计算展示位置
    aide.position(this, data);
    // 线框
    aide.lineSegments(this, data);

    // 其他内容处理
    console.log(data);

    // 处理控制内容
    interact(this);

    this._animate();
    this._onLoad();
  }).catch(this._onError );
}

var drawProto = Draw.prototype;

/**
 * 初始化参数
 */
drawProto._initOpt = function (options) {
  this.version  = '1.0.0';
  this._options = options || {};
  this._onError = this._options.onError || function(err) { console.log(err); }
  this._onLoad  = this._options.onLoad  || function() {}

  // 模型助手功能数据
  this.aide = [];

  css(this._options);
}

/**
 * 初始化元素
 */
drawProto._initRes = function () {
  // 场景
  this.scene = new THREE.Scene();

  // 相机
  this.camera = new THREE.PerspectiveCamera(90, 1, 1, 1000);

  // 渲染器
  this.renderer = new THREE.WebGLRenderer({ antialias: true });
  this.renderer.setClearColor(0x999999);
  this.renderer.setPixelRatio( window.devicePixelRatio );

  // 控制器
  this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);

  // dom元素
  this.containerDom = this._options.dom;
  this.canvasDom = this.renderer.domElement;
}

drawProto._animate = function() {
  if (!window.draw) window.draw = this;

  draw.renderer.render( draw.scene, draw.camera );
  draw.controls.update();

  requestAnimationFrame( draw._animate );
}

module.exports = Draw;
