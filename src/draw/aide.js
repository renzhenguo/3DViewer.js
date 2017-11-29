/**
 * 助手,辅助模型信息
 *
 * @author renzhenguo
 */

'use strict';

/**
 * 初始展示位置的计算, TODO 动画效果
 */
exports.position = function (draw, data) {
  let area = {
    'x': {'min': 100000, 'max': -100000},
    'y': {'min': 100000, 'max': -100000},
  };
  data.traverse( function ( node ) {
    if (node.geometry) {
      node.geometry.computeBoundingSphere();

      let minX = node.geometry.boundingSphere.center.x - node.geometry.boundingSphere.radius;
      area.x.min = Math.min(area.x.min, minX);
      let maxX = node.geometry.boundingSphere.center.x + node.geometry.boundingSphere.radius;
      area.x.max = Math.max(area.x.max, maxX);
      let minY = node.geometry.boundingSphere.center.y - node.geometry.boundingSphere.radius;
      area.y.min = Math.min(area.y.min, minY);
      let maxY = node.geometry.boundingSphere.center.y + node.geometry.boundingSphere.radius;
      area.y.max = Math.max(area.y.max, maxY);
    }
  } );
  let diam = Math.max(area.x.max - area.x.min, area.y.max - area.y.min);
  if (diam > 0) {
    draw.camera.near = diam * 0.05;
    draw.camera.position.z = diam * 0.6;
  }
}

/**
 * 模型线框
 */
exports.lineSegments = function (draw, data) {
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
