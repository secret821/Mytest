import Turn from '../src/turn/Turn'
export const FRAGMENT_SIZE = 200;

export default class Fragment extends Turn {
    //储图片碎片的ID
    private _ID: number;
    set ID(val) { this._ID = val };
    get ID() { return this._ID };
    //获取放下检测点
    protected getDropPoint(event: FYGE.MouseEvent) {
        return new FYGE.Point(
            (this.x + FRAGMENT_SIZE / 2),
            (this.y + FRAGMENT_SIZE / 2)
        )
    }
    
}