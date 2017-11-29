/**
 * 编译入口
 *
 * @author renzhenguo
 */

'use strict';

require('../lib/OrbitControls.js');
require('../lib/GLTFLoader.js');

exports.Draw  = require('./draw/main.js');
exports.Duang = require('./duang/main.js');
