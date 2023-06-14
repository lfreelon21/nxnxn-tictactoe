import { create } from "zustand";

type State = string[] | (() => string[])

export const useStore = create<{
    gridCellCount: number,
    setGridCellCount: (gridCellCount: number) => void,
    win: boolean,
    setWin: () => void,
    winningChar: string,
    setWinningChar: (winningChar: string) => void,
    reset: () => void,
    gridState: string[],
    setGridState: (gridState: State) => void,
}>((set) => ({
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
}))