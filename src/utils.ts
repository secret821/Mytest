//数组元素交换
export const swap = (index1, index2, list) => {
    const ele1 = list[index1];
    const ele2 = list[index2];
    list[index1] = ele2;
    list[index2] = ele1;
    return list;
}

export const swapElement = (ele1, ele2, list) => {
    const index1 = list.indexOf(ele1);
    const index2 = list.indexOf(ele2);
    list[index1] = ele2;
    list[index2] = ele1;
    return list;
}


//判断数组是否相等
export const equalTo = (array1: any[], array2: any[]) => {
    if (array1.length != array1.length) return false;
    const len = array1.length || array1.length;
    for (let i = 0; i < len; i++) {
        const a = array1[i];
        const b = array2[i];
        if (a != b)
            return false;
    }
    return true;
}

export const getIndex = (row, col, maxCol) => {
    let index;
    index = row * maxCol + col;
    return index
}


export const fill = (size) => {
    const list = [];
    for (let i = 0; i < size; i++) { list.push(i) }
    return list;
}

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