import Turn from './Turn'
import TurnEvent from './TurnEvent'

//管理一个拖放实例
export default class TurnManager extends FYGE.EventDispatcher {

    //初始化拖放对象事件 给拖放对象添加行为
    public add(item: Turn) {
        item.addEventListener('DROP', this.onDisplayItemDrop, this)
        item.addEventListener(FYGE.MouseEvent.MOUSE_DOWN, this.onMouseDown, this)
    }

    public destroy(){
        
    }

    private onMouseDown(event: FYGE.MouseEvent) {
        const item: Turn = event.target;
        item.startDrag(event);
        this.dispatchEvent(TurnEvent.DRAG_START, item);
    }

    //处理拖放检测
    private onDisplayItemDrop(e: FYGE.Event) {
        const drag: Turn = e.target;
        drag.mouseEnable = false;
        const dragParent = drag.parent;
        const drop: Turn = dragParent.hitTestPoint(new FYGE.Point(e.data.x / 2, e.data.y / 2), true);
        drag.mouseEnable = true;
        if (drop) {
            drop.onDrop(drag);
        }
        drag.onDragEnd(drop);
        this.dispatchEvent(TurnEvent.DRAG_END, { drop, drag });
    }

}