/**消息类，用来传递数据与方法 */
class Message {
    constructor() {
        if (!this.event_list) {
            this.event_list = {};
        }
    }
    static get Ins() {
        if (!this._ins)
            this._ins = new Message();
        return this._ins;
    }
    /**添加一个消息侦听器 */
    on(eventName, content) {
        var _event, ctx;
        _event = this.event_list;
        //如果事件列表为空，就初始化
        if (!_event) {
            _event = this.event_list = {};
        } else {
            ctx = this.event_list[eventName];
        }
        //如果监听不存在，就新建一个监听，然后把监听器数量置为1
        if (!ctx) {
            ctx = this.event_list[eventName] = content;
            ctx.ListenerCount = 1;
        }
        //如果监听存在并且只有一个，就将监听赋值多个监听器的数组，监听器数量为数组长度
        else if (typeof (ctx) == 'function') {
            ctx = this.event_list[eventName] = [ctx, content];
            ctx.ListenerCount = ctx.length;
        }
        //如果监听存在并且有多个，就直接push
        else if (Array.isArray(ctx)) {
            ctx.push(content);
            ctx.ListenerCount = ctx.length;
        }
    }

    /**派发一个消息 */
    emit(eventName) {
        try {
            var _event, ctx;
            //用slice方法将参数分离，第一个参数为监听器名称，后面的都会作为传参使用
            var args = Array.prototype.slice.call(arguments, 1);
            // console.log(args)
            _event = this.event_list;
            if (_event) {
                ctx = this.event_list[eventName];
            }
            //如果没有监听器，就直接返回
            if (!ctx) {
                return false;
            }
            //如果监听器只有一个，直接apply触发
            else if (typeof (ctx) == 'function') {
                ctx.apply(this, args);
            }
            //如果监听器有多个，数组循环apply
            else if (Array.isArray(ctx)) {
                for (var i = 0; i < ctx.length; i++) {
                    ctx[i].apply(this, args);
                }
            }
        } catch (e) {
            console.warn('发送消息有问题---》', e)
        }

    }

    /**删除一个消息侦听器 */
    remove(eventName, content) {
        var _event, ctx, index = 0;
        _event = this.event_list;
        if (!_event) {
            return this;
        } else {
            ctx = this.event_list[eventName];
        }
        if (!ctx) {
            return this;
        }
        if (typeof (ctx) == 'function') {
            if (ctx === content) {
                delete _event[eventName];
            }
        } else if (Array.isArray(ctx)) {
            for (var i = 0; i < ctx.length; i++) {
                if (ctx[i] === content) {
                    this.event_list[eventName].splice(i - index, 1);
                    ctx.ListenerCount = ctx.length;
                    if (this.event_list[eventName].length === 0) {
                        delete this.event_list[eventName]
                    }
                    index++;
                }
            }
        }
    }

    /**删除所有消息侦听器 */
    removeAllListener(eventName) {
        var _event, ctx;
        _event = this.event_list;
        if (!_event) {
            return this;
        }
        ctx = this.event_list[eventName];
        if (arguments.length === 0 && (!eventName)) {
            var keys = Object.keys(this.event_list);
            for (var i = 0, key; i < keys.length; i++) {
                key = keys[i];
                delete this.event_list[key];
            }
        }
        if (ctx || typeof (ctx) == 'function' || Array.isArray(ctx)) {
            delete this.event_list[eventName];
        } else {
            return this;
        }
    }
}
const messageIns = Message.Ins;
export default messageIns;
