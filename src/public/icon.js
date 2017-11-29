/**
 * icon svg图标
 * 大小统一选取24, tip位置在顶部, 颜色由css控制
 *
 * svg来源
 * 阿里: http://www.iconfont.cn/  
 * 谷歌: https://material.io/icons/
 *
 * @author renzhenguo
 */

'use strict';

let icons = {
    'fullscreen': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>',
    'fullscreen_exit': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/></svg>',
    'border_all': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 3v18h18V3H3zm8 16H5v-6h6v6zm0-8H5V5h6v6zm8 8h-6v-6h6v6zm0-8h-6V5h6v6z"/></svg>',
};

/**
 * @module icon
 * @param dom 添加icon图标的容器
 * @param name icon图标名称,对应icons里的key
 * @param tip 鼠标指向icon的提示
 */
module.exports = function (dom, name, tip) {
    let svg = icons[name] || tip || name;
    dom.innerHTML = svg;

    if (!tip) { return ; }

    let span = document.createElement('span');
    span.className = 'drawdom_icontip';
    span.innerHTML = tip;

    dom.onmouseover = function (event) {
        if (dom.lastElementChild == span) { return ; }
        dom.appendChild(span);
    }
    dom.onmouseout = function (event) {
        if (event.relatedTarget == dom) { return ; }
        if (event.relatedTarget.parentNode == dom) { return ; }
        if (event.relatedTarget.parentNode.parentNode == dom) { return ; }
        if (dom.lastElementChild == span) {
            dom.removeChild(span);
        }
    }
}
