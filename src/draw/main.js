/**
 * 模型渲染类
 *
 * @author [waiting...]
 * @author renzhenguo
 */

'use strict';

import loadfile from './loadfile';
import interact from './interact';
import aide     from './aide';
import css      from './css';

/**
 * @module Draw
 */
class Draw {

  /**
   * 构建函数
   *
   * 初始化参数&资源等
   */
  constructor (dom, options) {
    // 基础参数
    this.version  = '1.0.0';
    this._options = options || {};
    this._animate = this._animate.bind(this);

    // 场景&相机
    this.aide   = [];
    this.scene  = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(90, 1, 0.01, 1000);

    // 渲染器
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor(0x999999);
    this.renderer.setPixelRatio( window.devicePixelRatio );

    // dom元素
    this.canvasDom    = this.renderer.domElement;
    this.containerDom = document.getElementById(dom);

    css(this.containerDom);
  }

  /**
   * 加载文件
   */
  load (options) {
    options.cb = (data => {
      this._setContent(data);
      this._animate();
      return this;
    });
    return loadfile(options);
  }

  /**
   * 设置内容
   */
  _setContent (data) {
    this.scene.add(data);
    this.containerDom.appendChild( this.canvasDom );

    // 助手处理 展示位置,线框,展示动画等
    aide(this, data);

    // 处理控制内容
    interact(this);

    // 其他内容处理
  }

  _animate () {
    TWEEN.update();
    this.renderer.render( this.scene, this.camera );
    requestAnimationFrame( this._animate );
  }

}

export default Draw
