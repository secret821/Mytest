(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/Main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./module/RES.ts":
/*!***********************!*\
  !*** ./module/RES.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.RES = void 0;
var RES;
(function (RES) {
    var resData;
    var textureHash = {};
    var videoEntityHash = {};
    var soundHash = {};
    var groupsCompleteHash = {};
    var groupsPromiseHash = {};
    var singleResPromiseHash = {};
    function loadConfig(res) {
        resData = res;
        RES.resPath = res.path;
    }
    RES.loadConfig = loadConfig;
    function loadGroup(name) {
        if (groupsCompleteHash[name]) {
            return new Promise(function (resolve) {
                resolve();
            });
        }
        if (groupsPromiseHash[name]) {
            return groupsPromiseHash[name];
        }
        var arr = getGroupResByName(name);
        if (!arr || !arr.length) {
            groupsCompleteHash[name] = true;
            return new Promise(function (resolve) {
                resolve();
            });
        }
        var p = new Promise(function (resolve, reject) {
            loadResList(function (s) {
                delete groupsPromiseHash[name];
                if (s) {
                    groupsCompleteHash[name] = true;
                    resolve();
                }
                else {
                    reject();
                }
            }, arr, name);
        });
        groupsPromiseHash[name] = p;
        return p;
    }
    RES.loadGroup = loadGroup;
    function getResAsync(str, comFun, thisObj, groupname) {
        var type = str.substring(str.lastIndexOf(".") + 1, str.length);
        if (type == "png" || type == "jpg") {
            var cached_1 = textureHash[str] || FYGE.TextureCache[str];
            if (cached_1) {
                comFun && comFun.call(thisObj, cached_1, str);
                return new Promise(function (r) {
                    r(cached_1);
                });
            }
            else if (singleResPromiseHash[str]) {
                return returnSingleResPromise(str, comFun, thisObj);
            }
            else {
                var groupName = groupname || hasRes(str);
                if (groupName && type != "jpg") {
                    var group = getGroupByName(groupName);
                    if (group && group.atlas) {
                        var json = groupName + ".json";
                        if (singleResPromiseHash[json]) {
                            return singleResPromiseHash[json].then(function (r) {
                                var cached = textureHash[str] || FYGE.TextureCache[str];
                                comFun && comFun.call(thisObj, cached, str);
                                return cached;
                            }, function () {
                                comFun && comFun.call(thisObj, null, str);
                                return null;
                            });
                        }
                        else {
                            return getResAsync(json)
                                .then(function () {
                                var cached = textureHash[str] || FYGE.TextureCache[str];
                                comFun && comFun.call(thisObj, cached, str);
                                return cached;
                            }, function () {
                                comFun && comFun.call(thisObj, null, str);
                                return null;
                            });
                        }
                    }
                }
                var src = groupName ? RES.resPath + groupName + "/" + str : str;
                var p = new Promise(function (resolve, reject) {
                    FYGE.GlobalLoader.loadImage(function (s, image) {
                        delete singleResPromiseHash[str];
                        if (s) {
                            var cached_2 = FYGE.Texture.from(image);
                            textureHash[str] = cached_2;
                            FYGE.Texture.addToCache(cached_2, str);
                            comFun && comFun.call(thisObj, cached_2, str);
                            resolve(cached_2);
                        }
                        else {
                            comFun && comFun.call(thisObj, null, str);
                            reject();
                        }
                    }, src);
                });
                singleResPromiseHash[str] = p;
                return p;
            }
        }
        else if (type == "svga") {
            if (videoEntityHash[str]) {
                comFun && comFun.call(thisObj, videoEntityHash[str], str);
                return new Promise(function (r) {
                    r(videoEntityHash[str]);
                });
            }
            else if (singleResPromiseHash[str]) {
                return returnSingleResPromise(str, comFun, thisObj);
            }
            else {
                var groupName = hasRes(str);
                var src = groupName ? RES.resPath + groupName + "/" + str : str;
                var p = new Promise(function (resolve, reject) {
                    SvgaParser.loadSvga(src, function (v) {
                        delete singleResPromiseHash[str];
                        videoEntityHash[str] = v;
                        comFun && comFun.call(thisObj, v, str);
                        resolve(v);
                    }, function (err) {
                        delete singleResPromiseHash[str];
                        comFun && comFun.call(thisObj, null, str);
                        reject(err);
                    });
                });
                singleResPromiseHash[str] = p;
                return p;
            }
        }
        else if (type == "json") {
            if (singleResPromiseHash[str]) {
                return returnSingleResPromise(str, comFun, thisObj);
            }
            else {
                var groupName = hasRes(str);
                var src = groupName ? RES.resPath + groupName + "/" + str : str;
                var p = new Promise(function (resolve, reject) {
                    var jsonData = getGroupByName(groupName).atlas;
                    FYGE.GlobalLoader.loadImage(function (s, data) {
                        if (s) {
                            var t = FYGE.createTextureSheet(new FYGE.BaseTexture(data), jsonData);
                            for (var key in t)
                                textureHash[key] = t[key];
                            comFun && comFun.call(thisObj, t, str);
                            resolve(t);
                        }
                        else {
                            delete singleResPromiseHash[str];
                            comFun && comFun.call(thisObj, null, str);
                            reject();
                        }
                    }, src.replace("json", "png"));
                });
                singleResPromiseHash[str] = p;
                return p;
            }
        }
    }
    RES.getResAsync = getResAsync;
    function getResByUrl() {
    }
    RES.getResByUrl = getResByUrl;
    function getRes(str) {
        if (!str)
            return null;
        var type = str.substring(str.lastIndexOf(".") + 1, str.length);
        if (type == "png" || type == "jpg") {
            return textureHash[str] || FYGE.TextureCache[str] || null;
        }
        else if (type == "svga") {
            return videoEntityHash[str] || null;
        }
        else if (type == "mp3") {
            return soundHash[str] || null;
        }
    }
    RES.getRes = getRes;
    function loadAllGroup() {
        var groups = resData.groups;
        var p = [];
        groups.forEach(function (g) {
            p.push(loadGroup(g.name));
        });
        return Promise.all(p);
    }
    RES.loadAllGroup = loadAllGroup;
    function hasRes(str) {
        for (var i = 0; i < resData.groups.length; i++) {
            var group = resData.groups[i];
            var keys = group.keys;
            if (keys && keys.split(",").indexOf(str) > -1) {
                return group.name;
            }
            if (group.atlas && group.name + ".json" == str) {
                return group.name;
            }
        }
        return null;
    }
    function getGroupResByName(name) {
        var group = getGroupByName(name);
        if (!group)
            return null;
        if (group.atlas) {
            var arr = [name + ".json"];
            if (group.keys) {
                arr = arr.concat(group.keys.split(",").filter(function (k) {
                    return k.substr(-4) != ".png";
                }));
            }
            return arr;
        }
        else if (group.keys) {
            return group.keys.split(",");
        }
        else {
            return null;
        }
    }
    function getGroupByName(name) {
        var groups = resData.groups;
        var group;
        for (var i = 0; i < groups.length; i++) {
            if (groups[i].name === name) {
                group = groups[i];
                break;
            }
        }
        return group;
    }
    function loadResList(callback, arr, groupName) {
        var count = 0;
        var countAll = arr.length;
        if (!countAll)
            callback(true);
        var mark = true;
        for (var i = 0; i < countAll; i++) {
            var resName = arr[i];
            getResAsync(resName, function (res, str) {
                if (!res)
                    mark = false;
                if (++count == countAll)
                    callback(mark);
            }, this, groupName);
        }
    }
    function returnSingleResPromise(str, comFun, thisObj) {
        singleResPromiseHash[str].then(function (r) {
            comFun && comFun.call(thisObj, r, str);
        }, function () {
            comFun && comFun.call(thisObj, null, str);
        });
        return singleResPromiseHash[str];
    }
    var skinData;
    function loadSkinConfig(skinJson) {
        skinData = skinJson;
    }
    RES.loadSkinConfig = loadSkinConfig;
    function initSkinDisplay(con, skin, root) {
        var data = typeof (skin) == 'string' ? getSkinDataByName(skin) : skin;
        if (!data.children || !data.children.length)
            return;
        for (var i = 0; i < data.children.length; i++) {
            var child = data.children[i];
            if (child.type == "item")
                continue;
            var dis = con.addChild(getDisplayByData(child));
            if (root && child.id)
                root[child.id] = dis;
            if (child.type == "container")
                initSkinDisplay(dis, child, root);
        }
    }
    RES.initSkinDisplay = initSkinDisplay;
    function getSkinDataByName(skinName, skinNode) {
        if (skinNode === void 0) { skinNode = skinData; }
        if (!skinNode || !skinNode.children || !skinNode.children.length)
            return null;
        for (var i = 0; i < skinNode.children.length; i++) {
            var child = skinNode.children[i];
            if (child.name == skinName && (child.type == "container" || child.type == "item"))
                return child;
            var gson = getSkinDataByName(skinName, child);
            if (gson)
                return gson;
        }
        return null;
    }
    RES.getSkinDataByName = getSkinDataByName;
    function getDisplayByData(data) {
        var dis;
        switch (data.type) {
            case "container":
                dis = new FYGE.Container();
                break;
            case "button":
                dis = new FYGE.Button(getRes(data.props.tUp), data.props.tDown ? getRes(data.props.tDown) : null, data.props.tDisable ? getRes(data.props.tDisable) : null);
                break;
            case "text":
                dis = new FYGE.TextField();
                for (var key in data.props)
                    dis[key] = data.props[key];
                break;
            case "sprite":
                dis = new FYGE.Sprite(getRes(data.props.source));
                break;
            case "rect":
                dis = new FYGE.Shape();
                dis.beginFill(FYGE.string2hex(data.props.fillColor));
                dis.drawRect(0, 0, data.props.width, data.props.height);
                dis.endFill();
                break;
        }
        dis.name = data.name;
        dis.alpha = data.alpha || 1;
        dis.position.set(data.x, data.y);
        return dis;
    }
    function destroyGroup(name) {
        var group = getGroupByName(name);
        if (!group)
            return;
        var arr = [];
        if (group.keys) {
            arr = group.keys.split(",");
        }
        var removedBase = [];
        for (var i = 0; i < arr.length; i++) {
            var t = getRes(arr[i]);
            if (t) {
                if (removedBase.indexOf(t.baseTexture) == -1) {
                    t.baseTexture.destroy();
                    removedBase.push(t.baseTexture);
                }
                t.destroy();
            }
            delete textureHash[arr[i]];
        }
    }
    RES.destroyGroup = destroyGroup;
    function destroyRES() {
    }
})(RES = exports.RES || (exports.RES = {}));


/***/ }),

/***/ "./module/ctrls/index.ts":
/*!*******************************!*\
  !*** ./module/ctrls/index.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroyAllCtrls = exports.removeTweens = exports.clearWait = exports.wait = exports.showAlert = exports.getCurrentScene = exports.changeScene = exports.closeCurrentPanel = exports.closeAllPanels = exports.showConfirm = exports.showPanel = void 0;
var waitingCtrl_1 = __webpack_require__(/*! ./waitingCtrl */ "./module/ctrls/waitingCtrl.ts");
var panelCtrl_1 = __webpack_require__(/*! ./panelCtrl */ "./module/ctrls/panelCtrl.ts");
var sceneCtrl_1 = __webpack_require__(/*! ./sceneCtrl */ "./module/ctrls/sceneCtrl.ts");
var toastCtrl_1 = __webpack_require__(/*! ./toastCtrl */ "./module/ctrls/toastCtrl.ts");
var toastCtrl_2 = __webpack_require__(/*! ./toastCtrl */ "./module/ctrls/toastCtrl.ts");
Object.defineProperty(exports, "showToast", { enumerable: true, get: function () { return toastCtrl_2.showToast; } });
__exportStar(__webpack_require__(/*! ./waitingCtrl */ "./module/ctrls/waitingCtrl.ts"), exports);
exports.showPanel = function (panel, data) {
    return panelCtrl_1.default.instance.show(panel, data);
};
exports.showConfirm = function (panel, data) {
    var confirmPanel = panelCtrl_1.default.instance.show(panel, data);
    return confirmPanel.makePromise();
};
exports.closeAllPanels = function () {
    panelCtrl_1.default.instance.closeAll();
};
exports.closeCurrentPanel = function () {
    panelCtrl_1.default.instance.closeCurrent();
};
exports.changeScene = function (scene, data) {
    sceneCtrl_1.default.instance.change(scene, data);
};
function getCurrentScene() {
    return sceneCtrl_1.default.instance.currentScene;
}
exports.getCurrentScene = getCurrentScene;
exports.showAlert = function (title, content) {
    if (my) {
        my.alert({
            title: title || "",
            content: content || ""
        });
    }
    else {
        console.log(title, content);
    }
};
function wait(callback, time) {
    var obj = {};
    FYGE.Tween.get(obj)
        .wait(time)
        .call(callback);
    return obj;
}
exports.wait = wait;
function clearWait(obj) {
    obj && FYGE.Tween.removeTweens(obj);
}
exports.clearWait = clearWait;
function removeTweens(obj, isRecursive) {
    if (isRecursive === void 0) { isRecursive = true; }
    if (!obj)
        return;
    FYGE.Tween.removeTweens(obj);
    if (!isRecursive || !obj.children || !obj.children.length)
        return;
    obj.children.forEach(function (child) {
        removeTweens(child);
    });
}
exports.removeTweens = removeTweens;
function destroyAllCtrls() {
    toastCtrl_1.destroyToast();
    waitingCtrl_1.destroyWaiting();
    panelCtrl_1.default.instance.destroy();
    sceneCtrl_1.default.instance.destroy();
}
exports.destroyAllCtrls = destroyAllCtrls;


/***/ }),

/***/ "./module/ctrls/panelCtrl.ts":
/*!***********************************!*\
  !*** ./module/ctrls/panelCtrl.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var layers_1 = __webpack_require__(/*! ../views/layers */ "./module/views/layers.ts");
