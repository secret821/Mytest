
export default class Turn extends FYGE.Sprite {
    
    //图片起始位置
    private _originPos: FYGE.Point;
    public get originPos(){return this._originPos}
    //鼠标按下起始点
    private _startPoint: FYGE.Point;

    startDrag = (event: FYGE.MouseEvent) => {
        //鼠标抬起后应该移出舞台移动事件，否则会重复添加事件
        this.stage.addEventListener(FYGE.MouseEvent.MOUSE_MOVE, this.onMouseMove, this);
        //图片鼠标弹起事件，事件触发一次即移除，否则会重复添加鼠标弹起事件
        this.stage.once(FYGE.MouseEvent.MOUSE_UP, this.onMouseUp, this);

        this._originPos = new FYGE.Point(this.x, this.y);
        this._startPoint = new FYGE.Point(event.stageX, event.stageY);
    }

    //鼠标抬起销毁事件
    private onMouseUp(event: FYGE.MouseEvent) {
        //鼠标抬起后应该移出舞台移动事件，否则会重复添加事件
        this.stage.removeEventListener(FYGE.MouseEvent.MOUSE_MOVE, this.onMouseMove, this);
        this.dispatchEvent('DROP', this.getDropPoint(event));
    }

    //获取最终的位置
    private onMouseMove(event: FYGE.MouseEvent) {
        const container = new FYGE.Container();
        //鼠标当前位置
        const currentPoint = { x: event.stageX, y: event.stageY };
        
        container.skewX = 180
        container.skewX = 180
        container.anchorX = 0.5
        container.anchorY = 0.5
        //给个动画
        FYGE.Tween.get(container, { loop: false })
            .to({
                skewY: 180
            }, 5000);
    }

    //获取放下的点
    protected getDropPoint(event: FYGE.MouseEvent) {
        throw new Error("Method not implemented.");
    }

    //触发落下事件处理函数
    public onDrop = (drag: Turn): void => {
        throw new Error("Method not implemented.");
    }

    //拖动结束处理函数
    public onDragEnd(drop: Turn) {
        throw new Error("Method not implemented.");
    }
}