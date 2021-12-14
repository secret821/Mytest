import DragDropable from "./dragdrop/DragDropable";
import DragDropEvent from "./dragdrop/DragDropEvent";
import DragDropManager from "./dragdrop/DragDropManager";
import Fragment, { FRAGMENT_SIZE } from "./fragment";
import { GAME_SIZE, PIC_URLS } from "./gameconfig";
import { getStage } from "./stage";
import { equalTo, fill, shuffle, swapElement } from "./utils";

const INIT_DATA: any = fill(GAME_SIZE * GAME_SIZE);//数据为图片id，从0开始（图片索引）
const GAP = 2;

export default class Game extends FYGE.Sprite {
    private _dragdropMgr: DragDropManager;
    private _gamedata: number[];
    constructor() {
        super();

        getStage().addChild(this);

        this._initDragDrop();
        this._createGamedata();
        this._addFragments();
    }

    private _initDragDrop() {
        this._dragdropMgr = new DragDropManager();
        this._dragdropMgr.addEventListener(DragDropEvent.DRAG_START, this.onDragStart, this);
        this._dragdropMgr.addEventListener(DragDropEvent.DRAG_END, this.onDragEnd, this)
    }

    private onDragStart(e: FYGE.Event) {
        this.addChildAt(e.data, this.children.length - 1);
    }

    private onDragEnd(e: FYGE.Event) {
        const drag: Fragment = e.data.drag;
        const drop: Fragment = e.data.drop;
        if (drop) {
            swapElement(drag.ID, drop.ID, this._gamedata);
            console.log(this._gamedata.map(i => i + 1));
            if (equalTo(this._gamedata, INIT_DATA)) {
                alert('赢了')
            }
        }
    }

    private _createGamedata() {
        let gamedata = this._gamedata = JSON.parse(JSON.stringify(INIT_DATA));//深拷贝
        shuffle(gamedata);//打乱图片，后续需要和INIT_DATA做对比
        console.log(
            '初始打乱的图片数据',
            gamedata.map(i => (i + 1))
        )
    }

    private _addFragments() {
        this._gamedata.map((ID, index) => {
            const fragment = new Fragment();
            fragment.ID = ID;
            fragment.texture = FYGE.Texture.fromUrl(PIC_URLS[ID])
            this.addChild(fragment);
            const col = index % GAME_SIZE;
            const row = Math.floor(index / GAME_SIZE);
            fragment.x = col * (FRAGMENT_SIZE + GAP);
            fragment.y = row * (FRAGMENT_SIZE + GAP);

            this._dragdropMgr.add(fragment);

        });
    }

    private _destroyDragDrop() {
        this._dragdropMgr.removeEventListener(DragDropEvent.DRAG_START, this.onDragStart, this);
        this._dragdropMgr.removeEventListener(DragDropEvent.DRAG_END, this.onDragEnd, this)
        this._dragdropMgr = null;
    }

    destroy() {
        this._destroyDragDrop();
        super.destroy();
    }

}