var waitingCtrl_1 = __webpack_require__(/*! ./waitingCtrl */ "./module/ctrls/waitingCtrl.ts");
var toastCtrl_1 = __webpack_require__(/*! ./toastCtrl */ "./module/ctrls/toastCtrl.ts");
var PanelCtrl = (function () {
    function PanelCtrl() {
        this.stacks = [];
    }
    Object.defineProperty(PanelCtrl, "instance", {
        get: function () {
            return PanelCtrl._instance || (PanelCtrl._instance = new PanelCtrl());
        },
        enumerable: false,
        configurable: true
    });
    PanelCtrl.prototype.init = function (parent) {
        this._parent = parent;
        var bg = new FYGE.Shape();
        bg.beginFill(0);
        bg.drawRect(layers_1.layers.stageOffsetX - parent.x, layers_1.layers.stageOffsetY - parent.y, layers_1.layers.stageWidth, layers_1.layers.stageHeight);
        bg.endFill();
        bg.hitTestByPixel = false;
        bg.visible = false;
        this._parent.addChild(bg);
        this._bg = bg;
    };
    PanelCtrl.prototype.closeAll = function () {
        this.stacks.forEach(function (e) { return e.hidePanel(); });
    };
    PanelCtrl.prototype.show = function (cls, data) {
        var _this = this;
        waitingCtrl_1.showWaiting();
        var panel = new cls(data);
        this.add(panel);
        this.stacks.push(panel);
        panel.onLoaded = function () {
            waitingCtrl_1.hideWaiting();
            _this.updateView(false);
            panel.start(data);
            if (panel.visible)
                panel.showAni();
        };
        panel.onLoadError = function () {
            waitingCtrl_1.hideWaiting();
            toastCtrl_1.showToast("资源加载失败");
            panel.removeEventListener('onDestroy', _this.onPanelHide, _this);
            _this.remove(panel);
        };
        return panel;
    };
    PanelCtrl.prototype.updateView = function (showPanelAni) {
        var _this = this;
        if (showPanelAni === void 0) { showPanelAni = true; }
        console.info('当前弹窗个数：', this.stacks.length);
        if (!this.stacks.length) {
            console.info(this._bg.visible);
            if (this._bg.visible) {
                this.bgAni = "hide";
                FYGE.Tween.removeTweens(this._bg);
                FYGE.Tween.get(this._bg)
                    .to({ alpha: 0 }, 200, FYGE.Ease.cubicOut)
                    .call(function () {
                    _this._bg.visible = false;
                    _this._current = null;
                    _this._parent.visible = false;
                });
            }
        }
        else {
            this._parent.visible = true;
            if (this.bgAni == "hide") {
                this.bgAni = "show";
                FYGE.Tween.removeTweens(this._bg);
                this._bg.alpha = 0.7;
            }
            if (this._bg.visible === false) {
                this._bg.visible = true;
                this._bg.alpha = 0;
                FYGE.Tween.get(this._bg).to({ alpha: 0.7 }, 200, FYGE.Ease.cubicOut);
            }
        }
        for (var i = 0; i < this.stacks.length; i++) {
            if (i < this.stacks.length - 1) {
                this.stacks[i].visible = false;
            }
            else {
                this.stacks[i].visible = true;
                if (showPanelAni)
                    this.stacks[i].showAni();
                this._current = this.stacks[i];
            }
        }
    };
    PanelCtrl.prototype.add = function (panel) {
        this._parent.addChild(panel);
        panel.addEventListener('onDestroy', this.onPanelHide, this);
    };
    PanelCtrl.prototype.remove = function (panel) {
        this._parent.removeChild(panel);
        this.stacks = this.stacks.filter(function (e) { return e != panel; });
    };
    PanelCtrl.prototype.onPanelHide = function (e) {
        var panel = e.target;
        panel.removeEventListener('onDestroy', this.onPanelHide, this);
        this.remove(panel);
        this.updateView();
    };
    PanelCtrl.prototype.closeCurrent = function () {
        if (this._current) {
            this._current.hidePanel();
        }
    };
    PanelCtrl.prototype.destroy = function () {
        PanelCtrl._instance = null;
        this.stacks = null;
        this._current = null;
        this._parent = null;
        FYGE.Tween.removeTweens(this._bg);
        this._bg = null;
    };
    return PanelCtrl;
}());
exports.default = PanelCtrl;


/***/ }),

/***/ "./module/ctrls/sceneCtrl.ts":
/*!***********************************!*\
  !*** ./module/ctrls/sceneCtrl.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var waitingCtrl_1 = __webpack_require__(/*! ./waitingCtrl */ "./module/ctrls/waitingCtrl.ts");
var toastCtrl_1 = __webpack_require__(/*! ./toastCtrl */ "./module/ctrls/toastCtrl.ts");
var SceneCtrl = (function () {
    function SceneCtrl() {
    }
    Object.defineProperty(SceneCtrl, "instance", {
        get: function () {
            return SceneCtrl._instance || (SceneCtrl._instance = new SceneCtrl());
        },
        enumerable: false,
        configurable: true
    });
    SceneCtrl.prototype.init = function (parent) {
        this._parent = parent;
    };
    SceneCtrl.prototype.change = function (cls, data) {
        var _this = this;
        var scene = new cls(data);
        scene.visible = false;
        waitingCtrl_1.showWaiting();
        var preScene = this._currentScene;
        scene.onLoaded = function () {
            waitingCtrl_1.hideWaiting();
            scene.showAni(function () {
                if (preScene)
                    preScene.destroy();
            });
            scene.visible = true;
            scene.start(data);
        };
        scene.onLoadError = function () {
            waitingCtrl_1.hideWaiting();
            toastCtrl_1.showToast("资源加载失败");
            _this._currentScene = preScene || null;
            _this._parent.removeChild(scene);
        };
        this._currentScene = scene;
        this._parent.addChild(scene);
    };
    Object.defineProperty(SceneCtrl.prototype, "currentScene", {
        get: function () {
            return this._currentScene;
        },
        enumerable: false,
        configurable: true
    });
    SceneCtrl.prototype.destroy = function () {
        SceneCtrl._instance = null;
        this._currentScene = null;
        this._parent = null;
    };
    return SceneCtrl;
}());
exports.default = SceneCtrl;


/***/ }),

/***/ "./module/ctrls/toastCtrl.ts":
/*!***********************************!*\
  !*** ./module/ctrls/toastCtrl.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroyToast = exports.showToast = void 0;
var layers_1 = __webpack_require__(/*! ../views/layers */ "./module/views/layers.ts");
var RES_1 = __webpack_require__(/*! ../RES */ "./module/RES.ts");
var inited = false;
var _toast;
var _parent;
var startY;
var endY;
var initToast = function () {
    if (!inited) {
        inited = true;
        _toast = new Toast();
        _parent = layers_1.layers.toastLayer;
        _toast.alpha = 0;
        _toast.x = layers_1.layers.stageOffsetX - _parent.x + (layers_1.layers.stageWidth - _toast.width) / 2;
        var h = _toast.height;
        var y = layers_1.layers.stageOffsetY - _parent.y;
        startY = y - h;
        endY = y + (layers_1.layers.stageHeight - h) / 2;
    }
};
exports.showToast = function (msg) {
    initToast();
    _toast.show(msg);
    _parent.addChild(_toast);
    FYGE.Tween.removeTweens(_toast);
    FYGE.Tween.get(_toast)
        .set({ y: startY, alpha: 1 })
        .to({ y: endY }, 500, FYGE.Ease.quartOut)
        .wait(800)
        .to({ alpha: 0 }, 300)
        .call(function () {
        _parent.removeChild(_toast);
    });
};
exports.destroyToast = function () {
    if (inited && _toast && !_toast.destroyed) {
        _toast.destroy();
        _toast = null;
        _parent = null;
        inited = false;
    }
};
var Toast = (function (_super) {
    __extends(Toast, _super);
    function Toast() {
        var _this = _super.call(this) || this;
        _this.PADDING = 40;
        _this.mouseChildren = false;
        _this.mouseEnable = false;
        var toastBgTexture = RES_1.RES.getRes("toastBg.png");
        _this.bg = new FYGE.Sprite(toastBgTexture);
        _this.addChild(_this.bg);
        _this.msg = new FYGE.TextField();
        _this.msg.size = 28;
        _this.msg.fillColor = "0xffffff";
        _this.msg.text = "";
        _this.msg.verticalAlign = FYGE.VERTICAL_ALIGN.MIDDLE;
        _this.msg.textHeight = toastBgTexture.height;
        _this.msg.textAlign = FYGE.TEXT_ALIGN.CENTER;
        _this.addChild(_this.msg);
        return _this;
    }
    Toast.prototype.show = function (msg) {
        this.msg.text = msg;
        this.msg.x = (this.bg.width - this.msg.textWidth) / 2;
    };
    Toast.prototype.destroy = function () {
        FYGE.Tween.removeTweens(this);
        _super.prototype.destroy.call(this);
        this.msg = null;
        this.bg = null;
    };
    return Toast;
}(FYGE.Container));


/***/ }),

/***/ "./module/ctrls/waitingCtrl.ts":
/*!*************************************!*\
  !*** ./module/ctrls/waitingCtrl.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroyWaiting = exports.hideWaiting = exports.showWaiting = void 0;
var RES_1 = __webpack_require__(/*! ../RES */ "./module/RES.ts");
var layers_1 = __webpack_require__(/*! ../views/layers */ "./module/views/layers.ts");
var inited = false;
var _waiting;
var _parent;
var initWaiting = function () {
    if (!inited) {
        inited = true;
        var waiting = new Waiting();
        _parent = layers_1.layers.topLayer;
        _waiting = waiting;
        var offX = (layers_1.layers.stageWidth - 160) / 2;
        var offY = (layers_1.layers.stageHeight - _waiting.height) / 2;
        _waiting.x = layers_1.layers.stageOffsetX - _parent.x + offX;
        _waiting.y = layers_1.layers.stageOffsetY - _parent.y + offY;
        var bg = new FYGE.Graphics()
            .beginFill(0x000000)
            .drawRect(-offX, -offY, layers_1.layers.stageWidth, layers_1.layers.stageHeight)
            .endFill();
        bg.alpha = 0;
        _waiting.addChildAt(bg, 0);
    }
};
var customLoadingClose;
exports.showWaiting = function (msg) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        initWaiting();
        _waiting.show(msg);
        _parent.addChild(_waiting);
        return [2];
    });
}); };
exports.hideWaiting = function () {
    _parent.removeChild(_waiting);
};
exports.destroyWaiting = function () {
    if (inited && _waiting && !_waiting.destroyed) {
        _waiting.destroy();
        _waiting = null;
        _parent = null;
        inited = false;
    }
};
var Waiting = (function (_super) {
    __extends(Waiting, _super);
    function Waiting() {
        var _this = _super.call(this) || this;
        var rectBgTexture = RES_1.RES.getRes("waitingBg.png");
        var rectBg = new FYGE.Sprite(rectBgTexture);
        _this.addChild(rectBg);
        var rotTexture = RES_1.RES.getRes("waitingRot.png");
        var rot = new FYGE.Sprite(rotTexture);
        rot.x = (rectBgTexture.width - rotTexture.width) / 2;
        rot.y = 47;
        rot.anchorX = rotTexture.width / 2;
        rot.anchorY = rotTexture.height / 2;
        _this.addChild(rot);
        var count = 0;
        rot.addEventListener(FYGE.Event.ENTER_FRAME, function () {
            count++;
            if (count % 30 == 0)
                rot.rotation += 45;
        }, _this);
        _this.msg = new FYGE.TextField();
        _this.msg.y = 125;
        _this.msg.textWidth = rectBgTexture.width;
        _this.msg.textAlign = FYGE.TEXT_ALIGN.CENTER;
        _this.msg.size = 26;
        _this.msg.fillColor = "#ffffff";
        _this.addChild(_this.msg);
        return _this;
    }
    Waiting.prototype.show = function (msg) {
        if (msg === void 0) { msg = "加载中"; }
        this.msg.text = msg;
    };
    Waiting.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.msg = null;
    };
    return Waiting;
}(FYGE.Container));


/***/ }),

/***/ "./module/tools/GPool.ts":
/*!*******************************!*\
  !*** ./module/tools/GPool.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.GPool = void 0;
var GPool = (function () {
    function GPool() {
    }
    GPool.takeOut = function (name) {
        if (this.pool[name] && this.pool[name].length) {
            return this.pool[name].shift();
        }
        return null;
    };
    GPool.takeIn = function (name, obj) {
        (this.pool[name] || (this.pool[name] = [])).push(obj);
    };
    GPool.recover = function (name, obj) {
        if (!this.pool[name]) {
            this.pool[name] = [];
        }
        this.pool[name].push(obj);
    };
    GPool.pool = {};
    return GPool;
}());
exports.GPool = GPool;


/***/ }),

/***/ "./module/views/Module.ts":
/*!********************************!*\
  !*** ./module/views/Module.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = void 0;
var RES_1 = __webpack_require__(/*! ../RES */ "./module/RES.ts");
var ctrls_1 = __webpack_require__(/*! ../ctrls */ "./module/ctrls/index.ts");
var Module = (function (_super) {
    __extends(Module, _super);
    function Module(data) {
        var _this = _super.call(this) || this;
        _this.data = data;
        _this.init();
        return _this;
    }
    Module.prototype.init = function () {
        var _this = this;
        this.preLoadRes().then(function () {
            if (_this.skinName)
                RES_1.RES.initSkinDisplay(_this, _this.skinName, _this);
            _this.initUi();
            _this.onLoaded && _this.onLoaded();
        }, function () {
            _this.onLoadError && _this.onLoadError();
        });
    };
    Module.prototype.preLoadRes = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.groupNames && _this.groupNames.length) {
                var arr = [];
                for (var i = 0; i < _this.groupNames.length; i++) {
                    arr.push(RES_1.RES.loadGroup(_this.groupNames[i]));
                }
                Promise.all(arr).then(resolve, reject);
            }
            else {
                resolve();
            }
        });
    };
    Module.prototype.initUi = function () {
    };
    Object.defineProperty(Module.prototype, "groupNames", {
        get: function () { return null; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Module.prototype, "skinName", {
        get: function () { return null; },
        enumerable: false,
        configurable: true
    });
    ;
    Module.prototype.start = function (data) {
        this.initEvents();
    };
    Module.prototype.initEvents = function () {
    };
    Module.prototype.removeEvents = function () {
    };
    Module.prototype.enableMouseEvt = function (enable) {
        this.mouseEnable = enable;
        this.mouseChildren = enable;
    };
    Module.prototype.btnDelay = function (target, delay) {
        if (delay === void 0) { delay = 2000; }
        target.mouseEnable = false;
        target.mouseChildren = false;
        setTimeout(function () {
            target.mouseEnable = true;
            target.mouseChildren = true;
        }, delay);
    };
    Module.prototype.destroy = function () {
        ctrls_1.removeTweens(this);
        this.removeEvents();
        this.dispatchEvent("onDestroy");
        _super.prototype.destroy.call(this);
    };
    return Module;
}(FYGE.Container));
exports.Module = Module;


