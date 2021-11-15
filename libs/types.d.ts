declare const args: any;
declare const props: any;
declare const target: engine.Container;
declare const global: any;
declare const vm: engine.VM;

declare function next(type: string, payload?: any);

declare module engine {
	export const VERSION = "1.0";

	export function addCustomModule(id, container: Container, options?): Container;

	export function findVariable(name, ...contexts);

	export function joinPath(...segments);

	export function trimChar(str, char);

	export const devicePixelRatio: number;

	export let StageScaleMode: {
		EXACT_FIT: string;
		NO_BORDER: string;
		NO_SCALE: string;
		SHOW_ALL: string;
		FIXED_WIDTH: string;
		FIXED_HEIGHT: string;
	}

	export const osType: string;

	export function cos(angle: number): number;

	export function sin(angle: number): number;

	export const PI_2: number;

	export const RAD_TO_DEG: number;

	export const DEG_TO_RAD: number;

	export enum RENDERER_TYPE {
		UNKNOWN = 0,
		WEBGL = 1,
		CANVAS = 2
	}

	export enum SHAPES {
		POLY = 0,
		RECT = 1,
		CIRC = 2,
		ELIP = 3,
		RREC = 4
	}

	export enum PRECISION {
		LOW = "lowp",
		MEDIUM = "mediump",
		HIGH = "highp"
	}

	export enum TEXT_GRADIENT {
		LINEAR_VERTICAL = 0,
		LINEAR_HORIZONTAL = 1
	}

	export enum TEXT_ALIGN {
		CENTER = "center",
		LEFT = "left",
		RIGHT = "right"
	}

	export enum VERTICAL_ALIGN {
		MIDDLE = "middle",
		UP = "up",
		DOWN = "down"
	}

	export enum TEXT_lINETYPE {
		SINGLE = "single",
		MULTI = "multi"
	}

	export enum LINE_ALIGNMENT {
		middle = 0.5,
		outter = 1,
		inner = 0
	}

	export enum LINE_CAP {
		BUTT = "butt",
		ROUND = "round",
		SQUARE = "square"
	}

	export enum LINE_JOIN {
		MITER = "miter",
		ROUND = "round",
		BEVEL = "bevel"
	}

	export enum BLEND_MODES {
		NORMAL = 0,
		ADD = 1,
		MULTIPLY = 2,
		SCREEN = 3,
		OVERLAY = 4,
		DARKEN = 5,
		LIGHTEN = 6,
		COLOR_DODGE = 7,
		COLOR_BURN = 8,
		HARD_LIGHT = 9,
		SOFT_LIGHT = 10,
		DIFFERENCE = 11,
		EXCLUSION = 12,
		HUE = 13,
		SATURATION = 14,
		COLOR = 15,
		LUMINOSITY = 16,
		NORMAL_NPM = 17,
		ADD_NPM = 18,
		SCREEN_NPM = 19
	}

	export enum DRAW_MODES {
		POINTS = 0,
		LINES = 1,
		LINE_LOOP = 2,
		LINE_STRIP = 3,
		TRIANGLES = 4,
		TRIANGLE_STRIP = 5,
		TRIANGLE_FAN = 6
	}

	export enum SCALE_MODES {
		LINEAR = 0,
		NEAREST = 1
	}

	export enum WRAP_MODES {
		CLAMP = 33071,
		REPEAT = 10497,
		MIRRORED_REPEAT = 33648
	}

	export enum GC_MODES {
		AUTO = 0,
		MANUAL = 1
	}

	export const URL_FILE_EXTENSION: any;

	export const DATA_URI: any;

	export class Container extends DisplayObject {
		mouseChildren: boolean;
		children: any[];
		containerUpdateTransform: any;

		constructor();

		afterConstructor(): void;

		onChildrenChange(index: any): void;

		addChild(child: DisplayObject): DisplayObject;

		addChildAt(child: DisplayObject, index: number): DisplayObject;

		swapChildren(child1: DisplayObject, child2: DisplayObject): boolean;

		getChildIndex(child: DisplayObject): number;

		setChildIndex(child: DisplayObject, index: number): void;

		getChildAt(index: number): DisplayObject;

		getChildByName(name: string | RegExp, isOnlyOne?: boolean, isRecursive?: boolean): any;

		removeChild(child: DisplayObject): DisplayObject;

		removeChildAt(index: number): DisplayObject;

		removeChildren(beginIndex?: number, endIndex?: number): DisplayObject[];

		updateTransform(): void;

		calculateBounds(): void;

		protected _calculateBounds(): void;

		hitTestPoint(globalPoint: Point, isMouseEvent?: boolean): any;

		renderWebGL(renderer: WebglRenderer): void;

		private renderAdvancedWebGL;

		protected _renderWebGL(renderer: WebglRenderer): void;

		renderCanvas(renderer: CanvasRenderer): void;

		protected _renderCanvas(renderer: CanvasRenderer): void;

		update(deltaTime: number): void;

		_onDispatchBubbledEvent(type: string): void;

		destroy(): void;

		width: number;
		height: number;
		private static _getElementsByName;
	}

	export class DisplayObject extends EventDispatcher {
		transform: Transform;
		visible: boolean;
		renderable: boolean;
		parent: any;
		stage: any;
		name: string;
		worldAlpha: number;
		protected _localBoundsSelf: Rectangle;
		protected _bounds: Rectangle;
		protected _boundsID: number;
		protected _lastBoundsID: number;
		private _mask;
		private _alpha;
		destroyed: boolean;
		mouseEnabled: boolean;
		tempDisplayObjectParent: DisplayObject;
		displayObjectUpdateTransform: any;
		displayObjectHitTestPoint: any;
		protected _width: number;
		protected _height: number;

		constructor();

		private readonly _tempDisplayObjectParent;

		updateTransform(): void;

		static _bp: Point;
		static _p1: Point;
		static _p2: Point;
		static _p3: Point;
		static _p4: Point;
		static temBounds: Rectangle;

		hitTestPoint(point: Point, isMouseEvent?: boolean): DisplayObject;

		private _recursivePostUpdateTransform;

		getBounds(skipUpdate?: boolean, rect?: Rectangle): Rectangle;

		getLocalBounds(rect?: Rectangle): Rectangle;

		calculateBounds(): void;

		globalToLocal(point: Point, bp?: Point): Point;

		localToGlobal(point: Point, bp?: Point): Point;

		_onDispatchBubbledEvent(type: string): void;

		renderWebGL(renderer: any): void;

		renderCanvas(renderer: any): void;

		setParent(container: any): any;

		setTransform(x?: number, y?: number, scaleX?: number, scaleY?: number, rotation?: number, skewX?: number, skewY?: number, anchorX?: number, anchorY?: number): DisplayObject;

		destroy(): void;

		alpha: number;
		x: number;
		y: number;
		readonly worldMatrix: import("../../../../../../../../Users/rockyl/WorkSpaces/VisualEditor/renderingengine/src/2d/math/Matrix").Matrix;
		readonly localMatrix: import("../../../../../../../../Users/rockyl/WorkSpaces/VisualEditor/renderingengine/src/2d/math/Matrix").Matrix;
		position: import("../../../../../../../../Users/rockyl/WorkSpaces/VisualEditor/renderingengine/src/2d/math/ObservablePoint").ObservablePoint;
		scale: import("../../../../../../../../Users/rockyl/WorkSpaces/VisualEditor/renderingengine/src/2d/math/ObservablePoint").ObservablePoint;
		scaleX: number;
		scaleY: number;
		anchor: import("../../../../../../../../Users/rockyl/WorkSpaces/VisualEditor/renderingengine/src/2d/math/ObservablePoint").ObservablePoint;
		anchorX: number;
		anchorY: number;
		skew: import("../../../../../../../../Users/rockyl/WorkSpaces/VisualEditor/renderingengine/src/2d/math/ObservablePoint").ObservablePoint;
		rotation: number;
		readonly worldVisible: boolean;
		mask: Graphics;
		width: number;
		height: number;

		update(deltaTime: number): void;
	}

	export class FloatDisplay extends DisplayObject {
		htmlElement: any;
		private _isAdded;
		private _transformID;

		constructor();

		init(htmlElement: any): void;

		private getStyle;

		updateStyle(): void;

		destroy(): void;
	}

	export class Sprite extends Container {
		private _anchorTexture;
		_texture: Texture;
		_width: number;
		_height: number;
		_transformID: number;
		_textureID: number;
		_transformTrimmedID: number;
		_textureTrimmedID: number;
		pluginName: string;
		indices: Uint16Array;
		start: number;
		uvs: Float32Array;
		vertexData: Float32Array;
		vertexTrimmedData: Float32Array;

