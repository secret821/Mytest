// 游戏配置
// TypeScript 中命名空间使用 namespace 来定义:解决重名问题
export namespace Config{
    // 设计稿尺寸
    export const PSD_SIZE = [750,1624]

    // 红，绿，蓝，分，黄，灰
    export const GRID_COLORS = [0xe23e29, 0xbccc45, 0x54b5be, 0xeb90f9, 0xfad06c, 0x888888]

    // 6个按钮的坐标
    export const BTN_POS = []

    // 格子的尺寸
    export const GRID_SIZE = 40;

    // 格子的数量
    export const GRID_COUNT = 10;

    // 最大可玩次数 
    export const MAX_MOVES = 200;
}