/***/ }),

/***/ "./module/views/Scene.ts":
/*!*******************************!*\
  !*** ./module/views/Scene.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene = void 0;
var Module_1 = __webpack_require__(/*! ./Module */ "./module/views/Module.ts");
var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Scene.prototype.showAni = function (callback) {
        callback();
    };
    Scene.prototype.updateScene = function () {
    };
    return Scene;
}(Module_1.Module));
exports.Scene = Scene;


/***/ }),

/***/ "./module/views/layers.ts":
/*!********************************!*\
  !*** ./module/views/layers.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroyLayers = exports.layers = void 0;
var panelCtrl_1 = __webpack_require__(/*! ../ctrls/panelCtrl */ "./module/ctrls/panelCtrl.ts");
var sceneCtrl_1 = __webpack_require__(/*! ../ctrls/sceneCtrl */ "./module/ctrls/sceneCtrl.ts");
var Layers = (function (_super) {
    __extends(Layers, _super);
    function Layers() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._adaptH = 0;
        return _this;
    }
    Object.defineProperty(Layers.prototype, "adaptH", {
        get: function () {
            return this._adaptH;
        },
        enumerable: false,
        configurable: true
    });
    Layers.prototype.init = function (stage) {
        stage.addChild(this);
        var arr = [
            "_bottomLayer",
            "_sceneLayer",
            "_popupLayer",
            "_toastLayer",
            "_topLayer",
            "_shareLayer"
        ];
        for (var i = 0; i < arr.length; i++) {
            this[arr[i]] = new FYGE.Container();
            this.addChild(this[arr[i]]);
        }
        this.shareLayer.y = -this.stageOffsetY;
        sceneCtrl_1.default.instance.init(this.sceneLayer);
        panelCtrl_1.default.instance.init(this.popupLayer);
        this._adaptH = 211 - (this.stageOffsetY / 211) * 211 + this.stageOffsetY;
    };
    Object.defineProperty(Layers.prototype, "bottomLayer", {
        get: function () { return this._bottomLayer; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Layers.prototype, "sceneLayer", {
        get: function () { return this._sceneLayer; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Layers.prototype, "popupLayer", {
        get: function () { return this._popupLayer; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Layers.prototype, "toastLayer", {
        get: function () { return this._toastLayer; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Layers.prototype, "topLayer", {
        get: function () { return this._topLayer; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Layers.prototype, "shareLayer", {
        get: function () { return this._shareLayer; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Layers.prototype, "stageHeight", {
        get: function () {
            if (!this.stage)
                return 0;
            return this.stage.viewRect.height;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Layers.prototype, "stageWidth", {
        get: function () {
            if (!this.stage)
                return 0;
            return this.stage.viewRect.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Layers.prototype, "stageOffsetX", {
        get: function () {
            if (!this.stage)
                return 0;
            return this.stage.viewRect.x;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Layers.prototype, "stageOffsetY", {
        get: function () {
            if (!this.stage)
                return 0;
            return this.stage.viewRect.y;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Layers.prototype, "stageCenterX", {
        get: function () {
            return this.stage.viewRect.x + this.stage.viewRect.width / 2;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Layers.prototype, "stageCenterY", {
        get: function () {
            return this.stage.viewRect.y + this.stage.viewRect.height / 2;
        },
        enumerable: false,
        configurable: true
    });
    return Layers;
}(FYGE.Container));
exports.layers = new Layers();
function destroyLayers() {
    exports.layers.removeChildren();
    if (exports.layers.parent)
        exports.layers.parent.removeChild(exports.layers);
}
exports.destroyLayers = destroyLayers;


/***/ }),

/***/ "./src/Clock.ts":
/*!**********************!*\
  !*** ./src/Clock.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Clock = (function () {
    function Clock(autoStart) {
        if (autoStart === void 0) { autoStart = true; }
        this.autoStart = autoStart;
        this.startTime = 0;
        this.oldTime = 0;
        this.elapsedTime = 0;
        this.running = false;
    }
    Clock.prototype.start = function () {
        this.startTime = (typeof performance === 'undefined' ? Date : performance).now();
        this.oldTime = this.startTime;
        this.running = true;
    };
    Clock.prototype.stop = function () {
        this.running = false;
        this.autoStart = false;
        return this.getElapsedTime();
    };
    Clock.prototype.st = function () {
        this.running = false;
    };
    Clock.prototype.reset = function () {
        this.elapsedTime = 0;
    };
    Clock.prototype.getElapsedTime = function () {
        return this.elapsedTime;
    };
    Clock.prototype.getDelta = function () {
        var diff = 0;
        if (this.autoStart && !this.running) {
            this.start();
            return 0;
        }
        if (this.running) {
            var newTime = (typeof performance === 'undefined' ? Date : performance).now();
            diff = (newTime - this.oldTime) / 1000;
            this.oldTime = newTime;
            this.elapsedTime += diff;
        }
        return diff;
    };
    return Clock;
}());
exports.default = Clock;


/***/ }),

/***/ "./src/Main.ts":
/*!*********************!*\
  !*** ./src/Main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = exports.GDispatcher = void 0;
var layers_1 = __webpack_require__(/*! ../module/views/layers */ "./module/views/layers.ts");
var RES_1 = __webpack_require__(/*! ../module/RES */ "./module/RES.ts");
var ctrls_1 = __webpack_require__(/*! ../module/ctrls */ "./module/ctrls/index.ts");
var ResJson_1 = __webpack_require__(/*! ./ResJson */ "./src/ResJson.ts");
var TaoBaoNet_1 = __webpack_require__(/*! ./TaoBaoNet */ "./src/TaoBaoNet.ts");
var SkinJson_1 = __webpack_require__(/*! ./SkinJson */ "./src/SkinJson.ts");
var G_EVENT_1 = __webpack_require__(/*! ./common/G_EVENT */ "./src/common/G_EVENT.ts");
var Tools_1 = __webpack_require__(/*! ./Tools */ "./src/Tools.ts");
var IndexScene_1 = __webpack_require__(/*! ./scenes/IndexScene */ "./src/scenes/IndexScene.ts");
exports.GDispatcher = new FYGE.EventDispatcher();
var Main = (function () {
    function Main(canvas, PAGE) {
        PAGE && (Tools_1.Tools.PAGE = PAGE);
        var sysInfo;
        if (!window) {
            FYGE.initedByCanvas(canvas);
            sysInfo = my.getSystemInfoSync();
        }
        var stage = new FYGE.Stage(canvas, 750, 1624, sysInfo && sysInfo.windowWidth || document.body.clientWidth, sysInfo && sysInfo.windowHeight || document.body.clientHeight, FYGE.RENDERER_TYPE.WEBGL, true);
        this.stage = stage;
        this.canvas = canvas;
        stage.addEventListener(FYGE.Event.INIT_STAGE, this.onAddToStage, this);
        var self = this;
        loop();
        function loop() {
            if (!self._pause) {
                FYGE.Tween.flush();
                stage.flush();
            }
            FYGE.getEnv() == "tb" ? self.requestID = canvas.requestAnimationFrame(loop) :
                self.requestID = window.requestAnimationFrame(loop);
        }
    }
    Main.prototype.run = function () {
        this._pause = false;
        FYGE.Tween._lastTime = null;
        exports.GDispatcher.dispatchEvent({ type: G_EVENT_1.G_EVENT.ON_SHOW });
    };
    Main.prototype.pause = function () {
        exports.GDispatcher.dispatchEvent({ type: G_EVENT_1.G_EVENT.ON_HIDE });
    };
    Main.prototype.addGlobalEvent = function (name, fun, thisObj, once) {
        if (once === void 0) { once = false; }
        if (once) {
            exports.GDispatcher.once(name, fun, thisObj);
        }
        else {
            exports.GDispatcher.addEventListener(name, fun, thisObj);
        }
    };
    Main.prototype.dispatchGlobalEvent = function (name, data) {
        exports.GDispatcher.dispatchEvent(name, data);
    };
    Main.prototype.removeGlobalEvent = function (name, fun, thisObj) {
        exports.GDispatcher.removeEventListener(name, fun, thisObj);
    };
    Main.prototype.destroy = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                FYGE.Tween.removeAllTweens();
                FYGE.getEnv() == "tb" ? this.canvas.cancelAnimationFrame(this.requestID) :
                    window.cancelAnimationFrame(this.requestID);
                layers_1.destroyLayers();
                ctrls_1.destroyAllCtrls();
                exports.GDispatcher.removeAllEventListener();
                TaoBaoNet_1.destroyTbNetData();
                return [2];
            });
        });
    };
    Main.prototype.onAddToStage = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        layers_1.layers.init(this.stage);
                        console.log("初始化层级完成");
                        RES_1.RES.loadConfig(ResJson_1.ResJson);
                        console.log("初始化资源配置完成");
                        RES_1.RES.loadSkinConfig(SkinJson_1.SkinJson);
                        console.log("初始化皮肤配置完成");
                        return [4, RES_1.RES.loadGroup('excellent_icon')];
                    case 1:
                        _a.sent();
                        return [4, RES_1.RES.loadGroup("common")];
                    case 2:
                        _a.sent();
                        console.log("通用资源加载完成");
                        if (FYGE.getEnv() == "web" && document.getElementById("__loading__"))
                            document.getElementById("__loading__").style.display = "none";
                        console.log('getGlobalData');
                        return [4, Tools_1.Tools.getGlobalData()];
                    case 3:
                        _a.sent();
                        ctrls_1.changeScene(IndexScene_1.default);
                        return [2];
                }
            });
        });
    };
    return Main;
}());
exports.Main = Main;
if (!String.prototype.repeat) {
    String.prototype.repeat = function (count) {
        var str = '' + this;
        count = (count >> 0);
        var t = (count > 1 ? this.repeat(str, count / 2) : '');
        return t + (count % 2 ? t + str : t);
    };
}


/***/ }),

/***/ "./src/ResJson.ts":
/*!************************!*\
  !*** ./src/ResJson.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ResJson = void 0;
exports.ResJson = {
    "groups": [
        {
            "keys": "0.png,1.png,2.png,3.png,4.png,5.png,6.png,7.png,8.png,9.png,back.png,bellSprit.png,boomSprit.png,count-down-back.png,music-off.png,music-on.png,orangeSprit.png,preCountDown1.png,preCountDown2.png,preCountDown3.png,preCountDownGo.png,robotGamer.png,score-board-back.png,step1.png,step2.png,step3.png,step4.png",
            "name": "GameScene",
            "atlas": {
                "back.png": {
                    "x": 2,
                    "y": 2,
                    "w": 750,
                    "h": 1624,
                    "ox": 0,
                    "oy": 0,
                    "sw": 750,
                    "sh": 1624,
                    "ro": false
                },
                "step1.png": {
                    "x": 754,
                    "y": 2,
                    "w": 750,
                    "h": 1624,
                    "ox": 0,
                    "oy": 0,
                    "sw": 750,
                    "sh": 1624,
                    "ro": false
                },
                "step2.png": {
                    "x": 1506,
                    "y": 2,
                    "w": 750,
                    "h": 1624,
                    "ox": 0,
                    "oy": 0,
                    "sw": 750,
                    "sh": 1624,
                    "ro": false
                },
                "step3.png": {
                    "x": 2,
                    "y": 1628,
                    "w": 750,
                    "h": 1624,
                    "ox": 0,
                    "oy": 0,
                    "sw": 750,
                    "sh": 1624,
                    "ro": true
                },
                "step4.png": {
                    "x": 2258,
                    "y": 2,
                    "w": 750,
                    "h": 1624,
                    "ox": 0,
                    "oy": 0,
                    "sw": 750,
                    "sh": 1624,
                    "ro": false
                },
                "preCountDownGo.png": {
                    "x": 1628,
                    "y": 1628,
                    "w": 403,
                    "h": 242,
                    "ox": 0,
                    "oy": 0,
                    "sw": 403,
                    "sh": 242,
                    "ro": true
                },
                "robotGamer.png": {
                    "x": 1628,
                    "y": 2033,
                    "w": 194,
                    "h": 353,
                    "ox": 0,
                    "oy": 0,
                    "sw": 194,
                    "sh": 353,
                    "ro": true
                },
                "preCountDown3.png": {
                    "x": 1872,
                    "y": 1628,
                    "w": 175,
                    "h": 238,
                    "ox": 0,
                    "oy": 0,
                    "sw": 175,
                    "sh": 238,
                    "ro": false
                },
                "preCountDown2.png": {
                    "x": 1983,
                    "y": 1868,
                    "w": 176,
                    "h": 235,
                    "ox": 0,
                    "oy": 0,
                    "sw": 176,
                    "sh": 235,
                    "ro": false
                },
                "preCountDown1.png": {
                    "x": 2049,
                    "y": 1628,
                    "w": 164,
                    "h": 231,
                    "ox": 0,
                    "oy": 0,
                    "sw": 164,
                    "sh": 231,
                    "ro": false
                },
                "score-board-back.png": {
                    "x": 1983,
                    "y": 2105,
                    "w": 229,
                    "h": 58,
                    "ox": 0,
                    "oy": 0,
                    "sw": 229,
                    "sh": 58,
                    "ro": true
                },
                "count-down-back.png": {
                    "x": 2043,
                    "y": 2105,
                    "w": 208,
                    "h": 58,
                    "ox": 0,
                    "oy": 0,
                    "sw": 208,
                    "sh": 58,
                    "ro": true
                },
                "boomSprit.png": {
                    "x": 1872,
                    "y": 1868,
                    "w": 71,
                    "h": 89,
                    "ox": 0,
                    "oy": 0,
                    "sw": 71,
                    "sh": 89,
                    "ro": true
                },
                "bellSprit.png": {
                    "x": 1872,
                    "y": 1941,
                    "w": 78,
                    "h": 85,
                    "ox": 0,
                    "oy": 0,
                    "sw": 78,
                    "sh": 85,
                    "ro": false
                },
                "orangeSprit.png": {
                    "x": 1628,
                    "y": 2229,
                    "w": 83,
                    "h": 79,
                    "ox": 0,
                    "oy": 0,
                    "sw": 83,
                    "sh": 79,
                    "ro": true
                },
                "music-off.png": {
                    "x": 2043,
                    "y": 2315,
                    "w": 52,
                    "h": 52,
                    "ox": 0,
                    "oy": 0,
                    "sw": 52,
                    "sh": 52,
                    "ro": false
                },
                "music-on.png": {
                    "x": 2097,
                    "y": 2315,
                    "w": 52,
                    "h": 52,
                    "ox": 0,
                    "oy": 0,
                    "sw": 52,
                    "sh": 52,
                    "ro": false
                },
                "0.png": {
                    "x": 1963,
                    "y": 1868,
                    "w": 15,
                    "h": 23,
                    "ox": 0,
                    "oy": 0,
                    "sw": 15,
                    "sh": 23,
                    "ro": false
                },
                "3.png": {
                    "x": 1963,
                    "y": 1893,
                    "w": 15,
                    "h": 23,
                    "ox": 0,
                    "oy": 0,
                    "sw": 15,
                    "sh": 23,
                    "ro": false
                },
                "5.png": {
                    "x": 1963,
                    "y": 1918,
                    "w": 15,
                    "h": 23,
                    "ox": 0,
                    "oy": 0,
                    "sw": 15,
                    "sh": 23,
                    "ro": false
                },
                "6.png": {
                    "x": 1952,
                    "y": 1943,
                    "w": 14,
                    "h": 23,
                    "ox": 0,
                    "oy": 0,
                    "sw": 14,
                    "sh": 23,
                    "ro": true
                },
                "8.png": {
                    "x": 1952,
                    "y": 1959,
                    "w": 15,
                    "h": 23,
                    "ox": 0,
                    "oy": 0,
                    "sw": 15,
                    "sh": 23,
                    "ro": true
                },
                "9.png": {
                    "x": 1952,
                    "y": 1976,
                    "w": 15,
                    "h": 23,
                    "ox": 0,
                    "oy": 0,
                    "sw": 15,
                    "sh": 23,
                    "ro": true
                },
                "1.png": {
                    "x": 1952,
                    "y": 1993,
                    "w": 13,
                    "h": 22,
                    "ox": 0,
                    "oy": 0,
                    "sw": 13,
                    "sh": 22,
                    "ro": true
                },
                "2.png": {
                    "x": 1952,
                    "y": 2008,
                    "w": 15,
                    "h": 22,
                    "ox": 0,
                    "oy": 0,
                    "sw": 15,
                    "sh": 22,
                    "ro": false
                },
                "4.png": {
                    "x": 1628,
                    "y": 2336,
                    "w": 16,
                    "h": 22,
                    "ox": 0,
                    "oy": 0,
                    "sw": 16,
                    "sh": 22,
                    "ro": false
                },
                "7.png": {
                    "x": 1628,
                    "y": 2360,
                    "w": 14,
                    "h": 22,
                    "ox": 0,
                    "oy": 0,
                    "sw": 14,
                    "sh": 22,
                    "ro": true
                }
            }
        },
        {
            "keys": "comCloseBtn.png,com_light.png,ruready.png,toastBg.png,waitingBg.png,waitingRot.png",
            "name": "common",
            "atlas": {
                "com_light.png": {
                    "x": 2,
                    "y": 2,
                    "w": 746,
                    "h": 756,
                    "ox": 0,
                    "oy": 0,
                    "sw": 746,
                    "sh": 756,
                    "ro": false
                },
                "toastBg.png": {
                    "x": 750,
                    "y": 2,
                    "w": 460,
                    "h": 130,
                    "ox": 0,
                    "oy": 0,
                    "sw": 460,
                    "sh": 130,
                    "ro": true
                },
                "waitingBg.png": {
                    "x": 2,
                    "y": 760,
                    "w": 160,
                    "h": 180,
                    "ox": 0,
                    "oy": 0,
                    "sw": 160,
                    "sh": 180,
                    "ro": true
                },
                "ruready.png": {
                    "x": 184,
                    "y": 760,
                    "w": 156,
                    "h": 38,
                    "ox": 0,
                    "oy": 0,
                    "sw": 156,
                    "sh": 38,
                    "ro": true
                },
                "comCloseBtn.png": {
                    "x": 750,
                    "y": 464,
                    "w": 72,
                    "h": 72,
                    "ox": 0,
                    "oy": 0,
                    "sw": 72,
                    "sh": 72,
                    "ro": false
                },
                "waitingRot.png": {
                    "x": 824,
                    "y": 464,
                    "w": 56,
                    "h": 56,
                    "ox": 0,
                    "oy": 0,
                    "sw": 56,
                    "sh": 56,
                    "ro": false
                }
            }
        }
    ],
    "path": "https://yun.duiba.com.cn/db_games/activity/template/1646366679/resource/"
};


/***/ }),

/***/ "./src/SkinJson.ts":
/*!*************************!*\
  !*** ./src/SkinJson.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SkinJson = void 0;
exports.SkinJson = {
    "x": 0,
    "y": 0,
    "type": "container",
    "children": [
        {
            "name": "LotPrizePanel",
            "x": 0,
            "y": 0,
            "type": "container",
            "children": [
                {
                    "name": "锦鲤中奖弹框背景",
                    "x": 73,
                    "y": 286,
                    "type": "sprite",
                    "props": {
                        "source": "锦鲤中奖弹框背景.png"
                    }
                },
                {
                    "name": "预置奖品图",
                    "x": 245,
                    "y": 599,
                    "type": "sprite",
                    "props": {
                        "source": "预置奖品图.png"
                    },
                    "id": "img"
                },
                {
                    "name": "关闭按钮",
                    "x": 352,
                    "y": 1131,
                    "type": "button",
                    "props": {
                        "tUp": "关闭按钮.png"
                    },
                    "id": "closeBtn"
                },
                {
                    "name": "知道啦",
                    "x": 225,
                    "y": 939,
                    "type": "button",
                    "props": {
                        "tUp": "知道啦.png"
                    },
                    "id": "knowBtn"
                }
            ]
        },
        {
            "name": "LotNoPrizePanel",
            "x": 0,
            "y": 0,
            "type": "container",
            "children": [
                {
                    "name": "锦鲤未中奖弹框背景",
                    "x": 112,
                    "y": 449,
                    "type": "sprite",
                    "props": {
                        "source": "锦鲤未中奖弹框背景.png"
                    }
                },
                {
                    "name": "关闭按钮",
                    "x": 352,
                    "y": 1062,
                    "type": "button",
                    "props": {
                        "tUp": "关闭按钮.png"
                    },
                    "id": "closeBtn"
                },
                {
                    "name": "知道啦",
                    "x": 225,
                    "y": 849,
                    "type": "button",
                    "props": {
                        "tUp": "知道啦.png"
                    },
                    "id": "knowBtn"
                }
            ]
        },
        {
            "name": "LotPanel",
            "x": 0,
            "y": 0,
            "type": "container",
            "children": [
                {
                    "name": "抽奖弹框背景",
                    "x": 73,
                    "y": 286,
                    "type": "sprite",
                    "props": {
                        "source": "抽奖弹框背景.png"
                    }
                },
                {
                    "name": "立即抽奖",
                    "x": 200,
                    "y": 918,
                    "type": "button",
                    "props": {
                        "tUp": "立即抽奖.png"
                    },
                    "id": "lotBtn"
                },
                {
                    "name": "预置奖品图",
                    "x": 245,
                    "y": 618,
                    "type": "sprite",
                    "props": {
                        "source": "预置奖品图.png"
                    },
                    "id": "img"
                },
                {
                    "name": "关闭按钮",
                    "x": 352,
                    "y": 1131,
                    "type": "button",
                    "props": {
                        "tUp": "关闭按钮.png"
                    },
                    "id": "closeBtn"
                }
            ]
        },
        {
            "name": "NoLotQualifPanel",
            "x": 0,
            "y": 0,
            "type": "container",
            "children": [
                {
                    "name": "没资格抽奖弹框背景",
                    "x": 112,
                    "y": 449,
                    "type": "sprite",
                    "props": {
                        "source": "没资格抽奖弹框背景.png"
                    }
                },
                {
                    "name": "关闭按钮",
                    "x": 352,
                    "y": 1062,
                    "type": "button",
                    "props": {
                        "tUp": "关闭按钮.png"
                    },
                    "id": "closeBtn"
                },
                {
                    "name": "知道啦",
                    "x": 225,
                    "y": 849,
                    "type": "button",
                    "props": {
                        "tUp": "知道啦.png"
                    },
                    "id": "knowBtn"
                }
            ]
        },
        {
            "name": "RankPrizePanel",
            "x": 0,
            "y": 0,
            "type": "container",
            "children": [
                {
                    "name": "排行榜中奖弹框背景",
                    "x": 73,
                    "y": 286,
                    "type": "sprite",
                    "props": {
                        "source": "排行榜中奖弹框背景.png"
                    }
                },
                {
                    "name": "开心收下",
                    "x": 200,
                    "y": 918,
                    "type": "button",
                    "props": {
                        "tUp": "开心收下.png"
                    },
                    "id": "acceptBtn"
                },
                {
                    "name": "rank",
                    "x": 425,
                    "y": 481,
                    "type": "text",
                    "props": {
                        "text": "第2名",
                        "size": 66.6766,
                        "fillColor": "#ef453b",
                        "textAlpha": 1
                    },
                    "id": "rank"
                },
                {
                    "name": "预置奖品图",
                    "x": 245,
                    "y": 561,
                    "type": "sprite",
                    "props": {
                        "source": "预置奖品图.png"
                    },
                    "id": "img"
                },
                {
                    "name": "关闭按钮",
                    "x": 352,
                    "y": 1131,
                    "type": "button",
                    "props": {
                        "tUp": "关闭按钮.png"
                    },
                    "id": "closeBtn"
                }
            ]
        },
        {
            "name": "RankNoPrizePanel",
            "x": 0,
            "y": 0,
            "type": "container",
            "children": [
                {
                    "name": "排行榜未中奖弹框背景",
                    "x": 112,
                    "y": 449,
                    "type": "sprite",
                    "props": {
                        "source": "排行榜未中奖弹框背景.png"
                    }
                },
                {
                    "name": "rankTxt",
                    "x": 304,
                    "y": 648,
                    "type": "text",
                    "props": {
                        "text": "500",
                        "size": 60.87863,
                        "fillColor": "#ef453b",
                        "textAlpha": 1
                    },
                    "id": "rankTxt"
                },
                {
                    "name": "关闭按钮",
                    "x": 352,
                    "y": 1062,
                    "type": "button",
                    "props": {
                        "tUp": "关闭按钮.png"
                    },
                    "id": "closeBtn"
                },
                {
                    "name": "知道啦",
                    "x": 225,
                    "y": 849,
                    "type": "button",
                    "props": {
                        "tUp": "知道啦.png"
                    },
                    "id": "knowBtn"
                }
            ]
        },
        {
            "name": "RulePanel",
            "x": 0,
            "y": 0,
            "type": "container",
            "children": [
                {
                    "name": "ruleBg",
                    "x": 28,
                    "y": 248,
                    "type": "sprite",
                    "props": {
                        "source": "ruleBg.png"
                    }
                },
                {
                    "name": "规则内容",
                    "x": 74,
                    "y": 369,
                    "type": "text",
                    "props": {
                        "text": "游戏规则\n",
                        "size": 74.03529,
                        "fillColor": "#000000",
                        "textAlpha": 1
                    },
                    "id": "ruleTxt"
                },
                {
                    "name": "我知道了",
                    "x": 164,
                    "y": 1197,
                    "type": "button",
                    "props": {
                        "tUp": "我知道了.png"
                    },
                    "id": "knowBtn"
                },
                {
                    "name": "关闭按钮2",
                    "x": 625,
                    "y": 272,
                    "type": "button",
                    "props": {
                        "tUp": "关闭按钮2.png"
                    },
                    "id": "closeBtn"
                }
            ]
        },
        {
            "name": "HelpPanel",
            "x": 0,
            "y": 0,
            "type": "container",
            "children": [
                {
                    "name": "助力背景",
                    "x": 86,
                    "y": 379,
                    "type": "sprite",
                    "props": {
                        "source": "助力背景.png"
                    }
                },
                {
                    "name": "为他助力",
                    "x": 229,
                    "y": 730,
                    "type": "button",
                    "props": {
                        "tUp": "为他助力.png"
                    },
                    "id": "helpBtn"
                },
                {
                    "name": "关闭按钮2",
                    "x": 583,
                    "y": 390,
                    "type": "button",
                    "props": {
                        "tUp": "关闭按钮2.png"
                    },
                    "id": "closeBtn"
                }
            ]
        },
        {
            "name": "TaskPanel",
            "x": 0,
            "y": 0,
            "type": "container",
            "children": [
                {
                    "name": "taskBg",
                    "x": 0,
                    "y": 560,
                    "type": "sprite",
                    "props": {
                        "source": "taskBg.png"
                    }
                },
                {
                    "name": "滚动内容",
                    "x": 25,
                    "y": 718,
                    "type": "container",
                    "children": [
                        {
                            "name": "购买",
                            "x": 0,
                            "y": 0,
                            "type": "sprite",
                            "props": {
                                "source": "购买.png"
                            }
                        },
                        {
                            "name": "txt5",
                            "x": 151,
                            "y": 710,
                            "type": "text",
                            "props": {
                                "text": "预售商品付定金（0/2）",
                                "size": 32,
                                "fillColor": "#3c3836",
                                "textAlpha": 1
                            },
                            "id": "txt5"
                        },
                        {
                            "name": "txt4",
                            "x": 151,
                            "y": 545,
                            "type": "text",
                            "props": {
                                "text": "浏览指定页面10s（0/1）",
                                "size": 32,
                                "fillColor": "#3c3836",
                                "textAlpha": 1
                            },
                            "id": "txt4"
                        },
                        {
                            "name": "txt2",
                            "x": 151,
                            "y": 212,
                            "type": "text",
                            "props": {
                                "text": "每日登陆（0/1）",
                                "size": 32,
                                "fillColor": "#3c3836",
                                "textAlpha": 1
                            },
                            "id": "txt2"
                        },
                        {
                            "name": "txt1",
                            "x": 152,
                            "y": 44,
                            "type": "text",
                            "props": {
                                "text": "关注店铺（0/1）",
                                "size": 32,
                                "fillColor": "#3c3836",
                                "textAlpha": 1
                            },
                            "id": "txt1"
                        },
                        {
                            "name": "goCompleteBtn",
                            "x": 529,
                            "y": 707,
                            "type": "button",
                            "props": {
                                "tUp": "goCompleteBtn.png"
                            },
                            "id": "btn5"
                        },
                        {
                            "name": "receiveBtn",
                            "x": 530,
                            "y": 540,
                            "type": "button",
                            "props": {
                                "tUp": "receiveBtn.png"
                            },
                            "id": "btn4"
                        },
                        {
                            "name": "goCompleteBtn",
                            "x": 533,
                            "y": 377,
                            "type": "button",
                            "props": {
                                "tUp": "goCompleteBtn.png"
                            },
                            "id": "btn3"
                        },
                        {
                            "name": "completeBtn",
                            "x": 533,
                            "y": 210,
                            "type": "button",
                            "props": {
                                "tUp": "completeBtn.png"
                            },
                            "id": "btn2"
                        },
                        {
                            "name": "completeBtn",
                            "x": 533,
                            "y": 43,
                            "type": "button",
                            "props": {
                                "tUp": "completeBtn.png"
                            },
                            "id": "btn1"
                        }
                    ],
                    "id": "scrollView"
                },
                {
                    "name": "关闭按钮1",
                    "x": 675,
                    "y": 572,
                    "type": "button",
                    "props": {
                        "tUp": "关闭按钮1.png"
                    },
                    "id": "closeBtn"
                }
            ]
        },
        {
            "name": "LotMsgPanel",
            "x": 0,
            "y": 0,
            "type": "container",
            "children": [
                {
                    "name": "锦鲤提示背景",
                    "x": 86,
                    "y": 309,
                    "type": "sprite",
                    "props": {
                        "source": "锦鲤提示背景.png"
                    }
                },
                {
                    "name": "知道啦",
                    "x": 225,
                    "y": 871,
                    "type": "button",
                    "props": {
                        "tUp": "知道啦.png"
                    },
                    "id": "knowBtn"
                },
                {
                    "name": "关闭按钮2",
                    "x": 583,
                    "y": 328,
                    "type": "button",
                    "props": {
                        "tUp": "关闭按钮2.png"
                    },
                    "id": "closeBtn"
                },
                {
                    "name": "预置奖品图",
                    "x": 245,
                    "y": 566,
                    "type": "sprite",
                    "props": {
                        "source": "预置奖品图.png"
                    },
                    "id": "img"
                }
            ]
        },
        {
            "name": "GameOverPanel",
            "x": 0,
            "y": 0,
            "type": "container",
            "children": [
                {
                    "name": "成绩",
                    "x": 70,
                    "y": 287,
                    "type": "sprite",
                    "props": {
                        "source": "成绩.png"
                    }
                },
                {
                    "name": "creditsCon",
                    "x": 152,
                    "y": 697,
                    "type": "container",
                    "children": [
                        {
                            "name": "开心收下",
                            "x": 48,
                            "y": 246,
                            "type": "button",
                            "props": {
                                "tUp": "开心收下.png"
                            },
                            "id": "acceptBtn"
                        },
                        {
                            "name": "恭喜获得文案",
                            "x": 136,
                            "y": 0,
                            "type": "sprite",
                            "props": {
                                "source": "恭喜获得文案.png"
                            }
                        },
                        {
                            "name": "一万文案替换",
                            "x": 0,
                            "y": 100,
                            "type": "sprite",
                            "props": {
                                "source": "一万文案替换.png"
                            },
                            "id": "creditsImg"
                        },
                        {
                            "name": "积分文案",
                            "x": 355,
                            "y": 129,
                            "type": "sprite",
                            "props": {
                                "source": "积分文案.png"
                            },
                            "id": "creditsIcon"
                        }
                    ],
                    "id": "creditsCon"
                },
                {
                    "name": "rankCon",
                    "x": 200,
                    "y": 697,
                    "type": "container",
                    "children": [
                        {
                            "name": "再来一局",
                            "x": 0,
                            "y": 246,
                            "type": "button",
                            "props": {
                                "tUp": "再来一局.png"
                            },
                            "id": "againBtn"
                        },
                        {
                            "name": "当前排名文案",
                            "x": 91,
                            "y": 0,
                            "type": "sprite",
                            "props": {
                                "source": "当前排名文案.png"
                            }
                        },
                        {
                            "name": "三十文案替换",
                            "x": 31,
                            "y": 64,
                            "type": "sprite",
                            "props": {
                                "source": "三十文案替换.png"
                            },
                            "id": "rank"
                        }
                    ],
                    "id": "rankCon"
                },
                {
                    "name": "totalScore",
                    "x": 381,
                    "y": 594,
                    "type": "text",
                    "props": {
                        "text": "28000000分",
                        "size": 69.57558,
                        "fillColor": "#ef453b",
                        "textAlpha": 1
                    },
                    "id": "totalScore"
                },
                {
                    "name": "curScore",
                    "x": 120,
                    "y": 569,
                    "type": "text",
                    "props": {
                        "text": "2800分",
                        "size": 61.00614,
                        "fillColor": "#ef453b",
                        "textAlpha": 1
                    },
                    "id": "curScore"
                },
                {
                    "name": "关闭按钮",
                    "x": 345,
                    "y": 1199,
                    "type": "button",
                    "props": {
                        "tUp": "关闭按钮.png"
                    },
                    "id": "closeBtn"
                }
            ]
        },
        {
            "name": "TimesOutPanel",
            "x": 0,
            "y": 0,
            "type": "container",
            "children": [
                {
                    "name": "TimesOutBg",
                    "x": 86,
                    "y": 389,
                    "type": "sprite",
                    "props": {
                        "source": "TimesOutBg.png"
                    }
                },
                {
                    "name": "去赚次数",
                    "x": 225,
                    "y": 780,
                    "type": "button",
                    "props": {
                        "tUp": "去赚次数.png"
                    },
                    "id": "goTaskBtn"
                },
                {
                    "name": "关闭按钮2",
                    "x": 583,
                    "y": 408,
                    "type": "button",
                    "props": {
                        "tUp": "关闭按钮2.png"
                    },
                    "id": "closeBtn"
                }
            ]
        },
        {
            "name": "RankPanel",
            "x": 0,
            "y": 0,
            "type": "container",
            "children": [
                {
                    "name": "排行榜背景",
                    "x": 56,
                    "y": 284,
                    "type": "sprite",
                    "props": {
                        "source": "排行榜背景.png"
                    }
                },
                {
                    "name": "RankItem",
                    "x": 112,
                    "y": 549,
                    "type": "skin",
                    "children": [
                        {
                            "name": "num3",
                            "x": 0,
                            "y": 1,
                            "type": "sprite",
                            "props": {
                                "source": "num3.png"
                            },
                            "id": "num3"
                        },
                        {
                            "name": "num2",
                            "x": 0,
                            "y": 2,
                            "type": "sprite",
                            "props": {
                                "source": "num2.png"
                            },
                            "id": "num2"
                        },
                        {
                            "name": "num1",
                            "x": 0,
                            "y": 0,
                            "type": "sprite",
                            "props": {
                                "source": "num1.png"
                            },
                            "id": "num1"
                        },
                        {
                            "name": "排名预置图",
                            "x": 5,
                            "y": 0,
                            "type": "sprite",
                            "props": {
                                "source": "排名预置图.png"
                            },
                            "id": "rank"
                        },
                        {
                            "name": "nickName",
                            "x": 174,
                            "y": 13,
                            "type": "text",
                            "props": {
                                "text": "一**猛",
                                "size": 30,
                                "fillColor": "#000000",
                                "textAlpha": 1
                            },
                            "id": "nickName"
                        },
                        {
                            "name": "score",
                            "x": 363,
                            "y": 14,
                            "type": "text",
                            "props": {
                                "text": "29310900分",
                                "size": 30,
                                "fillColor": "#ef3d32",
                                "textAlpha": 1
                            },
                            "id": "score"
                        }
                    ]
                },
                {
                    "name": "RankPrizeItem",
                    "x": 87,
                    "y": 1069,
                    "type": "skin",
                    "children": [
                        {
                            "name": "nameTxt",
                            "x": 38,
                            "y": 155,
                            "type": "text",
                            "props": {
                                "text": "第一名",
                                "size": 26,
                                "fillColor": "#000000",
                                "textAlpha": 1
                            },
                            "id": "nameTxt"
                        },
                        {
                            "name": "奖项预置图",
                            "x": 0,
                            "y": 0,
                            "type": "sprite",
                            "props": {
                                "source": "奖项预置图.png"
                            },
                            "id": "img"
                        }
                    ]
                },
                {
                    "name": "openTime",
                    "x": 201,
                    "y": 1008,
                    "type": "text",
                    "props": {
                        "text": "排行榜奖励X月X日X点开奖",
                        "size": 30,
                        "fillColor": "#fffefe",
                        "textAlpha": 1
                    },
                    "id": "openTime"
                },
                {
                    "name": "rankNum",
                    "x": 103,
                    "y": 474,
                    "type": "text",
                    "props": {
                        "text": "未入榜 ",
                        "size": 30,
                        "fillColor": "#b3640b",
                        "textAlpha": 1
                    },
                    "id": "rankNum"
                },
                {
                    "name": "nickName",
                    "x": 289,
                    "y": 472,
                    "type": "text",
                    "props": {
                        "text": "巴拉巴拉",
                        "size": 34,
                        "fillColor": "#b3640b",
                        "textAlpha": 1
                    },
                    "id": "nickName"
                },
                {
                    "name": "score",
                    "x": 502,
                    "y": 473,
                    "type": "text",
                    "props": {
                        "text": "293109分",
                        "size": 34,
                        "fillColor": "#b3640b",
                        "textAlpha": 1
                    },
                    "id": "score"
                },
                {
                    "name": "关闭按钮",
                    "x": 636,
                    "y": 218,
                    "type": "button",
                    "props": {
                        "tUp": "关闭按钮.png"
                    },
                    "id": "closeBtn"
                }
            ]
        },
        {
            "name": "HelpTimesPanel",
            "x": 0,
            "y": 0,
            "type": "container",
            "children": [
                {
                    "name": "助力次数弹框背景",
                    "x": 73,
                    "y": 359,
                    "type": "sprite",
                    "props": {
                        "source": "助力次数弹框背景.png"
                    }
                },
                {
                    "name": "知道了",
                    "x": 200,
                    "y": 809,
                    "type": "button",
                    "props": {
                        "tUp": "知道了.png"
                    },
                    "id": "knowBtn"
                },
                {
                    "name": "关闭按钮",
                    "x": 352,
                    "y": 1041,
                    "type": "button",
                    "props": {
                        "tUp": "关闭按钮.png"
                    },
                    "id": "closeBtn"
                },
                {
                    "name": "friendsTxt",
                    "x": 256,
                    "y": 550,
                    "type": "text",
                    "props": {
                        "text": "xx为好友为你助力",
                        "size": 43.48474,
                        "fillColor": "#000000",
                        "textAlpha": 1
                    },
                    "id": "friendsTxt"
                },
                {
                    "name": "gameTimes",
                    "x": 199,
                    "y": 612,
                    "type": "text",
                    "props": {
                        "text": "游戏次数+xx",
                        "size": 43.48474,
                        "fillColor": "#ff5555",
                        "textAlpha": 1
                    },
                    "id": "gameTimesTxt"
                }
            ]
        },
        {
            "name": "StartScene",
            "x": 0,
            "y": 0,
            "type": "container",
            "children": [
                {
                    "name": "startSceneBg",
                    "x": 0,
                    "y": 0,
                    "type": "sprite",
                    "props": {
                        "source": "startSceneBg.jpg"
                    }
                },
                {
                    "name": "底部按钮区",
                    "x": 0,
                    "y": 1242,
                    "type": "container",
                    "children": [
                        {
                            "name": "底部按钮区背景",
                            "x": 0,
                            "y": 0,
                            "type": "sprite",
                            "props": {
                                "source": "底部按钮区背景.png"
                            }
                        },
                        {
                            "name": "icon",
                            "x": 56,
                            "y": 35,
                            "type": "container",
                            "children": [
                                {
                                    "name": "赚次数按钮",
                                    "x": 547,
                                    "y": 0,
                                    "type": "button",
                                    "props": {
                                        "tUp": "赚次数按钮.png"
                                    },
                                    "id": "taskBtn"
                                },
                                {
                                    "name": "运动锦鲤按钮",
                                    "x": 258,
                                    "y": 0,
                                    "type": "button",
                                    "props": {
                                        "tUp": "运动锦鲤按钮.png"
                                    },
                                    "id": "lotBtn"
                                },
                                {
                                    "name": "排行榜按钮",
                                    "x": 0,
                                    "y": 0,
                                    "type": "button",
                                    "props": {
                                        "tUp": "排行榜按钮.png"
                                    },
                                    "id": "rankBtn"
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "timesTxt",
                    "x": 286,
                    "y": 1205,
                    "type": "text",
                    "props": {
                        "text": "剩余次数：3次",
                        "size": 16.00722,
                        "fillColor": "#ffffff",
                        "textAlpha": 1
                    },
                    "id": "timesTxt"
                },
                {
                    "name": "开始游戏",
                    "x": 171,
                    "y": 1052,
                    "type": "button",
                    "props": {
                        "tUp": "开始游戏.png"
                    },
                    "id": "startBtn"
                },
                {
                    "name": "规则按钮",
                    "x": 621,
                    "y": 212,
                    "type": "button",
                    "props": {
                        "tUp": "规则按钮.png"
                    },
                    "id": "ruleBtn"
                },
                {
                    "name": "奖品按钮",
                    "x": 11,
                    "y": 212,
                    "type": "button",
                    "props": {
                        "tUp": "奖品按钮.png"
                    },
                    "id": "recordBtn"
                }
            ]
        }
    ]
};


/***/ }),

