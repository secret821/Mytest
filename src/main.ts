import Game from "./Game";
import { setStage } from "./stage";

var canvas: any = document.getElementById("canvas")
canvas.width = document.body.clientWidth * 1
canvas.height = document.body.clientHeight * 1
var stage = new FYGE.Stage(
    canvas,
    750,
    1624,
    canvas.width,
    canvas.height,
    FYGE.RENDERER_TYPE.CANVAS,
    false,
    false
)

setStage(stage)

var mouseEvent = stage.onMouseEvent.bind(stage);
canvas.addEventListener("touchstart", mouseEvent, false);
canvas.addEventListener('touchmove', mouseEvent, false);
canvas.addEventListener('touchend', mouseEvent, false);

stage.addEventListener(FYGE.Event.INIT_STAGE, onInitStage, this);

function onInitStage() {
    new Game()
}

(function loop() {
    FYGE.Tween.flush()
    stage.flush();
    requestAnimationFrame(loop);
})();