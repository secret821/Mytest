/**
 * Created by rockyl on 2020/11/14.
 * 一个简单示例
 */
import {WidgetBase,Graphics, Container,TextField, MouseEvent,Sprite, TextureCache, Tween} from "spark-wrapper-fyge";
//  搭建主舞台
import { Config } from './GameCfg'

export type Color = string

// enum:枚举类型
enum STATUS{
    win = 1,
    lose = 2,
    continus = 3
}

export class GameStage extends WidgetBase {

	private moves: number = 0;
    // Graphics:绘图类，实时绘图，多种绘图方法
    private btns: Graphics[] = []
    // Container:显示容器基类，所有显示对象容器继承该类
    private gameContainer:Container;
    // TextField:文本类,继承自Sprite
    private stepNum:TextField;

    initUi(){
		this.initBtns();
		this.createMapColor();
    }


   /**
     * @description:初始化6个按钮
     */
    initBtns(){
        this.btns = []
        for(let i = 0;i < Config.GRID_COLORS.length;i++){
            let sx = 0;
            let sy = 110 * i + 50;
            let color = Config.GRID_COLORS[i];
            // 创建6个色块按钮,监听按钮的点击事件
            let _rect = this.addChild(new Graphics()).lineStyle(0.5, 0xffffff, 1).beginFill(color, 1).drawRect(sx, sy, 100, 100).endFill();
            _rect.name = String(color);
            _rect.addEventListener(MouseEvent.CLICK, () => this.onClickBtn(color), this);
        }
        let text = this.addChild(new TextField());
        text.text = "步数0"
        text.x = 375;
        text.y = 20;
        this.stepNum = text;
    }


	// 计算步数
 	get step(): number{
		 return this.moves;
	 }
	set step(v: number){
		 this.moves = v;
		 this.stepNum.text = '步数' + String(v)
	}


    /**创建地图 10*10 */
    map : number[][];
    /**填充格子颜色 */
    createMapColor(){
        this.gameContainer = new Container();
        this.addChild(this.gameContainer);
        this.map = [];
        /**
         * GRID_COUNT:格子的数量
         * GRID_COLORS:格子颜色
         *  */ 
        for(let i = 0; i < Config.GRID_COUNT;i++){
            this.map[i] = [];
            for(let j = 0; j < Config.GRID_COUNT;j++){
                let _color = Config.GRID_COLORS[Math.floor(Math.random() * 6)];
                this.map[i].push(_color)
            }
        }
        this.rendermap();
    }

    /**渲染地图
     * 
     * 设计稿尺寸:PSD_SIZE
     * 格子的尺寸:GRID_SIZE
     */
    rendermap(){
        if(this.map && this.map.length > 0){
            // 初始化起始位置
            let startX = (Config.PSD_SIZE[0] - Config.GRID_SIZE * Config.GRID_COUNT) /2;
            this.gameContainer.removeAllChildren();
            this.map.forEach((colum,i) =>{
                colum.forEach((row,j)=>{
                    // 渲染
                    let sx = startX + j * Config.GRID_SIZE;
                    let sy = 66 + i * Config.GRID_SIZE
                    // 使用fyge的矢量图绘制色块
                    let _rect = this.gameContainer.addChild(new Graphics());
                    _rect.lineStyle(1, 0xffffff, 1).beginFill(row, 1).drawRect(0, 0, Config.GRID_SIZE, Config.GRID_SIZE).endFill();
                    _rect.position.x = sx;
                    _rect.position.y = sy;
                })
            })

        }
    }

    /**匹配 */
    /**
     * lastMap：变量记录上一次相同相连的数组
	 * 只要当前色块的上方色块与左边色块均是与[0][0]色块一致
	 * 且上方色块和左边色块均在记录的一维数组中,则相连相同.
     */
  /** 匹配 */
matchColor(newColor: number) {
    let lastMap = [];
    let oldColor = this.map[0][0];
    for (let i = 0; i < this.map.length; i++) {
        for (let j = 0; j < this.map[i].length; j++) {
            debugger
            let leftBlock = j > 0 ? this.map[i][j - 1] : 0,
                topBlock = i > 0 ? this.map[i - 1][j] : 0;
            let str = `${i}-${j}`;
            if (this.map[i][j] == oldColor) {
                if (topBlock == oldColor) {
                    if (lastMap.indexOf(`${i - 1}-${j}`) !== -1) {
                        if (lastMap.indexOf(str) === -1) {
                            lastMap.push(str);
                        }
                    }
                }
                if (leftBlock == oldColor) {
                    if (lastMap.indexOf(`${i}-${j - 1}`) !== -1) {
                        if (lastMap.indexOf(str) === -1) {
                            lastMap.push(str);
                        }
                    }
                }
                if (i == 0 && j == 0) {
                    if (lastMap.indexOf(str) === -1) {
                        lastMap.push(str);
                    }
                }
            }
        }
    }

    console.log(lastMap,'lastMap')
    lastMap.forEach((item, index) => {
        let i = item.split("-")[0], j = item.split("-")[1];
        this.map[i][j] = newColor;
    });
}
    /**选择颜色*/
    onClickBtn(color:number){
        this.matchColor(color);
		this.rendermap();
		if(this.onCheck() == STATUS.win){
			alert('成功')
		}else if (this.onCheck() == STATUS.lose){
			alert('失败')
		}
		this.step++;
    }

	/**判断输赢 */
	onCheck(){
		if(this.step > Config.MAX_MOVES){
			return STATUS.lose
		}
		if(this.step <= Config.MAX_MOVES){
			let start = this.map[0][0], flag = 0;
			for (let i = 0;i < this.map.length;i++){
				for(let j = 0;j < this.map[i].length;j++){
					if(this.map[i][j] != start){
						flag = 1;
					}
				}
			}
			if(flag == 0){
				return STATUS.win
			}
		}
		return STATUS.continus;
	}


	onLaunched() {
		// this._setup();
		this.initUi();
	}

	/**
	 * 事件回调
	 * @param type
	 * @param payload
	 */
	onEvent(type: string, payload: any) {
		switch (type) {
			case 'start':
				this.start();
				break;
			case 'stop':
				this.stop();
				break;
		}
	}

	/**
	 * 销毁回调
	 */
	onDestroy() {
		this.stop();
		// Tween.removeTweens(this._img);
	}

	start() {
	}

	stop() {
	}

	private _showOne = () => {
		// const {textArray} = this.props;
		// const text = textArray[Math.floor(Math.random() * textArray.length)];

		/**
		 * 对外派发事件
		 */
		this.emitEvent('show_one',this.stepNum)
	}
}
