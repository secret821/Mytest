import { default as DragDropable } from "./dragdrop/DragDropable";
export const FRAGMENT_SIZE = 200;
export default class Fragment extends DragDropable {
    private _ID: number;
    set ID(val) { this._ID = val };
    get ID() { return this._ID };
    protected getDropPoint(event: FYGE.MouseEvent) {
        return new FYGE.Point(
            (this.x + FRAGMENT_SIZE / 2),
            (this.y + FRAGMENT_SIZE / 2)
        )
    }

    onDrop = (drag: DragDropable): void => {
        // console.log('drag id', drag['_ID'] + 1)
        // console.log('on drop id', this._ID + 1)

        drag.x = this.x;
        drag.y = this.y;

        this.x = drag.originPos.x;
        this.y = drag.originPos.y;
    }

    public onDragEnd(drop: DragDropable) {
        if (!drop)
            FYGE.Tween.get(this).to({ x: this.originPos.x, y: this.originPos.y }, 200);
    }
}
