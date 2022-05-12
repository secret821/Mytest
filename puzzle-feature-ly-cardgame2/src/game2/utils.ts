import { resolve } from "../../webpack.config";

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

export const wait = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export const removeElement = (ele, list) => {
    const i = list.indexOf(ele)
    if (i != -1)
        list.splice(i, 1)
}