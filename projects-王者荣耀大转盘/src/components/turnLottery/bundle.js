import React, {
  forwardRef,
  useState,
  useRef,
  useImperativeHandle,
  useEffect
} from 'react';
import './meta.json';

var e = [],
  t = [];

function n(n, r) {
  if (n && "undefined" != typeof document) {
    var a, s = !0 === r.prepend ? "prepend" : "append",
      d = !0 === r.singleTag,
      i = "string" == typeof r.container ? document.querySelector(r.container) : document.getElementsByTagName("head")[0];
    if (d) {
      var u = e.indexOf(i); - 1 === u && (u = e.push(i) - 1, t[u] = {}), a = t[u] && t[u][s] ? t[u][s] : t[u][s] = c();
    } else a = c();
    65279 === n.charCodeAt(0) && (n = n.substring(1)), a.styleSheet ? a.styleSheet.cssText += n : a.appendChild(document.createTextNode(n));
  }

  function c() {
    var e = document.createElement("style");
    if (e.setAttribute("type", "text/css"), r.attributes)
      for (var t = Object.keys(r.attributes), n = 0; n < t.length; n++) e.setAttribute(t[n], r.attributes[t[n]]);
    var a = "prepend" === s ? "afterbegin" : "beforeend";
    return i.insertAdjacentElement(a, e), e
  }
}

var css = ".turntable-bd {\n  width: 6.88rem !important;\n  height: 6.88rem !important;\n right: 0rem;\n top: 2.01rem;\n position: absolute;\n }\n\n.turntable-bd img {\n  width: 100%;\n  height: 100%;\n}\n\n.turntable {\n  background-repeat: no-repeat;\n  background-size: 100% 100%;\n  position: absolute;\n  top: 0.37rem;\n  left: 50%;\n  overflow: hidden;\n  border-radius: 50%;\n}\n\n.turntable .prize-list .prize {\n  position: absolute;\n  top: 0.4rem;\n  left: 1.1rem;\n  transform-origin: right bottom;\n}\n\n.turntable .prize-list .prize .prize-dialog {\n  position: absolute;\n  text-align: center;\n}\n\n.turntable .prize-list .prize .prize-dialog img {\n  width: 100%;\n  height: 100%;\n}";
n(css, {});

