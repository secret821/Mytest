import React, {useState, useRef} from 'react';
import './App.scss';
import {CanvasWidget} from '@spark/ui';
import {Test} from "./bundle";

/**
 * 配置覆盖
 */
const widgetConfig = {
	props: {

	},
	assets: [
		{
			"name": "红包",
			"url": "//yun.duiba.com.cn/aurora/df6e289d635a6a2b4f3df055e00301f63b07d863.png",
			"uuid": "image",
			"ext": ".png"
		},
	],
}

function App() {
	const [widgetVisible, setWidgetVisible] = useState(false);
	const widgetRef = useRef();

	function onReady(widget) {
		console.log('CanvasWidget ready!')
	}

	/**
	 * 事件回调
	 */
	function onEvent(type, payload) {
		console.log(type, payload);
	}

	function onAssetsProcess(loaded, total) {
		console.log(`assets load process:${loaded}/${total}`)
	}

	function onAssetsComplete() {
		console.log(`assets load complete`)
	}

	function onClickButton(type) {
		switch (type) {
			case 'setup':
				setWidgetVisible(true);
				break;
			case 'unSetup':
				setWidgetVisible(false);
				break;
			default:
				widgetRef.current.emitEvent(type)
				break;
		}
	}

	return (
		<div className="App">
			<div className="control-bar">
				<button onClick={e => onClickButton('setup')}>setup</button>
				<button onClick={e => onClickButton('unSetup')}>unSetup</button>

				<button onClick={e => onClickButton('start')}>start</button>
				<button onClick={e => onClickButton('stop')}>stop</button>
			</div>
			{
				widgetVisible ? <CanvasWidget ref={widgetRef} className="canvas-widget" widgetFactory={Test} widgetConfig={widgetConfig}
				                              onEvent={onEvent}
				                              onReady={onReady} onAssetsProcess={onAssetsProcess}
				                              onAssetsComplete={onAssetsComplete}/> : null
			}
		</div>
	);
}

export default App;
