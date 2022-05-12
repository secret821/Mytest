import Fragment, { FRAGMENT_SIZE } from "./Frangments"
import TurnEvent from "./turn/TurnEvent"
import Turn from "./turn/Turn"
import TurnManager from "./turn/TurnManager"
import { GAME_SIZE, PIC_URLS, BACK, RESPATH } from "./gameconfig"
import { getStage } from "./stage"
import { fill, shuffle } from "./utils"
import { Countdown, CountdownEventName } from "./countDown"

const INIT_DATA: any = fill(GAME_SIZE * GAME_SIZE) //数据为图片id，从0开始（图片索引）
const GAP = 2

export default class Game extends FYGE.Sprite {
  private _TurnManager: TurnManager
  private _gamedata: number[]
  private _imgurl: any[] = []
  private _back: number[]
  private _count: number = 0
  private _time: number = 0
  private _friutsImgs: any[] = []
  // private _backImg: any[] = []
  private _gameContainer: FYGE.Sprite
  enBtn: FYGE.Sprite


  constructor() {
    super()

    //初始化
    this._init()
  }

  private _init() {
    // this.stage.removeAllChildren()

    getStage().addChild(this)

  
    this._initDragDrop()
    this._createGamedata()
    this._addBtn()
  }


  initData(){
    this._gamedata = []

    if (this._imgurl?.length) {
      this._imgurl.forEach((item) => {
        item.destroy()
      })
      this._imgurl = []
    }
    getStage().addChild(this)
    this._createGamedata()
    this.addBeginBtn()
  }

  //初始化事件
  private _initDragDrop() {
    this._TurnManager = new TurnManager()
    this._TurnManager.addEventListener(
      TurnEvent.DRAG_START,
      this.onDragStart,
      this
    )
    //处理结束事件
    this._TurnManager.addEventListener(TurnEvent.DRAG_END, this.onDragEnd, this)
  }

  //处理开始翻转事件
  private onDragStart(e: FYGE.Event) {
    this.addChildAt(e.data, this.children.length - 1)
  }

  //处理结束事件
  private onDragEnd(count) {
    if (count === this._gamedata.length) {
      alert("赢了")
      // this._time = 0
      this._count = 0
        this.stage.removeAllChildren()
        this.removeAllChildren()
        setTimeout(()=>{
          this.initData()
        },2000)
    }
    // this._imgurl.forEach((item) => {
    //   item.destroy()
    // })
    // this._imgurl = []
  }

  //初始化数据
  private _createGamedata() {
    let gamedata = (this._gamedata = JSON.parse(JSON.stringify(INIT_DATA))) //深拷贝
    shuffle(gamedata) //打乱图片，后续需要和INIT_DATA做对比
    console.log(
      "初始打乱的图片数据",
      gamedata.map((i) => i + 1)
    )
    // this._addTime()
  }

  //初始化游戏时间
  private _createdGame(text) {
    const countdown = new Countdown(42, 1000)
    
    countdown.on(CountdownEventName.RUNNING, (remainTimeData) => {
      console.log(remainTimeData, "remainTimeData")
      console.log(countdown.remainTime, "countdown")
      this._time = remainTimeData
      console.log(this._time, "this._time")
      text.text = "游戏时间仅剩:" + this._time + "s"
      console.log(this._gamedata.length,'this._gamedata.length')
      console.log(this._count,'this._count')
      if (this._count == this._gamedata.length){
        this._time = 0
        countdown.remainTime = 0
      }else if (this._count != this._gamedata.length && this._time <= 0) {
        setTimeout(() => {
          alert("不好意思时间到啦～")
        }, 1000)
        console.log(this._time, "this._time")
        this._count = 0
        this.stage.removeAllChildren()
        this.removeAllChildren()
        setTimeout(()=>{
          this.initData()
        },2000)
      }
    })
  }

  //初始化游戏时间
  private _createdPrevious(text) {
    const countdown = new Countdown(11, 1000)
    console.log(countdown, "countdown")
    countdown.on(CountdownEventName.RUNNING, (remainTimeData) => {
      console.log(remainTimeData, "remainTimeData")
      this._time = remainTimeData
      text.text = "记忆时间" + this._time + "s"
      // if (this._time < 0) {
      //   this._addBtn()
      //   // this._count = 0
      // }
      // console.log(this._time, "+++++++time")
    })
  }

  //渲染时间
  private _addTime() {
    //初始化text
    const text = new FYGE.TextField()
    //设置显示文本
    this.stage.addChild(text)
    text.position.set(0, 800)
    this._createdGame(text)
    this._createdPrevious(text)
    // text.text = "记忆时间" + this._time + "s"
    //设置大小
    text.size = 40
    //是否加粗
    text.bold = true
    //设置文本宽高
    text.textHeight = 200
    text.textWidth = 300
    //设置文本剧中
    text.textAlign = FYGE.TEXT_ALIGN.CENTER
    text.verticalAlign = FYGE.VERTICAL_ALIGN.MIDDLE
    //设置描边
    text.strokeColor = "#222222"
    text.stroke = 4
    console.log(this._time, "this.timer....")
  }