function extend() {
  var length = arguments.length;
  var target = arguments[0] || {};
  if (typeof target != 'object' && typeof target != 'function') {
    target = {};
  }
  if (length == 1) {
    target = this;
    i--;
  }
  for (var i = 1; i < length; i++) {
    var source = arguments[i];
    for (var key in source) {
      // 使用for in会遍历数组所有的可枚举属性，包括原型。
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
}

var supportedCSS,
  styles = document.getElementsByTagName('head')[0].style,
  toCheck = 'transformProperty WebkitTransform OTransform msTransform MozTransform'.split(
    ' '
  );
for (var a = 0; a < toCheck.length; a++) {
  if (styles[toCheck[a]] !== undefined) {
    supportedCSS = toCheck[a];
  }
}

var Wilq32 = window.Wilq32 || {};
Wilq32.PhotoEffect = (function () {
  if (supportedCSS) {
    return function (img, parameters) {
      img.Wilq32 = {
        PhotoEffect: this
      };

      this._img = this._rootObj = this._eventObj = img;
      this._handleRotation(parameters);
    };
  } else {
    return function (img, parameters) {
      // Make sure that class and id are also copied - just in case you would like to refeer to an newly created object
      this._img = img;

      this._rootObj = document.createElement('span');
      this._rootObj.style.display = 'inline-block';
      this._rootObj.Wilq32 = {
        PhotoEffect: this
      };
      img.parentNode.insertBefore(this._rootObj, img);

      if (img.complete) {
        this._Loader(parameters);
      } else {
        var self = this;
        // TODO: Remove jQuery dependency
        // this._img.addEv
        jQuery(this._img).bind('load', function () {
          self._Loader(parameters);
        });
      }
    };
  }
})();

Wilq32.PhotoEffect.prototype = {
  _setupParameters: function (parameters) {
    this._parameters = this._parameters || {};
    if (typeof this._angle !== 'number') this._angle = 0;
    if (typeof parameters.angle === 'number') this._angle = parameters.angle;
    this._parameters.animateTo =
      typeof parameters.animateTo === 'number' ?
      parameters.animateTo :
      this._angle;

    this._parameters.step = parameters.step || this._parameters.step || null;
    this._parameters.easing =
      parameters.easing ||
      this._parameters.easing ||
      function (x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
      };
    this._parameters.duration =
      parameters.duration || this._parameters.duration || 1000;
    this._parameters.callback =
      parameters.callback || this._parameters.callback || function () {};
    if (parameters.bind && parameters.bind != this._parameters.bind)
      this._BindEvents(parameters.bind);
  },
  _handleRotation: function (parameters) {
    this._setupParameters(parameters);
    if (this._angle == this._parameters.animateTo) {
      this._rotate(this._angle);
    } else {
      this._animateStart();
    }
  },

  _BindEvents: function (events) {
    if (events && this._eventObj) {
      // Unbinding previous Events
      if (this._parameters.bind) {
        var oldEvents = this._parameters.bind;
        for (var a in oldEvents)
          if (oldEvents.hasOwnProperty(a))
            // TODO: Remove jQuery dependency
            jQuery(this._eventObj).unbind(a, oldEvents[a]);
      }

      this._parameters.bind = events;
      for (var a in events)
        if (events.hasOwnProperty(a))
          // TODO: Remove jQuery dependency
          jQuery(this._eventObj).bind(a, events[a]);
    }
  },

  _Loader: (function () {
    return function (parameters) {
      this._rootObj.setAttribute('id', this._img.getAttribute('id'));
      this._rootObj.className = this._img.className;

      this._width = this._img.width;
      this._height = this._img.height;
      this._widthHalf = this._width / 2; // used for optimisation
      this._heightHalf = this._height / 2; // used for optimisation

      var _widthMax = Math.sqrt(
        this._height * this._height + this._width * this._width
      );

      this._widthAdd = _widthMax - this._width;
      this._heightAdd = _widthMax - this._height; // widthMax because maxWidth=maxHeight
      this._widthAddHalf = this._widthAdd / 2; // used for optimisation
      this._heightAddHalf = this._heightAdd / 2; // used for optimisation

      this._img.parentNode.removeChild(this._img);

      this._aspectW =
        (parseInt(this._img.style.width, 10) || this._width) / this._img.width;
      this._aspectH =
        (parseInt(this._img.style.height, 10) || this._height) /
        this._img.height;

      this._canvas = document.createElement('canvas');
      this._canvas.setAttribute('width', this._width);
      this._canvas.style.position = 'relative';
      this._canvas.style.left = -this._widthAddHalf + 'px';
      this._canvas.style.top = -this._heightAddHalf + 'px';
      this._canvas.Wilq32 = this._rootObj.Wilq32;

      this._rootObj.appendChild(this._canvas);
      this._rootObj.style.width = this._width + 'px';
      this._rootObj.style.height = this._height + 'px';
      this._eventObj = this._canvas;

      this._cnv = this._canvas.getContext('2d');
      this._handleRotation(parameters);
    };
  })(),

  _animateStart: function () {
    if (this._timer) {
      clearTimeout(this._timer);
    }
    this._animateStartTime = +new Date();
    this._animateStartAngle = this._angle;
    this._animate();
  },
  _animate: function () {
    var actualTime = +new Date();
    var checkEnd =
      actualTime - this._animateStartTime > this._parameters.duration;

    // TODO: Bug for animatedGif for static rotation ? (to test)
    if (checkEnd && !this._parameters.animatedGif) {
      clearTimeout(this._timer);
    } else {
      if (this._canvas || this._vimage || this._img) {
        var angle = this._parameters.easing(
          0,
          actualTime - this._animateStartTime,
          this._animateStartAngle,
          this._parameters.animateTo - this._animateStartAngle,
          this._parameters.duration
        );
        this._rotate(~~(angle * 10) / 10);
      }
      if (this._parameters.step) {
        this._parameters.step(this._angle);
      }
      var self = this;
      this._timer = setTimeout(function () {
        self._animate.call(self);
      }, 10);
    }

    // To fix Bug that prevents using recursive function in callback I moved this function to back
    if (this._parameters.callback && checkEnd) {
      this._angle = this._parameters.animateTo;
      this._rotate(this._angle);
      this._parameters.callback.call(this._rootObj);
    }
  },

  _rotate: (function () {
    var rad = Math.PI / 180;
    if (supportedCSS) {
      return function (angle) {
        this._angle = angle;
        this._img.style[supportedCSS] =
          'rotate3d(0,0,1,' + (angle % 360) + 'deg)';
      };
    } else {
      return function (angle) {
        this._angle = angle;
        angle = (angle % 360) * rad;
        // clear canvas
        this._canvas.width = this._width + this._widthAdd;
        this._canvas.height = this._height + this._heightAdd;

        // REMEMBER: all drawings are read from backwards.. so first function is translate, then rotate, then translate, translate..
        this._cnv.translate(this._widthAddHalf, this._heightAddHalf); // at least center image on screen
        this._cnv.translate(this._widthHalf, this._heightHalf); // we move image back to its orginal
        this._cnv.rotate(angle); // rotate image
        this._cnv.translate(-this._widthHalf, -this._heightHalf); // move image to its center, so we can rotate around its center
        this._cnv.scale(this._aspectW, this._aspectH); // SCALE - if needed ;)
        this._cnv.drawImage(this._img, 0, 0); // First - we draw image
      };
    }
  })()
};

class Rotate {
  constructor(el) {

    if (!el) {
      return false;
    }
    if (el instanceof HTMLElement) {
      this.$el = el;
    } else if (typeof el === 'string') {
      if (el.indexOf('#') === 0) {
        this.$el = document.getElementById(el.replace('#', ''));
      } else {
        this.$el = document.querySelector(el);
      }
    }
  }
  rotate(parameters) {

    if (typeof parameters == 'undefined') return;
    if (typeof parameters == 'number')
      parameters = {
        angle: parameters
      };
    if (!this.$el.Wilq32 || !this.$el.Wilq32.PhotoEffect) {
      var paramClone = extend({}, parameters); // $.extend(true, {}, parameters);
      var newRotObject = new Wilq32.PhotoEffect(this.$el, paramClone)._rootObj;
    } else {
      this.$el.Wilq32.PhotoEffect._handleRotation(parameters);
    }
  }
  getRotateAngle() {
    let res = 0;
    if (this.$el.Wilq32 && this.$el.Wilq32.PhotoEffect) {
      res = this.$el.Wilq32.PhotoEffect._angle;
    }
    return res;
  }
  stopRotate() {
    if (this.$el.Wilq32 && this.$el.Wilq32.PhotoEffect) {
      clearTimeout(this.$el.Wilq32.PhotoEffect._timer);
    }
  }
}
console.log('Rotate', Rotate);
var rotate = Rotate;

/** rpx 转为 px */
function px2rem(px) {
  return (px / 100) + 'rem'
}

let $rotate;

function TurntableImpl(props, ref) {
  let {
    className,
    prizeList = [],
    turnTableConfig,
    onResult,
    renderItem,
    renderCenter
  } = props;
  const {
    prizeCount,
    bg,
    rotateBg,
    prizeWidth,
    initRoate = true
  } = turnTableConfig.props;
  // 获取配置图片尺寸
  let bgImg = new Image();
  let rotateBgImg = new Image();
  const [bgImgWidth, setBgImgWidth] = useState(0);
  const [rotateBgImgWidth, setRotateBgImgWidth] = useState(0);
  bgImg.src = bg;
  rotateBgImg.src = rotateBg;
  bgImg.onload = function () {
    setBgImgWidth(bgImg.width);
  };
  rotateBgImg.onload = function () {
    setRotateBgImgWidth(rotateBgImg.width);
  };
  // 初始化数据
  let thanksIndex = prizeList.findIndex((item) => {
    return item.prizeId === 'thanks';
  });
  // 无谢谢参与时，初始角度为0；有谢谢参与，则为谢谢参与位置
  thanksIndex = thanksIndex > -1 ? thanksIndex : null;
  let thanksDeg = 0;
  let turntableDom = useRef();
  let speed = 1300;
  let curWidth = window.screen.width;
  let tarWidth = 375;
  let scale = curWidth / tarWidth;
  let prizeListStyle = {};
  // 渲染转盘奖品
  handlePrizeStyle();
  useImperativeHandle(ref, () => ({
    rotateStart,
    rotateStop,
    rotateInit: gameReset
  }));
  useEffect(() => {
    // 获取大转盘dom
    $rotate = new rotate(turntableDom.current);
    if (initRoate) {
      gameReset();
    }
  }, []);

  function handlePrizeStyle() {
    let radius = rotateBgImgWidth / 2;
    let oneAngle = 360 / prizeCount;
    let prizeHeight = prizeWidth;
    !!prizeList && prizeList.map((element, i) => {
      let centerX = radius - Math.sin((oneAngle / 2 + oneAngle * (i - 1)) / 180 * Math.PI) * radius * 0.75;
      let centerY = radius - Math.cos((oneAngle / 2 + oneAngle * (i - 1)) / 180 * Math.PI) * radius * 0.75;
      let disleft = centerX - prizeWidth / 2;
      let distop = centerY - prizeHeight / 2;
      // let disleft = centerX;
      // let distop = centerY;
      let rotate = oneAngle / 2 - oneAngle * i;
      // 节点样式
      prizeListStyle[i] = {
        width: px2rem(prizeWidth),
        height: px2rem(prizeHeight),
        left: disleft * scale / 2 + 'px',
        top: distop * scale / 2 + 'px',
        transformOrigin: 'center',
        transform: `rotate(${rotate}deg)`,
        position: 'absolute'
      };
      return element;
    });
  }

  function getRotateAngle() {
    return $rotate.getRotateAngle() % 60;
  }
  /**
   * 游戏重置
   */
  function gameReset() {
    // thanksDeg = ((prizeCount - thanksIndex) * 360) / prizeCount - 360 / prizeCount / 2; //初始化，转动到谢谢参与的位置。
    if (thanksIndex === null) {
      // 无谢谢参与
      thanksDeg = 0;
    } else {
      thanksDeg = -360 / prizeCount / 2 + thanksIndex * 360 / prizeCount;
    }
    $rotate.rotate(thanksDeg);
    $rotate.rotate({
      angle: thanksDeg,
      animateTo: 360 * 10,
      duration: 1 * 3000000,
      easing: function (x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
      }
    });
  }
  /**
   * 开始旋转
   * @return {[type]} [description]
   */
  function rotateStart() {
    $rotate.rotate({
      angle: getRotateAngle(),
      animateTo: 360 * 20,
      duration: speed * 20,
      easing: function (x, t, b, c, d) {
        return t;
      },
      callback: () => {
        /*
         * 超过最大等待时间
         */
        //window.xhr && window.xhr.abort();
        rotateError();
      }
    });
  }
  /**
   * 抽奖结果
   * @param type
   */
  function rotateStop(curIndex) {
    let angle;
    prizeList.forEach((item, index) => {
      if (index === curIndex) {
        console.info('中奖Index' + curIndex + ' 奖品ID' + item.prizeId);
        // angle = ((prizeCount - item.index) * 360) / prizeCount + -360 / prizeCount / 2;
        angle = -360 / prizeCount / 2 + index * 360 / prizeCount;
        return;
      }
    });
    angle = angle + 360;
    $rotate.stopRotate();
    $rotate.rotate({
      angle: getRotateAngle(),
      animateTo: angle,
      duration: speed * 1,
      easing: function (x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
      },
      callback: function () {
        setTimeout(function () {
          // 延迟待停到中奖奖品后，展示抽奖弹窗
          onResult && onResult();
        }, 100);
      }
    });
  }
  /**
   * 抽奖失败
   * @param  {[type]} type   [description]
   * @return {[type]}        [description]
   */
  function rotateError() {
    $rotate.stopRotate();
    $rotate.rotate({
      angle: getRotateAngle(),
      animateTo: thanksDeg + 360 * 2,
      duration: speed * 1,
      easing: function (x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
      },
      callback: function () {
        // if (type === 'networkError'){
        //   console.log('网络异常，请稍后再试')
        // }
      }
    });
  }
  return (React.createElement("div", {
      className: "turntable-wrap " + className
    },
    React.createElement("div", {
        className: "turntable-bd",
        style: {
          width: px2rem(bgImgWidth),
          height: px2rem(bgImgWidth)
        }
      },
      React.createElement("img", {
        src: bg
      })),
    React.createElement("div", {
        className: "turntable",
        ref: turntableDom,
        style: {
          backgroundImage: 'url(' + rotateBg + ')',
          width: px2rem(rotateBgImgWidth),
          height: px2rem(rotateBgImgWidth),
          marginLeft: px2rem(-rotateBgImgWidth / 2)
        }
      },
      React.createElement("div", {
        className: "prize-list"
      }, prizeList.map((item, index) => {
        return React.createElement("div", {
          className: "prize",
          key: index,
          style: prizeListStyle[index]
        }, renderItem(item, index));
      }))),
    renderCenter()));
}
// @ts-ignore
const Turntable = forwardRef(TurntableImpl);

export {
  Turntable
};