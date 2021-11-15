import { Color } from '../GameScene'
import FYGE from 'fyge'

export class Grid extends FYGE.Graphics {
    private _oldColor?: Color;
    private _newColor?: Color;

    // 旧颜色
    set oldColor(color:Color){
        this._oldColor = color
    }

    get oldColor():Color{
        return this._oldColor
    }

    // 新颜色
    set newColor(color:Color){
        this._newColor = color
    }

    get newColor():Color{
        return this._newColor
    }
}
