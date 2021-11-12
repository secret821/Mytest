// 预加载静态图片
import { RES } from '../constants/Config';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    for(const key in RES){
      if (Object.prototype.hasOwnProperty.call(RES,key)){
        this.load.image(key,RES[key])
      }
    }
  }

  create() {
    this.scene.start('MainScene')
  }
}