/***/ "./src/TaoBaoNet.ts":
/*!**************************!*\
  !*** ./src/TaoBaoNet.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TBPRIZE_TYPE = exports.getTbServerTime = exports.checkTbDownloadPermission = exports.clickLogTb = exports.LogTbEnum = exports.destroyTbNetData = exports.getTbData = exports.addData = exports.sendTbNet = exports.TBBgm = exports.TbNetName = void 0;
var ctrls_1 = __webpack_require__(/*! ../module/ctrls */ "./module/ctrls/index.ts");
var Main_1 = __webpack_require__(/*! ./Main */ "./src/Main.ts");
var TbNetName;
(function (TbNetName) {
    TbNetName["addData"] = "yoga.addStat";
    TbNetName["getActivityBaseInfoById"] = "yoga.getActivityBaseInfoById";
    TbNetName["getGameInfo"] = "xunzai.getGameInfo";
    TbNetName["receiveInvitePrize"] = "xunzai.receiveInvitePrize";
    TbNetName["startGame"] = "yoga.startGame";
    TbNetName["submitGame"] = "yoga.submitGame";
    TbNetName["drawLotteryPrize"] = "yoga.drawLotteryPrize";
    TbNetName["doHelp"] = "xunzai.doHelp";
    TbNetName["getVipInfo"] = "xunzai.getVipInfo";
    TbNetName["receiveEnamePrize"] = "xunzai.receiveEnamePrize";
    TbNetName["openMember"] = "mine.openMember";
    TbNetName["openTask"] = "mine.openTask";
    TbNetName["authorize"] = "mine.authorize";
    TbNetName["favorShop"] = "mine.favorShop";
    TbNetName["getUserAddress"] = "mine.getUserAddress";
    TbNetName["getAdoptName"] = "mine.getAdoptName";
    TbNetName["getAppData"] = "mine.getAppData";
    TbNetName["navigateToOutside"] = "mine.navigateToOutside";
    TbNetName["navigateTo"] = "mine.navigateTo";
    TbNetName["navigateBack"] = "mine.navigateBack";
    TbNetName["showSharePanel"] = "mine.showSharePanel";
    TbNetName["openDetail"] = "mine.openDetail";
    TbNetName["reportAnalytics"] = "mine.reportAnalytics";
    TbNetName["openMusic"] = "mine.openMusic";
    TbNetName["complteGuidance"] = "yoga.complateGuide";
    TbNetName["addLifiCycleEvent"] = "mine.addLifiCycleEvent";
    TbNetName["showCustomLoading"] = "mine.showCustomLoading";
    TbNetName["closeCustomLoading"] = "mine.closeCustomLoading";
})(TbNetName = exports.TbNetName || (exports.TbNetName = {}));
var TBBgm;
(function (TBBgm) {
    TBBgm["gameBgm"] = "game_bgm";
    TBBgm["preBgm"] = "pre_game_bgm";
    TBBgm["boxOpen"] = "box_open";
    TBBgm["exchangeSuccess"] = "exchange_success";
    TBBgm["scoreBgm"] = "score_bgm";
    TBBgm["guidanceFill"] = "guidance_fill_bgm";
})(TBBgm = exports.TBBgm || (exports.TBBgm = {}));
var dataRecord = {};
function sendTbNet(netName, parameter, callback, hideMsg, hidWaiting) {
    if (hideMsg === void 0) { hideMsg = false; }
    if (hidWaiting === void 0) { hidWaiting = false; }
    return new Promise(function (resolve, reject) {
        !hidWaiting && ctrls_1.showWaiting();
        if (!my) {
            var netInfo = netName.split(".");
            var url = "../../mock/miniTb/" + netInfo[0] + "/" + netInfo[1] + ".json";
            fetchAsync(url)
                .then(function (data) {
                !hidWaiting && ctrls_1.hideWaiting();
                dataRecord[netName] = data;
                if (!hideMsg && !data.success)
                    ctrls_1.showToast(data.message || "网络异常");
                callback && callback(data.success, data);
                resolve(data);
                console.log("\n%c[ mock ]\n"
                    + ("NAME  : " + netName + " \n")
                    + "STATE : %o \n"
                    + "PARAM : %o \n"
                    + "%cDATA  : %o \n", "" + (data.success ? 'color:green' : 'color:red'), data.success, parameter, "" + (data.success ? 'color:green' : 'color:red'), data);
            }, function () {
                !hidWaiting && ctrls_1.hideWaiting();
                resolve({ success: false, data: null });
            });
            return;
        }
        var fun = function (e) {
            !hidWaiting && ctrls_1.hideWaiting();
            Main_1.GDispatcher.removeEventListener(netName, fun);
            var d = e.data;
            dataRecord[netName] = d;
            if (!hideMsg && !d.success)
                ctrls_1.showToast(d.message || "网络超时");
            callback && callback(d.success, d);
            resolve(d);
            console.log("\n%c[ request ]\n"
                + ("NAME  : " + netName + " \n")
                + "STATE : %o \n"
                + "PARAM : %o \n"
                + "%cDATA  : %o \n", "" + (d.success ? 'color:green' : 'color:red'), d.success, parameter, "" + (d.success ? 'color:green' : 'color:red'), d);
        };
        Main_1.GDispatcher.addEventListener(netName, fun);
        Main_1.GDispatcher.dispatchEvent({ type: "onMessage" }, { netName: netName, parameter: parameter });
    });
}
exports.sendTbNet = sendTbNet;
function addData(type) {
    sendTbNet(TbNetName.addData, { type: type }, null, true, true);
}
exports.addData = addData;
function getTbData(netName) {
    return dataRecord[netName] || null;
}
exports.getTbData = getTbData;
function destroyTbNetData() {
    dataRecord = {};
}
exports.destroyTbNetData = destroyTbNetData;
function fetchAsync(url) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, fetch(url)];
                case 1:
                    response = _a.sent();
                    return [4, response.json()];
                case 2:
                    data = _a.sent();
                    return [2, data];
            }
        });
    });
}
var LogTbEnum;
(function (LogTbEnum) {
    LogTbEnum["AD"] = "ad";
    LogTbEnum["TASK_ICON"] = "taskIcon";
    LogTbEnum["FOLLOW_SHOP"] = "followShop";
    LogTbEnum["INVITE_FRIEND"] = "inviteFriend";
    LogTbEnum["BROWSE_PRODUCT"] = "browseProduct";
    LogTbEnum["COLLECTION_PRODUCT"] = "collectionProduct";
    LogTbEnum["BUY_PRODUCT"] = "buyProduct";
    LogTbEnum["IMPROVE_INFORMATION"] = "improveInformation";
    LogTbEnum["SECRET_ORDER"] = "secretOrder";
    LogTbEnum["SIGN_ICON"] = "signIcon";
    LogTbEnum["BAG_ICON"] = "bagIcon";
})(LogTbEnum = exports.LogTbEnum || (exports.LogTbEnum = {}));
function clickLogTb(elemType) {
    sendTbNet(TbNetName.addData, { params: { elemType: elemType }, type: "click" }, function () {
    }, true);
    sendTbNet(TbNetName.reportAnalytics, { logkey: elemType }, function () {
    }, true);
}
exports.clickLogTb = clickLogTb;
function checkTbDownloadPermission(tryCloudUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var tbMy, cloud, url, urls;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    try {
                        tbMy = my;
                    }
                    catch (err) {
                    }
                    if (!tbMy)
                        return [2];
                    cloud = getApp().cloud;
                    url = tryCloudUrl;
                    return [4, cloud.file.getTempFileURL({ fileId: [url] })];
                case 1:
                    urls = _a.sent();
                    url = urls[0].url.replace('-internal', '');
                    tbMy.downloadFile({
                        url: url,
                        success: function (res) {
                            var i = res.apFilePath;
                            tbMy.getFileSystemManager().readFile({
                                filePath: i,
                                success: function (r) {
                                },
                                fail: function (res) {
                                }
                            });
                        },
                        fail: function (res) {
                        },
                    });
                    return [2];
            }
        });
    });
}
exports.checkTbDownloadPermission = checkTbDownloadPermission;
exports.getTbServerTime = function () {
    return new Promise(function (resolve, reject) {
        if (FYGE.getEnv() == "tb") {
            my.getServerTime({
                success: function (res) {
                    resolve(+res.time);
                },
                fail: function (err) {
                    resolve(Date.now());
                }
            });
        }
        else {
            resolve(Date.now());
        }
    });
};
var TBPRIZE_TYPE;
(function (TBPRIZE_TYPE) {
    TBPRIZE_TYPE[TBPRIZE_TYPE["ENAME"] = 1] = "ENAME";
    TBPRIZE_TYPE[TBPRIZE_TYPE["CREDITS"] = 2] = "CREDITS";
    TBPRIZE_TYPE[TBPRIZE_TYPE["OBJECT"] = 3] = "OBJECT";
    TBPRIZE_TYPE[TBPRIZE_TYPE["THANKS"] = 5] = "THANKS";
})(TBPRIZE_TYPE = exports.TBPRIZE_TYPE || (exports.TBPRIZE_TYPE = {}));