  //渲染按钮
  private _addBtn() {
    const enBtnTexture = FYGE.Texture.fromUrl(RESPATH)
    //启用按钮
    const enBtn = this.enBtn = new FYGE.Button(enBtnTexture)
    console.log(this.stage,'this.stage')
    this.stage.addChild(enBtn)
    enBtn.position.set(190, 850)
    enBtn.addEventListener(
      FYGE.MouseEvent.CLICK,
      () => {
        this._addTime()
        this.stage.removeChild(enBtn)
        setTimeout(() => {
          this._previous()
        }, 1000)
        this._count = 0
      },
      this
    )
  }

  private addBeginBtn() {
    const enBtnTexture = FYGE.Texture.fromUrl(RESPATH)
    //启用按钮
    const enBtn = this.enBtn = new FYGE.Button(enBtnTexture)
    console.log(this,'fdsa')
    this.addChild(enBtn)
    enBtn.position.set(190, 850)
    enBtn.addEventListener(
      FYGE.MouseEvent.CLICK,
      () => {
        this._addTime()
        this.removeChild(enBtn)
        setTimeout(() => {
          this._previous()
        }, 1000)
        this._count = 0
        // console.log(this._count, "this._count")
      },
      this
    )
  }

  //创建地图
  private _addFragmentsBack() {
    console.log(this._gamedata, "this+++++>")
    this._gamedata.map((ID, index) => {
      const backImg = new Fragment()
      this.addChild(backImg)
      backImg.ID = ID
      backImg.texture = FYGE.Texture.fromUrl(BACK)
      backImg.x = 144 * Math.floor(index / 4)
      backImg.y = 193 * (index % 4)
      backImg.anchor.set(72, 96.5)
      this._EventListener(backImg)
    })
  }

  //判断
  private _EventListener(backImg) {
    backImg.addEventListener(
      FYGE.MouseEvent.CLICK,
      () => {
        if (
          backImg.texture.textureCacheIds[0] !=
          FYGE.Texture.fromUrl(BACK).textureCacheIds[0]
        ) {
          return
        }
        console.log("------", this.skewY),
          setTimeout(() => {
            backImg.texture = FYGE.Texture.fromUrl(PIC_URLS[backImg.ID])
            console.log(this, "this._imgurl")
            this._imgurl.push(backImg)
            if (this._imgurl.length == 1) {
              return
            } else {
              // 两个图片相等
              if (
                this._imgurl[0].texture.textureCacheIds[0] ===
                backImg.texture.textureCacheIds[0]
              ) {
                backImg.texture = FYGE.Texture.fromUrl(PIC_URLS[backImg.ID])
                this._imgurl = []
                this._count += 2
                console.log(this._count, "this._count")
                //结束
                setTimeout(() => {
                  this.onDragEnd(this._count)
                }, 500)
              } else {
                //两个图片不相等
                setTimeout(() => {
                  this._imgurl.forEach((item) => {
                    item.texture = FYGE.Texture.fromUrl(BACK)
                  })
                  this._imgurl = []
                }, 500)
              }
              console.log(
                FYGE.Texture.fromUrl(BACK),
                "FYGE.Texture.fromUrl(BACK)"
              )
            }
            console.log(this._imgurl, "this._imgurl")
          }, 500)
        FYGE.Tween.get(backImg, { loop: false }).to(
          {
            skewY: backImg.skewY + 180,
            ID: backImg.ID,
          },
          500
        )
      },
      this
    )
  }

  //记忆卡片
  private _previous() {
    console.log(this._gamedata, "this+++++>")
    this._gamedata.map((ID, index) => {
      const friutsImg = new Fragment()
      this.addChild(friutsImg)
      this._imgurl.push(friutsImg)
      friutsImg.ID = ID
      // console.log(friutsImg.ID, "backImg[ID]")
      friutsImg.texture = FYGE.Texture.fromUrl(PIC_URLS[friutsImg.ID])
      friutsImg.x = 144 * Math.floor(index / 4)
      friutsImg.y = 193 * (index % 4)
      friutsImg.anchor.set(72, 96.5)
    })
    setTimeout(() => {
      console.log(this._imgurl, "this._imgurl")
      this._imgurl.forEach((item) => {
        item.destroy()
      })
      this._imgurl = []
      this._addFragmentsBack()
    }, 11000)
  }

  private _destroyDragDrop() {
    this._TurnManager.removeEventListener(
      TurnEvent.DRAG_START,
      this.onDragStart,
      this
    )
    this._TurnManager.removeEventListener(
      TurnEvent.DRAG_END,
      this.onDragEnd,
      this
    )
    this._TurnManager = null
  }

  destroy() {
    this._destroyDragDrop()
    super.destroy()
  }
}
