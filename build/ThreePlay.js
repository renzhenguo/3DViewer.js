(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ThreePlay"] = factory();
	else
		root["ThreePlay"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * 编译入口
 *
 * @author renzhenguo
 */



__webpack_require__(1);
__webpack_require__(2);

exports.Draw = __webpack_require__(3);
exports.Duang = __webpack_require__(9);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/**
 * @author qiao / https://github.com/qiao
 * @author mrdoob / http://mrdoob.com
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author erich666 / http://erichaines.com
 */

// This set of controls performs orbiting, dollying (zooming), and panning.
// Unlike TrackballControls, it maintains the "up" direction object.up (+Y by default).
//
//    Orbit - left mouse / touch: one finger move
//    Zoom - middle mouse, or mousewheel / touch: two finger spread or squish
//    Pan - right mouse, or arrow keys / touch: three finger swipe

THREE.OrbitControls = function ( object, domElement ) {

	this.object = object;

	this.domElement = ( domElement !== undefined ) ? domElement : document;

	// Set to false to disable this control
	this.enabled = true;

	// "target" sets the location of focus, where the object orbits around
	this.target = new THREE.Vector3();

	// How far you can dolly in and out ( PerspectiveCamera only )
	this.minDistance = 0;
	this.maxDistance = Infinity;

	// How far you can zoom in and out ( OrthographicCamera only )
	this.minZoom = 0;
	this.maxZoom = Infinity;

	// How far you can orbit vertically, upper and lower limits.
	// Range is 0 to Math.PI radians.
	this.minPolarAngle = 0; // radians
	this.maxPolarAngle = Math.PI; // radians

	// How far you can orbit horizontally, upper and lower limits.
	// If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
	this.minAzimuthAngle = - Infinity; // radians
	this.maxAzimuthAngle = Infinity; // radians

	// Set to true to enable damping (inertia)
	// If damping is enabled, you must call controls.update() in your animation loop
	this.enableDamping = false;
	this.dampingFactor = 0.25;

	// This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
	// Set to false to disable zooming
	this.enableZoom = true;
	this.zoomSpeed = 1.0;

	// Set to false to disable rotating
	this.enableRotate = true;
	this.rotateSpeed = 1.0;

	// Set to false to disable panning
	this.enablePan = true;
	this.keyPanSpeed = 7.0;	// pixels moved per arrow key push

	// Set to true to automatically rotate around the target
	// If auto-rotate is enabled, you must call controls.update() in your animation loop
	this.autoRotate = false;
	this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60

	// Set to false to disable use of the keys
	this.enableKeys = true;

	// The four arrow keys
	this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };

	// Mouse buttons
	this.mouseButtons = { ORBIT: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.MIDDLE, PAN: THREE.MOUSE.RIGHT };

	// for reset
	this.target0 = this.target.clone();
	this.position0 = this.object.position.clone();
	this.zoom0 = this.object.zoom;

	//
	// public methods
	//

	this.getPolarAngle = function () {

		return spherical.phi;

	};

	this.getAzimuthalAngle = function () {

		return spherical.theta;

	};

	this.saveState = function () {

		scope.target0.copy( scope.target );
		scope.position0.copy( scope.object.position );
		scope.zoom0 = scope.object.zoom;

	};

	this.reset = function () {

		scope.target.copy( scope.target0 );
		scope.object.position.copy( scope.position0 );
		scope.object.zoom = scope.zoom0;

		scope.object.updateProjectionMatrix();
		scope.dispatchEvent( changeEvent );

		scope.update();

		state = STATE.NONE;

	};

	// this method is exposed, but perhaps it would be better if we can make it private...
	this.update = function () {

		var offset = new THREE.Vector3();

		// so camera.up is the orbit axis
		var quat = new THREE.Quaternion().setFromUnitVectors( object.up, new THREE.Vector3( 0, 1, 0 ) );
		var quatInverse = quat.clone().inverse();

		var lastPosition = new THREE.Vector3();
		var lastQuaternion = new THREE.Quaternion();

		return function update() {

			var position = scope.object.position;

			offset.copy( position ).sub( scope.target );

			// rotate offset to "y-axis-is-up" space
			offset.applyQuaternion( quat );

			// angle from z-axis around y-axis
			spherical.setFromVector3( offset );

			if ( scope.autoRotate && state === STATE.NONE ) {

				rotateLeft( getAutoRotationAngle() );

			}

			spherical.theta += sphericalDelta.theta;
			spherical.phi += sphericalDelta.phi;

			// restrict theta to be between desired limits
			spherical.theta = Math.max( scope.minAzimuthAngle, Math.min( scope.maxAzimuthAngle, spherical.theta ) );

			// restrict phi to be between desired limits
			spherical.phi = Math.max( scope.minPolarAngle, Math.min( scope.maxPolarAngle, spherical.phi ) );

			spherical.makeSafe();


			spherical.radius *= scale;

			// restrict radius to be between desired limits
			spherical.radius = Math.max( scope.minDistance, Math.min( scope.maxDistance, spherical.radius ) );

			// move target to panned location
			scope.target.add( panOffset );

			offset.setFromSpherical( spherical );

			// rotate offset back to "camera-up-vector-is-up" space
			offset.applyQuaternion( quatInverse );

			position.copy( scope.target ).add( offset );

			scope.object.lookAt( scope.target );

			if ( scope.enableDamping === true ) {

				sphericalDelta.theta *= ( 1 - scope.dampingFactor );
				sphericalDelta.phi *= ( 1 - scope.dampingFactor );

			} else {

				sphericalDelta.set( 0, 0, 0 );

			}

			scale = 1;
			panOffset.set( 0, 0, 0 );

			// update condition is:
			// min(camera displacement, camera rotation in radians)^2 > EPS
			// using small-angle approximation cos(x/2) = 1 - x^2 / 8

			if ( zoomChanged ||
				lastPosition.distanceToSquared( scope.object.position ) > EPS ||
				8 * ( 1 - lastQuaternion.dot( scope.object.quaternion ) ) > EPS ) {

				scope.dispatchEvent( changeEvent );

				lastPosition.copy( scope.object.position );
				lastQuaternion.copy( scope.object.quaternion );
				zoomChanged = false;

				return true;

			}

			return false;

		};

	}();

	this.dispose = function () {

		scope.domElement.removeEventListener( 'contextmenu', onContextMenu, false );
		scope.domElement.removeEventListener( 'mousedown', onMouseDown, false );
		scope.domElement.removeEventListener( 'wheel', onMouseWheel, false );

		scope.domElement.removeEventListener( 'touchstart', onTouchStart, false );
		scope.domElement.removeEventListener( 'touchend', onTouchEnd, false );
		scope.domElement.removeEventListener( 'touchmove', onTouchMove, false );

		document.removeEventListener( 'mousemove', onMouseMove, false );
		document.removeEventListener( 'mouseup', onMouseUp, false );

		window.removeEventListener( 'keydown', onKeyDown, false );

		//scope.dispatchEvent( { type: 'dispose' } ); // should this be added here?

	};

	//
	// internals
	//

	var scope = this;

	var changeEvent = { type: 'change' };
	var startEvent = { type: 'start' };
	var endEvent = { type: 'end' };

	var STATE = { NONE: - 1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_DOLLY: 4, TOUCH_PAN: 5 };

	var state = STATE.NONE;

	var EPS = 0.000001;

	// current position in spherical coordinates
	var spherical = new THREE.Spherical();
	var sphericalDelta = new THREE.Spherical();

	var scale = 1;
	var panOffset = new THREE.Vector3();
	var zoomChanged = false;

	var rotateStart = new THREE.Vector2();
	var rotateEnd = new THREE.Vector2();
	var rotateDelta = new THREE.Vector2();

	var panStart = new THREE.Vector2();
	var panEnd = new THREE.Vector2();
	var panDelta = new THREE.Vector2();

	var dollyStart = new THREE.Vector2();
	var dollyEnd = new THREE.Vector2();
	var dollyDelta = new THREE.Vector2();

	function getAutoRotationAngle() {

		return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;

	}

	function getZoomScale() {

		return Math.pow( 0.95, scope.zoomSpeed );

	}

	function rotateLeft( angle ) {

		sphericalDelta.theta -= angle;

	}

	function rotateUp( angle ) {

		sphericalDelta.phi -= angle;

	}

	var panLeft = function () {

		var v = new THREE.Vector3();

		return function panLeft( distance, objectMatrix ) {

			v.setFromMatrixColumn( objectMatrix, 0 ); // get X column of objectMatrix
			v.multiplyScalar( - distance );

			panOffset.add( v );

		};

	}();

	var panUp = function () {

		var v = new THREE.Vector3();

		return function panUp( distance, objectMatrix ) {

			v.setFromMatrixColumn( objectMatrix, 1 ); // get Y column of objectMatrix
			v.multiplyScalar( distance );

			panOffset.add( v );

		};

	}();

	// deltaX and deltaY are in pixels; right and down are positive
	var pan = function () {

		var offset = new THREE.Vector3();

		return function pan( deltaX, deltaY ) {

			var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

			if ( scope.object.isPerspectiveCamera ) {

				// perspective
				var position = scope.object.position;
				offset.copy( position ).sub( scope.target );
				var targetDistance = offset.length();

				// half of the fov is center to top of screen
				targetDistance *= Math.tan( ( scope.object.fov / 2 ) * Math.PI / 180.0 );

				// we actually don't use screenWidth, since perspective camera is fixed to screen height
				panLeft( 2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix );
				panUp( 2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix );

			} else if ( scope.object.isOrthographicCamera ) {

				// orthographic
				panLeft( deltaX * ( scope.object.right - scope.object.left ) / scope.object.zoom / element.clientWidth, scope.object.matrix );
				panUp( deltaY * ( scope.object.top - scope.object.bottom ) / scope.object.zoom / element.clientHeight, scope.object.matrix );

			} else {

				// camera neither orthographic nor perspective
				console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.' );
				scope.enablePan = false;

			}

		};

	}();

	function dollyIn( dollyScale ) {

		if ( scope.object.isPerspectiveCamera ) {

			scale /= dollyScale;

		} else if ( scope.object.isOrthographicCamera ) {

			scope.object.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.object.zoom * dollyScale ) );
			scope.object.updateProjectionMatrix();
			zoomChanged = true;

		} else {

			console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
			scope.enableZoom = false;

		}

	}

	function dollyOut( dollyScale ) {

		if ( scope.object.isPerspectiveCamera ) {

			scale *= dollyScale;

		} else if ( scope.object.isOrthographicCamera ) {

			scope.object.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.object.zoom / dollyScale ) );
			scope.object.updateProjectionMatrix();
			zoomChanged = true;

		} else {

			console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
			scope.enableZoom = false;

		}

	}

	//
	// event callbacks - update the object state
	//

	function handleMouseDownRotate( event ) {

		//console.log( 'handleMouseDownRotate' );

		rotateStart.set( event.clientX, event.clientY );

	}

	function handleMouseDownDolly( event ) {

		//console.log( 'handleMouseDownDolly' );

		dollyStart.set( event.clientX, event.clientY );

	}

	function handleMouseDownPan( event ) {

		//console.log( 'handleMouseDownPan' );

		panStart.set( event.clientX, event.clientY );

	}

	function handleMouseMoveRotate( event ) {

		//console.log( 'handleMouseMoveRotate' );

		rotateEnd.set( event.clientX, event.clientY );
		rotateDelta.subVectors( rotateEnd, rotateStart );

		var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

		// rotating across whole screen goes 360 degrees around
		rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );

		// rotating up and down along whole screen attempts to go 360, but limited to 180
		rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );

		rotateStart.copy( rotateEnd );

		scope.update();

	}

	function handleMouseMoveDolly( event ) {

		//console.log( 'handleMouseMoveDolly' );

		dollyEnd.set( event.clientX, event.clientY );

		dollyDelta.subVectors( dollyEnd, dollyStart );

		if ( dollyDelta.y > 0 ) {

			dollyIn( getZoomScale() );

		} else if ( dollyDelta.y < 0 ) {

			dollyOut( getZoomScale() );

		}

		dollyStart.copy( dollyEnd );

		scope.update();

	}

	function handleMouseMovePan( event ) {

		//console.log( 'handleMouseMovePan' );

		panEnd.set( event.clientX, event.clientY );

		panDelta.subVectors( panEnd, panStart );

		pan( panDelta.x, panDelta.y );

		panStart.copy( panEnd );

		scope.update();

	}

	function handleMouseUp( event ) {

		// console.log( 'handleMouseUp' );

	}

	function handleMouseWheel( event ) {

		// console.log( 'handleMouseWheel' );

		if ( event.deltaY < 0 ) {

			dollyOut( getZoomScale() );

		} else if ( event.deltaY > 0 ) {

			dollyIn( getZoomScale() );

		}

		scope.update();

	}

	function handleKeyDown( event ) {

		//console.log( 'handleKeyDown' );

		switch ( event.keyCode ) {

			case scope.keys.UP:
				pan( 0, scope.keyPanSpeed );
				scope.update();
				break;

			case scope.keys.BOTTOM:
				pan( 0, - scope.keyPanSpeed );
				scope.update();
				break;

			case scope.keys.LEFT:
				pan( scope.keyPanSpeed, 0 );
				scope.update();
				break;

			case scope.keys.RIGHT:
				pan( - scope.keyPanSpeed, 0 );
				scope.update();
				break;

		}

	}

	function handleTouchStartRotate( event ) {

		//console.log( 'handleTouchStartRotate' );

		rotateStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

	}

	function handleTouchStartDolly( event ) {

		//console.log( 'handleTouchStartDolly' );

		var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
		var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;

		var distance = Math.sqrt( dx * dx + dy * dy );

		dollyStart.set( 0, distance );

	}

	function handleTouchStartPan( event ) {

		//console.log( 'handleTouchStartPan' );

		panStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

	}

	function handleTouchMoveRotate( event ) {

		//console.log( 'handleTouchMoveRotate' );

		rotateEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
		rotateDelta.subVectors( rotateEnd, rotateStart );

		var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

		// rotating across whole screen goes 360 degrees around
		rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );

		// rotating up and down along whole screen attempts to go 360, but limited to 180
		rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );

		rotateStart.copy( rotateEnd );

		scope.update();

	}

	function handleTouchMoveDolly( event ) {

		//console.log( 'handleTouchMoveDolly' );

		var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
		var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;

		var distance = Math.sqrt( dx * dx + dy * dy );

		dollyEnd.set( 0, distance );

		dollyDelta.subVectors( dollyEnd, dollyStart );

		if ( dollyDelta.y > 0 ) {

			dollyOut( getZoomScale() );

		} else if ( dollyDelta.y < 0 ) {

			dollyIn( getZoomScale() );

		}

		dollyStart.copy( dollyEnd );

		scope.update();

	}

	function handleTouchMovePan( event ) {

		//console.log( 'handleTouchMovePan' );

		panEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

		panDelta.subVectors( panEnd, panStart );

		pan( panDelta.x, panDelta.y );

		panStart.copy( panEnd );

		scope.update();

	}

	function handleTouchEnd( event ) {

		//console.log( 'handleTouchEnd' );

	}

	//
	// event handlers - FSM: listen for events and reset state
	//

	function onMouseDown( event ) {

		if ( scope.enabled === false ) return;

		event.preventDefault();

		switch ( event.button ) {

			case scope.mouseButtons.ORBIT:

				if ( scope.enableRotate === false ) return;

				handleMouseDownRotate( event );

				state = STATE.ROTATE;

				break;

			case scope.mouseButtons.ZOOM:

				if ( scope.enableZoom === false ) return;

				handleMouseDownDolly( event );

				state = STATE.DOLLY;

				break;

			case scope.mouseButtons.PAN:

				if ( scope.enablePan === false ) return;

				handleMouseDownPan( event );

				state = STATE.PAN;

				break;

		}

		if ( state !== STATE.NONE ) {

			document.addEventListener( 'mousemove', onMouseMove, false );
			document.addEventListener( 'mouseup', onMouseUp, false );

			scope.dispatchEvent( startEvent );

		}

	}

	function onMouseMove( event ) {

		if ( scope.enabled === false ) return;

		event.preventDefault();

		switch ( state ) {

			case STATE.ROTATE:

				if ( scope.enableRotate === false ) return;

				handleMouseMoveRotate( event );

				break;

			case STATE.DOLLY:

				if ( scope.enableZoom === false ) return;

				handleMouseMoveDolly( event );

				break;

			case STATE.PAN:

				if ( scope.enablePan === false ) return;

				handleMouseMovePan( event );

				break;

		}

	}

	function onMouseUp( event ) {

		if ( scope.enabled === false ) return;

		handleMouseUp( event );

		document.removeEventListener( 'mousemove', onMouseMove, false );
		document.removeEventListener( 'mouseup', onMouseUp, false );

		scope.dispatchEvent( endEvent );

		state = STATE.NONE;

	}

	function onMouseWheel( event ) {

		if ( scope.enabled === false || scope.enableZoom === false || ( state !== STATE.NONE && state !== STATE.ROTATE ) ) return;

		event.preventDefault();
		event.stopPropagation();

		handleMouseWheel( event );

		scope.dispatchEvent( startEvent ); // not sure why these are here...
		scope.dispatchEvent( endEvent );

	}

	function onKeyDown( event ) {

		if ( scope.enabled === false || scope.enableKeys === false || scope.enablePan === false ) return;

		handleKeyDown( event );

	}

	function onTouchStart( event ) {

		if ( scope.enabled === false ) return;

		switch ( event.touches.length ) {

			case 1:	// one-fingered touch: rotate

				if ( scope.enableRotate === false ) return;

				handleTouchStartRotate( event );

				state = STATE.TOUCH_ROTATE;

				break;

			case 2:	// two-fingered touch: dolly

				if ( scope.enableZoom === false ) return;

				handleTouchStartDolly( event );

				state = STATE.TOUCH_DOLLY;

				break;

			case 3: // three-fingered touch: pan

				if ( scope.enablePan === false ) return;

				handleTouchStartPan( event );

				state = STATE.TOUCH_PAN;

				break;

			default:

				state = STATE.NONE;

		}

		if ( state !== STATE.NONE ) {

			scope.dispatchEvent( startEvent );

		}

	}

	function onTouchMove( event ) {

		if ( scope.enabled === false ) return;

		event.preventDefault();
		event.stopPropagation();

		switch ( event.touches.length ) {

			case 1: // one-fingered touch: rotate

				if ( scope.enableRotate === false ) return;
				if ( state !== STATE.TOUCH_ROTATE ) return; // is this needed?...

				handleTouchMoveRotate( event );

				break;

			case 2: // two-fingered touch: dolly

				if ( scope.enableZoom === false ) return;
				if ( state !== STATE.TOUCH_DOLLY ) return; // is this needed?...

				handleTouchMoveDolly( event );

				break;

			case 3: // three-fingered touch: pan

				if ( scope.enablePan === false ) return;
				if ( state !== STATE.TOUCH_PAN ) return; // is this needed?...

				handleTouchMovePan( event );

				break;

			default:

				state = STATE.NONE;

		}

	}

	function onTouchEnd( event ) {

		if ( scope.enabled === false ) return;

		handleTouchEnd( event );

		scope.dispatchEvent( endEvent );

		state = STATE.NONE;

	}

	function onContextMenu( event ) {

		if ( scope.enabled === false ) return;

		event.preventDefault();

	}

	//

	scope.domElement.addEventListener( 'contextmenu', onContextMenu, false );

	scope.domElement.addEventListener( 'mousedown', onMouseDown, false );
	scope.domElement.addEventListener( 'wheel', onMouseWheel, false );

	scope.domElement.addEventListener( 'touchstart', onTouchStart, false );
	scope.domElement.addEventListener( 'touchend', onTouchEnd, false );
	scope.domElement.addEventListener( 'touchmove', onTouchMove, false );

	window.addEventListener( 'keydown', onKeyDown, false );

	// force an update at start

	this.update();

};

