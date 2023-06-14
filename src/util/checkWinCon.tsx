const checkHorizontalWin = (gridCellCount: number, gridState: string[]) => {
    for(let i = 0; i < gridCellCount; i += Math.sqrt(gridCellCount)) {
        for(let j = i; j < i + Math.sqrt(gridCellCount); j++) {
            if(gridState[j] !== gridState[i] || gridState[j] === '') break;
            if(j === i + Math.sqrt(gridCellCount) - 1) return {val: true, char: gridState[i]}
        }
    }
    return {val: false, char: ''}
}

const checkVerticalWin = (gridCellCount: number, gridState: string[]) => {
    for(let i = 0; i < Math.sqrt(gridCellCount); i++) {
        for(let j = i; j < gridCellCount; j += Math.sqrt(gridCellCount)) {
            if(gridState[j] !== gridState[i] || gridState[j] === '') break;
            if(j === gridCellCount - Math.sqrt(gridCellCount) + i) return {val: true, char: gridState[i]}
        }
    }
    return {val: false, char: ''}
}

const checkDiagonalWin = (gridCellCount: number, gridState: string[]) => {
    for(let i = 0; i < gridCellCount; i+= Math.sqrt(gridCellCount) + 1){
        if(gridState[i] !== gridState[0] || gridState[i] === '') break;
        if(i === gridCellCount - 1) return {val: true, char: gridState[0]}
    }
    for(let i = Math.sqrt(gridCellCount) - 1; i < gridCellCount - 1; i += Math.sqrt(gridCellCount) - 1){
        if(gridState[i] !== gridState[Math.sqrt(gridCellCount) - 1] || gridState[i] === '') break;
        if(i === gridCellCount - Math.sqrt(gridCellCount)) return {val: true, char: gridState[Math.sqrt(gridCellCount) - 1]}
    }
    return {val: false, char: ''}
}

export const checkWinCon = (gridState: string[], gridCellCount: number) => {
    const horizontalWin = checkHorizontalWin(gridCellCount, gridState)
    const verticalWin = checkVerticalWin(gridCellCount, gridState)
    const diagonalWin = checkDiagonalWin(gridCellCount, gridState)

    if(horizontalWin.val) return horizontalWin
    if(verticalWin.val) return verticalWin
    if(diagonalWin.val) return diagonalWin

    return {val: false, char: ''}
}