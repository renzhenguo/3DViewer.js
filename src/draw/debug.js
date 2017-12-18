/**
 * debug
 * 调试信息,轴线/帧率/自动旋转等
 *
 * @author renzhenguo
 */

'use strict';

import Stats    from 'stats.js';

/**
 * @module aide
 */
export default function (draw) {

    let stats = new Stats();
    stats.domElement.style.position = 'absolute';
    [].forEach.call(stats.dom.children, (child) => (child.style.display = ''));
    draw.containerDom.appendChild(stats.domElement);

    (function animate () {
        stats.update();
        requestAnimationFrame(animate);
    }).call();


    let len = (draw.controls.maxDistance == Infinity) ? 10 : draw.controls.maxDistance / 10;
    var axisHelper = new THREE.AxesHelper( len );
    draw.scene.add( axisHelper );

    draw.controls.autoRotate = true;
}