THREE.OrbitControls.prototype = Object.create( THREE.EventDispatcher.prototype );
THREE.OrbitControls.prototype.constructor = THREE.OrbitControls;

Object.defineProperties( THREE.OrbitControls.prototype, {

	center: {

		get: function () {

			console.warn( 'THREE.OrbitControls: .center has been renamed to .target' );
			return this.target;

		}

	},

	// backward compatibility

	noZoom: {

		get: function () {

			console.warn( 'THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.' );
			return ! this.enableZoom;

		},

		set: function ( value ) {

			console.warn( 'THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.' );
			this.enableZoom = ! value;

		}

	},

	noRotate: {

		get: function () {

			console.warn( 'THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.' );
			return ! this.enableRotate;

		},

		set: function ( value ) {

			console.warn( 'THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.' );
			this.enableRotate = ! value;

		}

	},

	noPan: {

		get: function () {

			console.warn( 'THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.' );
			return ! this.enablePan;

		},

		set: function ( value ) {

			console.warn( 'THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.' );
			this.enablePan = ! value;

		}

	},

	noKeys: {

		get: function () {

			console.warn( 'THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.' );
			return ! this.enableKeys;

		},

		set: function ( value ) {

			console.warn( 'THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.' );
			this.enableKeys = ! value;

		}

	},

	staticMoving: {

		get: function () {

			console.warn( 'THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.' );
			return ! this.enableDamping;

		},

		set: function ( value ) {

			console.warn( 'THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.' );
			this.enableDamping = ! value;

		}

	},

	dynamicDampingFactor: {

		get: function () {

			console.warn( 'THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.' );
			return this.dampingFactor;

		},

		set: function ( value ) {

			console.warn( 'THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.' );
			this.dampingFactor = value;

		}

	}

} );


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/**
 * @author Rich Tibbett / https://github.com/richtr
 * @author mrdoob / http://mrdoob.com/
 * @author Tony Parisi / http://www.tonyparisi.com/
 * @author Takahiro / https://github.com/takahirox
 * @author Don McCurdy / https://www.donmccurdy.com
 */

