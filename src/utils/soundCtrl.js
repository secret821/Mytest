import config from "./config";
import { Howl } from "howler"
// eslint-disable-next-line
const soundurl = "https://yun.duiba.com.cn/aurora/assets/";
const soundNames = new Map();
soundNames.set('bg','e173c0cc01efe703300730a47aa2f5e03e276a23')



// [
//     "结算页面背景音乐",
//     "bg",
//     "bonusShoot",
//     "boom",
//     "click",
//     "eliminate",
//     "fail",
//     "fall",
//     "good",
//     "haha",
//     "line",
//     "magic",
//     "mapBg",
//     "playBg",
//     "recover",
//     "shoot",
//     "sucess",
//     "toast"
// ];

const gameSounds = {};
export const soundCtrl = {
    async loadSound() {
        soundNames.forEach(function(value,key,map) {
            let src = soundurl + value + ".mp3";
            let loop = (key == "bg" || key == 'gamebg') ? true : false;
            if (!gameSounds[key]) {
                gameSounds[key] = new Howl({ src: [src], autoplay: false, loop:false });
            }
        console.log(src,value,'src========')

        })
        // for (let i = 0; i < soundNames.size; i++) {
        //     let isound = soundNames[i];
        //     let src = soundurl + isound + ".mp3";
        //     let loop = (isound == "mapBg" || isound == "playBg") ? true : false;

        //     if (!gameSounds[isound]) {
        //         gameSounds[isound] = new Howl({ src: [src], autoplay: false, loop });
        //     }
        // }
        // console.log("gameSound", gameSounds);
    },
    playSound(name, loop=true) {
        if (config.mute || !name) {
            return;
        }
        if (!soundNames.get(name)) return
        let isound = gameSounds[name];
        if (!isound) {
            isound = new Howl({
                src: [(soundurl + soundNames.get(name) + ".mp3")],
                autoplay: true,
                loop:true
            });
            gameSounds[name] = isound;
        }
        // if (!isound.playing()) {
            // console.log("音乐播放==》00");
            isound.play();
            // console.log("音乐播放==》");
        // }
    },
    stopSound(name) {
        let isound = gameSounds[name];
        
        // if (isound && isound.playing) {
            isound&&isound.stop();
            // console.log("声音停止==》",name);
        // }
    },
    pauseSound(name){
        let isound = gameSounds[name];
        isound&&isound.pause();
    },
    changeMute(name) {
        let mute = config.mute;
        // debugger
        if (mute) {
            for (let key in gameSounds) {
                // this.stopSound(key);
                this.pauseSound(key);
            }
        } else {
            // this.stopSound(name);
            this.pauseSound(name);
            this.playSound(name);
            // if(name==Enum.SoundType.mapBg){
            //     console.error("播放mapbg,停止playbg");
            //     this.stopSound(Enum.SoundType.playBg);
            //     config.nowbgm = name;
            // }else if(name==Enum.SoundType.playBg){
            //     console.error("播放playbg,停止mapbg");
            //     this.stopSound(Enum.SoundType.mapBg);
            //     config.nowbgm = name;
            // }
            
        }
    },
    backPageSound(){
        if(config.inpage){
            this.playSound(config.nowbgm);
        }else{
            // this.stopSound(config.nowbgm);
            this.pauseSound(config.nowbgm);
        }
    }
}