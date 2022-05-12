

// //将row，col转化为游戏数组的index
// export const getIndex = (row, col, maxCol) => {
//     let index;
//     index = row * maxCol + col;
//     return index
// }

//创建初始的游戏静态数据
export const fill = (size) => {
    const list = [];
    for (let i = 0; i < size; i++) { list.push(i) }
    return list;
}

//打乱图片
export const shuffle = (array: any[]) => {
    var m = array.length,
        t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}