THREE.GLTFLoader = ( function () {

	function GLTFLoader( manager ) {

		this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;

	}

	GLTFLoader.prototype = {

		constructor: GLTFLoader,

		crossOrigin: 'Anonymous',

		load: function ( url, onLoad, onProgress, onError ) {

			var scope = this;

			var path = this.path !== undefined ? this.path : THREE.Loader.prototype.extractUrlBase( url );

			var loader = new THREE.FileLoader( scope.manager );

			loader.setResponseType( 'arraybuffer' );

			loader.load( url, function ( data ) {

				try {

					scope.parse( data, path, onLoad, onError );

				} catch ( e ) {

					if ( onError !== undefined ) {

						// For SyntaxError or TypeError, return a generic failure message.
						onError( e.constructor === Error ? e : new Error( 'THREE.GLTFLoader: Unable to parse model.' ) );

					}

				}

			}, onProgress, onError );

		},

		setCrossOrigin: function ( value ) {

			this.crossOrigin = value;

		},

		setPath: function ( value ) {

			this.path = value;

		},

		parse: function ( data, path, onLoad, onError ) {

			var content;
			var extensions = {};

			if ( typeof data === 'string' ) {

				content = data;

			} else {

				var magic = convertUint8ArrayToString( new Uint8Array( data, 0, 4 ) );

				if ( magic === BINARY_EXTENSION_HEADER_MAGIC ) {

					extensions[ EXTENSIONS.KHR_BINARY_GLTF ] = new GLTFBinaryExtension( data );
					content = extensions[ EXTENSIONS.KHR_BINARY_GLTF ].content;

				} else {

					content = convertUint8ArrayToString( new Uint8Array( data ) );

				}

			}

			var json = JSON.parse( content );

			if ( json.asset === undefined || json.asset.version[ 0 ] < 2 ) {

				onError( new Error( 'THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported.' ) );
				return;

			}

			if ( json.extensionsUsed ) {

				if ( json.extensionsUsed.indexOf( EXTENSIONS.KHR_LIGHTS ) >= 0 ) {

					extensions[ EXTENSIONS.KHR_LIGHTS ] = new GLTFLightsExtension( json );

				}

				if ( json.extensionsUsed.indexOf( EXTENSIONS.KHR_MATERIALS_COMMON ) >= 0 ) {

					extensions[ EXTENSIONS.KHR_MATERIALS_COMMON ] = new GLTFMaterialsCommonExtension( json );

				}

				if ( json.extensionsUsed.indexOf( EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS ) >= 0 ) {

					extensions[ EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS ] = new GLTFMaterialsPbrSpecularGlossinessExtension();

				}

			}

			console.time( 'GLTFLoader' );

			var parser = new GLTFParser( json, extensions, {

				path: path || this.path || '',
				crossOrigin: this.crossOrigin,
				manager: this.manager

			} );

			parser.parse( function ( scene, scenes, cameras, animations ) {

				console.timeEnd( 'GLTFLoader' );

				var glTF = {
					scene: scene,
					scenes: scenes,
					cameras: cameras,
					animations: animations
				};

				onLoad( glTF );

			}, onError );

		}

	};

	/* GLTFREGISTRY */

	function GLTFRegistry() {

		var objects = {};

		return	{

			get: function ( key ) {

				return objects[ key ];

			},

			add: function ( key, object ) {

				objects[ key ] = object;

			},

			remove: function ( key ) {

				delete objects[ key ];

			},

			removeAll: function () {

				objects = {};

			}

		};

	}

	/*********************************/
	/********** EXTENSIONS ***********/
	/*********************************/

	var EXTENSIONS = {
		KHR_BINARY_GLTF: 'KHR_binary_glTF',
		KHR_LIGHTS: 'KHR_lights',
		KHR_MATERIALS_COMMON: 'KHR_materials_common',
		KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS: 'KHR_materials_pbrSpecularGlossiness'
	};

	/**
	 * Lights Extension
	 *
	 * Specification: PENDING
	 */
	function GLTFLightsExtension( json ) {

		this.name = EXTENSIONS.KHR_LIGHTS;

		this.lights = {};

		var extension = ( json.extensions && json.extensions[ EXTENSIONS.KHR_LIGHTS ] ) || {};
		var lights = extension.lights || {};

		for ( var lightId in lights ) {

			var light = lights[ lightId ];
			var lightNode;

			var color = new THREE.Color().fromArray( light.color );

			switch ( light.type ) {

				case 'directional':
					lightNode = new THREE.DirectionalLight( color );
					lightNode.position.set( 0, 0, 1 );
					break;

				case 'point':
					lightNode = new THREE.PointLight( color );
					break;

				case 'spot':
					lightNode = new THREE.SpotLight( color );
					lightNode.position.set( 0, 0, 1 );
					break;

				case 'ambient':
					lightNode = new THREE.AmbientLight( color );
					break;

			}

			if ( lightNode ) {

				if ( light.constantAttenuation !== undefined ) {

					lightNode.intensity = light.constantAttenuation;

				}

				if ( light.linearAttenuation !== undefined ) {

					lightNode.distance = 1 / light.linearAttenuation;

				}

				if ( light.quadraticAttenuation !== undefined ) {

					lightNode.decay = light.quadraticAttenuation;

				}

				if ( light.fallOffAngle !== undefined ) {

					lightNode.angle = light.fallOffAngle;

				}

				if ( light.fallOffExponent !== undefined ) {

					console.warn( 'THREE.GLTFLoader:: light.fallOffExponent not currently supported.' );

				}

				lightNode.name = light.name || ( 'light_' + lightId );
				this.lights[ lightId ] = lightNode;

			}

		}

	}

	/**
	 * Common Materials Extension
	 *
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/Khronos/KHR_materials_common
	 */
	function GLTFMaterialsCommonExtension( json ) {

		this.name = EXTENSIONS.KHR_MATERIALS_COMMON;

	}

	GLTFMaterialsCommonExtension.prototype.getMaterialType = function ( material ) {

		var khrMaterial = material.extensions[ this.name ];

		switch ( khrMaterial.type ) {

			case 'commonBlinn' :
			case 'commonPhong' :
				return THREE.MeshPhongMaterial;

			case 'commonLambert' :
				return THREE.MeshLambertMaterial;

			case 'commonConstant' :
			default :
				return THREE.MeshBasicMaterial;

		}

	};

	GLTFMaterialsCommonExtension.prototype.extendParams = function ( materialParams, material, parser ) {

		var khrMaterial = material.extensions[ this.name ];

		var pending = [];

		var keys = [];

		// TODO: Currently ignored: 'ambientFactor', 'ambientTexture'
		switch ( khrMaterial.type ) {

			case 'commonBlinn' :
			case 'commonPhong' :
				keys.push( 'diffuseFactor', 'diffuseTexture', 'specularFactor', 'specularTexture', 'shininessFactor' );
				break;

			case 'commonLambert' :
				keys.push( 'diffuseFactor', 'diffuseTexture' );
				break;

			case 'commonConstant' :
			default :
				break;

		}

		var materialValues = {};

		keys.forEach( function ( v ) {

			if ( khrMaterial[ v ] !== undefined ) materialValues[ v ] = khrMaterial[ v ];

		} );

		if ( materialValues.diffuseFactor !== undefined ) {

			materialParams.color = new THREE.Color().fromArray( materialValues.diffuseFactor );
			materialParams.opacity = materialValues.diffuseFactor[ 3 ];

		}

		if ( materialValues.diffuseTexture !== undefined ) {

			pending.push( parser.assignTexture( materialParams, 'map', materialValues.diffuseTexture.index ) );

		}

		if ( materialValues.specularFactor !== undefined ) {

			materialParams.specular = new THREE.Color().fromArray( materialValues.specularFactor );

		}

		if ( materialValues.specularTexture !== undefined ) {

			pending.push( parser.assignTexture( materialParams, 'specularMap', materialValues.specularTexture.index ) );

		}

		if ( materialValues.shininessFactor !== undefined ) {

			materialParams.shininess = materialValues.shininessFactor;

		}

		return Promise.all( pending );

	};

	/* BINARY EXTENSION */

	var BINARY_EXTENSION_BUFFER_NAME = 'binary_glTF';
	var BINARY_EXTENSION_HEADER_MAGIC = 'glTF';
	var BINARY_EXTENSION_HEADER_LENGTH = 12;
	var BINARY_EXTENSION_CHUNK_TYPES = { JSON: 0x4E4F534A, BIN: 0x004E4942 };

	function GLTFBinaryExtension( data ) {

		this.name = EXTENSIONS.KHR_BINARY_GLTF;
		this.content = null;
		this.body = null;

		var headerView = new DataView( data, 0, BINARY_EXTENSION_HEADER_LENGTH );

		this.header = {
			magic: convertUint8ArrayToString( new Uint8Array( data.slice( 0, 4 ) ) ),
			version: headerView.getUint32( 4, true ),
			length: headerView.getUint32( 8, true )
		};

		if ( this.header.magic !== BINARY_EXTENSION_HEADER_MAGIC ) {

			throw new Error( 'THREE.GLTFLoader: Unsupported glTF-Binary header.' );

		} else if ( this.header.version < 2.0 ) {

			throw new Error( 'THREE.GLTFLoader: Legacy binary file detected. Use GLTFLoader instead.' );

		}

		var chunkView = new DataView( data, BINARY_EXTENSION_HEADER_LENGTH );
		var chunkIndex = 0;

		while ( chunkIndex < chunkView.byteLength ) {

			var chunkLength = chunkView.getUint32( chunkIndex, true );
			chunkIndex += 4;

			var chunkType = chunkView.getUint32( chunkIndex, true );
			chunkIndex += 4;

			if ( chunkType === BINARY_EXTENSION_CHUNK_TYPES.JSON ) {

				var contentArray = new Uint8Array( data, BINARY_EXTENSION_HEADER_LENGTH + chunkIndex, chunkLength );
				this.content = convertUint8ArrayToString( contentArray );

			} else if ( chunkType === BINARY_EXTENSION_CHUNK_TYPES.BIN ) {

				var byteOffset = BINARY_EXTENSION_HEADER_LENGTH + chunkIndex;
				this.body = data.slice( byteOffset, byteOffset + chunkLength );

			}

			// Clients must ignore chunks with unknown types.

			chunkIndex += chunkLength;

		}

		if ( this.content === null ) {

			throw new Error( 'THREE.GLTFLoader: JSON content not found.' );

		}

	}

	/**
	 * Specular-Glossiness Extension
	 *
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/Khronos/KHR_materials_pbrSpecularGlossiness
	 */
	function GLTFMaterialsPbrSpecularGlossinessExtension() {

		return {

			name: EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS,

			specularGlossinessParams: [
				'color',
				'map',
				'lightMap',
				'lightMapIntensity',
				'aoMap',
				'aoMapIntensity',
				'emissive',
				'emissiveIntensity',
				'emissiveMap',
				'bumpMap',
				'bumpScale',
				'normalMap',
				'displacementMap',
				'displacementScale',
				'displacementBias',
				'specularMap',
				'specular',
				'glossinessMap',
				'glossiness',
				'alphaMap',
				'envMap',
				'envMapIntensity',
				'refractionRatio',
			],

			getMaterialType: function () {

				return THREE.ShaderMaterial;

			},

			extendParams: function ( params, material, parser ) {

				var pbrSpecularGlossiness = material.extensions[ this.name ];

				var shader = THREE.ShaderLib[ 'standard' ];

				var uniforms = THREE.UniformsUtils.clone( shader.uniforms );

				var specularMapParsFragmentChunk = [
					'#ifdef USE_SPECULARMAP',
					'	uniform sampler2D specularMap;',
					'#endif'
				].join( '\n' );

				var glossinessMapParsFragmentChunk = [
					'#ifdef USE_GLOSSINESSMAP',
					'	uniform sampler2D glossinessMap;',
					'#endif'
				].join( '\n' );

				var specularMapFragmentChunk = [
					'vec3 specularFactor = specular;',
					'#ifdef USE_SPECULARMAP',
					'	vec4 texelSpecular = texture2D( specularMap, vUv );',
					'	// reads channel RGB, compatible with a glTF Specular-Glossiness (RGBA) texture',
					'	specularFactor *= texelSpecular.rgb;',
					'#endif'
				].join( '\n' );

				var glossinessMapFragmentChunk = [
					'float glossinessFactor = glossiness;',
					'#ifdef USE_GLOSSINESSMAP',
					'	vec4 texelGlossiness = texture2D( glossinessMap, vUv );',
					'	// reads channel A, compatible with a glTF Specular-Glossiness (RGBA) texture',
					'	glossinessFactor *= texelGlossiness.a;',
					'#endif'
				].join( '\n' );

				var lightPhysicalFragmentChunk = [
					'PhysicalMaterial material;',
					'material.diffuseColor = diffuseColor.rgb;',
					'material.specularRoughness = clamp( 1.0 - glossinessFactor, 0.04, 1.0 );',
					'material.specularColor = specularFactor.rgb;',
				].join( '\n' );

				var fragmentShader = shader.fragmentShader
					.replace( '#include <specularmap_fragment>', '' )
					.replace( 'uniform float roughness;', 'uniform vec3 specular;' )
					.replace( 'uniform float metalness;', 'uniform float glossiness;' )
					.replace( '#include <roughnessmap_pars_fragment>', specularMapParsFragmentChunk )
					.replace( '#include <metalnessmap_pars_fragment>', glossinessMapParsFragmentChunk )
					.replace( '#include <roughnessmap_fragment>', specularMapFragmentChunk )
					.replace( '#include <metalnessmap_fragment>', glossinessMapFragmentChunk )
					.replace( '#include <lights_physical_fragment>', lightPhysicalFragmentChunk );

				delete uniforms.roughness;
				delete uniforms.metalness;
				delete uniforms.roughnessMap;
				delete uniforms.metalnessMap;

				uniforms.specular = { value: new THREE.Color().setHex( 0x111111 ) };
				uniforms.glossiness = { value: 0.5 };
				uniforms.specularMap = { value: null };
				uniforms.glossinessMap = { value: null };

				params.vertexShader = shader.vertexShader;
				params.fragmentShader = fragmentShader;
				params.uniforms = uniforms;
				params.defines = { 'STANDARD': '' };

				params.color = new THREE.Color( 1.0, 1.0, 1.0 );
				params.opacity = 1.0;

				var pending = [];

				if ( Array.isArray( pbrSpecularGlossiness.diffuseFactor ) ) {

					var array = pbrSpecularGlossiness.diffuseFactor;

					params.color.fromArray( array );
					params.opacity = array[ 3 ];

				}

				if ( pbrSpecularGlossiness.diffuseTexture !== undefined ) {

					pending.push( parser.assignTexture( params, 'map', pbrSpecularGlossiness.diffuseTexture.index ) );

				}

				params.emissive = new THREE.Color( 0.0, 0.0, 0.0 );
				params.glossiness = pbrSpecularGlossiness.glossinessFactor !== undefined ? pbrSpecularGlossiness.glossinessFactor : 1.0;
				params.specular = new THREE.Color( 1.0, 1.0, 1.0 );

				if ( Array.isArray( pbrSpecularGlossiness.specularFactor ) ) {

					params.specular.fromArray( pbrSpecularGlossiness.specularFactor );

				}

				if ( pbrSpecularGlossiness.specularGlossinessTexture !== undefined ) {

					var specGlossIndex = pbrSpecularGlossiness.specularGlossinessTexture.index;
					pending.push( parser.assignTexture( params, 'glossinessMap', specGlossIndex ) );
					pending.push( parser.assignTexture( params, 'specularMap', specGlossIndex ) );

				}

				return Promise.all( pending );

			},

			createMaterial: function ( params ) {

				// setup material properties based on MeshStandardMaterial for Specular-Glossiness

				var material = new THREE.ShaderMaterial( {
					defines: params.defines,
					vertexShader: params.vertexShader,
					fragmentShader: params.fragmentShader,
					uniforms: params.uniforms,
					fog: true,
					lights: true,
					opacity: params.opacity,
					transparent: params.transparent
				} );

				material.isGLTFSpecularGlossinessMaterial = true;

				material.color = params.color;

				material.map = params.map === undefined ? null : params.map;

				material.lightMap = null;
				material.lightMapIntensity = 1.0;

				material.aoMap = params.aoMap === undefined ? null : params.aoMap;
				material.aoMapIntensity = 1.0;

				material.emissive = params.emissive;
				material.emissiveIntensity = 1.0;
				material.emissiveMap = params.emissiveMap === undefined ? null : params.emissiveMap;

				material.bumpMap = params.bumpMap === undefined ? null : params.bumpMap;
				material.bumpScale = 1;

				material.normalMap = params.normalMap === undefined ? null : params.normalMap;
				if ( params.normalScale ) material.normalScale = params.normalScale;

				material.displacementMap = null;
				material.displacementScale = 1;
				material.displacementBias = 0;

				material.specularMap = params.specularMap === undefined ? null : params.specularMap;
				material.specular = params.specular;

				material.glossinessMap = params.glossinessMap === undefined ? null : params.glossinessMap;
				material.glossiness = params.glossiness;

				material.alphaMap = null;

				material.envMap = params.envMap === undefined ? null : params.envMap;
				material.envMapIntensity = 1.0;

				material.refractionRatio = 0.98;

				material.extensions.derivatives = true;

				return material;

			},

			/**
			 * Clones a GLTFSpecularGlossinessMaterial instance. The ShaderMaterial.copy() method can
			 * copy only properties it knows about or inherits, and misses many properties that would
			 * normally be defined by MeshStandardMaterial.
			 *
			 * This method allows GLTFSpecularGlossinessMaterials to be cloned in the process of
			 * loading a glTF model, but cloning later (e.g. by the user) would require these changes
			 * AND also updating `.onBeforeRender` on the parent mesh.
			 *
			 * @param  {THREE.ShaderMaterial} source
			 * @return {THREE.ShaderMaterial}
			 */
			cloneMaterial: function ( source ) {

				var target = source.clone();

				target.isGLTFSpecularGlossinessMaterial = true;

				var params = this.specularGlossinessParams;

				for ( var i = 0; i < params.length; i ++ ) {

					target[ params[ i ] ] = source[ params[ i ] ];

				}

				return target;

			},

			// Here's based on refreshUniformsCommon() and refreshUniformsStandard() in WebGLRenderer.
			refreshUniforms: function ( renderer, scene, camera, geometry, material, group ) {

				var uniforms = material.uniforms;
				var defines = material.defines;

				uniforms.opacity.value = material.opacity;

				uniforms.diffuse.value.copy( material.color );
				uniforms.emissive.value.copy( material.emissive ).multiplyScalar( material.emissiveIntensity );

				uniforms.map.value = material.map;
				uniforms.specularMap.value = material.specularMap;
				uniforms.alphaMap.value = material.alphaMap;

				uniforms.lightMap.value = material.lightMap;
				uniforms.lightMapIntensity.value = material.lightMapIntensity;

				uniforms.aoMap.value = material.aoMap;
				uniforms.aoMapIntensity.value = material.aoMapIntensity;

				// uv repeat and offset setting priorities
				// 1. color map
				// 2. specular map
				// 3. normal map
				// 4. bump map
				// 5. alpha map
				// 6. emissive map

				var uvScaleMap;

				if ( material.map ) {

					uvScaleMap = material.map;

				} else if ( material.specularMap ) {

					uvScaleMap = material.specularMap;

				} else if ( material.displacementMap ) {

					uvScaleMap = material.displacementMap;

				} else if ( material.normalMap ) {

					uvScaleMap = material.normalMap;

				} else if ( material.bumpMap ) {

					uvScaleMap = material.bumpMap;

				} else if ( material.glossinessMap ) {

					uvScaleMap = material.glossinessMap;

				} else if ( material.alphaMap ) {

					uvScaleMap = material.alphaMap;

				} else if ( material.emissiveMap ) {

					uvScaleMap = material.emissiveMap;

				}

				if ( uvScaleMap !== undefined ) {

					// backwards compatibility
					if ( uvScaleMap.isWebGLRenderTarget ) {

						uvScaleMap = uvScaleMap.texture;

					}

					var offset;
					var repeat;

					if ( uvScaleMap.matrix !== undefined ) {

						// > r88.

						if ( uvScaleMap.matrixAutoUpdate === true ) {

							offset = uvScaleMap.offset;
							repeat = uvScaleMap.repeat;
							var rotation = uvScaleMap.rotation;
							var center = uvScaleMap.center;

							uvScaleMap.matrix.setUvTransform( offset.x, offset.y, repeat.x, repeat.y, rotation, center.x, center.y );

						}

						uniforms.uvTransform.value.copy( uvScaleMap.matrix );

					} else {

							// <= r87. Remove when reasonable.

							offset = uvScaleMap.offset;
							repeat = uvScaleMap.repeat;

							uniforms.offsetRepeat.value.set( offset.x, offset.y, repeat.x, repeat.y );

					}

				}

				uniforms.envMap.value = material.envMap;
				uniforms.envMapIntensity.value = material.envMapIntensity;
				uniforms.flipEnvMap.value = ( material.envMap && material.envMap.isCubeTexture ) ? - 1 : 1;

				uniforms.refractionRatio.value = material.refractionRatio;

				uniforms.specular.value.copy( material.specular );
				uniforms.glossiness.value = material.glossiness;

				uniforms.glossinessMap.value = material.glossinessMap;

				uniforms.emissiveMap.value = material.emissiveMap;
				uniforms.bumpMap.value = material.bumpMap;
				uniforms.normalMap.value = material.normalMap;

				uniforms.displacementMap.value = material.displacementMap;
				uniforms.displacementScale.value = material.displacementScale;
				uniforms.displacementBias.value = material.displacementBias;

				if ( uniforms.glossinessMap.value !== null && defines.USE_GLOSSINESSMAP === undefined ) {

					defines.USE_GLOSSINESSMAP = '';
					// set USE_ROUGHNESSMAP to enable vUv
					defines.USE_ROUGHNESSMAP = '';

				}

				if ( uniforms.glossinessMap.value === null && defines.USE_GLOSSINESSMAP !== undefined ) {

					delete defines.USE_GLOSSINESSMAP;
					delete defines.USE_ROUGHNESSMAP;

				}

			}

		};

	}

	/*********************************/
	/********** INTERNALS ************/
	/*********************************/

	/* CONSTANTS */

	var WEBGL_CONSTANTS = {
		FLOAT: 5126,
		//FLOAT_MAT2: 35674,
		FLOAT_MAT3: 35675,
		FLOAT_MAT4: 35676,
		FLOAT_VEC2: 35664,
		FLOAT_VEC3: 35665,
		FLOAT_VEC4: 35666,
		LINEAR: 9729,
		REPEAT: 10497,
		SAMPLER_2D: 35678,
		POINTS: 0,
		LINES: 1,
		LINE_LOOP: 2,
		LINE_STRIP: 3,
		TRIANGLES: 4,
		TRIANGLE_STRIP: 5,
		TRIANGLE_FAN: 6,
		UNSIGNED_BYTE: 5121,
		UNSIGNED_SHORT: 5123
	};

	var WEBGL_TYPE = {
		5126: Number,
		//35674: THREE.Matrix2,
		35675: THREE.Matrix3,
		35676: THREE.Matrix4,
		35664: THREE.Vector2,
		35665: THREE.Vector3,
		35666: THREE.Vector4,
		35678: THREE.Texture
	};

	var WEBGL_COMPONENT_TYPES = {
		5120: Int8Array,
		5121: Uint8Array,
		5122: Int16Array,
		5123: Uint16Array,
		5125: Uint32Array,
		5126: Float32Array
	};

	var WEBGL_FILTERS = {
		9728: THREE.NearestFilter,
		9729: THREE.LinearFilter,
		9984: THREE.NearestMipMapNearestFilter,
		9985: THREE.LinearMipMapNearestFilter,
		9986: THREE.NearestMipMapLinearFilter,
		9987: THREE.LinearMipMapLinearFilter
	};

	var WEBGL_WRAPPINGS = {
		33071: THREE.ClampToEdgeWrapping,
		33648: THREE.MirroredRepeatWrapping,
		10497: THREE.RepeatWrapping
	};

	var WEBGL_TEXTURE_FORMATS = {
		6406: THREE.AlphaFormat,
		6407: THREE.RGBFormat,
		6408: THREE.RGBAFormat,
		6409: THREE.LuminanceFormat,
		6410: THREE.LuminanceAlphaFormat
	};

	var WEBGL_TEXTURE_DATATYPES = {
		5121: THREE.UnsignedByteType,
		32819: THREE.UnsignedShort4444Type,
		32820: THREE.UnsignedShort5551Type,
		33635: THREE.UnsignedShort565Type
	};

	var WEBGL_SIDES = {
		1028: THREE.BackSide, // Culling front
		1029: THREE.FrontSide // Culling back
		//1032: THREE.NoSide   // Culling front and back, what to do?
	};

	var WEBGL_DEPTH_FUNCS = {
		512: THREE.NeverDepth,
		513: THREE.LessDepth,
		514: THREE.EqualDepth,
		515: THREE.LessEqualDepth,
		516: THREE.GreaterEqualDepth,
		517: THREE.NotEqualDepth,
		518: THREE.GreaterEqualDepth,
		519: THREE.AlwaysDepth
	};

	var WEBGL_BLEND_EQUATIONS = {
		32774: THREE.AddEquation,
		32778: THREE.SubtractEquation,
		32779: THREE.ReverseSubtractEquation
	};

	var WEBGL_BLEND_FUNCS = {
		0: THREE.ZeroFactor,
		1: THREE.OneFactor,
		768: THREE.SrcColorFactor,
		769: THREE.OneMinusSrcColorFactor,
		770: THREE.SrcAlphaFactor,
		771: THREE.OneMinusSrcAlphaFactor,
		772: THREE.DstAlphaFactor,
		773: THREE.OneMinusDstAlphaFactor,
		774: THREE.DstColorFactor,
		775: THREE.OneMinusDstColorFactor,
		776: THREE.SrcAlphaSaturateFactor
		// The followings are not supported by Three.js yet
		//32769: CONSTANT_COLOR,
		//32770: ONE_MINUS_CONSTANT_COLOR,
		//32771: CONSTANT_ALPHA,
		//32772: ONE_MINUS_CONSTANT_COLOR
	};

	var WEBGL_TYPE_SIZES = {
		'SCALAR': 1,
		'VEC2': 2,
		'VEC3': 3,
		'VEC4': 4,
		'MAT2': 4,
		'MAT3': 9,
		'MAT4': 16
	};

	var PATH_PROPERTIES = {
		scale: 'scale',
		translation: 'position',
		rotation: 'quaternion',
		weights: 'morphTargetInfluences'
	};

	var INTERPOLATION = {
		CATMULLROMSPLINE: THREE.InterpolateSmooth,
		CUBICSPLINE: THREE.InterpolateSmooth,
		LINEAR: THREE.InterpolateLinear,
		STEP: THREE.InterpolateDiscrete
	};

	var STATES_ENABLES = {
		2884: 'CULL_FACE',
		2929: 'DEPTH_TEST',
		3042: 'BLEND',
		3089: 'SCISSOR_TEST',
		32823: 'POLYGON_OFFSET_FILL',
		32926: 'SAMPLE_ALPHA_TO_COVERAGE'
	};

	var ALPHA_MODES = {
		OPAQUE: 'OPAQUE',
		MASK: 'MASK',
		BLEND: 'BLEND'
	};

	/* UTILITY FUNCTIONS */

	function _each( object, callback, thisObj ) {

		if ( ! object ) {

			return Promise.resolve();

		}

		var results;
		var fns = [];

		if ( Object.prototype.toString.call( object ) === '[object Array]' ) {

			results = [];

			var length = object.length;

			for ( var idx = 0; idx < length; idx ++ ) {

				var value = callback.call( thisObj || this, object[ idx ], idx );

				if ( value ) {

					if ( value instanceof Promise ) {

						value = value.then( function ( key, value ) {

							results[ key ] = value;

						}.bind( this, idx ) );

					} else {

						results[ idx ] = value;

					}

					fns.push( value );

				}

			}

		} else {

			results = {};

			for ( var key in object ) {

				if ( object.hasOwnProperty( key ) ) {

					var value = callback.call( thisObj || this, object[ key ], key );

					if ( value ) {

						if ( value instanceof Promise ) {

							value = value.then( function ( key, value ) {

								results[ key ] = value;

							}.bind( this, key ) );

						} else {

							results[ key ] = value;

						}

						fns.push( value );

					}

				}

			}

		}

		return Promise.all( fns ).then( function () {

			return results;

		} );

	}

	function resolveURL( url, path ) {

		// Invalid URL
		if ( typeof url !== 'string' || url === '' )
			return '';

		// Absolute URL http://,https://,//
		if ( /^(https?:)?\/\//i.test( url ) ) {

			return url;

		}

		// Data URI
		if ( /^data:.*,.*$/i.test( url ) ) {

			return url;

		}

		// Blob URL
		if ( /^blob:.*$/i.test( url ) ) {

			return url;

		}

		// Relative URL
		return path + url;

	}

	function convertUint8ArrayToString( array ) {

		if ( window.TextDecoder !== undefined ) {

			return new TextDecoder().decode( array );

		}

		// Avoid the String.fromCharCode.apply(null, array) shortcut, which
		// throws a "maximum call stack size exceeded" error for large arrays.

		var s = '';

		for ( var i = 0, il = array.length; i < il; i ++ ) {

			s += String.fromCharCode( array[ i ] );

		}

		return s;

	}

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#default-material
	 */
	function createDefaultMaterial() {

		return new THREE.MeshStandardMaterial( {
			color: 0xFFFFFF,
			emissive: 0x000000,
			metalness: 1,
			roughness: 1,
			transparent: false,
			depthTest: true,
			side: THREE.FrontSide
		} );

	}

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#morph-targets
	 *
	 * TODO: Implement support for morph targets on TANGENT attribute.
	 *
	 * @param {THREE.Mesh} mesh
	 * @param {GLTF.Mesh} meshDef
	 * @param {GLTF.Primitive} primitiveDef
	 * @param {Object} dependencies
	 */
	function addMorphTargets( mesh, meshDef, primitiveDef, dependencies ) {

		var geometry = mesh.geometry;
		var material = mesh.material;

		var targets = primitiveDef.targets;
		var morphAttributes = geometry.morphAttributes;

		morphAttributes.position = [];
		morphAttributes.normal = [];

		material.morphTargets = true;

		for ( var i = 0, il = targets.length; i < il; i ++ ) {

			var target = targets[ i ];
			var attributeName = 'morphTarget' + i;

			var positionAttribute, normalAttribute;

			if ( target.POSITION !== undefined ) {

				// Three.js morph formula is
				//   position
				//     + weight0 * ( morphTarget0 - position )
				//     + weight1 * ( morphTarget1 - position )
				//     ...
				// while the glTF one is
				//   position
				//     + weight0 * morphTarget0
				//     + weight1 * morphTarget1
				//     ...
				// then adding position to morphTarget.
				// So morphTarget value will depend on mesh's position, then cloning attribute
				// for the case if attribute is shared among two or more meshes.

				positionAttribute = dependencies.accessors[ target.POSITION ].clone();
				var position = geometry.attributes.position;

				for ( var j = 0, jl = positionAttribute.count; j < jl; j ++ ) {

					positionAttribute.setXYZ(
						j,
						positionAttribute.getX( j ) + position.getX( j ),
						positionAttribute.getY( j ) + position.getY( j ),
						positionAttribute.getZ( j ) + position.getZ( j )
					);

				}

			} else if ( geometry.attributes.position ) {

				// Copying the original position not to affect the final position.
				// See the formula above.
				positionAttribute = geometry.attributes.position.clone();

			}

			if ( positionAttribute !== undefined ) {

				positionAttribute.name = attributeName;
				morphAttributes.position.push( positionAttribute );

			}

			if ( target.NORMAL !== undefined ) {

				material.morphNormals = true;

				// see target.POSITION's comment

				normalAttribute = dependencies.accessors[ target.NORMAL ].clone();
				var normal = geometry.attributes.normal;

				for ( var j = 0, jl = normalAttribute.count; j < jl; j ++ ) {

					normalAttribute.setXYZ(
						j,
						normalAttribute.getX( j ) + normal.getX( j ),
						normalAttribute.getY( j ) + normal.getY( j ),
						normalAttribute.getZ( j ) + normal.getZ( j )
					);

				}

			} else if ( geometry.attributes.normal !== undefined ) {

				normalAttribute = geometry.attributes.normal.clone();

			}

			if ( normalAttribute !== undefined ) {

				normalAttribute.name = attributeName;
				morphAttributes.normal.push( normalAttribute );

			}

		}

		mesh.updateMorphTargets();

		if ( meshDef.weights !== undefined ) {

			for ( var i = 0, il = meshDef.weights.length; i < il; i ++ ) {

				mesh.morphTargetInfluences[ i ] = meshDef.weights[ i ];

			}

		}

	}

	/* GLTF PARSER */

	function GLTFParser( json, extensions, options ) {

		this.json = json || {};
		this.extensions = extensions || {};
		this.options = options || {};

		// loader object cache
		this.cache = new GLTFRegistry();

		this.textureLoader = new THREE.TextureLoader( this.options.manager );
		this.textureLoader.setCrossOrigin( this.options.crossOrigin );

		this.fileLoader = new THREE.FileLoader( this.options.manager );
		this.fileLoader.setResponseType( 'arraybuffer' );

	}

	GLTFParser.prototype._withDependencies = function ( dependencies ) {

		var _dependencies = {};

		for ( var i = 0; i < dependencies.length; i ++ ) {

			var dependency = dependencies[ i ];
			var fnName = 'load' + dependency.charAt( 0 ).toUpperCase() + dependency.slice( 1 );

			var cached = this.cache.get( dependency );

			if ( cached !== undefined ) {

				_dependencies[ dependency ] = cached;

			} else if ( this[ fnName ] ) {

				var fn = this[ fnName ]();
				this.cache.add( dependency, fn );

				_dependencies[ dependency ] = fn;

			}

		}

		return _each( _dependencies, function ( dependency ) {

			return dependency;

		} );

	};

	GLTFParser.prototype.parse = function ( onLoad, onError ) {

		var json = this.json;
		var parser = this;

		// Clear the loader cache
		this.cache.removeAll();

		// Fire the callback on complete
		this._withDependencies( [

			'scenes',
			'animations'

		] ).then( function ( dependencies ) {

			var scenes = dependencies.scenes || [];
			var scene = scenes[ json.scene || 0 ];
			var animations = dependencies.animations || [];

			parser.getDependencies( 'camera' ).then( function ( cameras ) {

				onLoad( scene, scenes, cameras, animations );

			} ).catch( onError );

		} ).catch( onError );

	};

	/**
	 * Requests the specified dependency asynchronously, with caching.
	 * @param {string} type
	 * @param {number} index
	 * @return {Promise<Object>}
	 */
	GLTFParser.prototype.getDependency = function ( type, index ) {

		var cacheKey = type + ':' + index;
		var dependency = this.cache.get( cacheKey );

		if ( ! dependency ) {

			var fnName = 'load' + type.charAt( 0 ).toUpperCase() + type.slice( 1 );
			dependency = this[ fnName ]( index );
			this.cache.add( cacheKey, dependency );

		}

		return dependency;

	};

	/**
	 * Requests all dependencies of the specified type asynchronously, with caching.
	 * @param {string} type
	 * @return {Promise<Array<Object>>}
	 */
	GLTFParser.prototype.getDependencies = function ( type ) {

		var parser = this;
		var defs = this.json[ type + 's' ] || [];

		return Promise.all( defs.map( function ( def, index ) {

			return parser.getDependency( type, index );

		} ) );

	};

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
	 * @param {number} bufferIndex
	 * @return {Promise<ArrayBuffer>}
	 */
	GLTFParser.prototype.loadBuffer = function ( bufferIndex ) {

		var bufferDef = this.json.buffers[ bufferIndex ];
		var loader = this.fileLoader;

		if ( bufferDef.type && bufferDef.type !== 'arraybuffer' ) {

			throw new Error( 'THREE.GLTFLoader: ' + bufferDef.type + ' buffer type is not supported.' );

		}

		// If present, GLB container is required to be the first buffer.
		if ( bufferDef.uri === undefined && bufferIndex === 0 ) {

			return Promise.resolve( this.extensions[ EXTENSIONS.KHR_BINARY_GLTF ].body );

		}

		var options = this.options;

		return new Promise( function ( resolve, reject ) {

			loader.load( resolveURL( bufferDef.uri, options.path ), resolve, undefined, function () {

				reject( new Error( 'THREE.GLTFLoader: Failed to load buffer "' + bufferDef.uri + '".' ) );

			} );

		} );

	};

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
	 * @param {number} bufferViewIndex
	 * @return {Promise<ArrayBuffer>}
	 */
	GLTFParser.prototype.loadBufferView = function ( bufferViewIndex ) {

		var bufferViewDef = this.json.bufferViews[ bufferViewIndex ];

		return this.getDependency( 'buffer', bufferViewDef.buffer ).then( function ( buffer ) {

			var byteLength = bufferViewDef.byteLength || 0;
			var byteOffset = bufferViewDef.byteOffset || 0;
			return buffer.slice( byteOffset, byteOffset + byteLength );

		} );

	};

	GLTFParser.prototype.loadAccessors = function () {

		var parser = this;
		var json = this.json;

		return _each( json.accessors, function ( accessor ) {

			return parser.getDependency( 'bufferView', accessor.bufferView ).then( function ( bufferView ) {

				var itemSize = WEBGL_TYPE_SIZES[ accessor.type ];
				var TypedArray = WEBGL_COMPONENT_TYPES[ accessor.componentType ];

				// For VEC3: itemSize is 3, elementBytes is 4, itemBytes is 12.
				var elementBytes = TypedArray.BYTES_PER_ELEMENT;
				var itemBytes = elementBytes * itemSize;
				var byteStride = json.bufferViews[ accessor.bufferView ].byteStride;
				var normalized = accessor.normalized === true;
				var array;

				// The buffer is not interleaved if the stride is the item size in bytes.
				if ( byteStride && byteStride !== itemBytes ) {

					// Use the full buffer if it's interleaved.
					array = new TypedArray( bufferView );

					// Integer parameters to IB/IBA are in array elements, not bytes.
					var ib = new THREE.InterleavedBuffer( array, byteStride / elementBytes );

					return new THREE.InterleavedBufferAttribute( ib, itemSize, accessor.byteOffset / elementBytes, normalized );

				} else {

					array = new TypedArray( bufferView, accessor.byteOffset, accessor.count * itemSize );

					return new THREE.BufferAttribute( array, itemSize, normalized );

				}

			} );

		} );

	};

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#textures
	 * @param {number} textureIndex
	 * @return {Promise<THREE.Texture>}
	 */
	GLTFParser.prototype.loadTexture = function ( textureIndex ) {

		var parser = this;
		var json = this.json;
		var options = this.options;
		var textureLoader = this.textureLoader;

		var URL = window.URL || window.webkitURL;

		var textureDef = json.textures[ textureIndex ];
		var source = json.images[ textureDef.source ];
		var sourceURI = source.uri;
		var isObjectURL = false;

		if ( source.bufferView !== undefined ) {

			// Load binary image data from bufferView, if provided.

			sourceURI = parser.getDependency( 'bufferView', source.bufferView )
				.then( function ( bufferView ) {

					isObjectURL = true;
					var blob = new Blob( [ bufferView ], { type: source.mimeType } );
					sourceURI = URL.createObjectURL( blob );
					return sourceURI;

				} );

		}

		return Promise.resolve( sourceURI ).then( function ( sourceURI ) {

			// Load Texture resource.

			var loader = THREE.Loader.Handlers.get( sourceURI ) || textureLoader;

			return new Promise( function ( resolve, reject ) {

				loader.load( resolveURL( sourceURI, options.path ), resolve, undefined, reject );

			} );

		} ).then( function ( texture ) {

			// Clean up resources and configure Texture.

			if ( isObjectURL === true ) {

				URL.revokeObjectURL( sourceURI );

			}

			texture.flipY = false;

			if ( textureDef.name !== undefined ) texture.name = textureDef.name;

			texture.format = textureDef.format !== undefined ? WEBGL_TEXTURE_FORMATS[ textureDef.format ] : THREE.RGBAFormat;

			if ( textureDef.internalFormat !== undefined && texture.format !== WEBGL_TEXTURE_FORMATS[ textureDef.internalFormat ] ) {

				console.warn( 'THREE.GLTFLoader: Three.js does not support texture internalFormat which is different from texture format. ' +
											'internalFormat will be forced to be the same value as format.' );

			}

			texture.type = textureDef.type !== undefined ? WEBGL_TEXTURE_DATATYPES[ textureDef.type ] : THREE.UnsignedByteType;

			var samplers = json.samplers || {};
			var sampler = samplers[ textureDef.sampler ] || {};

			texture.magFilter = WEBGL_FILTERS[ sampler.magFilter ] || THREE.LinearFilter;
			texture.minFilter = WEBGL_FILTERS[ sampler.minFilter ] || THREE.LinearMipMapLinearFilter;
			texture.wrapS = WEBGL_WRAPPINGS[ sampler.wrapS ] || THREE.RepeatWrapping;
			texture.wrapT = WEBGL_WRAPPINGS[ sampler.wrapT ] || THREE.RepeatWrapping;

			return texture;

		} );

	};

	/**
	 * Asynchronously assigns a texture to the given material parameters.
	 * @param {Object} materialParams
	 * @param {string} textureName
	 * @param {number} textureIndex
	 * @return {Promise}
	 */
	GLTFParser.prototype.assignTexture = function ( materialParams, textureName, textureIndex ) {

		return this.getDependency( 'texture', textureIndex ).then( function ( texture ) {

			materialParams[ textureName ] = texture;

		} );

	};

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#materials
	 * @return {Promise<Array<THREE.Material>>}
	 */
	GLTFParser.prototype.loadMaterials = function () {

		var parser = this;
		var json = this.json;
		var extensions = this.extensions;

		return _each( json.materials, function ( material ) {

			var materialType;
			var materialParams = {};
			var materialExtensions = material.extensions || {};

			var pending = [];

			if ( materialExtensions[ EXTENSIONS.KHR_MATERIALS_COMMON ] ) {

				var khcExtension = extensions[ EXTENSIONS.KHR_MATERIALS_COMMON ];
				materialType = khcExtension.getMaterialType( material );
				pending.push( khcExtension.extendParams( materialParams, material, parser ) );

			} else if ( materialExtensions[ EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS ] ) {

				var sgExtension = extensions[ EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS ];
				materialType = sgExtension.getMaterialType( material );
				pending.push( sgExtension.extendParams( materialParams, material, parser ) );

			} else if ( material.pbrMetallicRoughness !== undefined ) {

				// Specification:
				// https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#metallic-roughness-material

				materialType = THREE.MeshStandardMaterial;

				var metallicRoughness = material.pbrMetallicRoughness;

				materialParams.color = new THREE.Color( 1.0, 1.0, 1.0 );
				materialParams.opacity = 1.0;

				if ( Array.isArray( metallicRoughness.baseColorFactor ) ) {

					var array = metallicRoughness.baseColorFactor;

					materialParams.color.fromArray( array );
					materialParams.opacity = array[ 3 ];

				}

				if ( metallicRoughness.baseColorTexture !== undefined ) {

					pending.push( parser.assignTexture( materialParams, 'map', metallicRoughness.baseColorTexture.index ) );

				}

				materialParams.metalness = metallicRoughness.metallicFactor !== undefined ? metallicRoughness.metallicFactor : 1.0;
				materialParams.roughness = metallicRoughness.roughnessFactor !== undefined ? metallicRoughness.roughnessFactor : 1.0;

				if ( metallicRoughness.metallicRoughnessTexture !== undefined ) {

					var textureIndex = metallicRoughness.metallicRoughnessTexture.index;
					pending.push( parser.assignTexture( materialParams, 'metalnessMap', textureIndex ) );
					pending.push( parser.assignTexture( materialParams, 'roughnessMap', textureIndex ) );

				}

			} else {

				materialType = THREE.MeshPhongMaterial;

			}

			if ( material.doubleSided === true ) {

				materialParams.side = THREE.DoubleSide;

			}

			var alphaMode = material.alphaMode || ALPHA_MODES.OPAQUE;

			if ( alphaMode !== ALPHA_MODES.OPAQUE ) {

				materialParams.transparent = true;

				if ( alphaMode === ALPHA_MODES.MASK ) {

					materialParams.alphaTest = material.alphaCutoff || 0.5;

				}

			} else {

				materialParams.transparent = false;

			}

			if ( material.normalTexture !== undefined ) {

				pending.push( parser.assignTexture( materialParams, 'normalMap', material.normalTexture.index ) );

				materialParams.normalScale = new THREE.Vector2( 1, 1 );

				if ( material.normalTexture.scale !== undefined ) {

					materialParams.normalScale.set( material.normalTexture.scale, material.normalTexture.scale );

				}

			}

			if ( material.occlusionTexture !== undefined ) {

				pending.push( parser.assignTexture( materialParams, 'aoMap', material.occlusionTexture.index ) );

				if ( material.occlusionTexture.strength !== undefined ) {

					materialParams.aoMapIntensity = material.occlusionTexture.strength;

				}

			}

			if ( material.emissiveFactor !== undefined ) {

				if ( materialType === THREE.MeshBasicMaterial ) {

					materialParams.color = new THREE.Color().fromArray( material.emissiveFactor );

				} else {

					materialParams.emissive = new THREE.Color().fromArray( material.emissiveFactor );

				}

			}

			if ( material.emissiveTexture !== undefined ) {

				if ( materialType === THREE.MeshBasicMaterial ) {

					pending.push( parser.assignTexture( materialParams, 'map', material.emissiveTexture.index ) );

				} else {

					pending.push( parser.assignTexture( materialParams, 'emissiveMap', material.emissiveTexture.index ) );

				}

			}

			return Promise.all( pending ).then( function () {

				var _material;

				if ( materialType === THREE.ShaderMaterial ) {

					_material = extensions[ EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS ].createMaterial( materialParams );

				} else {

					_material = new materialType( materialParams );

				}

				if ( material.name !== undefined ) _material.name = material.name;

				// Normal map textures use OpenGL conventions:
				// https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#materialnormaltexture
				if ( _material.normalScale ) {

					_material.normalScale.x = - _material.normalScale.x;

				}

				// emissiveTexture and baseColorTexture use sRGB encoding.
				if ( _material.map ) _material.map.encoding = THREE.sRGBEncoding;
				if ( _material.emissiveMap ) _material.emissiveMap.encoding = THREE.sRGBEncoding;

				if ( material.extras ) _material.userData = material.extras;

				return _material;

			} );

		} );

	};

	GLTFParser.prototype.loadGeometries = function ( primitives ) {

		return this._withDependencies( [

			'accessors',

		] ).then( function ( dependencies ) {

			return _each( primitives, function ( primitive ) {

				var geometry = new THREE.BufferGeometry();

				var attributes = primitive.attributes;

				for ( var attributeId in attributes ) {

					var attributeEntry = attributes[ attributeId ];

					if ( attributeEntry === undefined ) return;

					var bufferAttribute = dependencies.accessors[ attributeEntry ];

					switch ( attributeId ) {

						case 'POSITION':

							geometry.addAttribute( 'position', bufferAttribute );
							break;

						case 'NORMAL':

							geometry.addAttribute( 'normal', bufferAttribute );
							break;

						case 'TEXCOORD_0':
						case 'TEXCOORD0':
						case 'TEXCOORD':

							geometry.addAttribute( 'uv', bufferAttribute );
							break;

						case 'TEXCOORD_1':

							geometry.addAttribute( 'uv2', bufferAttribute );
							break;

						case 'COLOR_0':
						case 'COLOR0':
						case 'COLOR':

							geometry.addAttribute( 'color', bufferAttribute );
							break;

						case 'WEIGHTS_0':
						case 'WEIGHT': // WEIGHT semantic deprecated.

							geometry.addAttribute( 'skinWeight', bufferAttribute );
							break;

						case 'JOINTS_0':
						case 'JOINT': // JOINT semantic deprecated.

							geometry.addAttribute( 'skinIndex', bufferAttribute );
							break;

					}

				}

				if ( primitive.indices !== undefined ) {

					geometry.setIndex( dependencies.accessors[ primitive.indices ] );

				}

				return geometry;

			} );

		} );

	};

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#meshes
	 */
	GLTFParser.prototype.loadMeshes = function () {

		var scope = this;
		var json = this.json;
		var extensions = this.extensions;

		return this._withDependencies( [

			'accessors',
			'materials'

		] ).then( function ( dependencies ) {

			return _each( json.meshes, function ( meshDef, meshIndex ) {

				var group = new THREE.Group();

				var primitives = meshDef.primitives || [];

				return scope.loadGeometries( primitives ).then( function ( geometries ) {

					for ( var i = 0; i < primitives.length; i ++ ) {

						var primitive = primitives[ i ];
						var geometry = geometries[ i ];

						var material = primitive.material === undefined
							? createDefaultMaterial()
							: dependencies.materials[ primitive.material ];

						if ( material.aoMap
								&& geometry.attributes.uv2 === undefined
								&& geometry.attributes.uv !== undefined ) {

							console.log( 'THREE.GLTFLoader: Duplicating UVs to support aoMap.' );
							geometry.addAttribute( 'uv2', new THREE.BufferAttribute( geometry.attributes.uv.array, 2 ) );

						}

						var useVertexColors = geometry.attributes.color !== undefined;
						var useFlatShading = geometry.attributes.normal === undefined;

						if ( useVertexColors || useFlatShading ) {

							if ( material.isGLTFSpecularGlossinessMaterial ) {

								var specGlossExtension = extensions[ EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS ];
								material = specGlossExtension.cloneMaterial( material );

							} else {

								material = material.clone();

							}

						}

						if ( useVertexColors ) {

							material.vertexColors = THREE.VertexColors;
							material.needsUpdate = true;

						}

						if ( useFlatShading ) {

							material.flatShading = true;

						}

						var mesh;

						if ( primitive.mode === WEBGL_CONSTANTS.TRIANGLES || primitive.mode === undefined ) {

							mesh = new THREE.Mesh( geometry, material );

						} else if ( primitive.mode === WEBGL_CONSTANTS.TRIANGLE_STRIP ) {

							mesh = new THREE.Mesh( geometry, material );
							mesh.drawMode = THREE.TriangleStripDrawMode;

						} else if ( primitive.mode === WEBGL_CONSTANTS.TRIANGLE_FAN ) {

							mesh = new THREE.Mesh( geometry, material );
							mesh.drawMode = THREE.TriangleFanDrawMode;

						} else if ( primitive.mode === WEBGL_CONSTANTS.LINES ) {

							mesh = new THREE.LineSegments( geometry, material );

						} else if ( primitive.mode === WEBGL_CONSTANTS.LINE_STRIP ) {

							mesh = new THREE.Line( geometry, material );

						} else if ( primitive.mode === WEBGL_CONSTANTS.LINE_LOOP ) {

							mesh = new THREE.LineLoop( geometry, material );

						} else if ( primitive.mode === WEBGL_CONSTANTS.POINTS ) {

							mesh = new THREE.Points( geometry, material );

						} else {

							throw new Error( 'THREE.GLTFLoader: Primitive mode unsupported: ', primitive.mode );

						}

						mesh.name = meshDef.name || ( 'mesh_' + meshIndex );

						if ( primitive.targets !== undefined ) {

							addMorphTargets( mesh, meshDef, primitive, dependencies );

						}

						if ( primitive.extras ) mesh.userData = primitive.extras;

						if ( primitives.length > 1 ) {

							mesh.name += '_' + i;

							group.add( mesh );

						} else {

							return mesh;

						}

					}

					return group;

				} );

			} );

		} );

	};

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#cameras
	 * @param {number} cameraIndex
	 * @return {Promise<THREE.Camera>}
	 */
	GLTFParser.prototype.loadCamera = function ( cameraIndex ) {

		var camera;
		var cameraDef = this.json.cameras[ cameraIndex ];
		var params = cameraDef[ cameraDef.type ];

		if ( ! params ) {

			console.warn( 'THREE.GLTFLoader: Missing camera parameters.' );
			return;

		}

		if ( cameraDef.type === 'perspective' ) {

			var aspectRatio = params.aspectRatio || 1;
			var xfov = params.yfov * aspectRatio;

			camera = new THREE.PerspectiveCamera( THREE.Math.radToDeg( xfov ), aspectRatio, params.znear || 1, params.zfar || 2e6 );

		} else if ( cameraDef.type === 'orthographic' ) {

			camera = new THREE.OrthographicCamera( params.xmag / -2, params.xmag / 2, params.ymag / 2, params.ymag / -2, params.znear, params.zfar );

		}

		if ( cameraDef.name !== undefined ) camera.name = cameraDef.name;
		if ( cameraDef.extras ) camera.userData = cameraDef.extras;

		return Promise.resolve( camera );

	};

	GLTFParser.prototype.loadSkins = function () {

		var json = this.json;

		return this._withDependencies( [

			'accessors'

		] ).then( function ( dependencies ) {

			return _each( json.skins, function ( skin ) {

				var _skin = {
					joints: skin.joints,
					inverseBindMatrices: dependencies.accessors[ skin.inverseBindMatrices ]
				};

				return _skin;

			} );

		} );

	};

	GLTFParser.prototype.loadAnimations = function () {

		var json = this.json;

		return this._withDependencies( [

			'accessors',
			'nodes'

		] ).then( function ( dependencies ) {

			return _each( json.animations, function ( animation, animationId ) {

				var tracks = [];

				for ( var i = 0; i < animation.channels.length; i ++ ) {

					var channel = animation.channels[ i ];
					var sampler = animation.samplers[ channel.sampler ];

					if ( sampler ) {

						var target = channel.target;
						var name = target.node !== undefined ? target.node : target.id; // NOTE: target.id is deprecated.
						var input = animation.parameters !== undefined ? animation.parameters[ sampler.input ] : sampler.input;
						var output = animation.parameters !== undefined ? animation.parameters[ sampler.output ] : sampler.output;

						var inputAccessor = dependencies.accessors[ input ];
						var outputAccessor = dependencies.accessors[ output ];

						var node = dependencies.nodes[ name ];

						if ( node ) {

							node.updateMatrix();
							node.matrixAutoUpdate = true;

							var TypedKeyframeTrack;

							switch ( PATH_PROPERTIES[ target.path ] ) {

								case PATH_PROPERTIES.weights:

									TypedKeyframeTrack = THREE.NumberKeyframeTrack;
									break;

								case PATH_PROPERTIES.rotation:

									TypedKeyframeTrack = THREE.QuaternionKeyframeTrack;
									break;

								case PATH_PROPERTIES.position:
								case PATH_PROPERTIES.scale:
								default:

									TypedKeyframeTrack = THREE.VectorKeyframeTrack;
									break;

							}

							var targetName = node.name ? node.name : node.uuid;

							if ( sampler.interpolation === 'CATMULLROMSPLINE' ) {

								console.warn( 'THREE.GLTFLoader: CATMULLROMSPLINE interpolation is not supported. Using CUBICSPLINE instead.' );

							}

							var interpolation = sampler.interpolation !== undefined ? INTERPOLATION[ sampler.interpolation ] : THREE.InterpolateLinear;

							var targetNames = [];

							if ( PATH_PROPERTIES[ target.path ] === PATH_PROPERTIES.weights ) {

								// node should be THREE.Group here but
								// PATH_PROPERTIES.weights(morphTargetInfluences) should be
								// the property of a mesh object under node.
								// So finding targets here.

								node.traverse( function ( object ) {

									if ( object.isMesh === true && object.material.morphTargets === true ) {

										targetNames.push( object.name ? object.name : object.uuid );

									}

								} );

							} else {

								targetNames.push( targetName );

							}

							// KeyframeTrack.optimize() will modify given 'times' and 'values'
							// buffers before creating a truncated copy to keep. Because buffers may
							// be reused by other tracks, make copies here.
							for ( var j = 0, jl = targetNames.length; j < jl; j ++ ) {

								tracks.push( new TypedKeyframeTrack(
									targetNames[ j ] + '.' + PATH_PROPERTIES[ target.path ],
									THREE.AnimationUtils.arraySlice( inputAccessor.array, 0 ),
									THREE.AnimationUtils.arraySlice( outputAccessor.array, 0 ),
									interpolation
								) );

							}

						}

					}

				}

				var name = animation.name !== undefined ? animation.name : 'animation_' + animationId;

				return new THREE.AnimationClip( name, undefined, tracks );

			} );

		} );

	};

	GLTFParser.prototype.loadNodes = function () {

		var json = this.json;
		var extensions = this.extensions;
		var scope = this;

		var nodes = json.nodes || [];
		var skins = json.skins || [];

		var meshReferences = {};
		var meshUses = {};

		// Nothing in the node definition indicates whether it is a Bone or an
		// Object3D. Use the skins' joint references to mark bones.
		for ( var skinIndex in skins ) {

			var joints = skins[ skinIndex ].joints;

			for ( var i = 0; i < joints.length; ++ i ) {

				nodes[ joints[ i ] ].isBone = true;

			}

		}

		// Meshes can (and should) be reused by multiple nodes in a glTF asset. To
		// avoid having more than one THREE.Mesh with the same name, count
		// references and rename instances below.
		//
		// Example: CesiumMilkTruck sample model reuses "Wheel" meshes.
		for ( var nodeIndex in nodes ) {

			var nodeDef = nodes[ nodeIndex ];

			if ( nodeDef.mesh !== undefined ) {

				if ( meshReferences[ nodeDef.mesh ] === undefined ) {

					meshReferences[ nodeDef.mesh ] = meshUses[ nodeDef.mesh ] = 0;

				}

				meshReferences[ nodeDef.mesh ]++;

			}

		}

		return scope._withDependencies( [

			'meshes',
			'skins',
			'cameras'

		] ).then( function ( dependencies ) {

			return _each( json.nodes, function ( nodeDef ) {

				if ( nodeDef.isBone === true ) {

					return new THREE.Bone();

				} else if ( nodeDef.mesh !== undefined ) {

					var mesh = dependencies.meshes[ nodeDef.mesh ].clone();

					if ( meshReferences[ nodeDef.mesh ] > 1 ) {

						mesh.name += '_instance_' + meshUses[ nodeDef.mesh ]++;

					}

					return mesh;

				} else if ( nodeDef.camera !== undefined ) {

					return scope.getDependency( 'camera', nodeDef.camera );

				} else if ( nodeDef.extensions
								 && nodeDef.extensions[ EXTENSIONS.KHR_LIGHTS ]
								 && nodeDef.extensions[ EXTENSIONS.KHR_LIGHTS ].light !== undefined ) {

					var lights = extensions[ EXTENSIONS.KHR_LIGHTS ].lights;
					return lights[ nodeDef.extensions[ EXTENSIONS.KHR_LIGHTS ].light ];

				} else {

					return new THREE.Object3D();

				}

			} ).then( function ( __nodes ) {

				return _each( __nodes, function ( node, nodeIndex ) {

					var nodeDef = json.nodes[ nodeIndex ];

					if ( nodeDef.name !== undefined ) {

						node.name = THREE.PropertyBinding.sanitizeNodeName( nodeDef.name );

					}

					if ( nodeDef.extras ) node.userData = nodeDef.extras;

					if ( nodeDef.matrix !== undefined ) {

						var matrix = new THREE.Matrix4();
						matrix.fromArray( nodeDef.matrix );
						node.applyMatrix( matrix );

					} else {

						if ( nodeDef.translation !== undefined ) {

							node.position.fromArray( nodeDef.translation );

						}

						if ( nodeDef.rotation !== undefined ) {

							node.quaternion.fromArray( nodeDef.rotation );

						}

						if ( nodeDef.scale !== undefined ) {

							node.scale.fromArray( nodeDef.scale );

						}

					}

					if ( nodeDef.skin !== undefined ) {

						var skinnedMeshes = [];

						var meshes = node.children.length > 0 ? node.children : [ node ];

						for ( var i = 0; i < meshes.length; i ++ ) {

							var mesh = meshes[ i ];
							var skinEntry = dependencies.skins[ nodeDef.skin ];

							// Replace Mesh with SkinnedMesh.
							var geometry = mesh.geometry;
							var material = mesh.material;
							material.skinning = true;

							var skinnedMesh = new THREE.SkinnedMesh( geometry, material );
							skinnedMesh.morphTargetInfluences = mesh.morphTargetInfluences;
							skinnedMesh.userData = mesh.userData;
							skinnedMesh.name = mesh.name;

							var bones = [];
							var boneInverses = [];

							for ( var j = 0, l = skinEntry.joints.length; j < l; j ++ ) {

								var jointId = skinEntry.joints[ j ];
								var jointNode = __nodes[ jointId ];

								if ( jointNode ) {

									bones.push( jointNode );

									var m = skinEntry.inverseBindMatrices.array;
									var mat = new THREE.Matrix4().fromArray( m, j * 16 );
									boneInverses.push( mat );

								} else {

									console.warn( 'THREE.GLTFLoader: Joint "%s" could not be found.', jointId );

								}

							}

							skinnedMesh.bind( new THREE.Skeleton( bones, boneInverses ), skinnedMesh.matrixWorld );

							skinnedMeshes.push( skinnedMesh );

						}

						if ( node.children.length > 0 ) {

							node.remove.apply( node, node.children );
							node.add.apply( node, skinnedMeshes );

						} else {

							node = skinnedMeshes[ 0 ];

						}

					}

					return node;

				} );

			} );

		} );

	};

	GLTFParser.prototype.loadScenes = function () {

		var json = this.json;
		var extensions = this.extensions;

		// scene node hierachy builder

		function buildNodeHierachy( nodeId, parentObject, allNodes ) {

			var _node = allNodes[ nodeId ];
			parentObject.add( _node );

			var node = json.nodes[ nodeId ];

			if ( node.children ) {

				var children = node.children;

				for ( var i = 0, l = children.length; i < l; i ++ ) {

					var child = children[ i ];
					buildNodeHierachy( child, _node, allNodes );

				}

			}

		}

		return this._withDependencies( [

			'nodes'

		] ).then( function ( dependencies ) {

			return _each( json.scenes, function ( scene ) {

				var _scene = new THREE.Scene();
				if ( scene.name !== undefined ) _scene.name = scene.name;

				if ( scene.extras ) _scene.userData = scene.extras;

				var nodes = scene.nodes || [];

				for ( var i = 0, l = nodes.length; i < l; i ++ ) {

					var nodeId = nodes[ i ];
					buildNodeHierachy( nodeId, _scene, dependencies.nodes );

				}

				_scene.traverse( function ( child ) {

					// for Specular-Glossiness.
					if ( child.material && child.material.isGLTFSpecularGlossinessMaterial ) {

						child.onBeforeRender = extensions[ EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS ].refreshUniforms;

					}

				} );

				// Ambient lighting, if present, is always attached to the scene root.
				if ( scene.extensions
							 && scene.extensions[ EXTENSIONS.KHR_LIGHTS ]
							 && scene.extensions[ EXTENSIONS.KHR_LIGHTS ].light !== undefined ) {

					var lights = extensions[ EXTENSIONS.KHR_LIGHTS ].lights;
					_scene.add( lights[ scene.extensions[ EXTENSIONS.KHR_LIGHTS ].light ] );

				}

				return _scene;

			} );

		} );

	};

	return GLTFLoader;

} )();


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * 模型渲染类
 *
 * @author [waiting...]
 * @author renzhenguo
 */



