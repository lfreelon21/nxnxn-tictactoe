import { useStore } from '@/stateManagement/store';
import Cell from './Cell';
import React, { use, useEffect, useState, useRef } from 'react';
import '@/styles/grid.css'
import { checkWinCon } from '@/util/checkWinCon'

interface GridProps {
    gridZTranslate?: string
}

const GridContainer = () => {

    const gridCellCount = useStore(state => state.gridCellCount)
    const gridState = useStore(state => state.gridState)
    const setWin = useStore(state => state.setWin)
    const setWinningChar = useStore(state => state.setWinningChar)
    const gridSize = useStore(state => state.gridSize)
    const setGridSize = useStore(state => state.setGridSize)
    const thirdDimension = useStore(state => state.thirdDimension)
    const zTranslate = useStore(state => state.cellZTranslate)
    const setZTranslate = useStore(state => state.setCellZTranslate)

    useEffect(() => {
        const checkWin = () => {
            const checkWin = checkWinCon(gridState, gridCellCount)
            if(checkWin.val) {
                setWin();
                setWinningChar(checkWin.char)
                console.log(checkWin.char + ' wins!')
            }
        }

        return checkWin() 
    },[gridState])

    const cellRef = useRef<HTMLDivElement>(null)
    const cells: React.ReactElement[] = []
    while(cells.length < gridCellCount) cells.push(<Cell index={cells.length} key={cells.length}/>)

    cells[0] = <Cell index={0} key={0} ref={cellRef}/>
        
    const handleGridWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        const numericSize = Number(gridSize.slice(0, gridSize.length-1))
        const deltaYNumeric = e.deltaY / 50
        // console.log('gridSize: ' + numericSize + ' change: ' + deltaYNumeric)
        const newGridSize = numericSize + deltaYNumeric
        if(newGridSize <= 100) setGridSize(newGridSize)
    }
    const [Xrotate, setXrotate] = useState<string>('60deg')
    const [Yrotate, setYrotate] = useState<string>('0deg')
    const [Zrotate, setZrotate] = useState<string>('135deg')

    // const handleDragRotate = (e: React.DragEvent<HTMLDivElement>) => {
    //     console.log(e)
    // }

    useEffect(() => {
        setZTranslate(cellRef.current ? cellRef.current.offsetHeight * .5 : 88.5)
        // console.log('CellHeight: ' + cellRef.current?.offsetHeight)
        // console.log('zTranslate: ' + zTranslate)

    }, [cellRef.current?.offsetHeight, gridSize, gridState])

    const Grid = (props: GridProps) => {
        
        const { gridZTranslate } = props
        
        return (
            <div 
                className="grid"
                style={{
                    position: 'absolute',
                    gridTemplateColumns: `repeat(${Math.sqrt(gridCellCount)}, 1fr)`,
                    gridTemplateRows: `repeat(${Math.sqrt(gridCellCount)}, 1fr)`,
                    height: `${gridSize}`,
                    transformStyle: thirdDimension ? 'preserve-3d' : 'flat',
                    transform: thirdDimension ? `perspective(2000px) rotateX(${Xrotate}) rotateZ(${Zrotate}) rotateY(${Yrotate}) translateZ(${gridZTranslate ?? '0px'})` : ''
                }}
                onWheel={handleGridWheel}
                // onDrag={handleDragRotate}
                >{cells}
            </div>
        )
    }
    const grids: React.ReactElement[] = []
    while(grids.length < Math.sqrt(gridCellCount)-1) grids.push(<Grid key={grids.length} gridZTranslate={`${((grids.length + 1) * 200) - 300}px`}/>)
    //TODO: fix hard coded 300px, make it dynamic based on grid size
    //make game playable with 3d grid
    return (
        <div className="grid-container">
            {thirdDimension && grids}
            <Grid gridZTranslate={'-300px'}/>
        </div>
    );
}
export default GridContainer;