import { LATTICE_GAP, LATTICE_SIZE, MAX_COL, MAX_ROW } from "../config/config";

let latticesPositions: number[][];
export const initLatticePosition = () => {
    latticesPositions=[];
    for (let col = 0; col < MAX_COL; col++) {
        for (let row = 0; row < MAX_ROW; row++) {
            const index = col + row * MAX_COL;
            const x = (LATTICE_SIZE[0] + LATTICE_GAP) * col;
            const y = (LATTICE_SIZE[1] + LATTICE_GAP) * row;
            latticesPositions[index] = [x, y];
        }
    }    
}

export const getLatticePosition = (index: number) => {
    if (!latticesPositions) {
        initLatticePosition();
    }
    return latticesPositions[index]
}