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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addDragDemo\": () => (/* binding */ addDragDemo)\n/* harmony export */ });\nvar _this = undefined;\nvar addDragDemo = function (stage) {\n    var gameWrapper = new FYGE.Sprite();\n    stage.addChild(gameWrapper);\n    var PIC_URLS = [\n        '//yun.duiba.com.cn/aurora/assets/cd16134f2544202ed5676adbd5114286aec44347.png',\n        '//yun.duiba.com.cn/aurora/assets/c55dcd277542a6c3e983278ae5835d89848b9bd9.png',\n        '//yun.duiba.com.cn/aurora/assets/b42c49baaf8754139d2e940fe97ba1cb289b11fa.png',\n        '//yun.duiba.com.cn/aurora/assets/4a4b850995da348ccd5fb520d5b9ef5e0fb8349f.png',\n        '//yun.duiba.com.cn/aurora/assets/5b3e3b52f406df1543e2eeca1ce11719a28c6401.png',\n        '//yun.duiba.com.cn/aurora/assets/cae0529d1ff2eaa323dc0615d12a1f05e3a67c06.png',\n        '//yun.duiba.com.cn/aurora/assets/5b91853f9d87de73e319d42ea9df139ddd89d537.png',\n        '//yun.duiba.com.cn/aurora/assets/a2893c5a0d03ca3252160de1584584e18abe2a4a.png',\n        '//yun.duiba.com.cn/aurora/assets/c36b0851f61a812e6d745bc205c0551b6590d11d.png',\n    ];\n    var fill = function (size) {\n        var list = [];\n        for (var i = 0; i < size; i++) {\n            list.push(i);\n        }\n        return list;\n    };\n    var GAME_SIZE = 3;\n    var INIT_DATA = fill(GAME_SIZE * GAME_SIZE); //数据为图片id，从0开始（图片索引）\n    var gamedata = JSON.parse(JSON.stringify(INIT_DATA)); //深拷贝\n    gamedata.shuffle(); //打乱图片，后续需要和INIT_DATA做对比\n    console.log('初始打乱的图片数据', gamedata.map(function (i) { return (i + 1); }));\n    function getIndex(row, col, maxCol) {\n        var index;\n        index = row * maxCol + col;\n        return index;\n    }\n    //鼠标按下起始点\n    var startPoint;\n    //图片起始位置\n    var currPicOriginPos;\n    var currentPic;\n    var PIC_SIZE = 200;\n    var GAP = 2;\n    var onStageMove = function (event) {\n        //鼠标当前位置\n        var currentPoint = { x: event.stageX, y: event.stageY };\n        //鼠标按下点到鼠标当前点的偏移量\n        var mouseOffsetX = currentPoint.x - startPoint.x;\n        var mouseOffsetY = currentPoint.y - startPoint.y;\n        currentPic.x = currPicOriginPos.x + mouseOffsetX;\n        currentPic.y = currPicOriginPos.y + mouseOffsetY;\n    };\n    var onMouseUp_pic = function () {\n        //鼠标抬起后应该移出舞台移动事件，否则会重复添加事件\n        gameWrapper.stage.removeEventListener(FYGE.MouseEvent.MOUSE_MOVE, onStageMove, _this);\n        var picCenterX = currentPic.x + PIC_SIZE / 2;\n        var picCenterY = currentPic.y + PIC_SIZE / 2;\n        var dropCol = Math.floor(picCenterX / PIC_SIZE);\n        var dropRow = Math.floor(picCenterY / PIC_SIZE);\n        var dropIndex = getIndex(dropRow, dropCol, GAME_SIZE);\n        console.log('drop index', dropIndex);\n        var dropId = gamedata[dropIndex];\n        var dropPic = getPicDisplayById(dropId);\n        var currentPicId = getPicId(currentPic);\n        var currentPicIndex = gamedata.indexOf(currentPicId);\n        console.log('currentPicIndex', currentPicIndex);\n        console.log('上一个数据', gamedata.map(function (i) { return (i + 1); }));\n        swap(currentPicIndex, dropIndex, gamedata);\n        console.log('交换后的数据', gamedata.map(function (i) { return (i + 1); }));\n        currentPic.x = dropPic.x;\n        currentPic.y = dropPic.y;\n        dropPic.x = currPicOriginPos.x;\n        dropPic.y = currPicOriginPos.y;\n        if (equalTo(INIT_DATA, gamedata)) {\n            setTimeout(function () {\n                alert('哈哈，赢了');\n            }, 500);\n        }\n    };\n    var onMouseDown_picItem = function (event) {\n        currentPic = event.target;\n        //图片鼠标弹起事件，事件触发一次即移除，否则会重复添加鼠标弹起事件\n        currentPic.once(FYGE.MouseEvent.MOUSE_UP, onMouseUp_pic, _this);\n        //添加舞台移动事件，鼠标移动即触发\n        //FYGE.MouseEvent.MOUSE_MOVE 会在鼠标移动过程中触发\n        gameWrapper.stage.addEventListener(FYGE.MouseEvent.MOUSE_MOVE, onStageMove, _this);\n        //event事件对象\n        //event.stageX，event.stageY当前鼠标在舞台的位置\n        startPoint = { x: event.stageX, y: event.stageY };\n        currPicOriginPos = { x: currentPic.x, y: currentPic.y };\n        gameWrapper.addChild(currentPic); //把当前图片移动到最上层\n    };\n    var PIC_DISPLAY_LIST = INIT_DATA.map(function (data) { return FYGE.Sprite.fromUrl(PIC_URLS[data]); }); //图片视图数据（列表）\n    var getPicDisplayById = function (id) { return PIC_DISPLAY_LIST[id]; }; //获取视图数据方法\n    var getPicId = function (picDisplay) {\n        for (var i = 0; i < PIC_DISPLAY_LIST.length; i++) {\n            var element = PIC_DISPLAY_LIST[i];\n            if (element == picDisplay)\n                return i;\n        }\n        return -1;\n    }; //你会看到用索引的好处\n    var equalTo = function (array1, array2) {\n        if (array1.length != array1.length)\n            return false;\n        var len = array1.length || array1.length;\n        for (var i = 0; i < len; i++) {\n            var a = array1[i];\n            var b = array2[i];\n            if (a != b)\n                return false;\n        }\n        return true;\n    }; //判断数组是否相等\n    //数组元素交换\n    var swap = function (index1, index2, list) {\n        var ele1 = list[index1];\n        var ele2 = list[index2];\n        list[index1] = ele2;\n        list[index2] = ele1;\n        return list;\n    };\n    //生成游戏\n    gamedata.map(function (data, index) {\n        var picItem = gameWrapper.addChild(getPicDisplayById(data));\n        var col = index % GAME_SIZE;\n        var row = Math.floor(index / GAME_SIZE);\n        picItem.x = col * (PIC_SIZE + GAP);\n        picItem.y = row * (PIC_SIZE + GAP);\n        //增加鼠标按下事件\n        picItem.addEventListener(FYGE.MouseEvent.MOUSE_DOWN, onMouseDown_picItem, _this);\n        return picItem;\n    });\n};\n\n\n//# sourceURL=webpack:///./src/drag.ts?");

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