import { soundCtrl } from "./soundCtrl"

/**
 * config重新修改
 * 
 * 
 * 
 */
 const config = {
    _mute:true,//声音总控制
    // mute:true,//声音总控制
}

Object.defineProperty(config, 'mute', {
    get() {
        return config._mute
    },

    set(v) {
        config._mute = v
        if (!v) {
            soundCtrl.stopSound()
        } else {
            soundCtrl.playSound()
        }
        
    }
})

export default config

