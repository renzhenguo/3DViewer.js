/**
 * 编译入口
 *
 * @author renzhenguo
 */

'use strict';

global.THREE = require('three');
global.TWEEN = require('@tweenjs/tween.js');

require('../lib/OrbitControls.js');
require('../lib/GLTFLoader.js');

import Duang from './duang/main';
import Draw from './draw/main';

export {
  Draw,
  Duang,
}