/***/ }),

/***/ "./src/Tools.ts":
/*!**********************!*\
  !*** ./src/Tools.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prefixInteger = exports.getRandomArrayElements = exports.Tools = exports.myApp = exports.sleep = exports.goTask = exports.goMyPrize = void 0;
var ctrls_1 = __webpack_require__(/*! ../module/ctrls */ "./module/ctrls/index.ts");
var RES_1 = __webpack_require__(/*! ../module/RES */ "./module/RES.ts");
var layers_1 = __webpack_require__(/*! ../module/views/layers */ "./module/views/layers.ts");
var TaoBaoNet_1 = __webpack_require__(/*! ./TaoBaoNet */ "./src/TaoBaoNet.ts");
var Tween = FYGE.Tween;
var Ease = FYGE.Ease;
function goMyPrize() {
    TaoBaoNet_1.sendTbNet(TaoBaoNet_1.TbNetName.navigateTo, { url: '/pages/myprize/myprize' }, null, true);
}
exports.goMyPrize = goMyPrize;
function goTask() {
    TaoBaoNet_1.sendTbNet(TaoBaoNet_1.TbNetName.openTask);
}
exports.goTask = goTask;
function sleep(time) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, new Promise(function (resolve) {
                    Tween.get(FYGE)
                        .wait(time)
                        .call(resolve);
                })];
        });
    });
}
exports.sleep = sleep;
exports.myApp = getApp();
var Tools = (function () {
    function Tools() {
    }
    Tools.getGlobalData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, TaoBaoNet_1.sendTbNet(TaoBaoNet_1.TbNetName.getAppData)];
                    case 1:
                        data = (_a.sent()).data;
                        Tools.globalData = data;
                        return [2];
                }
            });
        });
    };
    Tools.getActivityBaseInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, success, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, TaoBaoNet_1.sendTbNet(TaoBaoNet_1.TbNetName.getActivityBaseInfoById)];
                    case 1:
                        _a = _b.sent(), success = _a.success, data = _a.data;
                        if (data) {
                            Tools.activityBaseInfo = data;
                        }
                        return [2, success];
                }
            });
        });
    };
    Tools.getGameInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, success, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, TaoBaoNet_1.sendTbNet(TaoBaoNet_1.TbNetName.getGameInfo)];
                    case 1:
                        _a = _b.sent(), success = _a.success, data = _a.data;
                        if (data) {
                            Tools.gameInfo = data;
                        }
                        return [2, success];
                }
            });
        });
    };
    Tools.queryVip = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, success, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, TaoBaoNet_1.sendTbNet(TaoBaoNet_1.TbNetName.getVipInfo)];
                    case 1:
                        _a = _b.sent(), success = _a.success, data = _a.data;
                        return [2, success && data.isVip];
                }
            });
        });
    };
    Tools.getPrize = function (prize, callFun) {
        if (callFun === void 0) { callFun = function () { return 0; }; }
        return __awaiter(this, void 0, void 0, function () {
            var call, type, id, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log(prize);
                        call = function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, sleep(500)];
                                    case 1:
                                        _a.sent();
                                        callFun();
                                        return [2];
                                }
                            });
                        }); };
                        type = prize.type, id = prize.id;
                        _a = type;
                        switch (_a) {
                            case 1: return [3, 1];
                            case 3: return [3, 3];
                            case 2: return [3, 5];
                            case 5: return [3, 5];
                        }
                        return [3, 7];
                    case 1: return [4, TaoBaoNet_1.sendTbNet(TaoBaoNet_1.TbNetName.receiveEnamePrize, { id: id }, function (success, res) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(!success || !res)) return [3, 2];
                                        ctrls_1.showToast('奖品发放失败\n请前往我的奖品处进行处理');
                                        return [4, call()];
                                    case 1:
                                        _a.sent();
                                        return [2];
                                    case 2:
                                        if (res.data && res.data.drawStatus == 3) {
                                            ctrls_1.showToast('奖品发放成功\n请前往我的奖品处查看');
                                        }
                                        else {
                                            ctrls_1.showToast('奖品发放失败\n请前往我的奖品处进行处理');
                                        }
                                        return [4, call()];
                                    case 3:
                                        _a.sent();
                                        return [2];
                                }
                            });
                        }); }, true)];
                    case 2:
                        _b.sent();
                        return [3, 7];
                    case 3: return [4, TaoBaoNet_1.sendTbNet(TaoBaoNet_1.TbNetName.getUserAddress, { prizeId: id }, function (success, res) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!success) {
                                            return [2];
                                        }
                                        ctrls_1.showToast('奖品发放成功\n请前往我的奖品处查看');
                                        return [4, call()];
                                    case 1:
                                        _a.sent();
                                        return [2];
                                }
                            });
                        }); }, true)];
                    case 4:
                        _b.sent();
                        return [3, 7];
                    case 5: return [4, call()];
                    case 6:
                        _b.sent();
                        return [3, 7];
                    case 7: return [2];
                }
            });
        });
    };
    Tools.getSprite = function (imageName, x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        var sprite = new FYGE.Sprite(RES_1.RES.getRes(imageName));
        sprite.x = x;
        sprite.y = y;
        return sprite;
    };
    Tools.getCircle = function (radius, color, alpha, x, y) {
        if (radius === void 0) { radius = 10; }
        if (color === void 0) { color = 0xff0000; }
        if (alpha === void 0) { alpha = 1; }
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        var g = new FYGE.Graphics();
        g.beginFill(color);
        g.alpha = alpha;
        g.drawCircle(0, 0, radius);
        g.endFill();
        g.position.set(x, y);
        return g;
    };
    Tools.getAdjustHeight = function (maxDis, minDis, type) {
        if (type === void 0) { type = "bot"; }
        var offsetY = (function () {
            if (type == "top")
                return 0;
            if (type == "bot")
                return layers_1.layers.stageOffsetY * 2;
            return layers_1.layers.stageOffsetY;
        })();
        if (layers_1.layers.stageHeight <= 1206)
            return minDis + offsetY;
        return (layers_1.layers.stageHeight - 1206) / (1624 - 1206) * (maxDis - minDis) + minDis + offsetY;
    };
    Tools.changeTextAlign = function (text, align, textWidth) {
        if (align == FYGE.TEXT_ALIGN.LEFT)
            return;
        text.textAlign = align;
        textWidth = textWidth || text.textWidth;
        if (align == FYGE.TEXT_ALIGN.CENTER)
            text.x -= (textWidth - text.textWidth) / 2;
        if (align == FYGE.TEXT_ALIGN.RIGHT)
            text.x -= textWidth - text.textWidth;
        text.textWidth = textWidth;
    };
    Tools.customToast = function (target, call, time, showTime) {
        if (call === void 0) { call = function () { return 0; }; }
        if (time === void 0) { time = 2000; }
        if (showTime === void 0) { showTime = 300; }
        Tween.get(target)
            .set({ alpha: 0, visible: true })
            .to({ alpha: 1 }, showTime, Ease.quadIn)
            .wait(time)
            .to({ alpha: 0 }, showTime, Ease.quadOut)
            .set({ alpha: 0, visible: false })
            .call(function () {
            call();
        });
    };
    Tools.btnDelay = function (target, delay) {
        if (delay === void 0) { delay = 2000; }
        target.mouseEnable = false;
        target.mouseChildren = false;
        setTimeout(function () {
            target.mouseEnable = true;
            target.mouseChildren = true;
        }, delay);
    };
    Tools.getNumTextures = function (name) {
        var arr = {};
        for (var i = 0; i <= 9; i++)
            arr[i] = RES_1.RES.getRes(name + i + ".png");
        return arr;
    };
    Tools.getAdjustBottomHeight = function (percent) {
        return layers_1.layers.stageHeight - layers_1.layers.stageHeight * percent + layers_1.layers.stageOffsetY;
    };
    Tools.getAdjustTopHeight = function (percent) {
        return layers_1.layers.stageHeight * percent + layers_1.layers.stageOffsetY;
    };
    Tools.PAGE = {
        isNewGuy: false,
        countDownNum: 30,
        musicStatus: false
    };
    Tools.cacheKey = "guideThreeSquirrels";
    Tools.indexMask = {};
    Tools.activityBaseInfo = {
        rule: "",
        startTime: 0,
        endTime: 0,
        showPrizeImg: {
            image_1: "",
            image_2: "",
            image_3: "",
        }
    };
    Tools.gameInfo = {
        maxLevel: 1,
        gameTimes: 0,
        inviteTotalCount: 0,
        invitePrize: [{
                inviteCount: 0,
                receiveStatus: 0,
                type: "level1"
            }],
        inviteRemainTimes: null,
        accessMaxLevelCount: 0,
        hasAccessMaxLevel: false,
        cardTotalCount: 0,
        hasTakeTotalTimesPrize: false,
    };
    return Tools;
}());
exports.Tools = Tools;
function getRandomArrayElements(arr, count) {
    if (arr.length <= count)
        return arr;
    var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
        index = (i + 1) * Math.random() >> 0;
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}
exports.getRandomArrayElements = getRandomArrayElements;
function prefixInteger(num, length) {
    return (Array(length).join('0') + num).slice(-length);
}
exports.prefixInteger = prefixInteger;


