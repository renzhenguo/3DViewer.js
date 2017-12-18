/**
 * 助手,辅助模型信息
 * 位置 大小 动画 灯光 贴图 背景 等展示优化
 *
 * @author renzhenguo
 */

'use strict';

/**
 * @module aide
 */
export default function (draw, data) {
    position(draw, data);
    animation(draw, data);
    light(draw, data);
    other(draw, data);
}

/**
 * 初始展示位置的计算
 */
function position (draw, data) {
    let box    = new THREE.Box3().setFromObject(data);
    let size   = box.getSize();
    let center = box.getCenter();

    data.translateX(-center.x).translateY(-center.y).translateZ(-center.z);

    //draw.camera.position.copy(center);
    //draw.camera.lookAt(center);

    let radius = Math.max(size.x, size.y);
    draw.camera.far  = radius * 100;
    draw.camera.near = radius / 100;
    draw.camera.position.z = radius * 1.5;
    draw.camera.updateProjectionMatrix();

    draw.controls.maxDistance = radius * 10;
}

/**
 * 展示的动画效果
 */
function animation (draw, data) {
  data.scale.x = data.scale.y = data.scale.z = 0.5;
  data.rotation.y = -Math.PI/4;

  new TWEEN.Tween(data.rotation)
      .to({ y: 0 }, 1500)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start();
  new TWEEN.Tween(data.scale)
      .to({ x:1, y: 1, z:1 }, 1500)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start();
}

/**
 * 灯光
 */
function light (draw, data) {
    // 临时灯光
    let ambientLight = new THREE.AmbientLight( 0xFFFFFF, 0.3 ); // 环境光
    draw.camera.add( ambientLight );

    let directionalLight = new THREE.DirectionalLight( 0xFFFFFF, 0.8 ); // 平行光阴影
    directionalLight.position.set( 0.5, 0, 0.866 );  // ~60º
    draw.camera.add( directionalLight );
}

/**
 * 其他相关
 */
function other (draw, data) {
    let encoding = THREE.LinearEncoding; //THREE.sRGBEncoding;
    data.traverse(function (node) {
        if (node.isMesh) {
            if (node.material.map) node.material.map.encoding = encoding;
            if (node.material.emissiveMap) node.material.emissiveMap.encoding = encoding;
            if (node.material.map || node.material.emissiveMap) node.material.needsUpdate = true;
        }
    });
}
