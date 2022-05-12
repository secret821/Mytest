import { MAX_COL } from "../config/config";

export const getIndex = (position: number[]) => {
    const [col, row] = position;
    return col + row * MAX_COL
}