var loadfile = __webpack_require__(4);
var interact = __webpack_require__(5);
var aide = __webpack_require__(7);
var css = __webpack_require__(8);

/**
 * @module ThreePlay.Draw
 */
function Draw(options) {
  var _this = this;

  this._initOpt(options);
  this._initRes();

  loadfile(this).then(function (data) {
    _this.scene.add(data);
    _this.containerDom.appendChild(_this.canvasDom);

    // 计算展示位置
    aide.position(_this, data);
    // 线框
    aide.lineSegments(_this, data);

    // 其他内容处理
    console.log(data);

    // 处理控制内容
    interact(_this);

    _this._animate();
    _this._onLoad();
  }).catch(this._onError);
}

var drawProto = Draw.prototype;

/**
 * 初始化参数
 */
drawProto._initOpt = function (options) {
  this.version = '1.0.0';
  this._options = options || {};
  this._onError = this._options.onError || function (err) {
    console.log(err);
  };
  this._onLoad = this._options.onLoad || function () {};

  // 模型助手功能数据
  this.aide = [];

  css(this._options);
};

/**
 * 初始化元素
 */
drawProto._initRes = function () {
  // 场景
  this.scene = new THREE.Scene();

  // 相机
  this.camera = new THREE.PerspectiveCamera(90, 1, 1, 1000);

  // 渲染器
  this.renderer = new THREE.WebGLRenderer({ antialias: true });
  this.renderer.setClearColor(0x999999);
  this.renderer.setPixelRatio(window.devicePixelRatio);

  // 控制器
  this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);

  // dom元素
  this.containerDom = this._options.dom;
  this.canvasDom = this.renderer.domElement;
};