/***/ }),

/***/ "./src/UI.ts":
/*!*******************!*\
  !*** ./src/UI.ts ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var RES_1 = __webpack_require__(/*! ../module/RES */ "./module/RES.ts");
var Container = FYGE.Container;
var Button = FYGE.Button;
var MouseEvent = FYGE.MouseEvent;
var Sprite = FYGE.Sprite;
var TEXT_ALIGN = FYGE.TEXT_ALIGN;
var TextField = FYGE.TextField;
var Shape = FYGE.Shape;
var Lottie = FYGE.Lottie;
var UI = (function () {
    function UI() {
    }
    UI.Btn = function (parent, enImg, func, that, x, y, anchorX, anchorY, tImg, disImg) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (tImg === void 0) { tImg = enImg; }
        if (disImg === void 0) { disImg = enImg; }
        var btn = new Button(RES_1.RES.getRes(enImg), RES_1.RES.getRes(tImg), RES_1.RES.getRes(disImg));
        btn.addEventListener(MouseEvent.CLICK, func, that);
        btn.position.set(x, y);
        anchorX !== undefined && (btn.anchorX = anchorX);
        anchorY !== undefined && (btn.anchorY = anchorY);
        parent && parent.addChild(btn);
        return btn;
    };
    UI.Sp = function (parent, imageName, x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        var texture = RES_1.RES.getRes(imageName);
        var sprite;
        if (texture) {
            sprite = new Sprite(texture);
        }
        else {
            sprite = Sprite.fromUrl(imageName);
        }
        sprite.position.set(x, y);
        parent && parent.addChild(sprite);
        return sprite;
    };
    UI.Ctn = function (parent, x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        var ctn = new Container();
        ctn.position.set(x, y);
        ctn && parent.addChild(ctn);
        return ctn;
    };
    UI.Txt = function (parent, txt, size, color, align, textWidth, x, y, bold) {
        if (color === void 0) { color = "#000000"; }
        if (align === void 0) { align = TEXT_ALIGN.LEFT; }
        if (textWidth === void 0) { textWidth = 0; }
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (bold === void 0) { bold = false; }
        var text = new TextField();
        text.fillColor = color;
        text.size = size;
        text.textWidth = textWidth;
        text.textAlign = align;
        text.position.set(x, y);
        text.text = txt;
        text.bold = bold;
        parent && parent.addChild(text);
        return text;
    };
    UI.Rect = function (parent, width, height, color, radius, x, y, alpha) {
        if (color === void 0) { color = 0xff0000; }
        if (radius === void 0) { radius = 0; }
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (alpha === void 0) { alpha = 1; }
        var shape = new Shape();
        shape.beginFill(color);
        if (!radius) {
            shape.drawRect(0, 0, width, height);
        }
        else {
            shape.drawRoundedRect(0, 0, width, height, radius);
        }
        shape.endFill();
        shape.alpha = alpha;
        shape.position.set(x, y);
        parent && parent.addChild(shape);
        return shape;
    };
    UI.Lottie = function (parent, data, x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        var lottie = new Lottie(data);
        lottie.x = x;
        lottie.y = y;
        parent && parent.addChild(lottie);
        return lottie;
    };
    return UI;
}());
exports.default = UI;


