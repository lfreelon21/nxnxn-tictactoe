import { create } from "zustand";

type Store = {
    gridCellCount: number,
    setGridCellCount: (gridCellCount: number) => void,
    win: boolean,
    setWin: () => void,
    winningChar: string,
    setWinningChar: (winningChar: string) => void,
    gridState: string[][][],
    setGridState: (gridState: string[][][] | (() => string[][][])) => void,
    reset: () => void,
    thirdDimension: boolean,
    setThirdDimension: (thirdDimension: boolean) => void,
    gridSize: string,
    setGridSize: (gridSize: string | number) => void,
    cellZTranslate: number,
    setCellZTranslate: (cellZTranslate: number) => void,
    player1Score: number,
    setPlayer1Score: (player1Score: number) => void,
    player2Score: number,
    setPlayer2Score: (player2Score: number) => void,
    resetScore: () => void,
}

const fill3DArr = (count: number): string[][][] => {
    return Array(count).fill('').map(() => Array(count).fill('').map(() => Array(count).fill('')))
}

export const useStore = create<Store>((set) => ({
    gridCellCount: 27,
    setGridCellCount: (gridCellCount: number) => set(() => ({ gridCellCount: gridCellCount })),
    
    win: false,
    setWin: () => set(() => ({ win: true })),

    winningChar: '',
    setWinningChar: (winningChar: string) => set(() => ({ winningChar: winningChar })),

    gridState: fill3DArr(3),

    setGridState: (gridState: string[][][] | (() => string[][][])) => set((state) => {
        const length = typeof gridState === 'function' ? gridState().length : gridState.length;
        if(length > 0){
            const size = typeof gridState === 'function' ? Math.pow(gridState().length, 3) : Math.pow(gridState.length, 3)

            state.setGridCellCount(size);
        }
        else{
            state.setGridCellCount(0);
        }

        return { gridState: typeof gridState === 'function' ? gridState() : gridState }
    }),

    reset: () => set((state) => {
        state.setGridState(fill3DArr(Math.ceil(Math.pow(state.gridCellCount, 1/3))))

        return { win: false, winningChar: ''}
    }),

    thirdDimension: false,
    setThirdDimension: (thirdDimension: boolean) => set(() => (
        {thirdDimension: thirdDimension}
    )),

    gridSize: '100%',
    setGridSize: (gridSize: string | number) => set(() => ({ 
        gridSize: typeof gridSize === 'number' ? `${gridSize}%` : gridSize
    })),

    cellZTranslate: 88.5,
    setCellZTranslate: (cellZTranslate: number) => set(() => ({ cellZTranslate: cellZTranslate})),

    player1Score: 0,
    setPlayer1Score: (player1Score: number) => set(() => ({ player1Score: player1Score})),
    player2Score: 0,
    setPlayer2Score: (player2Score: number) => set(() => ({ player2Score: player2Score})),
    resetScore: () => set(() => ({ player1Score: 0, player2Score: 0}))
}))