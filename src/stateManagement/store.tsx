import { create } from "zustand";

type State = string[] | (() => string[])
type Store = {
    gridCellCount: number,
    setGridCellCount: (gridCellCount: number) => void,
    win: boolean,
    setWin: () => void,
    winningChar: string,
    setWinningChar: (winningChar: string) => void,
    reset: () => void,
    gridState: string[],
    setGridState: (gridState: State) => void,
    thirdDimension: boolean,
    setThirdDimension: (thirdDimension: boolean) => void,
    gridSize: string,
    setGridSize: (gridSize: string | number) => void,
    cellZTranslate: number,
    setCellZTranslate: (cellZTranslate: number) => void,
}

export const useStore = create<Store>((set) => ({
    gridCellCount: 9,
    setGridCellCount: (gridCellCount: number) => set(() => ({ gridCellCount: gridCellCount })),
    win: false,
    setWin: () => set(() => ({ win: true })),
    winningChar: '',
    setWinningChar: (winningChar: string) => set(() => ({ winningChar: winningChar })),
    reset: () => set(() => ({ win: false, winningChar: '' })),
    gridState: Array(9).fill(''),
    setGridState: (gridState: State) => set(() => ({ 
        gridState: typeof gridState === 'function' ? gridState() : gridState
    })),
    thirdDimension: false,
    setThirdDimension: (thirdDimension: boolean) => set(() => ({ thirdDimension: thirdDimension })),
    gridSize: '100%',
    setGridSize: (gridSize: string | number) => set(() => ({ 
        gridSize: typeof gridSize === 'number' ? `${gridSize}%` : gridSize
    })),
    cellZTranslate: 88.5,
    setCellZTranslate: (cellZTranslate: number) => set(() => ({ cellZTranslate: cellZTranslate})),
}))