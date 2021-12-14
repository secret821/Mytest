/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/drag.ts":
/*!*********************!*\
  !*** ./src/drag.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addDragDemo\": () => (/* binding */ addDragDemo)\n/* harmony export */ });\nvar _this = undefined;\nvar addDragDemo = function (stage) {\n    var pic = FYGE.Sprite.fromUrl('//yun.duiba.com.cn/aurora/assets/b64757cc9839c1dcc80692f6b7db9d97d269c315.png');\n    stage.addChild(pic);\n    //鼠标按下起始点\n    var startPoint;\n    //图片起始位置\n    var picOriginPos;\n    var onStageMove = function (event) {\n        console.log('触发了onStageMove事件，当前时间戳=>', Date.now());\n        //鼠标当前位置\n        var currentPoint = { x: event.stageX, y: event.stageY };\n        //鼠标按下点到鼠标当前点的偏移量\n        var mouseOffsetX = currentPoint.x - startPoint.x;\n        var mouseOffsetY = currentPoint.y - startPoint.y;\n        pic.x = picOriginPos.x + mouseOffsetX;\n        pic.y = picOriginPos.y + mouseOffsetY;\n    };\n    var onMouseUp_pic = function () {\n        //鼠标抬起后应该移出舞台移动事件，否则会重复添加事件\n        stage.removeEventListener(FYGE.MouseEvent.MOUSE_MOVE, onStageMove, _this);\n    };\n    var onMouseDown_pic = function (event) {\n        //图片鼠标弹起事件，事件触发一次即移除，否则会重复添加鼠标弹起事件\n        pic.once(FYGE.MouseEvent.MOUSE_UP, onMouseUp_pic, _this);\n        //添加舞台移动事件，鼠标移动即触发\n        //FYGE.MouseEvent.MOUSE_MOVE 会在鼠标移动过程中触发\n        stage.addEventListener(FYGE.MouseEvent.MOUSE_MOVE, onStageMove, _this);\n        //event事件对象\n        //event.stageX，event.stageY当前鼠标在舞台的位置\n        startPoint = { x: event.stageX, y: event.stageY };\n        picOriginPos = { x: pic.x, y: pic.y };\n    };\n    //增加鼠标按下事件\n    pic.addEventListener(FYGE.MouseEvent.MOUSE_DOWN, onMouseDown_pic, _this);\n};\n\n\n//# sourceURL=webpack:///./src/drag.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _drag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./drag */ \"./src/drag.ts\");\n\nvar canvas = document.getElementById(\"canvas\");\ncanvas.width = document.body.clientWidth * 1;\ncanvas.height = document.body.clientHeight * 1;\nvar stage = new FYGE.Stage(canvas, 750, 1624, canvas.width, canvas.height, FYGE.RENDERER_TYPE.CANVAS, false, false);\nvar mouseEvent = stage.onMouseEvent.bind(stage);\ncanvas.addEventListener(\"touchstart\", mouseEvent, false);\ncanvas.addEventListener('touchmove', mouseEvent, false);\ncanvas.addEventListener('touchend', mouseEvent, false);\nstage.addEventListener(FYGE.Event.INIT_STAGE, onInitStage, undefined);\nfunction onInitStage() {\n    (0,_drag__WEBPACK_IMPORTED_MODULE_0__.addDragDemo)(stage);\n}\n(function loop() {\n    FYGE.Tween.flush();\n    stage.flush();\n    requestAnimationFrame(loop);\n})();\n\n\n//# sourceURL=webpack:///./src/main.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;