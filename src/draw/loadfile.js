/**
 * 负责模型加载的
 *
 * @author renzhenguo
 */

'use strict';

/**
 * @module loadfile
 */
export default function (options) {
  let func;
  switch(options.type)
  {
    case 'glTF2':
      func = loadGltf2;
      break;
    default:
      return Promise.reject(new Error('loadfile 不支持的类型: ' + options.type));
  }

  return new Promise((resolve, reject) => {
    func(options, resolve, reject);
  });
};

/**
 * 加载glTF2
 */
function loadGltf2 (options, resolve, reject) {
  let loader = new THREE.GLTFLoader();

  loader.load(options.file, function(gltf) {
    let object = gltf.scene;

    object.traverse( function ( node ) {
        if ( node.isMesh ) node.castShadow = true;
    } );

    // 多相机处理

    // 动画
    let animations = gltf.animations;
    if (animations && animations.length) {
      mixer = new THREE.AnimationMixer( object );

      animations.forEach(function(animation, i) {
        mixer.clipAction( animation ).play();
      });
      object.mixer = mixer;
    }

    resolve(options.cb(object));
  }, function () {
    // 加载过程
  }, function (err) {
    reject(new Error('文件加载异常'));
  });
}
