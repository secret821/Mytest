
export default class DragDropable extends FYGE.Sprite {
    
    //图片起始位置
    private _originPos: FYGE.Point;
    public get originPos(){return this._originPos}
    //鼠标按下起始点
    private _startPoint: FYGE.Point;

    startDrag = (event: FYGE.MouseEvent) => {
        this.stage.addEventListener(FYGE.MouseEvent.MOUSE_MOVE, this.onMouseMove, this);
        this.stage.once(FYGE.MouseEvent.MOUSE_UP, this.onMouseUp, this);

        this._originPos = new FYGE.Point(this.x, this.y);
        this._startPoint = new FYGE.Point(event.stageX, event.stageY);
    }

    private onMouseUp(event: FYGE.MouseEvent) {
        this.stage.removeEventListener(FYGE.MouseEvent.MOUSE_MOVE, this.onMouseMove, this);
        this.dispatchEvent('DROP', this.getDropPoint(event));
    }

    private onMouseMove(event: FYGE.MouseEvent) {
        //鼠标当前位置
        const currentPoint = { x: event.stageX, y: event.stageY };
        //鼠标按下点到鼠标当前点的偏移量
        let mouseOffsetX = currentPoint.x - this._startPoint.x;
        let mouseOffsetY = currentPoint.y - this._startPoint.y;

        this.x = this._originPos.x + mouseOffsetX;
        this.y = this._originPos.y + mouseOffsetY;
    }

    protected getDropPoint(event: FYGE.MouseEvent) {
        throw new Error("Method not implemented.");
    }

    public onDrop = (drag: DragDropable): void => {
        throw new Error("Method not implemented.");
    }

    public onDragEnd(drop: DragDropable) {
        throw new Error("Method not implemented.");
    }
}