/**
 * 处理css样式
 *
 * @author renzhenguo
 */

'use strict';

/**
 * @module css
 */
export default function (dom) {
  let css = document.createElement('style');
  css.innerHTML = getCss();

  let head = document.head || document.getElementsByTagName('head')[0];
  head.appendChild(css);

  let className = (dom.className + ' drawdom').trim();
  dom.setAttribute('class', className);
};

/**
 * css内容
 */
function getCss() {
  return `
    .drawdom {
        position: relative;
    }
    .drawdom > canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .drawdom svg {
        fill: currentColor;
    }
    .drawdom_ctrlbts {
        position: absolute;
        bottom: 20px;
        right: 20px;
    }
    .drawdom_ctrlbts > * {
        cursor: pointer;
        position: relative;
        display: block;
        float: left;
        color: #fff;
        padding: 5px;
        width: 24px;
        height: 24px;
    }
    .drawdom_ctrlbts > *:hover {
        background-color: rgba(0,0,0,0.1);
        border-radius: 24px;
    }
    .drawdom_icontip {
        background-color: rgba(0,0,0,0.1);
        position: absolute;
        white-space: nowrap;
        font-size: 12px;
        width: 60px;
        text-align: center;
        line-height: 28px;
        top: -30px;
        left: -14px;
        -webkit-user-select:none;
        -moz-user-select:none;
        -o-user-select:none;
        user-select:none;
    }
  `;
}
