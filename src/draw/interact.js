/**
 * 处理交互操作及事件
 *
 * @author renzhenguo
 */

'use strict';

import icon from '../public/icon';

/**
 * @module interact
 */
export default function (draw) {
  containerResize(draw);
  window.addEventListener('resize', function() {containerResize(draw)}, false);

  let divDom = document.createElement('div');
  divDom.className = 'drawdom_ctrlbts';
  draw.containerDom.appendChild(divDom);

  divDom.appendChild(requestFullscreen(draw));
  divDom.appendChild(lineSegments(draw));
};

/**
 * 尺寸改变
 */
function containerResize(draw) {
  let offset = {
    'width' : draw.containerDom.clientWidth  || draw.containerDom.offsetWidth,
    'height': draw.containerDom.clientHeight || draw.containerDom.offsetHeight,
  };

  draw.renderer.setSize(offset.width, offset.height);
  draw.camera.aspect = offset.width / offset.height;
  draw.camera.updateProjectionMatrix();
}

/**
 * 全屏方法
 */
function requestFullscreen(draw) {
    let dom = document.createElement('span');
    icon(dom, 'fullscreen', '全屏');

    dom.onclick = function() {
        let fullscreenElement = document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement;

        document.exitFullscreen = document.exitFullscreen ||
            document.webkitExitFullscreen ||
            document.mozCancelFullScreen ||
            document.msExitFullscreen;

        if (fullscreenElement) {
            return document.exitFullscreen();
        }

        draw.containerDom.requestFullscreen = draw.containerDom.requestFullscreen ||
            draw.containerDom.webkitRequestFullscreen ||
            draw.containerDom.mozRequestFullScreen ||
            draw.containerDom.msRequestFullscreen;
        draw.containerDom.requestFullscreen();
    }

    document.onfullscreenchange =
    document.onwebkitfullscreenchange =
    document.onmozfullscreenchange =
    document.MSFullscreenChange = function () {
        let fullscreenElement = document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement;
        if (fullscreenElement) {
            return icon(dom, 'fullscreen_exit', '退出全屏');
        }
        icon(dom, 'fullscreen', '全屏');
    }
    return dom;
}

/**
 * 线框
 */
function lineSegments (draw) {
    if (draw.aide.lineSegments.length < 1) { return ; }

    let dom = document.createElement('span');
    icon(dom, 'border_all', '线框');
    dom.onclick = function () {
      draw.aide.lineSegments.forEach(function (line, i) {
        //line.material.depthTest = false;
        line.material.visible = !line.material.visible;
      });
    }
    return dom;
}
