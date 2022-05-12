import { MAX_COL, MAX_ROW } from "./config/config";
import { Element } from "./element/Element";
import { getNextType } from "./lattice/getNextType";
import { getIndexByGlobalPoint } from "./lattice/getPosition";
import { removeElement, shuffle, wait } from "./utils";
//细节1:reset阶段，翻转全部结束之后才可以添加交互，否则Tween执行会重叠
//细节2:如果希望游戏流畅一些，那么允许2个以上的翻转行为同时存在
//细节3:element锁：被点击之后改为锁状态。如果没匹配，那么翻转重置，重置动画播放解锁清除锁。
export default class Game2 extends FYGE.Sprite {
    private _elementList: Element[] = [];
    private _selectList: Element[] = [];
    // private _matchedList: Element[] = [];
    constructor() {
        super();
        this._initElements();
        this._repareGame();

        setTimeout(() => {
            this._startGame();
        }, 1000);
    }

    private async _startGame() {
        await this._resetGame();
        console.warn('reset complete');
        this._addInteraction();
    }

    private _onFlipComplete = async (e: FYGE.Event) => {
        const element = e.target as Element;
        if (!element.matched) {//非匹配元素，给我重新翻回去
            removeElement(element, this._selectList)
            await wait(500);
            await element.flip(0);
            element.locked = false;

        }
        console.warn('selectList', this._selectList);
    }

    private _onMouseDown = (e: FYGE.MouseEvent) => {
        const { _selectList: selectList, _elementList: elementList } = this;
        const { stageX, stageY } = e;
        const index = getIndexByGlobalPoint([stageX, stageY]);
        const clickedElement = elementList[index];
        if (!clickedElement.locked
            && !clickedElement.matched
        ) {
            selectList.push(clickedElement);
            clickedElement.flip(1);
            clickedElement.once('onFlipComplete', this._onFlipComplete);
            this._caclMathchedElement();
            console.warn(selectList);
        }
    }

    /**
     * 每次点击后都要计算匹配列表
     */
    private _caclMathchedElement() {
        const selectedList = this._selectList.concat();
        while (selectedList.length > 0) {
            const item0 = selectedList.pop();//如果本轮没有找到，那么说明没有可匹配元素，直接抛弃
            for (let i = 0; i < selectedList.length; i++) {
                const item1 = selectedList[i];
                if (item0.type == item1.type) {
                    selectedList.splice(i, 1); //匹配了之后需要移除
                    // this._matchedList.push(item0, item1);
                    item0.matched = item1.matched = true;
                    removeElement(item0, this._selectList)
                    removeElement(item1, this._selectList)
                    break;
                }
                console.warn('selectList', this._selectList);
            }
        }
    }

    private _removeInteraction() {
        this.removeEventListener(FYGE.MouseEvent.MOUSE_DOWN, this._onMouseDown)
    }

    private _addInteraction() {
        this.addEventListener(FYGE.MouseEvent.MOUSE_DOWN, this._onMouseDown)
    }

    private _repareGame() {
        const { _elementList: elementList } = this;
        for (let index = 0; index < elementList.length; index++) {
            const element = elementList[index];
            element.prepare();
        }
    }

    private _resetGame() {
        const allPromise = [];
        const { _elementList: elementList } = this;
        for (let index = 0; index < elementList.length; index++) {
            const element = elementList[index];
            allPromise.push(element.flip(0));
        }
        return Promise.all(allPromise);
    }

    private _initElements() {
        const { _elementList: elementList } = this;
        let elementTypeList = [];
        for (let index = 0; index < (MAX_COL * MAX_ROW) / 2; index++) {
            const nextType = getNextType();
            elementTypeList.push(nextType, nextType);
        }

        elementTypeList = shuffle(elementTypeList);

        for (let index = 0; index < elementTypeList.length; index++) {
            const element = new Element(index);
            element.type = elementTypeList[index];
            this.addChild(element.view)
            elementList.push(element)
        }
    }
}
