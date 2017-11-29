/**
 * 负责模型加载的
 *
 * @author renzhenguo
 */

'use strict';

/**
 * @module loadfile
 */
module.exports = function (draw) {
  let func;
  switch(draw._options.type)
  {
    case 'glTF2':
      func = loadGltf2;
      break;
    default:
      return Promise.reject(new Error('loadfile 不支持的类型: ' + draw._options.type));
  }

  let promise = new Promise( function(resolve, reject) {
    func(draw, resolve, reject);
  });
  return promise;
};

/**
 * 加载glTF2
 */
function loadGltf2 (draw, resolve, reject) {
  let loader = new THREE.GLTFLoader();

  loader.load(draw._options.file, function(gltf) {
    let object = gltf.scene;

    object.traverse( function ( node ) {
        if ( node.isMesh ) node.castShadow = true;
    } );

    // 多相机处理

    // 动画
    var animations = gltf.animations;
    if (animations && animations.length) {
      mixer = new THREE.AnimationMixer( object );

      animations.forEach(function(animation, i) {
        mixer.clipAction( animation ).play();
      });
      object.mixer = mixer;
    }

    // 临时灯光
    let ambientLight = new THREE.AmbientLight( 0x999999 ); // 环境光
    object.add( ambientLight );

    let directionalLight = new THREE.DirectionalLight( 0xdddddd ); // 平行光阴影
    directionalLight.position.set( 0, 0, 1 ).normalize();
    object.add( directionalLight );

    resolve(object);
  }, function () {
    // 加载过程
  }, function (err) {
    reject(new Error('文件加载异常'));
  });
}
