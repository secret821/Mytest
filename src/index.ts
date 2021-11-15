/**
 * Created by rockyl on 2020/9/19.
 */

import {GameStage} from "./GameStage";
// import {GameScene} from "./GameScene";

/**
 * Test模块
 * @description Test模块的工厂方法
 * @ctype CANVAS_WIDGET
 */
export function Test() {
	return new GameStage(getMetaConfig('Test'));
	// return new GameScene(getMetaConfig('Test'));
}
