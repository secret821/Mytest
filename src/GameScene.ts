//  搭建主舞台
import { Config } from './GameCfg'
import FYGE from 'fyge'

export type Color = string

// enum:枚举类型
enum STATUE{
    win = 1,
    lose = 2,
    continus = 3
}
export class GameScene extends FYGE.Container{
    private moves: number = 0;
    // Graphics:绘图类，实时绘图，多种绘图方法
    private btns: FYGE.Graphics[] = []
    // Container:显示容器基类，所有显示对象容器继承该类
    private gameContainer:FYGE.Container;
    // TextField:文本类,继承自Sprite
    private stepNum:FYGE.TextField;

    constructor(){
        super();

    }
    initUi(){

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
            let _rect = this.addChild(new FYGE.Graphics()).lineStyle(0.5, 0xffffff, 1).beginFill(color, 1).drawRect(sx, sy, 100, 100).endFill();
            _rect.name = String(color);
            _rect.addEventListener(FYGE.MouseEvent.CLICK, () => this.onClickBtn(color), this);
        }
        let text = this.addChild(new FYGE.TextField());
        text.text = "步数0"
        text.x = 375;
        text.y = 20;
        this.stepNum = text;
    }

 


    /**创建地图 10*10 */
    map : number[][];
    /**填充格子颜色 */
    createMapColor(){
        this.gameContainer = new FYGE.Container();
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
                    let _rect = this.gameContainer.addChild(new FYGE.Graphics());
                    _rect.lineStyle(1, 0xffffff, 1).beginFill(row, 1).drawRect(0, 0, Config.GRID_SIZE, Config.GRID_SIZE).endFill();
                    _rect.position.x = sx;
                    _rect.position.y = sy;
                })
            })

        }
    }

    /**匹配 */
    matchColor(newColor: number){
        /**
         * lastMap：变量记录上一次相同相连的数组
         */
        let lastMap = [];
        let oldColor = this.map[0][0];

        for(let i = 0;i < this.map.length; i++){
            for(let j = 0; j < this.map[i].length;j++){
                let leftBlock = j > 0 ? this.map[i][j - 1] : 0,
                    topBlock = j > 0 ? this.map[i - 1] : 0;
                let str = `${i} - ${j}`;
                if (this.map[i][j] == oldColor) {
                    if(topBlock == oldColor){
                        if(lastMap.indexOf(`${i - 1}-${j}`) !== -1){
                            if(lastMap.indexOf(str) === -1){
                                lastMap.push(str)
                            }
                        }
                    }
                }
            }
        }
    }
    /**选择颜色*/
    onClickBtn(color){
        
    }
}