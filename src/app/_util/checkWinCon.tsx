type Win = {
    val: boolean,
    char: string
}

const checkHorizontalWin2D = (gridState: string[][][]): Win => {
    for(let i = 0; i < gridState.length; i++){
        for(let j = 0; j < gridState[i].length; j++){
            if(gridState[0][i][j] !== gridState[0][i][j] || gridState[0][i][j] === '') break;
            if(j === gridState.length - 1) return {val: true, char: gridState[0][i][j]}
        }
    }
    return {val: false, char: ''}
}

const checkVerticalWin2D = (gridState: string[][][]): Win => {
    for(let i = 0; i < gridState.length; i++){
        for(let j = 0; j < gridState[i].length; j++){
            if(gridState[0][j][i] !== gridState[0][0][i] || gridState[0][j][i] === '') break;
            if(j === gridState.length - 1) return {val: true, char: gridState[0][0][i]}
        }
    }
    return {val: false, char: ''}
}

const checkDiagonalWin2D = (gridState: string[][][]): Win => {
    for(let i = 0, j = 0; i < gridState.length; i++, j++){
        if(gridState[0][i][j] !== gridState[0][0][0] || gridState[0][i][j] === '') break;
        if(i === gridState.length - 1) return {val: true, char: gridState[0][0][0]}
    }
    for(let i = 0, j = gridState.length - 1; i < gridState.length; i++, j--){
        if(gridState[0][i][j] !== gridState[0][0][gridState.length - 1] || gridState[0][i][j] === '') break;
        if(i === gridState.length - 1) return {val: true, char: gridState[0][0][gridState.length - 1]}
    }
    return {val: false, char: ''}
}

const checkHorizontalWin3D = (gridState: string[][][]): Win => {
    //TODO: win condition: 3 simultatneous wins in 2D
    
    return {val: false, char: ''}
}
const checkVerticalWin3D = (gridState: string[][][]): Win => {
    return {val: false, char: ''}
}
const checkDiagonalWin3D = (gridState: string[][][]): Win => {
    return {val: false, char: ''}
}

export const checkWinCon2D = (gridState: string[][][]): Win => {
    const horizontalWin = checkHorizontalWin2D(gridState)
    const verticalWin = checkVerticalWin2D(gridState)
    const diagonalWin = checkDiagonalWin2D(gridState)

    if(horizontalWin.val) return horizontalWin
    if(verticalWin.val) return verticalWin
    if(diagonalWin.val) return diagonalWin

    return {val: false, char: ''}
}

export const checkWinCon3D = (gridState: string[][][]): Win => {
    const horizontalWin = checkHorizontalWin3D(gridState)
    const verticalWin = checkVerticalWin3D(gridState)
    const diagonalWin = checkDiagonalWin3D(gridState)

    if(horizontalWin.val) return horizontalWin
    if(verticalWin.val) return verticalWin
    if(diagonalWin.val) return diagonalWin
    
    return {val: false, char: ''}
}