drawProto._animate = function () {
  if (!window.draw) window.draw = this;

  draw.renderer.render(draw.scene, draw.camera);
  draw.controls.update();

  requestAnimationFrame(draw._animate);
};

module.exports = Draw;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * 负责模型加载的
 *
 * @author renzhenguo
 */



/**
 * @module loadfile
 */

module.exports = function (draw) {
  var func = void 0;
  switch (draw._options.type) {
    case 'glTF2':
      func = loadGltf2;
      break;
    default:
      return Promise.reject(new Error('loadfile 不支持的类型: ' + draw._options.type));
  }

  var promise = new Promise(function (resolve, reject) {
    func(draw, resolve, reject);
  });
  return promise;
};

/**
 * 加载glTF2
 */
function loadGltf2(draw, resolve, reject) {
  var loader = new THREE.GLTFLoader();

  loader.load(draw._options.file, function (gltf) {
    var object = gltf.scene;

    object.traverse(function (node) {
      if (node.isMesh) node.castShadow = true;
    });

    // 多相机处理

    // 动画
    var animations = gltf.animations;
    if (animations && animations.length) {
      mixer = new THREE.AnimationMixer(object);

      animations.forEach(function (animation, i) {
        mixer.clipAction(animation).play();
      });
      object.mixer = mixer;
    }

    // 临时灯光
    var ambientLight = new THREE.AmbientLight(0x999999); // 环境光
    object.add(ambientLight);

    var directionalLight = new THREE.DirectionalLight(0xdddddd); // 平行光阴影
    directionalLight.position.set(0, 0, 1).normalize();
    object.add(directionalLight);

    resolve(object);
  }, function () {
    // 加载过程
  }, function (err) {
    reject(new Error('文件加载异常'));
  });
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * 处理交互操作及事件
 *
 * @author renzhenguo
 */



var icon = __webpack_require__(6);

/**
 * @module interact
 */
module.exports = function (draw) {
    containerResize(draw);
    window.addEventListener('resize', function () {
        containerResize(draw);
    }, false);

    var divDom = document.createElement('div');
    divDom.className = 'drawdom_ctrlbts';
    draw.containerDom.appendChild(divDom);

    divDom.appendChild(requestFullscreen(draw));
    divDom.appendChild(lineSegments(draw));
};

/**
 * 尺寸改变
 */
function containerResize(draw) {
    var offset = {
        'width': draw.containerDom.clientWidth || draw.containerDom.offsetWidth,
        'height': draw.containerDom.clientHeight || draw.containerDom.offsetHeight
    };

    draw.renderer.setSize(offset.width, offset.height);
    draw.camera.aspect = offset.width / offset.height;
    draw.camera.updateProjectionMatrix();
}

/**
 * 全屏方法
 */
function requestFullscreen(draw) {
    var dom = document.createElement('span');
    icon(dom, 'fullscreen', '全屏');

    dom.onclick = function () {
        var fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;

        document.exitFullscreen = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;

        if (fullscreenElement) {
            return document.exitFullscreen();
        }

        draw.containerDom.requestFullscreen = draw.containerDom.requestFullscreen || draw.containerDom.webkitRequestFullscreen || draw.containerDom.mozRequestFullScreen || draw.containerDom.msRequestFullscreen;
        draw.containerDom.requestFullscreen();
    };

    document.onfullscreenchange = document.onwebkitfullscreenchange = document.onmozfullscreenchange = document.MSFullscreenChange = function () {
        var fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
        if (fullscreenElement) {
            return icon(dom, 'fullscreen_exit', '退出全屏');
        }
        icon(dom, 'fullscreen', '全屏');
    };
    return dom;
}

/**
 * 线框
 */
function lineSegments(draw) {
    if (draw.aide.lineSegments.length < 1) {
        return;
    }

    var dom = document.createElement('span');
    icon(dom, 'border_all', '线框');
    dom.onclick = function () {
        draw.aide.lineSegments.forEach(function (line, i) {
            //line.material.depthTest = false;
            line.material.visible = !line.material.visible;
        });
    };
    return dom;
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * icon svg图标
 * 大小统一选取24, tip位置在顶部, 颜色由css控制
 *
 * @author renzhenguo
 */



var icons = {
    'fullscreen': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>',
    'fullscreen_exit': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/></svg>',
    'border_all': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 3v18h18V3H3zm8 16H5v-6h6v6zm0-8H5V5h6v6zm8 8h-6v-6h6v6zm0-8h-6V5h6v6z"/></svg>'
};

/**
 * @module icon
 * @param dom 添加icon图标的容器
 * @param name icon图标名称,对应icons里的key
 * @param tip 鼠标指向icon的提示
 */
module.exports = function (dom, name, tip) {
    var svg = icons[name] || tip || name;
    dom.innerHTML = svg;

    if (!tip) {
        return;
    }

    var span = document.createElement('span');
    span.className = 'drawdom_icontip';
    span.innerHTML = tip;

    dom.onmouseover = function (event) {
        if (dom.lastElementChild == span) {
            return;
        }
        dom.appendChild(span);
    };
    dom.onmouseout = function (event) {
        if (event.relatedTarget == dom) {
            return;
        }
        if (event.relatedTarget.parentNode == dom) {
            return;
        }
        if (event.relatedTarget.parentNode.parentNode == dom) {
            return;
        }
        if (dom.lastElementChild == span) {
            dom.removeChild(span);
        }
    };
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * 助手,辅助模型信息
 *
 * @author renzhenguo
 */



/**
 * 初始展示位置的计算, TODO 动画效果
 */

exports.position = function (draw, data) {
  var area = {
    'x': { 'min': 100000, 'max': -100000 },
    'y': { 'min': 100000, 'max': -100000 }
  };
  data.traverse(function (node) {
    if (node.geometry) {
      node.geometry.computeBoundingSphere();

      var minX = node.geometry.boundingSphere.center.x - node.geometry.boundingSphere.radius;
      area.x.min = Math.min(area.x.min, minX);
      var maxX = node.geometry.boundingSphere.center.x + node.geometry.boundingSphere.radius;
      area.x.max = Math.max(area.x.max, maxX);
      var minY = node.geometry.boundingSphere.center.y - node.geometry.boundingSphere.radius;
      area.y.min = Math.min(area.y.min, minY);
      var maxY = node.geometry.boundingSphere.center.y + node.geometry.boundingSphere.radius;
      area.y.max = Math.max(area.y.max, maxY);
    }
  });
  var diam = Math.max(area.x.max - area.x.min, area.y.max - area.y.min);
  if (diam > 0) {
    draw.camera.near = diam * 0.05;
    draw.camera.position.z = diam * 0.6;
  }
};

/**
 * 模型线框
 */
exports.lineSegments = function (draw, data) {
  draw.aide.lineSegments = [];

  data.traverse(function (node) {
    if (node.geometry) {
      var wireframe = new THREE.WireframeGeometry(node.geometry);
      var line = new THREE.LineSegments(wireframe);
      line.material.visible = false;
      data.add(line);

      draw.aide.lineSegments.push(line);
    }
  });
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * 处理css样式
 *
 * @author renzhenguo
 */



/**
 * @module css
 */

module.exports = function (options) {
    var css = document.createElement('style');
    css.innerHTML = getCss();

    var head = document.head || document.getElementsByTagName('head')[0];
    head.appendChild(css);

    var className = (options.dom.className + ' drawdom').trim();
    options.dom.setAttribute('class', className);
};

/**
 * css内容
 */
function getCss() {
    return '\n    .drawdom {\n        position: relative;\n    }\n    .drawdom > canvas {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n    }\n    .drawdom svg {\n        fill: currentColor;\n    }\n    .drawdom_ctrlbts {\n        position: absolute;\n        bottom: 20px;\n        right: 20px;\n    }\n    .drawdom_ctrlbts > * {\n        cursor: pointer;\n        position: relative;\n        display: block;\n        float: left;\n        color: #fff;\n        padding: 5px;\n        width: 24px;\n        height: 24px;\n    }\n    .drawdom_ctrlbts > *:hover {\n        background-color: rgba(0,0,0,0.1);\n        border-radius: 24px;\n    }\n    .drawdom_icontip {\n        background-color: rgba(0,0,0,0.1);\n        position: absolute;\n        white-space: nowrap;\n        font-size: 12px;\n        width: 60px;\n        text-align: center;\n        line-height: 28px;\n        top: -30px;\n        left: -14px;\n    }\n  ';
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * 模型再加工 加特效类
 *
 * @author renzhenguo
 */



function Duang(options) {
  console.log('todo Play Duang');
}

module.exports = Duang;

/***/ })
/******/ ]);
});