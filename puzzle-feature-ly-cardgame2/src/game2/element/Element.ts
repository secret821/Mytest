import { ASSETS } from "../assets";
import { LATTICE_SIZE } from "../config/config";
import { getLatticePosition } from "../lattice/lattices";

export class Element extends FYGE.EventDispatcher {
    private _index: number;

    private _type: number;
    get type() { return this._type }

    private _locked: boolean;
    get locked() { return this._locked }
    set locked(val: boolean) { this._locked = val; }

    private _matched: boolean;
    get matched() { return this._matched }
    set matched(val: boolean) { this._matched = val; }

    private _view: FYGE.Container;
    get view() { return this._view }

    private _back: FYGE.Sprite;
    private _front: FYGE.Sprite;
    constructor(index: number) {
        super();
        this._index = index;
        this._view = new FYGE.Container();
        this._back = FYGE.Sprite.fromUrl(ASSETS.back)
        this._front = new FYGE.Sprite;
        this._front.anchorTexture = { x: 0.5, y: 0.5 };
        this._back.anchorTexture = { x: 0.5, y: 0.5 };
        this._view.addChild(this._back)
        this._view.addChild(this._front);
    }

    reset() {
        const { _back: back, _front: front } = this;
        back.scaleX = 1;
        front.scaleX = 0;
        this._locked = false;
    }

    prepare() {
        const { _back: back, _front: front } = this;
        back.scaleX = 0;
        front.scaleX = 1;
    }

    set type(val: number) {
        this._type = val;
        this._front.texture = FYGE.Texture.fromUrl(ASSETS.frontList[val])
        this._updatePosition();
    }

    private _updatePosition() {
        const { _index: index, view } = this;
        const [x, y] = getLatticePosition(index)
        view.x = x + LATTICE_SIZE[0] / 2;
        view.y = y + LATTICE_SIZE[1] / 2;
    }

    flip(isToFront = 1) {
        return new Promise((resoleve) => {
            const DURATION = 300;
            const { _back: back, _front: front } = this;
            const onFlipComplete=()=>{
                this.dispatchEvent('onFlipComplete',isToFront)
                resoleve(null);
            }
            if (isToFront)
                FYGE.Tween.get(back).set({ scaleX: 1 }).to({ scaleX: 0 }, DURATION).call(() => {
                    FYGE.Tween.get(front).set({ scaleX: 0 }).to({ scaleX: 1 }, DURATION).call(onFlipComplete)
                })
            else
                FYGE.Tween.get(front).set({ scaleX: 1 }).to({ scaleX: 0 }, DURATION).call(() => {
                    FYGE.Tween.get(back).set({ scaleX: 0 }).to({ scaleX: 1 }, DURATION).call(onFlipComplete)
                })
        })

    }
}