		constructor(texture?: Texture);

		_onTextureUpdate(): void;

		_onAnchorUpdate(): void;

		calculateVertices(): void;

		calculateTrimmedVertices(): void;

		_renderWebGL(renderer: WebglRenderer): void;

		_renderCanvas(renderer: CanvasRenderer): void;

		_calculateBounds(): void;

		getLocalBounds(rect?: Rectangle): Rectangle;

		hitTestPoint(globalPoint: Point, isMouseEvent?: boolean): any;

		destroy(): void;

		anchorTexture: any;
		texture: Texture;

		static from(source: any): Sprite;

		static fromFrame(frameId: string): Sprite;

		static fromImage(imageId: string, crossorigin?: boolean, scaleMode?: number): Sprite;
	}

	export class Stage extends Container {
		iosTouchendPreventDefault: boolean;
		isPreventDefaultEvent: boolean;
		rootDiv: any;
		renderObj: SystemRenderer;
		renderType: number;

		static getStage(stageName?: string): Stage;

		private static _stageList;
		static pause: boolean;
		private static _pause;
		viewRect: Rectangle;
		autoSteering: boolean;
		autoResize: boolean;
		desWidth: number;
		desHeight: number;
		divHeight: number;
		divWidth: number;
		private _bgColor;
		bgColor: number;
		scaleMode: string;
		private _scaleMode;
		private _flush;
		private _currentFlush;
		static _dragDisplay: DisplayObject;
		private static _isLoadedVConsole;
		private _lastDpList;
		private _rid;
		private _floatDisplayList;

		constructor(rootDivId?: string, desW?: number, desH?: number, frameRate?: number, scaleMode?: string, renderType?: number, transparent?: boolean, bgColor?: number);

		render(): void;

		private _ml;
		private _mp;
		private _initMouseEvent;
		private _mouseDownPoint;

		flush(): void;

		setFrameRate(fps: number): void;

		getFrameRate(): number;

		getRootDivWH(div: HTMLDivElement): {
			w: number;
			h: number;
		};

		kill(): void;

		private _mouseEventTypes;
		private onMouseEvent;
		private setAlign;

		resize(): void;

		getBounds(): Rectangle;

		private static allUpdateObjList;

		static flushAll(): void;

		static addUpdateObj(target: any): void;

		static removeUpdateObj(target: any): void;

		destroy(): void;
	}

	export class Event extends HashObject {
		static RESIZE: string;
		static ON_SCROLL_TO_HEAD: string;
		static ON_SCROLL_STOP: string;
		static ON_SCROLL_START: string;
		static ON_SCROLL_TO_END: string;
		static ON_INIT_STAGE: string;
		static ADDED_TO_STAGE: string;
		static REMOVED_FROM_STAGE: string;
		static ENTER_FRAME: string;
		static END_FRAME: string;
		static CALL_FRAME: string;
		static COMPLETE: string;
		static PROGRESS: string;
		static ERROR: string;
		static ABORT: string;
		static START: string;
		static TIMER: string;
		static TIMER_COMPLETE: string;
		type: string;
		target: any;
		data: any;

		constructor(type: string);

		stopImmediatePropagation(): void;

		stopPropagation(): void;

		private _bpd;
		private _pd;

		destroy(): void;

		reset(type: string, target: any): void;
	}

	export class EventDispatcher extends HashObject {
		protected eventTypes: any;
		protected eventTypes1: any;

		constructor();

		private static _MECO;
		static _totalMEC: number;

		static getMouseEventCount(type?: string): number;

		addEventListener(type: string, listener: Function, context?: any, useCapture?: boolean): void;

		once(type: string, listener: Function, context?: any, useCapture?: boolean): void;

		private _changeMouseCount;
		private _defaultEvent;

		dispatchEvent(event: any, data?: any, useCapture?: boolean): boolean;

		hasEventListener(type: string, useCapture?: boolean): boolean;

		removeEventListener(type: string, listener: Function, context?: any, useCapture?: boolean): void;

		removeAllEventListener(): void;

		destroy(): void;
	}

	export class GDispatcher {
		private static callbackPool;
		private static thisObjPool;

		static addEvent(name: string, callback: any, thisObj: any): void;

		static removeEvent(name: string, callback: any, thisObj?: any): void;

		static dispatchEvent(name: string, ...args: any[]): void;
	}

	export class MouseEvent extends Event {
		static MOUSE_DOWN: string;
		static MOUSE_UP: string;
		static CLICK: string;
		static MOUSE_MOVE: string;
		static MOUSE_OVER: string;
		static MOUSE_OUT: string;
		clientX: number;
		clientY: number;
		stageX: number;
		stageY: number;
		localX: number;
		localY: number;
		currentTarget: DisplayObject;
		identifier: any;

		constructor(type: string);

		updateAfterEvent(): void;

		destroy(): void;
	}

	export const _default: {
		build(graphicsData: GraphicsData): void;
		triangulate(graphicsData: any, graphicsGeometry: Graphics): void;
	}

	export const _default: {
		build(graphicsData: GraphicsData): void;
		triangulate(graphicsData: GraphicsData, graphicsGeometry: Graphics): void;
	}

	export const _default: {
		build(graphicsData: GraphicsData): void;
		triangulate(graphicsData: GraphicsData, graphics: Graphics): void;
	}

	export const _default: {
		build(graphicsData: GraphicsData): void;
		triangulate(graphicsData: GraphicsData, graphicsGeometry: Graphics): void;
	}

	export function earcut(data: any, holeIndices: any, dim: any): any[];

	export class Graphics extends Container {
		private _fillStyle;
		private _lineStyle;
		readonly fill: FillStyle;
		readonly line: LineStyle;
		private _tint;
		tint: number;
		private batchTint;
		private _matrix;
		matrix: Matrix;
		hitTestByPixel: boolean;
		private _holeMode;
		private _currentPath;
		graphicsData: GraphicsData[];
		isUsedToMask: boolean;
		boundsPadding: number;
		private dirty;
		private boundsDirty;
		cacheAsBitmap: boolean;
		private cacheDirty;
		private _canvasBuffer;
		_texture: Texture;
		offsetX: number;
		offsetY: number;
		verts: any;
		indices: any;
		private batches;
		private geoBatches;
		private batchDirty;
		private uvs;
		private vertexData;
		private shapeIndex;
		private _transformID;

		constructor();

		clone(): Graphics;

		lineStyle(lineWidth?: number, color?: number, alpha?: number, alignment?: number, native?: boolean): Graphics;

		lineTextureStyle(width?: number, texture?: Texture, color?: number, alpha?: number, matrix?: any, alignment?: number, native?: boolean): this;

		private startPoly;
		private finishPoly;

		moveTo(x: number, y: number): Graphics;

		lineTo(x: number, y: number): Graphics;

		private _initCurve;

		quadraticCurveTo(cpX: number, cpY: number, toX: number, toY: number): Graphics;

		bezierCurveTo(cpX: number, cpY: number, cpX2: number, cpY2: number, toX: number, toY: number): Graphics;

		arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): Graphics;

		arc(cx: number, cy: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): Graphics;

		beginFill(color?: number | string, alpha?: number): Graphics;

		beginTextureFill(texture?: Texture, color?: number, alpha?: number, matrix?: Matrix): this;

		endFill(): Graphics;

		closePath(): Graphics;

		beginHole(): this;

		endHole(): this;

		drawRect(x: number, y: number, width: number, height: number): Graphics;

		drawRoundedRect(x: number, y: number, width: number, height: number, radius: number): Graphics;

		drawCircle(x: number, y: number, radius: number): Graphics;

		drawEllipse(x: number, y: number, width: number, height: number): Graphics;

		drawPolygon(path: number[] | Point[] | Polygon): Graphics;

		drawStar(x: number, y: number, points: number, radius: number, innerRadius: number, rotation?: number): Graphics;

		private drawShape;

		clear(): Graphics;

		isFastRect(): boolean;

		_renderWebGL(renderer: WebglRenderer): void;

		private updateBatch;
		private calculateTints;
		private calculateVertices;
		private transformPoints;

		_renderCanvas(renderer: CanvasRenderer): void;

		_calculateBounds(): void;

		hitTestPoint(point: Point, isMouseEvent?: boolean): DisplayObject;

		private hitTestPointAccuratly;

		updateLocalBoundsSelf(): void;

		private generateCanvasTexture;

		destroy(): void;

