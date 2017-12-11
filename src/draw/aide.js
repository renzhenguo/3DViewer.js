/**
 * 助手,辅助模型信息
 *
 * @author renzhenguo
 */

'use strict';

/**
 * 初始展示位置的计算
 */
let position = function (draw, data) {
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
}

/**
 * 展示的动画效果
 */
let animation = function (draw) {
  draw.scene.scale.x = draw.scene.scale.y = draw.scene.scale.z = 0.5;
  draw.scene.rotation.y = -Math.PI/4;

  new TWEEN.Tween(draw.scene.rotation)
      .to({ y: 0 }, 1000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .delay(500)
      .start();
  new TWEEN.Tween(draw.scene.scale)
      .to({ x:1, y: 1, z:1 }, 1000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .delay(500)
      .start();
}

/**
 * 模型线框
 */
let lineSegments = function (draw, data) {
    draw.aide.lineSegments = [];

    data.traverse( function ( node ) {
        if (node.geometry) {
            let wireframe = new THREE.WireframeGeometry( node.geometry );
            let line = new THREE.LineSegments( wireframe );
            line.material.visible = false;
            data.add( line);

            draw.aide.lineSegments.push( line );
        }
    });
}

/**
 * 灯光
 */
let light = function (draw) {
    // 临时灯光
    let ambientLight = new THREE.AmbientLight( 0x999999 ); // 环境光
    draw.scene.add( ambientLight );

    let directionalLight = new THREE.DirectionalLight( 0xdddddd ); // 平行光阴影
    directionalLight.position.set( 0, 0, 1 ).normalize();
    draw.scene.add( directionalLight );
}

/**
 * @module aide
 */
export default function (draw, data) {
    position(draw, data);
    animation(draw);
    lineSegments(draw, data);
    light(draw);

    // 控制器
    new THREE.OrbitControls(draw.camera, draw.canvasDom);
}