/***/ }),

/***/ "./src/common/G_EVENT.ts":
/*!*******************************!*\
  !*** ./src/common/G_EVENT.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.G_EVENT = void 0;
var G_EVENT;
(function (G_EVENT) {
    G_EVENT["ON_SHOW"] = "onShow";
    G_EVENT["ON_HIDE"] = "onHide";
    G_EVENT["UPDATE_TASK"] = "onUpdateTask";
    G_EVENT["UPDATE_SCENE"] = "onUpdateScene";
})(G_EVENT = exports.G_EVENT || (exports.G_EVENT = {}));


/***/ }),

/***/ "./src/scenes/IndexScene.ts":
/*!**********************************!*\
  !*** ./src/scenes/IndexScene.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var RES_1 = __webpack_require__(/*! ../../module/RES */ "./module/RES.ts");
var layers_1 = __webpack_require__(/*! ../../module/views/layers */ "./module/views/layers.ts");
var Scene_1 = __webpack_require__(/*! ../../module/views/Scene */ "./module/views/Scene.ts");
var Tools_1 = __webpack_require__(/*! ../Tools */ "./src/Tools.ts");
var UI_1 = __webpack_require__(/*! ../UI */ "./src/UI.ts");
var Clock_1 = __webpack_require__(/*! ../Clock */ "./src/Clock.ts");
var GPool_1 = __webpack_require__(/*! ../../module/tools/GPool */ "./module/tools/GPool.ts");
var Main_1 = __webpack_require__(/*! ../Main */ "./src/Main.ts");
function randomNum(m, n) {
    var max = n;
    var min = m;
    return Math.floor(Math.random() * (max - min)) + min;
}
var GameEvent = {
    GAME_START: 'GAME_START',
    GAME_OVER: 'GAME_OVER',
    GAME_BGM: 'GAME_BGM',
};
var CountDownBoard = (function (_super) {
    __extends(CountDownBoard, _super);
    function CountDownBoard(num) {
        if (num === void 0) { num = 30; }
        var _this = _super.call(this) || this;
        _this._countDown = 3;
        _this._countDownTimerInterval = 1000;
        _this._initCountDownNum = num;
        _this.initUi();
        return _this;
    }
    Object.defineProperty(CountDownBoard.prototype, "countDown", {
        get: function () {
            return this._countDown;
        },
        set: function (v) {
            this._countDown = v;
            this._countDownText.text = v + '';
        },
        enumerable: false,
        configurable: true
    });
    CountDownBoard.prototype.initUi = function () {
        UI_1.default.Sp(this, 'count-down-back.png');
        this._countDownText = this.addChild(new FYGE.BitmapText(Tools_1.Tools.getNumTextures('')));
        this._countDownText.position.set(135, 30);
        this._countDownText.text = this._initCountDownNum + '';
    };
    CountDownBoard.prototype.restart = function () {
        this.stopCountDown();
        this.countDown = this._initCountDownNum;
        this.startCountDown();
    };
    CountDownBoard.prototype.startCountDown = function () {
        var _this = this;
        this._countDownTimer = setInterval(function () {
            _this.countDown--;
            if (_this.countDown <= 0) {
                clearInterval(_this._countDownTimer);
                _this.dispatchEvent('countdown', _this.countDown);
            }
        }, this._countDownTimerInterval);
    };
    CountDownBoard.prototype.stopCountDown = function () {
        this._countDownTimer && clearInterval(this._countDownTimer);
    };
    return CountDownBoard;
}(FYGE.Container));
var PythicCont = (function () {
    function PythicCont() {
    }
    PythicCont.prototype.draw = function () { };
    PythicCont.prototype.initParent = function (parent) {
        this.parent = parent;
        this.globalX = this.x + parent.x;
        this.globalY = this.y + parent.y;
    };
    Object.defineProperty(PythicCont.prototype, "pythicPos", {
        get: function () {
            return {
                x: this.x + this.parent.x,
                y: this.y + this.parent.y
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PythicCont.prototype, "commonPythicPos", {
        get: function () {
            return;
        },
        enumerable: false,
        configurable: true
    });
    return PythicCont;
}());
var CirclePythicCont = (function (_super) {
    __extends(CirclePythicCont, _super);
    function CirclePythicCont(x, y, radius) {
        var _this = _super.call(this) || this;
        _this.type = 'circle';
        _this.x = x;
        _this.y = y;
        _this.radius = radius;
        return _this;
    }
    Object.defineProperty(CirclePythicCont.prototype, "commonPythicPos", {
        get: function () {
            return __assign(__assign({}, this.pythicPos), { radius: this.radius, type: this.type });
        },
        enumerable: false,
        configurable: true
    });
    CirclePythicCont.prototype.draw = function () {
        var parent = this.parent;
        var p = parent.addChild(new FYGE.Shape())
            .beginFill('#000000')
            .drawCircle(this.x, this.y, this.radius)
            .endFill();
        p.alpha = 0.4;
    };
    return CirclePythicCont;
}(PythicCont));
var RectPythicCont = (function (_super) {
    __extends(RectPythicCont, _super);
    function RectPythicCont(x, y, w, h) {
        var _this = _super.call(this) || this;
        _this.type = 'rect';
        _this.x = x;
        _this.y = y;
        _this.w = w;
        _this.h = h;
        return _this;
    }
    Object.defineProperty(RectPythicCont.prototype, "commonPythicPos", {
        get: function () {
            return __assign(__assign({}, this.pythicPos), { w: this.w, h: this.h, type: this.type });
        },
        enumerable: false,
        configurable: true
    });
    RectPythicCont.prototype.draw = function () {
        var parent = this.parent;
        var p = parent.addChild(new FYGE.Shape())
            .beginFill('#000000')
            .drawRect(this.x, this.y, this.w, this.h)
            .endFill();
        p.alpha = 0.4;
    };
    return RectPythicCont;
}(PythicCont));
var PythicContainer = (function (_super) {
    __extends(PythicContainer, _super);
    function PythicContainer() {
        return _super.call(this) || this;
    }
    PythicContainer.prototype.addPythicCont = function (cont, debug) {
        if (debug === void 0) { debug = false; }
        this.pythicCont = cont;
        cont.initParent(this);
        if (debug) {
            cont.draw();
        }
    };
    return PythicContainer;
}(FYGE.Container));
var GameEleSprit = (function (_super) {
    __extends(GameEleSprit, _super);
    function GameEleSprit(resource, score) {
        var _this = _super.call(this, RES_1.RES.getRes(resource)) || this;
        _this.resource = resource;
        _this.score = score;
        return _this;
    }
    GameEleSprit.prototype.addPythicCont = function (cont, debug) {
        if (debug === void 0) { debug = false; }
        this.pythicCont = cont;
        cont.initParent(this);
        if (debug) {
            cont.draw();
        }
    };
    return GameEleSprit;
}(FYGE.Sprite));
function isInside(p1, p2, point) {
    if (point.x > p1.x && point.x < p2.x && point.y > p1.y && point.y < p2.y) {
        return true;
    }
    return false;
}
function isInsidePro(p1, p2, p3, p4, point) {
    if (p1.y === p2.y) {
        return isInside(p1, p3, point);
    }
    var l = Math.sqrt(Math.pow((p3.x - p4.x), 2) + Math.pow((p3.y - p4.y), 2));
    var cos = (p3.x - p4.x) / l;
    var sin = (p3.y = p4.y) / l;
    return isInside({
        x: p4.x,
        y: p4.y + Math.sqrt(Math.pow((p1.x - p4.x), 2) + Math.pow((p1.y - p4.y), 2))
    }, {
        x: p4.x + Math.sqrt(Math.pow((p3.x - p4.x), 2) + Math.pow((p3.y - p4.y), 2)),
        y: p4.y
    }, point);
}
function poslen(p1, p2) {
    return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2));
}
function onCollsionJudge(cont1, cont2) {
    if (cont1.type === 'circle' && cont2.type === 'circle') {
        return Math.pow(cont1.x - cont2.x, 2) + Math.pow(cont1.y - cont2.y, 2) < Math.pow(cont1.radius + cont2.radius, 2);
    }
    if (cont1.type === 'rect' && cont2.type === 'rect') {
        var rectCont1 = cont1;
        var rectCont2 = cont2;
        return Math.abs(rectCont1.x + rectCont1.w / 2 - rectCont2.x - rectCont2.w / 2) < (rectCont1.w + rectCont2.w) / 2 && Math.abs(rectCont1.y + rectCont1.h / 2 - rectCont2.y - rectCont2.h / 2) < (rectCont1.h + rectCont2.h) / 2;
    }
    if (cont1.type === 'circle' && cont2.type === 'rect') {
        var rectCont2 = cont2;
        var circleCont1 = cont1;
        var radius = circleCont1.radius;
        return isInside({
            x: rectCont2.x - circleCont1.radius,
            y: rectCont2.y
        }, {
            x: rectCont2.x + rectCont2.w + circleCont1.radius,
            y: rectCont2.y + rectCont2.h
        }, circleCont1) || isInside({
            x: rectCont2.x,
            y: rectCont2.y - circleCont1.radius
        }, {
            x: rectCont2.x + rectCont2.w,
            y: rectCont2.y + rectCont2.h + circleCont1.radius
        }, circleCont1) || poslen(rectCont2, circleCont1) < radius || poslen({
            x: rectCont2.x + rectCont2.w,
            y: rectCont2.y
        }, circleCont1) < radius || poslen({
            x: rectCont2.x,
            y: rectCont2.y + rectCont2.h
        }, circleCont1) < radius || poslen({
            x: rectCont2.x + rectCont2.w,
            y: rectCont2.y + rectCont2.h
        }, circleCont1) < radius;
    }
    if (cont1.type === 'rect' && cont2.type === 'circle') {
        var circleCont2 = cont2;
        var rectCont1 = cont1;
        return Math.pow(circleCont2.x - rectCont1.x - rectCont1.w / 2, 2) + Math.pow(circleCont2.y - rectCont1.y - rectCont1.h / 2, 2) < Math.pow(circleCont2.radius + rectCont1.w / 2, 2);
    }
}
var GameEles = [
    {
        resource: 'bellSprit.png',
        probability: 30,
        score: 1,
    },
    {
        resource: 'orangeSprit.png',
        probability: 25,
        score: 2,
    },
    {
        resource: 'boomSprit.png',
        probability: 10,
        score: -1,
    }
];
var IndexScene = (function (_super) {
    __extends(IndexScene, _super);
    function IndexScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._score = 0;
        _this.spl = 0;
        _this.speed = 400;
        _this.clock = new Clock_1.default();
        _this.axisX = [50, 650];
        _this.gameElesList = [];
        _this.GameStatus = 0;
        _this._musicStatus = false;
        _this._cacheLen = 0;
        return _this;
    }
    Object.defineProperty(IndexScene.prototype, "musicStatus", {
        get: function () {
            return this._musicStatus;
        },
        set: function (v) {
            // if (this._musicStatus === v)
            //     return;
            this._musicStatus = v;
            this.musicBtn.texture = RES_1.RES.getRes(v ? 'music-on.png' : 'music-off.png');
            Main_1.GDispatcher.dispatchEvent(GameEvent.GAME_BGM, v);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IndexScene.prototype, "score", {
        get: function () {
            return this._score;
        },
        set: function (s) {
            this._score = s;
            this.scoreBitMapText.text = s + '';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IndexScene.prototype, "currGameEleResource", {
        get: function () {
            var probalibityList = GameEles.reduce(function (pre, curr) {
                pre.push(curr.probability + (pre[pre.length - 1] || 0));
                return pre;
            }, []);
            var p = randomNum(0, probalibityList[probalibityList.length - 1]);
            var randomEle = GameEles[probalibityList.findIndex(function (i) { return p < i; })];
            return randomEle;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IndexScene.prototype, "groupNames", {
        get: function () {
            return ['GameScene'];
        },
        enumerable: false,
        configurable: true
    });
    IndexScene.prototype.initUi = function () {
        UI_1.default.Sp(this, 'back.png');
        this.initCountDown();
        this.initScoreBoard();
        this.onInitGamer();
        this.initMusicBtn(Tools_1.Tools.PAGE.musicStatus);
    };
    IndexScene.prototype.start = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                _super.prototype.start.call(this);
                return [2];
            });
        });
    };
    IndexScene.prototype.initCountDown = function () {
        this.CountDownCont = this.addChild(new CountDownBoard(Tools_1.Tools.PAGE.countDownNum));
        this.CountDownCont.position.set(0, layers_1.layers.stageOffsetY + 100);
        this.CountDownCont.addEventListener('countdown', this.onGameOver, this);
    };
    IndexScene.prototype.initScoreBoard = function () {
        var scoreBoardCont = UI_1.default.Ctn(this);
        scoreBoardCont.position.set(layers_1.layers.stageWidth - 229, layers_1.layers.stageOffsetY + 100);
        UI_1.default.Sp(scoreBoardCont, 'score-board-back.png');
        this.scoreBitMapText = scoreBoardCont.addChild(new FYGE.BitmapText(Tools_1.Tools.getNumTextures('')));
        this.scoreBitMapText.position.set(150, 28);
        this.score = 0;
    };
    IndexScene.prototype.initMusicBtn = function (isOn) {
        var _this = this;
        if (isOn === void 0) { isOn = false; }
        this.musicBtn = UI_1.default.Btn(this, isOn ? 'music-on.png' : 'music-off.png', function () {
            _this.musicStatus = !_this.musicStatus;
        }, this, 660, layers_1.layers.stageOffsetY + 200);
    };
    IndexScene.prototype.onShowPreCountDown = function () {
        return __awaiter(this, void 0, void 0, function () {
            var preCountDownCont;
            var _this = this;
            return __generator(this, function (_a) {
                preCountDownCont = UI_1.default.Ctn(this);
                UI_1.default.Rect(preCountDownCont, 750, 1624, 0x000000, 0, 0, 0, 0.5);
                return [2, new Promise(function (wrapResolve) { return __awaiter(_this, void 0, void 0, function () {
                        function aniFunc() {
                            return new Promise(function (r) {
                                FYGE.Tween.get(num)
                                    .to({ alpha: 1 }, 0.6);
                                FYGE.Tween.get(num)
                                    .set({ scaleX: 0, scaleY: 0 })
                                    .to({ scaleX: 1.1, scaleY: 1.1 }, 400)
                                    .to({ scaleX: 1, scaleY: 1 }, 200)
                                    .wait(600)
                                    .call(r);
                            });
                        }
                        var num;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    num = UI_1.default.Sp(preCountDownCont, 'preCountDown3.png');
                                    num.anchorTexture.set(0.5);
                                    num.alpha = 0;
                                    num.position.set(375, 812);
                                    return [4, aniFunc()];
                                case 1:
                                    _a.sent();
                                    num.alpha = 0;
                                    num.texture = RES_1.RES.getRes('preCountDown2.png');
                                    return [4, aniFunc()];
                                case 2:
                                    _a.sent();
                                    num.alpha = 0;
                                    num.texture = RES_1.RES.getRes('preCountDown1.png');
                                    return [4, aniFunc()];
                                case 3:
                                    _a.sent();
                                    num.alpha = 0;
                                    num.texture = RES_1.RES.getRes('preCountDownGo.png');
                                    return [4, aniFunc()];
                                case 4:
                                    _a.sent();
                                    wrapResolve();
                                    preCountDownCont.destroy();
                                    return [2];
                            }
                        });
                    }); })];
            });
        });
    };
    IndexScene.prototype.onShowNewGuySteps = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (r) {
                        var NewGuyCont = UI_1.default.Ctn(_this);
                        var stepSprite = UI_1.default.Sp(NewGuyCont, 'step1.png');
                        var step = 1;
                        function showStepImg() {
                            stepSprite.texture = RES_1.RES.getRes("step" + step + ".png");
                            step++;
                            if (step > 4) {
                                NewGuyCont.destroy();
                                r();
                            }
                        }
                        showStepImg();
                        NewGuyCont.addEventListener(FYGE.MouseEvent.CLICK, function () {
                            showStepImg();
                        });
                    })];
            });
        });
    };
    IndexScene.prototype.onGameInit = function () {
        this.score = 0;
        this.musicStatus = Tools_1.Tools.PAGE.musicStatus;
        this.recoverGameEles();
        this.onInitGamer();
    };
    IndexScene.prototype.onGameStart = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!Tools_1.Tools.PAGE.isNewGuy) return [3, 2];
                        return [4, this.onShowNewGuySteps()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4, this.onShowPreCountDown()];
                    case 3:
                        _a.sent();
                        this.onGameInit();
                        this.GameStatus = 1;
                        this.CountDownCont.restart();
                        return [2];
                }
            });
        });
    };
    IndexScene.prototype.onGameOver = function () {
        this.GameStatus = 0;
        this.CountDownCont.stopCountDown();
        Main_1.GDispatcher.dispatchEvent(GameEvent.GAME_OVER, {
            score: this.score
        });
    };
    IndexScene.prototype.onInitGamer = function () {
        if (!this.RobotGameEle) {
            this.RobotGameEle = this.addChild(new GameEleSprit('robotGamer.png'));
            this.RobotGameEle.addPythicCont(new RectPythicCont(50, 190, 100, 60), true);
        }
        this.RobotGameEle.position.set(375 - this.RobotGameEle.width / 2, 1100);
    };
    IndexScene.prototype.onInitFallGameEle = function () {
        this.spl = randomNum(80, 300);
        var curr = this.currGameEleResource;
        var currResource = curr.resource;
        var currGameELe = GPool_1.GPool.takeOut(currResource) || this.addChild(new GameEleSprit(currResource, curr.score));
        currGameELe.visible = true;
        this.gameElesList.push(currGameELe);
        currGameELe.position.set(randomNum(this.axisX[0], this.axisX[1]), layers_1.layers.stageOffsetY);
        if (!currGameELe.pythicCont) {
            var debug = true;
            if (currResource === 'bellSprit.png') {
                currGameELe.addPythicCont(new CirclePythicCont(36, 40, 40), debug);
            }
            else if (currResource === 'orangeSprit.png') {
                currGameELe.addPythicCont(new CirclePythicCont(50, 48, 34), debug);
            }
            else if (currResource === 'boomSprit.png') {
                currGameELe.addPythicCont(new CirclePythicCont(32, 55, 34), debug);
            }
        }
    };
    IndexScene.prototype.initEvents = function () {
        _super.prototype.initEvents.call(this);
        this.addEventListener(FYGE.Event.ENTER_FRAME, this.frameUpdate, this);
        this.RobotGameEle.addEventListener(FYGE.MouseEvent.MOUSE_DOWN, this.onMouseDown, this);
        Main_1.GDispatcher.addEventListener(GameEvent.GAME_START, this.onGameStart, this);
    };
    IndexScene.prototype.removeEvents = function () {
        _super.prototype.removeEvents.call(this);
        this.removeEventListener(FYGE.Event.ENTER_FRAME, this.frameUpdate, this);
        this.RobotGameEle.removeEventListener(FYGE.MouseEvent.MOUSE_DOWN, this.onMouseDown, this);
        Main_1.GDispatcher.removeEventListener(GameEvent.GAME_START, this.onGameStart, this);
    };
    IndexScene.prototype.onMouseDown = function (e) {
        this.startPos = {
            x: e.stageX,
            y: e.stageY
        };
        this.startRobotPos = {
            x: this.RobotGameEle.x,
            y: this.RobotGameEle.y
        };
        this.stage.addEventListener(FYGE.MouseEvent.MOUSE_MOVE, this.onMouseMove, this);
        this.stage.once(FYGE.MouseEvent.MOUSE_UP, function () {
            this.stage.removeEventListener(FYGE.MouseEvent.MOUSE_MOVE, this.onMouseMove);
        });
    };
    IndexScene.prototype.onMouseMove = function (e) {
        if (!this.GameStatus)
            return;
        var currPos = {
            x: e.stageX,
            y: e.stageY
        };
        if (currPos.x < 100 || currPos.x > 650)
            return;
        this.RobotGameEle.position.set(this.startRobotPos.x + currPos.x - this.startPos.x, this.startRobotPos.y);
    };
    IndexScene.prototype.recoverGameEles = function () {
        for (var i = 0; i < this.gameElesList.length; i++) {
            var gameEle = this.gameElesList[i];
            gameEle.visible = false;
            GPool_1.GPool.takeIn(gameEle.resource, gameEle);
        }
        this.gameElesList.length = 0;
    };
    IndexScene.prototype.frameUpdate = function () {
        if (!this.GameStatus)
            return;
        var delta = this.clock.getDelta();
        if (delta > 100)
            return;
        var sdt = this.speed * delta;
        this._cacheLen += sdt;
        if (this._cacheLen > this.spl) {
            this._cacheLen = 0;
            this.onInitFallGameEle();
        }
        for (var i = this.gameElesList.length - 1; i >= 0; i--) {
            var item = this.gameElesList[i];
            item.y += sdt;
            if (item.y > 1624) {
                item.visible = false;
                GPool_1.GPool.takeIn(item.resource, item);
                this.gameElesList.splice(i, 1);
            }
            if (onCollsionJudge(item.pythicCont.commonPythicPos, this.RobotGameEle.pythicCont.commonPythicPos)) {
                item.visible = false;
                GPool_1.GPool.takeIn(item.resource, item);
                this.gameElesList.splice(i, 1);
                if (item.score == -1) {
                    console.log('boom', item);
                    this.onGameOver();
                }
                this.score += item.score;
            }
        }
    };
    return IndexScene;
}(Scene_1.Scene));
exports.default = IndexScene;


/***/ })

/******/ });
});
//# sourceMappingURL=output.js.map