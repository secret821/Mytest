import DragDropable from "./DragDropable";
import DragDropEvent from "./DragDropEvent";

//管理一个拖放实例
export default class DragDropManager extends FYGE.EventDispatcher {

    //初始化拖放对象事件
    public add(item: DragDropable) {
        item.addEventListener('DROP', this.onDisplayItemDrop, this)
        item.addEventListener(FYGE.MouseEvent.MOUSE_DOWN, this.onMouseDown, this)
    }

    public destroy(){
        
    }

    private onMouseDown(event: FYGE.MouseEvent) {
        const item: DragDropable = event.target;
        item.startDrag(event);
        this.dispatchEvent(DragDropEvent.DRAG_START, item);
    }

    private onDisplayItemDrop(e: FYGE.Event) {
        const drag: DragDropable = e.target;
        drag.mouseEnable = false;
        const dragParent = drag.parent;
        const drop: DragDropable = dragParent.hitTestPoint(new FYGE.Point(e.data.x / 2, e.data.y / 2), true);
        drag.mouseEnable = true;
        if (drop) {
            drop.onDrop(drag);
        }
        drag.onDragEnd(drop);
        this.dispatchEvent(DragDropEvent.DRAG_END, { drop, drag });
    }

}