		private proccessHoles;
		private addUvs;
		private adjustUvs;
	}

	export class GraphicsData extends HashObject {
		fillStyle: FillStyle;
		lineStyle: LineStyle;
		matrix: Matrix;
		holes: any[];
		shape: any;
		type: number;
		points: number[];

		constructor(shape: Circle | Rectangle | Ellipse | Polygon | RoundedRectangle, fillStyle?: FillStyle, lineStyle?: LineStyle, matrix?: Matrix);

		clone(): GraphicsData;

		destroy(): void;
	}

	export class Shape extends Sprite {
		canvas: HTMLCanvasElement;
		context: CanvasRenderingContext2D;
		dirty: boolean;
		offsetX: number;
		offsetY: number;

		constructor();

		private _command;
		private _isBitmapStroke;
		private _isBitmapFill;
		hitTestByPixel: boolean;

		drawRoundRect(x: number, y: number, w: number, h: number, rTL?: number, rTR?: number, rBL?: number, rBR?: number): void;

		moveTo(x: number, y: number): void;

		lineTo(x: number, y: number): void;

		arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void;

		quadraticCurveTo(cpX: number, cpY: number, x: number, y: number): void;

		bezierCurveTo(cp1X: number, cp1Y: number, cp2X: number, cp2Y: number, x: number, y: number): void;

		closePath(): void;

		drawRect(x: number, y: number, w: number, h: number): void;

		arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, counterclockwise?: boolean): void;

		drawCircle(x: number, y: number, radius: number, counterclockwise?: boolean): void;

		drawEllipse(x: number, y: number, w: number, h: number): void;

		clear(): void;

		beginFill(color: number, alpha?: number): void;

		beginLinearGradientFill(points: any, colors: any): void;

		beginRadialGradientFill: (points: any, colors: any) => void;

		beginBitmapFill(image: any, matrix: Array<number>): void;

		private _fill;

		beginStroke(color: number, lineWidth?: number, cap?: LINE_CAP, join?: LINE_JOIN, miter?: number, alpha?: number): void;

		beginLinearGradientStroke(points: Array<number>, colors: any, lineWidth?: number, cap?: LINE_CAP, join?: LINE_JOIN, miter?: number): void;

		beginRadialGradientStroke(points: Array<number>, colors: any, lineWidth?: number, cap?: LINE_CAP, join?: LINE_JOIN, miter?: number): void;

		beginBitmapStroke(image: any, matrix: Array<number>, lineWidth?: number, cap?: LINE_CAP, join?: LINE_JOIN, miter?: number): void;

		private _stroke;

		endFill(): void;

		endStroke(): void;

		updateShape(): void;

		private _drawShape;

		hitTestPoint(globalPoint: Point, isMouseEvent?: boolean): DisplayObject;

		changeColor(infoObj: any): void;

		updateTexture(): void;

		_renderCanvas(renderer: any): void;

		_renderWebGL(renderer: any): void;

		destroy(): void;
	}

	export class Circle {
		x: number;
		y: number;
		radius: number;
		type: number;

		constructor(x?: number, y?: number, radius?: number);

		clone(): Circle;

		isPointIn(point: Point): boolean;

		getBounds(): Rectangle;
	}

	export class Ellipse {
		x: number;
		y: number;
		width: number;
		height: number;
		type: number;

		constructor(x?: number, y?: number, width?: number, height?: number);

		clone(): Ellipse;

		isPointIn(point: Point): boolean;

		getBounds(): Rectangle;
	}

	export class Polygon {
		closed: boolean;
		points: number[];
		type: number;

		constructor(...points: any[]);

		clone(): Polygon;

		close(): void;

		isPointIn(point: Point): boolean;
	}

	export class RoundedRectangle {
		x: number;
		y: number;
		width: number;
		height: number;
		radius: number;
		type: number;

		constructor(x?: number, y?: number, width?: number, height?: number, radius?: number);

		clone(): RoundedRectangle;

		isPointIn(point: Point): boolean;
	}

	export class FillStyle {
		color: number;
		alpha: number;
		texture: Texture;
		matrix: Matrix;
		visible: boolean;
		alphaBlock: boolean;

		constructor();

		clone(): FillStyle;

		reset(): void;

		destroy(): void;
	}

	export class LineStyle extends FillStyle {
		native: boolean;
		width: number;
		alignment: LINE_ALIGNMENT;

		clone(): LineStyle;

		reset(): void;
	}

	export function bezierCurveControlPoint(points: any): {
		A: any[];
		B: any[];
	}

	export const GRAPHICS_CURVES: {
		adaptive: boolean;
		maxLength: number;
		minSegments: number;
		maxSegments: number;
		segmentsCount: Function;
	}

	export abstract class HashObject {
		protected _instanceId: number;
		protected _instanceType: string;
		protected static _object_id: number;

		constructor();

		readonly instanceId: number;
		readonly instanceType: string;

		abstract destroy(): void;
	}

	export class Loader extends EventDispatcher {
		caches: {};
		_req: XMLHttpRequest;

		constructor();

		loadSheet(callback: Function, url: string): void;

		loadRaw(callback: Function, url: string, type: 'text' | 'json'): void;

		loadJson(callback: Function, url: string): void;

		loadText(callback: Function, url: string): void;

		loadTexture(callback: Function, url: string): void;

		loadImage(callback: Function, url: string, crossOrigin?: boolean): HTMLImageElement;

		cache(name: string, data: any): void;
	}

	export const globalLoader: Loader;

	export const GroupD8: {
		E: number;
		SE: number;
		S: number;
		SW: number;
		W: number;
		NW: number;
		N: number;
		NE: number;
		MIRROR_VERTICAL: number;
		MIRROR_HORIZONTAL: number;
		uX: (ind: any) => number;
		uY: (ind: any) => number;
		vX: (ind: any) => number;
		vY: (ind: any) => number;
		inv: (rotation: any) => number;
		add: (rotationSecond: any, rotationFirst: any) => any;
		sub: (rotationSecond: any, rotationFirst: any) => any;
		rotate180: (rotation: any) => number;
		isVertical: (rotation: any) => boolean;
		byDirection: (dx: any, dy: any) => number;
		matrixAppendRotationInv: (matrix: any, rotation: any, tx?: number, ty?: number) => void;
	}

	export class Matrix extends HashObject {
		a: number;
		b: number;
		c: number;
		d: number;
		tx: number;
		ty: number;
		array: any;

		constructor(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number);

		clone(): Matrix;

		copy(matrix: Matrix | any): this;

		transformPoint(x: number, y: number, bp?: Point): Point;

		transformPointInverse(x: number, y: number, bp?: Point): Point;

		setFrom(mtx: Matrix): void;

		identity(): void;

		invert(): Matrix;

		createBox(x: number, y: number, scaleX: number, scaleY: number, rotation: number, skewX: number, skewY: number, ax: number, ay: number): void;

		prepend: (mtx: Matrix) => void;

		append(matrix: Matrix): void;

		static isEqual(m1: Matrix, m2: Matrix): boolean;

		concat(mtx: Matrix): void;

		rotate(angle: number): void;

		scale(sx: number, sy: number): void;

		translate(dx: number, dy: number): void;

		set(a: any, b: any, c: any, d: any, tx: any, ty: any): this;

		getRotation(): number;

		toArray(transpose?: boolean, out?: any): any;

		static readonly IDENTITY: Matrix;
		static readonly TEMP_MATRIX: Matrix;

		destroy(): void;
	}

	export class ObservablePoint extends HashObject {
		_x: number;
		_y: number;
		cb: any;
		scope: any;

		constructor(cb: Function, scope: any, x?: number, y?: number);

		set(x?: number, y?: number): void;

		copy(point: Point | ObservablePoint): void;

		x: number;
		y: number;

		destroy(): void;
	}

	export class Point extends HashObject {
		destroy(): void;

		constructor(x?: number, y?: number);

		x: number;
		y: number;

		static distance(...args: any[]): number;

		set(x: number, y: number): void;
	}

	export class Rectangle extends HashObject {
		type: number;

		constructor(x?: number, y?: number, width?: number, height?: number);

		clear(): void;

		copy(rect: Rectangle): this;

		clone(): Rectangle;

		x: number;
		y: number;
		width: number;
		height: number;
		readonly left: number;
		readonly right: number;
		readonly top: number;
		readonly bottom: number;

		isPointIn(point: Point): boolean;

		fit(rectangle: Rectangle): void;

		static createFromRects(...arg: Rectangle[]): Rectangle;

		static createFromPoints(rect: Rectangle, ...arg: Point[]): Rectangle;

		static createFromVertexData(rect: Rectangle, vertexData: Float32Array): Rectangle;

		static createRectfrom2Point(rect: Rectangle, p1: Point, p2: Point): Rectangle;

		static testRectCross(ra: Rectangle, rb: Rectangle): boolean;

		destroy(): void;
	}

	export class Transform extends HashObject {
		worldMatrix: Matrix;
		localMatrix: Matrix;
		_worldID: number;
		_parentID: number;
		position: ObservablePoint;
		scale: ObservablePoint;
		anchor: ObservablePoint;
		skew: ObservablePoint;
		_rotation: number;
		_cx: number;
		_sx: number;
		_cy: number;
		_sy: number;
		_localID: number;
		_currentLocalID: number;

		constructor();

		onChange(): void;

		updateSkew(): void;

		updateLocalMatrix(): void;

		updateWorldMatrix(parentTransform: Transform): void;

		rotation: number;

		destroy(): void;
	}

	export function httpRequest(callback: Function, url: string, method?: string, params?: any, type?: 'text' | 'json' | 'jsonp'): void;

	export function jsonp(callback: any, url: any, params: any): void;

	export function urlJoin(url: any, query: any): any;

	export class CanvasRenderer extends SystemRenderer {
		rootContext: CanvasRenderingContext2D;
		context: CanvasRenderingContext2D;
		maskManager: CanvasMaskManager;
		smoothProperty: string;
		plugins: {
			sprite: CanvasSpriteRenderer;
			graphics: CanvasGraphicsRenderer;
		};
		renderingToScreen: boolean;

		constructor(options: RendererOptions);

		render(displayObject: DisplayObject, renderTexture?: any, transform?: Matrix): void;

		clear(clearColor: string): void;

		destroy(): void;

		resize(screenWidth: number, screenHeight: number): void;

		destroyPlugins(): void;
	}

	export class BatchManager {
		renderer: WebglRenderer;
		emptyRenderer: ObjectRenderer;
		currentRenderer: ObjectRenderer;

		constructor(renderer: WebglRenderer);

		setObjectRenderer(objectRenderer: ObjectRenderer): void;

		flush(): void;

		reset(): void;
	}

	export class CanvasMaskManager extends HashObject {
		renderer: any;

		constructor(renderer: CanvasRenderer);

		pushMask(maskData: Graphics): void;

		renderGraphicsShape(graphics: Graphics): void;

		popMask(renderer: CanvasRenderer): void;

		destroy(): void;
	}

	export class MaskManager {
		renderer: WebglRenderer;
		scissor: boolean;
		scissorData: any;
		scissorRenderTarget: RenderTarget;
		enableScissor: boolean;
		alphaMaskPool: any[];
		alphaMaskIndex: number;

		constructor(renderer: WebglRenderer);

		pushMask(target: any, maskData: any): void;

		popMask(target: any, maskData: any): void;

		pushStencilMask(maskData: Graphics): void;

		popStencilMask(): void;

		pushScissorMask(target: any, maskData: Graphics): void;

		popScissorMask(): void;

		destroy(): void;
	}

	export class StencilManager {
		renderer: WebglRenderer;
		stencilMaskStack: Graphics[];

		constructor(renderer: WebglRenderer);

		setMaskStack(stencilMaskStack: Graphics[]): void;

		pushStencil(graphics: Graphics): void;

		popStencil(): void;

		_useCurrent(): void;

		_getBitwiseMask(): number;

		destroy(): void;
	}

	export class TextureGarbageCollector {
		renderer: WebglRenderer;
		count: number;
		checkCount: number;
		maxIdle: number;
		checkCountMax: number;
		mode: number;

		constructor(renderer: WebglRenderer);

		update(): void;

		run(): void;

		unload(displayObject: any): void;
	}

	export class TextureManager {
		boundTextures: any;
		renderer: WebglRenderer;
		emptyTextures: any;
		_nextTextureLocation: number;
		currentLocation: number;
		gl: WebGLRenderingContext;
		_managedTextures: Array<any>;

		constructor(renderer: WebglRenderer);

		onContextChange(): void;

		bindTexture(texture: any, location?: number, forceLocation?: boolean): number;

		getTexture(): void;

		updateTexture(texture: any, location?: number): GLTexture;

		unbindTexture(texture: any): void;

		destroyTexture(texture: any, skipRemove: any): void;

		removeAll(): void;

		destroy(): void;
	}

	export class BatchRenderer extends ObjectRenderer {
		vertSize: number;
		vertByteSize: number;
		size: number;
		currentSize: number;
		currentIndexSize: number;
		aBuffers: {};
		iBuffers: {};
		shader: GLShader;
		currentIndex: number;
		groups: BatchDrawCall[];
		elements: any[];
		vaos: VertexArrayObject[];
		vaoMax: number;
		vertexCount: number;
		MAX_TEXTURES: number;
		vertexBuffers: GLBuffer[];
		indexBuffers: GLBuffer[];

		constructor(renderer: WebglRenderer);

		onContextChange(): void;

		onPreRender(): void;

		render(element: any): void;

		getIndexBuffer(size: any): any;

		getAttributeBuffer(size: number): any;

		flush(): void;

		packGeometry(element: any, float32View: any, uint32View: any, indexBuffer: any, index: any, indexCount: any): void;

		start(): void;

		stop(): void;

		destroy(): void;
	}

	export class CanvasGraphicsRenderer {
		renderer: CanvasRenderer;

		constructor(renderer: CanvasRenderer);

		render(graphics: Graphics): void;

		destroy(): void;
	}

	export function holePath(graphicsData: GraphicsData, context: CanvasRenderingContext2D, ccw?: boolean): void;

	export function judgeCcw(points: number[]): boolean;

	export class CanvasSpriteRenderer {
		renderer: CanvasRenderer;

		constructor(renderer: CanvasRenderer);

		render(sprite: any): void;

		destroy(): void;
	}

	export interface RendererOptions {
		htmlElement?: HTMLCanvasElement;
		transparent?: boolean;
		antialias?: boolean;
		preserveDrawingBuffer?: boolean;
		backgroundColor?: number;
		roundPixels?: boolean;
	}

	export class CanvasRenderTarget {
		canvas: HTMLCanvasElement;
		context: CanvasRenderingContext2D;

		constructor(width: number, height: number);

		clear(): void;

		resize(width: number, height: number): void;

		destroy(): void;

		width: number;
		height: number;
	}

	export class RenderTarget {
		gl: WebGLRenderingContext;
		frameBuffer: GLFramebuffer;
		texture: GLTexture;
		clearColor: number[];
		size: Rectangle;
		projectionMatrix: Matrix;
		transform: Matrix;
		frame: Rectangle;
		defaultFrame: Rectangle;
		destinationFrame: any;
		sourceFrame: any;
		stencilBuffer: GLBuffer;
		stencilMaskStack: Graphics[];
		scaleMode: number;
		root: boolean;

		constructor(gl: WebGLRenderingContext, width?: number, height?: number, scaleMode?: number, root?: boolean);

		clear(clearColor?: number[]): void;

		attachStencilBuffer(): void;

		setFrame(destinationFrame?: Rectangle, sourceFrame?: Rectangle): void;

		activate(): void;

		calculateProjection(destinationFrame: Rectangle, sourceFrame?: Rectangle): void;

		resize(width: number, height: number): void;

		destroy(): void;
	}

	export class SystemRenderer extends EventDispatcher {
		options: RendererOptions;
		type: number;
		htmlElement: HTMLCanvasElement;
		transparent: boolean;
		preserveDrawingBuffer: boolean;
		_backgroundColor: number;
		_backgroundColorRgba: number[];
		_backgroundColorString: string;
		_tempDisplayObjectParent: Container;
		_lastObjectRendered: DisplayObject;

		constructor(options: RendererOptions);

		resize(width: number, height: number): void;

		render(displayObject: any, renderTexture?: any, transform?: any): void;

		destroy(): void;

		backgroundColor: number;
	}

	export class BatchBuffer {
		vertices: ArrayBuffer;
		float32View: Float32Array;
		uint32View: Uint32Array;
		positions: any;
		uvs: any;
		colors: any;

		constructor(size: number);

		destroy(): void;
	}

	export class BatchDrawCall {
		textures: BaseTexture[];
		textureCount: number;
		start: number;
		size: number;
		type: number;

		constructor();
	}

	export function createIndicesForQuads(size: number): Uint16Array;

	export function generateMultiTextureShader(gl: any, maxTextures: any): GLShader;

	export class ObjectRenderer {
		renderer: WebglRenderer;

		constructor(renderer: WebglRenderer);

		onContextChange(): void;

		start(): void;

		stop(): void;

		flush(): void;

		render(object: DisplayObject): void;

		destroy(): void;
	}

	export class WebGLState {
		blendModes: any;
		activeState: Uint8Array;
		defaultState: Uint8Array;
		gl: any;
		maxAttribs: any;
		attribState: {
			tempAttribState: any[];
			attribState: any[];
		};
		nativeVaoExtension: any;

		constructor(gl: WebGLRenderingContext);

		setState(state: any): void;

		setBlend(value: any): void;

		setBlendMode(value: any): void;

		setDepthTest(value: any): void;

		setCullFace(value: any): void;

		setFrontFace(value: any): void;

		resetAttributes(): void;

		resetToDefault(): void;

		resetTo3D(): void;
	}

	export class WebglRenderer extends SystemRenderer {
		plugins: {};
		gl: WebGLRenderingContext;
		CONTEXT_UID: number;
		maskManager: MaskManager;
		stencilManager: StencilManager;
		batchManager: BatchManager;
		textureManager: TextureManager;
		textureGC: TextureGarbageCollector;
		state: WebGLState;
		renderingToScreen: boolean;
		_activeShader: GLShader;
		_activeVao: VertexArrayObject;
		_activeRenderTarget: RenderTarget;
		rootRenderTarget: RenderTarget;

		constructor(options: RendererOptions);

		_initContext(): void;

		render(displayObject: DisplayObject, renderTexture?: any, transform?: any): void;

		clear(clearColor: number[]): void;

		setTransform(matrix: Matrix): void;

		clearRenderTexture(renderTexture: any, clearColor: any): this;

		bindShader(shader: GLShader, autoProject?: boolean): WebglRenderer;

		createVao(): VertexArrayObject;

		bindVao(vao: VertexArrayObject): WebglRenderer;

		reset(): WebglRenderer;

		bindRenderTexture(renderTexture: any, transform?: Matrix): WebglRenderer;

		bindRenderTarget(renderTarget: RenderTarget): WebglRenderer;

		resize(screenWidth: any, screenHeight: any): void;

		destroy(): void;

		handleContextRestored(): void;

		handleContextLost(event: WebGLContextEvent): void;

		initPlugins(staticMap: any): void;

		destroyPlugins(): void;

		static __plugins: any;

		static registerPlugin(pluginName: string, ctor: Function): void;
	}

	export class BezierPath {
		_d: any;
		_transform: any;
		_styles: any;
		_shape: any;

		constructor(d?: any, transform?: any, styles?: any);
	}

	export class EllipsePath extends BezierPath {
		_x: any;
		_y: any;
		_radiusX: any;
		_radiusY: any;
		_transform: any;
		_styles: any;

		constructor(x: any, y: any, radiusX: any, radiusY: any, transform: any, styles: any);
	}

	export class FrameEntity {
		alpha: number;
		transform: {
			a: number;
			b: number;
			c: number;
			d: number;
			tx: number;
			ty: number;
		};
		layout: {
			x: number;
			y: number;
			width: number;
			height: number;
		};
		nx: number;
		ny: number;
		maskPath: any;
		shapes: any[];

		constructor(spec: any);

		static lastShapes: any;
	}

	export const _default: (data: any, cb: any, failure: any) => void;

	export class MovieClip extends Container {
		lockStep: boolean;
		readonly currentFrame: number;
		private _curFrame;
		readonly isPlaying: boolean;
		private _isPlaying;
		readonly isFront: boolean;
		private _isFront;
		totalFrames: number;
		loops: number;
		private textures;
		private timeInterval;
		private deltaFrame;
		private frameCount;

		constructor(mv?: VideoEntity);

		init(mv: VideoEntity): void;

		private initChildren;
		private resetTransform;

		resetTransformAll(frameIndex: number): void;

		setImage(imagekey: any, imageUrl: string): void;

		stop(): void;

		nextFrame(): void;

		prevFrame(): void;

		gotoAndStop(frameIndex: number): void;

		play(isFront?: boolean): void;

		private _lastFrame;
		readonly isInTimeFrame: boolean;

		gotoAndPlay(frameIndex: number, isFront?: boolean): void;

		startAniRange(beginFrame?: number, endFrame?: number, loops?: number, callback?: Function): void;

		private startTime;
		private startFrame;
		private lastDeltaFrame;
		private _endMark;
		commonDeltaTime: number;

		updateFrame(): void;

		private getCurFrameWhenLockStep;

		update(deltaTime: number): void;

		destroy(): void;
	}

	export function inflate(input: any, options: any): any;

	export const _default: {
		inflate: typeof inflate;
	}

	export function assign(obj: any, objO: any): any;

	export function shrinkBuf(buf: any, size: any): any;

	export const utils: {
		assign: typeof assign;
		shrinkBuf: typeof shrinkBuf;
		Buf8: any;
		Buf16: any;
		Buf32: any;
		arraySet: any;
		flattenChunks: any;
	}

	export {};

	export function string2buf(str: any): any;

	export function buf2binstring(buf: any, len?: any): any;

	export function binstring2buf(str: any): any;

	export function buf2string(buf: any, max: any): any;

	export function utf8border(buf: any, max: any): any;

	export const strings: {
		utf8border: typeof utf8border;
		buf2string: typeof buf2string;
		binstring2buf: typeof binstring2buf;
		buf2binstring: typeof buf2binstring;
		string2buf: typeof string2buf;
	}

	export {};

	export function adler32(adler: any, buf: any, len: any, pos: any): number;

	export const _default: {
		Z_NO_FLUSH: number;
		Z_PARTIAL_FLUSH: number;
		Z_SYNC_FLUSH: number;
		Z_FULL_FLUSH: number;
		Z_FINISH: number;
		Z_BLOCK: number;
		Z_TREES: number;
		Z_OK: number;
		Z_STREAM_END: number;
		Z_NEED_DICT: number;
		Z_ERRNO: number;
		Z_STREAM_ERROR: number;
		Z_DATA_ERROR: number;
		Z_BUF_ERROR: number;
		Z_NO_COMPRESSION: number;
		Z_BEST_SPEED: number;
		Z_BEST_COMPRESSION: number;
		Z_DEFAULT_COMPRESSION: number;
		Z_FILTERED: number;
		Z_HUFFMAN_ONLY: number;
		Z_RLE: number;
		Z_FIXED: number;
		Z_DEFAULT_STRATEGY: number;
		Z_BINARY: number;
		Z_TEXT: number;
		Z_UNKNOWN: number;
		Z_DEFLATED: number;
	}

	export function crc32(crc: any, buf: any, len: any, pos: any): number;

	export function deflateResetKeep(strm: any): any;

	export function deflateReset(strm: any): any;

	export function deflateSetHeader(strm: any, head: any): number;

	export function deflateInit2(strm: any, level: any, method: any, windowBits: any, memLevel: any, strategy: any): any;

	export function deflateInit(strm: any, level: any): any;

	export function deflate(strm: any, flush: any): any;

	export function deflateEnd(strm: any): any;

	export function deflateSetDictionary(strm: any, dictionary: any): number;

	export const _default: {
		deflateInit: typeof deflateInit;
		deflateInit2: typeof deflateInit2;
		deflateReset: typeof deflateReset;
		deflateResetKeep: typeof deflateResetKeep;
		deflateSetHeader: typeof deflateSetHeader;
		deflate: typeof deflate;
		deflateEnd: typeof deflateEnd;
		deflateSetDictionary: typeof deflateSetDictionary;
		deflateInfo: string;
	}

	export function GZheader(): void;

	export function inflateResetKeep(strm: any): number;

	export function inflateReset(strm: any): number;

	export function inflateReset2(strm: any, windowBits: any): number;

	export function inflateInit2(strm: any, windowBits: any): any;

	export function inflateInit(strm: any): any;

	export function inflate(strm: any, flush: any): any;

	export function inflateEnd(strm: any): number;

	export function inflateGetHeader(strm: any, head: any): number;

	export function inflateSetDictionary(strm: any, dictionary: any): number;

	export const _default: {
		inflateReset: typeof inflateReset;
		inflateReset2: typeof inflateReset2;
		inflateResetKeep: typeof inflateResetKeep;
		inflateInit: typeof inflateInit;
		inflateInit2: typeof inflateInit2;
		inflate: typeof inflate;
		inflateEnd: typeof inflateEnd;
		inflateGetHeader: typeof inflateGetHeader;
		inflateSetDictionary: typeof inflateSetDictionary;
		inflateInfo: string;
	}

	export const _default: {
		2: string;
		1: string;
		0: string;
		'-1': string;
		'-2': string;
		'-3': string;
		'-4': string;
		'-5': string;
		'-6': string;
	}

	export function _tr_init(s: any): void;

	export function _tr_stored_block(s: any, buf: any, stored_len: any, last: any): void;

	export function _tr_align(s: any): void;

	export function _tr_flush_block(s: any, buf: any, stored_len: any, last: any): void;

	export function _tr_tally(s: any, dist: any, lc: any): boolean;

	export const _default: {
		_tr_init: typeof _tr_init;
		_tr_stored_block: typeof _tr_stored_block;
		_tr_flush_block: typeof _tr_flush_block;
		_tr_tally: typeof _tr_tally;
		_tr_align: typeof _tr_align;
	}

	export function ZStream(): void;

	export class Parser {
		load(url: any, success: any, failure: any): void;

		loadViaWorker(url: any, success: any, failure: any): void;
	}

	export const proto: protobuf.Root;

	export const ProtoMovieEntity: protobuf.Type;

	export class RectPath extends BezierPath {
		_x: any;
		_y: any;
		_width: any;
		_height: any;
		_cornerRadius: any;
		_transform: any;
		_styles: any;

		constructor(x: any, y: any, width: any, height: any, cornerRadius: any, transform: any, styles: any);
	}

	export class SpriteEntity {
		matteKey: any;
		imageKey: any;
		frames: any[];

		constructor(spec: any);
	}

	export class VideoEntity extends HashObject {
		version: string;
		videoSize: {
			width: number;
			height: number;
		};
		FPS: number;
		frames: number;
		images: {};
		hasBeenCached: boolean;
		sprites: SpriteEntity[];
		audios: any[];

		constructor(spec: any, images: any);

		resetSprites(spec: any): void;

		destroy(): void;
	}

	export class EditableText extends TextField {
		htmlElement: any;
		private _prompt;
		prompt: string;
		private _promptColor;
		promptColor: string;
		private _textColor;
		textColor: string;

		constructor();
	}

	export class InputText extends FloatDisplay {
		private _view;
		inputType: number;
		isAutoDownKeyBoard: boolean;
		private static _inputTypeList;

		constructor(inputType?: number);

		init(htmlElement: any): void;

		initInfo(text: string, color: string, align: string, size: number, font: string, showBorder: boolean, lineSpacing: number, textWidth: number): void;

		lineSpacing: number;
		bold: boolean;
		italic: boolean;
		textHeight: number;
		textWidth: number;
		color: string;
		border: boolean;
		text: string;
		maxCharacters: number;

		convertToTextField(textField?: TextField): TextField;
	}

	export class TextField extends Sprite {
		canvas: HTMLCanvasElement;
		context: CanvasRenderingContext2D;
		dirty: boolean;
		offsetX: number;
		offsetY: number;

		constructor();

		textAlpha: number;
		private _textAlpha;
		textAlign: TEXT_ALIGN;
		private _textAlign;
		verticalAlign: VERTICAL_ALIGN;
		private _verticalAlign;
		width: number;
		height: number;
		lineSpacing: number;
		private _lineSpacing;
		lineType: TEXT_lINETYPE;
		private _lineType;
		text: string;

		protected _setText(value: any): void;

		private _text;
		font: string;
		private _font;
		size: number;
		private _size;
		fillColor: any;
		private _fillColor;
		strokeColor: string;
		private _strokeColor;
		stroke: number;
		private _stroke;
		italic: boolean;
		private _italic;
		bold: boolean;
		_bold: boolean;
		border: boolean;
		private _border;
		private _prepContext;

		getTextWidth(lineIndex?: number): number;

		readonly lines: number;
		private _getMeasuredWidth;
		private realLines;

		updateText(): void;

		updateTexture(): void;

		_renderCanvas(renderer: any): void;

		_renderWebGL(renderer: any): void;

		destroy(): void;
	}

	export class BaseRenderTexture extends BaseTexture {
		_glRenderTargets: {};
		_canvasRenderTarget: any;
		valid: boolean;

		constructor(width?: number, height?: number, scaleMode?: number);

		resize(width: number, height: number): void;

		destroy(): void;
	}

	export class BaseTexture extends EventDispatcher {
		touched: number;
		width: number;
		height: number;
		scaleMode: number;
		hasLoaded: boolean;
		isLoading: boolean;
		source: HTMLImageElement | HTMLCanvasElement;
		imageType: string;
		premultipliedAlpha: boolean;
		imageUrl: string;
		isPowerOfTwo: boolean;
		mipmap: boolean;
		wrapMode: number;
		_glTextures: {};
		_enabled: number;
		_destroyed: boolean;
		textureCacheIds: string[];

		constructor(source?: HTMLImageElement | HTMLCanvasElement, scaleMode?: number);

		update(): void;

		loadSource(source: any): void;

		private _updateImageType;
		private _sourceLoaded;

		destroy(): void;

		dispose(): void;

		updateSourceImage(newSrc: string): void;

		static fromImage(imageUrl: string, crossorigin?: any, scaleMode?: number): BaseTexture;

		static fromCanvas(canvas: HTMLCanvasElement, scaleMode?: number, origin?: string): BaseTexture;

		static from(source: any, scaleMode?: number): BaseTexture;

		static addToCache(baseTexture: BaseTexture, id: string): void;

		static removeFromCache(baseTexture: string | BaseTexture): BaseTexture | null;
	}

	export function getTexture(str: string): any;

	export class RenderTexture extends Texture {
		constructor(baseRenderTexture: BaseRenderTexture, frame?: Rectangle);

		resize(width: number, height: number, doNotResizeBaseTexture?: boolean): void;

		static create(width: number, height: number, scaleMode?: number): RenderTexture;
	}

	export class Texture extends EventDispatcher {
		noFrame: boolean;
		baseTexture: BaseTexture;
		_frame: Rectangle;
		trim: Rectangle;
		valid: boolean;
		_uvs: TextureUvs;
		orig: Rectangle;
		_rotate: number;
		defaultAnchor: Point;
		_updateID: number;
		transform: any;
		textureCacheIds: string[];
		static EMPTY: Texture;
		static WHITE: Texture;

		constructor(baseTexture: BaseTexture | Texture, frame?: Rectangle, orig?: Rectangle, trim?: Rectangle, rotate?: number, anchor?: Point);

		update(): void;

		onBaseTextureLoaded(e: Event): void;

		onBaseTextureUpdated(e: Event): void;

		destroy(): void;

		clone(): Texture;

		_updateUvs(): void;

		frame: Rectangle;
		rotate: number;
		readonly width: number;
		readonly height: number;

		static fromImage(imageUrl: string, crossorigin?: boolean, scaleMode?: number): Texture;

		static fromFrame(frameId: string): Texture;

		static fromCanvas(canvas: HTMLCanvasElement, scaleMode?: number, origin?: string): Texture;

		static from(source: any): Texture;

		static addToCache(texture: Texture, id: string): void;

		static removeFromCache(texture: any): Texture;
	}

	export class TextureSheet {
		baseTexture: BaseTexture;
		textures: {};
		animations: {};
		data: any;
		_frames: any;
		_frameKeys: string[];
		_callback: Function;

		constructor(baseTexture: BaseTexture, data: any);

		parse(callback: Function): void;

		_processFrames(initialFrameIndex: number): void;

		_processAnimations(): void;

		_parseComplete(): void;

		destroy(destroyBase?: boolean): void;
	}

	export class TextureUvs {
		x0: number;
		y0: number;
		x1: number;
		y1: number;
		x2: number;
		y2: number;
		x3: number;
		y3: number;
		uvsUint32: Uint32Array;
		uvsFloat32: Float32Array;

		constructor();

		set(frame: Rectangle, baseFrame: Rectangle | BaseTexture, rotate: number): void;
	}

	export class Ease {
		constructor();

		static get(amount: number): (t: number) => number;

		static getPowIn(pow: number): (t: number) => number;

		static getPowOut(pow: number): (t: number) => number;

		static getPowInOut(pow: number): (t: number) => number;

		static quadIn: (t: number) => number;
		static quadOut: (t: number) => number;
		static quadInOut: (t: number) => number;
		static cubicIn: (t: number) => number;
		static cubicOut: (t: number) => number;
		static cubicInOut: (t: number) => number;
		static quartIn: (t: number) => number;
		static quartOut: (t: number) => number;
		static quartInOut: (t: number) => number;
		static quintIn: (t: number) => number;
		static quintOut: (t: number) => number;
		static quintInOut: (t: number) => number;

		static sineIn(t: number): number;

		static sineOut(t: number): number;

		static sineInOut(t: number): number;

		static getBackIn(amount: number): (t: number) => number;

		static backIn: (t: number) => number;

		static getBackOut(amount: number): (t: any) => number;

		static backOut: (t: any) => number;

		static getBackInOut(amount: number): (t: number) => number;

		static backInOut: (t: number) => number;

		static circIn(t: number): number;

		static circOut(t: number): number;

		static circInOut(t: number): number;

		static bounceIn(t: number): number;

		static bounceOut(t: number): number;

		static bounceInOut(t: number): number;

		static getElasticIn(amplitude: number, period: number): (t: number) => number;

		static elasticIn: (t: number) => number;

		static getElasticOut(amplitude: number, period: number): (t: number) => number;

		static elasticOut: (t: number) => number;

		static getElasticInOut(amplitude: number, period: number): (t: number) => number;

		static elasticInOut: (t: number) => number;
	}

	export class Tween {
		private static NONE;
		private static LOOP;
		private static REVERSE;
		private static _tweens;
		private static IGNORE;
		private static _plugins;
		private static _inited;
		private _target;
		private _useTicks;
		private ignoreGlobalPause;
		private loop;
		private pluginData;
		private _curQueueProps;
		private _initQueueProps;
		private _steps;
		private paused;
		private duration;
		private _prevPos;
		private position;
		private _prevPosition;
		private _stepPosition;
		private passive;

		static get(target: any, props?: {
			loop?: boolean;
			onChange?: Function;
			onChangeObj?: any;
		}, pluginData?: any, override?: boolean): Tween;

		static removeTweens(target: any): void;

		static pauseTweens(target: any): void;

		static resumeTweens(target: any): void;

		private static tick;

		static flush(): void;

		private static _lastTime;
		private static _register;

		static removeAllTweens(): void;

		constructor(target: any, props: any, pluginData: any);

		onChange: Function;
		private initialize;

		setPosition(value: number, actionsMode?: number): boolean;

		private _runAction;
		private _updateTargetProps;

		setPaused(value: boolean): Tween;

		private _cloneProps;
		private _addStep;
		private _appendQueueProps;
		private _addAction;
		private _set;

		wait(duration: number, passive?: boolean): Tween;

		to(props: any, duration?: number, ease?: Function): Tween;

		call(callback: Function, thisObj?: any, params?: any[]): Tween;

		set(props: any, target?: any): Tween;

		play(tween?: Tween): Tween;

		pause(tween?: Tween): Tween;

		$tick(delta: number): void;
	}

	export class BitmapNumber extends Sprite {
		resName: string;
		private textures;
		private _num;
		num: number;

		constructor(textures: Texture[]);

		reset(textures: Texture[]): void;
	}

	export class BitmapNumbers extends Container {
		textures: Texture[];
		align: TEXT_ALIGN;
		singleWidth: number;
		private _num;
		num: number;

		constructor(textures: Texture[]);

		adaptate(): void;
	}

	export class Button extends Sprite {
		textureUp: any;
		textureDown: any;
		textureDisable: any;

		constructor(tUp: Texture, tDown?: Texture, tDisable?: Texture);

		private _mouseEvent;

		initButton(): void;

		clicked: boolean;
		private _clicked;
		textureStatusEnable: boolean;

		destroy(): void;
	}

	export class FrameAni extends Sprite {
		texturesAll: Texture[];
		currentFrame: number;
		totalFrames: number;
		isPlay: boolean;
		startTime: number;
		allTime: number;
		callback: Function;
		_frameRate: number;
		frameRate: number;

		constructor(texturesAll: Texture[]);

		private count;

		onEnterFrame(): void;

		play(callback: any): void;

		reset(): void;

		private changeTexture;
	}

	export interface IScrollListItem extends DisplayObject {
		initData(id: number, data: any): void;

		id: number;
		data: number;
	}

	export class ScrollList extends ScrollPage {
		private _items;
		private _itemW;
		private _itemH;
		private _itemRow;
		private _itemCol;
		private _itemCount;
		private _itemClass;
		private _isInit;
		data: Array<any>;
		private downL;
		private _cols;
		private _disParam;
		private _lastFirstId;
		readonly loadingView: DisplayObject;

		constructor(itemClassName: any, itemWidth: number, itemHeight: number, vW: number, vH: number, isVertical?: boolean, cols?: number);

		updateData(data: Array<any>, isReset?: boolean): void;

		private flushData;

		setViewRect(w: number, h: number, isVertical: boolean): void;

		private _updateViewRect;

		setLoading(downLoading: DisplayObject): void;

		destroy(): void;
	}

	export class ScrollPage extends Container {
		protected isVertical: boolean;
		private viewWidth;
		private viewHeight;
		maxDistance: number;
		protected distance: number;
		private minDis;
		private maskObj;
		view: Container;
		private lastValue;
		protected speed: number;
		private addSpeed;
		isStop: boolean;
		maxSpeed: number;
		fSpeed: number;
		protected paramXY: string;
		private stopTimes;
		private isMouseDownState;
		private autoScroll;
		isSpringBack: boolean;

		constructor(vW: number, vH: number, maxDistance: number, isVertical?: boolean, isFull?: boolean);

		setViewRect(w: number, h: number, isVertical: boolean): void;

		private onMouseEvent;

		scrollTo(dis: number, time?: number): void;

		destroy(): void;
	}

	export class ShowWord extends TextField {
		playWords(text: string, deltaTime?: number, callback?: Function): void;
	}

	export function DrawAllToCanvas(images: any, callback: any): void;

	export function uid(): number;

	export const backupCanvas: HTMLCanvasElement;

	export function getGradientColor(points: any, colors: any): any;

	export function getCanvasBitmapStyle(image: any): any;

	export function hex2rgb(hex: number, out?: number[] | Float32Array): number[] | Float32Array;

	export function hex2string(hex: any): string;

	export function string2hex(string: string): number;

	export function rgb2hex(rgb: number[]): number;

	export function getRGBA(color: string, alpha: number): string;

	export function inputFeildIosEnable(): void;

	export function decomposeDataUri(dataUri: any): {
		mediaType: any;
		subType: any;
		charset: any;
		encoding: any;
		data: any;
	}

	export function getUrlFileExtension(url: any): any;

	export function sign(n: number): number;

	export function premultiplyTint(tint: number, alpha: number): number;

	export const TextureCache: any;

	export const BaseTextureCache: any;

	export const TextureSheetCache: any;

	export function destroyTextureCache(): void;

	export function clearTextureCache(): void;

	export const GlobalPro: {
		stageRenderType: RENDERER_TYPE;
		dpi: number;
		padding: number;
		startTime: number;
	}

	export function isWebGLSupported(): boolean;

	export function removeItems(arr: Array<any>, startIdx: number, removeCount: number): void;

	export function mapWebGLBlendModesToPixi(gl: any, array?: any[]): any[];

	export const INT_BITS1 = 32;

	export const INT_MAX = 2147483647;

	export const INT_MIN: number;

	export function abs(v: any): number;

	export function min(x: any, y: any): number;

	export function max(x: any, y: any): number;

	export function isPow2(v: any): boolean;

	export function log2(v: any): number;

	export function log10(v: any): 1 | 4 | 3 | 2 | 9 | 8 | 7 | 6 | 5 | 0;

	export function popCount(v: any): number;

	export function countTrailingZeros(v: any): number;

	export function nextPow2(v: any): any;

	export function prevPow2(v: any): number;

	export function parity(v: any): number;

	export function reverse(v: any): number;

	export function interleave2(x: any, y: any): number;

	export function deinterleave2(v: any, n: any): number;

	export function interleave3(x: any, y: any, z: any): number;

	export function deinterleave3(v: any, n: any): number;

	export function nextCombination(v: any): number;

	export function checkMaxIfStatementsInShader(maxIfs: number, gl: WebGLRenderingContext): number;

	export function createContext(canvas: HTMLCanvasElement, options?: any): WebGLRenderingContext;

	export class GLBuffer {
		gl: any;
		buffer: any;
		type: any;
		drawType: any;
		data: any;
		_updateID: number;

		constructor(gl: any, type?: any, data?: any, drawType?: any);

		upload(data: any, offset?: number, dontBind?: boolean): void;

		bind(): void;

		destroy: () => void;

		static createVertexBuffer(gl: any, data?: any, drawType?: any): GLBuffer;

		static createIndexBuffer(gl: any, data?: any, drawType?: any): GLBuffer;

		static create(gl: any, type: any, data: any, drawType: any): GLBuffer;
	}

	export class GLFramebuffer {
		gl: any;
		framebuffer: any;
		stencil: any;
		texture: any;
		width: any;
		height: any;

		constructor(gl: any, width: any, height: any);

		enableTexture(texture: any): void;

		enableStencil(): void;

		clear(r: any, g: any, b: any, a: any): void;

		bind(): void;

		unbind(): void;

		resize(width: any, height: any): void;

		destroy(): void;

		static createRGBA(gl: any, width: any, height: any, data?: any): GLFramebuffer;

		static createFloat32(gl: any, width: any, height: any, data: any): GLFramebuffer;
	}

	export class GLShader {
		gl: WebGLRenderingContext;
		program: WebGLProgram;
		attributes: any;
		uniformData: any;
		uniforms: any;

		constructor(gl: WebGLRenderingContext, vertexSrc: string, fragmentSrc: string, precision?: string, attributeLocations?: any);

		bind(): this;

		destroy(): void;
	}

	export class GLTexture {
		gl: WebGLRenderingContext;
		texture: WebGLTexture;
		mipmap: boolean;
		premultiplyAlpha: any;
		width: number;
		height: number;
		format: any;
		type: any;

		constructor(gl: WebGLRenderingContext, width?: number, height?: number, format?: any, type?: any);

		upload(source: any): void;

		uploadData: (data: any, width: any, height: any) => void;

		bind(location?: number): void;

		unbind(): void;

		minFilter(linear: boolean): void;

		magFilter(linear: boolean): void;

		enableMipmap(): void;

		enableLinearScaling(): void;

		enableNearestScaling(): void;

		enableWrapClamp(): void;

		enableWrapRepeat(): void;

		enableWrapMirrorRepeat(): void;

		destroy(): void;

		static fromSource(gl: WebGLRenderingContext, source: HTMLImageElement | ImageData, premultiplyAlpha?: boolean): GLTexture;

		static fromData(gl: any, data: any, width: any, height: any): GLTexture;
	}

	export function setVertexAttribArrays(gl: any, attribs: any, state?: any): void;

	export function compileProgram(gl: WebGLRenderingContext, vertexSrc: string, fragmentSrc: string, attributeLocations?: any): WebGLProgram;

	export function defaultValue(type: string, size: number): false | any[] | 0 | Float32Array;

	export function extractAttributes(gl: WebGLRenderingContext, program: WebGLProgram): {};

	export function extractUniforms(gl: WebGLRenderingContext, program: WebGLProgram): {};

	export function generateUniformAccessObject(gl: WebGLRenderingContext, uniformData: any): {
		data: {};
	}

	export function mapSize(type: string): number;

	export function mapType(gl: any, type: any): any;

	export function setPrecision(src: string, precision: string): string;

	export class VertexArrayObject {
		nativeVaoExtension: any;
		nativeState: any;
		nativeVao: any;
		gl: WebGLRenderingContext;
		attributes: any[];
		indexBuffer: any;
		dirty: boolean;

		constructor(gl: WebGLRenderingContext, state: any);

		bind(): this;

		unbind(): this;

		activate(): this;

		addAttribute(buffer: any, attribute: any, type?: any, normalized?: any, stride?: any, start?: any): this;

		addIndex(buffer: any): this;

		clear(): this;

		draw(type: any, size?: any, start?: any): this;

		destroy(): void;

		getSize(): number;

		static FORCE_NATIVE: boolean;
	}

	export function setProcessMetaLibs(...metaContexts: any[]): void;

	export function setGlobalContext(context: any): void;

	export function executeBehavior(sequence: any, subEntry: string, target: any, args?: any): void;

	export class Process {
		private _config;
		private _parent;
		private _vm;
		private _sequence;
		private _meta;
		private _target;
		private _originProps;

		constructor();

		readonly processConfig: any;
		readonly parent: Process;
		readonly sequence: any;

		init(context: any): void;

		execute(args: any): Promise<any>;

		_executeMetaScript(type: any, payload: any, meta: any): Promise<{
			type: any;
			payload: any;
		}>;

		_executeSubProcess(type: any, payload: any): Promise<{
			type: any;
			payload: any;
		}>;

		_executeNextProcess(type: any, payload: any): Promise<{
			type: any;
			payload: any;
		}>;

		getProcessMeta(id: any): any;

		getProps(key?: any): any;

		updateProps(args: any): void;

		resolveLinkedProp(data: any, key: any): any;
	}

	export class VM {
		_processMetaLibs: any;
		_globalContext: any;
		_target: any;
		_id: any;

		setup(context: any): void;

		executeProcess(sequence: any, id: any, parentProcess: any, args: any): Promise<any>;

		getMeta(id: any): any;

		readonly globalContext: any;
		readonly id: any;
	}

	export function fieldChanged(onModify: any): (target: any, key: string) => void;

	export const dirtyFieldDetector: (target: any, key: string) => void;

	export const deepDirtyFieldDetector: (target: any, key: string) => void;

	export const dirtyFieldTrigger: (target: any, key: string) => void;

	export const deepDirtyFieldTrigger: (target: any, key: string) => void;

	export function afterConstructor(ctor: Function): void;

	export function applyAutoAdjust(ctor: Function): void;

	export const globalEvent: EventDispatcher;

	export const DATA_CENTER_EVENT: string;

	export function applyEvents(ctor: Function): void;

	export function applyScript(ctor: Function): void;

	export class ScriptBase {
		private _host;
		disabled: boolean;
		readonly host: Container;

		mounted(): void;

		destroy(): void;

		update(t: number): void;

		awake(): void;

		sleep(): void;
	}

	export function registerScriptDef(id: any, def: any): void;

	export function registerScripts(scripts: any): void;

	export function loadAssets(config: any, onProgress?: any, onComplete?: any): Promise<never>;

	export function getAssetByUUID(uuid: any): any;

	export function getAssetByName(name: any): any;

	export class DataCenter extends EventDispatcher {
		store: {};
		watchers: any[];

		constructor();

		registerGroup(name: any, origin?: any): void;

		unregisterGroup(name: any): void;

		getGroup(name: any): any;

		getDataByPath(path: any, throwException?: any): any;

		getDataByName(name: any, throwException?: any): any;

		formatString(str: any, escapes: any): any;

		mutate(name: any, data?: any, path?: any, dispatch?: boolean): void;

		watch(name: any, path: any): void;

		getWatcher(name: any): any;

		registerDataMapping(dataMapping: any): void;
	}

	export const dataCenter: DataCenter;

	export let env: any;

	export function injectEnv(data: any): void;

	export class GameStage extends Container {
		private _sceneContainer;
		private _popupContainer;
		private _blackLayer;
		private _stage;
		private _dataCenter;
		private _config;

		constructor(stage: Stage);

		readonly sceneContainer: StackContainer;
		readonly popupContainer: StackContainer;
		readonly dataCenter: DataCenter;

		launch(config: any, onAssetsProgress: any, onAssetsComplete: any): void;

		start(): void;

		getViewConfigByName(name: any): any;

		instantiateView(name, cache = true): any;

		setBlackLayerVisible(visible: any): void;

		onPopupContainerChange(e: any): void;
	}

	export class Image extends Sprite {
		private _originText;
		private _escapes;
		private _registeredEvents;
		private _source;
		source: string;
		private updateSource;
		private _setSourceDirect;
		private _setSource;
		private unregisterEvents;
		private onDataMutated;
	}

	export class Label extends TextField {
		private _originText;
		private _escapes;
		private _registeredEvents;

		protected _setText(value: any): void;

		private unregisterEvents;
		private onDataMutated;
	}

	export class ShapeBase extends Shape {
		protected __fieldDirty: boolean;
		fillColor: any;
		strokeColor: any;
		strokeWidth: number;

		constructor();

		private onResize;
		private onEnterFrame;

		protected redraw(): void;
	}

	export class Rect extends ShapeBase {
		borderRadius: number;

		protected redraw(): void;
	}

	export class Circle extends ShapeBase {
		protected redraw(): void;
	}

	export {};

	export class StackContainer extends Container {
		private _mutex;

		constructor(mutex?: boolean);

		push(view: DisplayObject, options?: any, dispatch?: boolean): void;

		replace(view: DisplayObject, options?: any): void;

		pop(): boolean;

		popAll(view?: DisplayObject, options?: any): void;
	}

	export function instantiate(config: any): any;

	export {instantiate};

	export let gameStage: any;

	export function launch(url: any, onAssetsProgress: any, onAssetsComplete: any): Promise<{}>;

	export function launchWithConfig(config: any, onAssetsProgress: any, onAssetsComplete: any): Promise<{}>;

	export function findNodeByUUID(node: any, uuid: any): any;

	export const ESCAPE_REG_EXP: RegExp;

	export const linkedFlag = "$_linked_$";

	export const nodeScheme = "node://";

	export function arrayFind(arr: any, callback: any): any;

	export function objClone(obj: any): any;

	export function propertyParse(key: any, node: any, properties: any): void;

	export function getDataByPath(scope: any, path: any, throwException?: any): any;

	export function injectProp(target: any, data?: any, callback?: Function, ignoreMethod?: boolean, ignoreNull?: boolean): boolean;

	export function copyProp(target: any, data: any, config?: any): void;

	export function obj2query(obj: any): string;
}
