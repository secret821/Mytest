import { LATTICE_SIZE } from "../config/config";
import { getIndex } from "./getIndex"

export const getPositionByGlobalPoint = (point: number[]) => {
    const [x, y] = point;
    const col = Math.floor(x / LATTICE_SIZE[0]);
    const row = Math.floor(y / LATTICE_SIZE[1]);
    return [col, row]
}
export const getIndexByGlobalPoint = (point: number[]) => {
    return getIndex(getPositionByGlobalPoint(point))
}