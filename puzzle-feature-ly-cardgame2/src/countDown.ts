// import { EventEmitter } from 'eventemitter3';
// import { EventEmitter } from "EventEmitter";
var EventEmitter = require('eventemitter3');

export interface RemainTimeData {
    /** 天数 */
    days: number;
    /**
     * 小时数
     */
    hours: number;
    /**
     * 分钟数
     */
    minutes: number;
    /**
     * 秒数
     */
    seconds: number;
    /**
     * 毫秒数
     */
    count: number;
}

export type CountdownCallback = (remainTimeData: RemainTimeData, remainTime: number) => void;

enum CountdownStatus {
    running,
    paused,
    stoped,
}

export enum CountdownEventName {
    START = 'start',
    STOP = 'stop',
    RUNNING = 'running',
}

interface CountdownEventMap {
    [CountdownEventName.START]: [];
    [CountdownEventName.STOP]: [];
    [CountdownEventName.RUNNING]: [RemainTimeData, number];
}

export class Countdown extends EventEmitter<CountdownEventMap> {
    public endTime: number;
    public remainTime: number = 0;
    private status: CountdownStatus = CountdownStatus.stoped;
    private step: number;

    constructor(endTime: number, step: number = 1e3) {
        super();

        this.endTime = endTime;//结束时间
        this.step = step;//状态

        this.start();
    }

    private start() {
        this.emit(CountdownEventName.START);//监听状态

        this.status = CountdownStatus.running;//改变状态
        this.countdown();//执行倒计时
    }

    private stop() {
        this.emit(CountdownEventName.STOP);//监听状态

        this.status = CountdownStatus.stoped;//改变状态
    }

    private countdown() {
        //如果没有运行直接返回
        if (this.status !== CountdownStatus.running) {
            return;
        }

        //获取剩余时间
        this.remainTime = Math.max(this.endTime--, 0);
        //监听
        this.emit(CountdownEventName.RUNNING,this.remainTime);

        //判断倒计时执行条件
        if (this.remainTime > 0) {
            setTimeout(() => this.countdown(), this.step);
        } else {
            this.stop();
        }
    }

}
