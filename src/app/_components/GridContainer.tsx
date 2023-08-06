import { useStore } from '@/app/_stateManagement/store';
import Cell from './Cell';
import React, { use, useEffect, useState, useRef } from 'react';
import '@/app/_styles/grid.css'
import { checkWinCon2D, checkWinCon3D } from '@/app/_util/checkWinCon'

interface GridProps {
    gridZTranslate?: string,
    layerIndex: number
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

    const handleGridWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        const numericSize = Number(gridSize.slice(0, gridSize.length-1))
        const deltaYNumeric = e.deltaY / 50
        // console.log('gridSize: ' + numericSize + ' change: ' + deltaYNumeric)
        const newGridSize = numericSize + deltaYNumeric
        if(newGridSize <= 100) setGridSize(newGridSize)
    }

    useEffect(() => {
        const checkWin = () => {
            const checkWin = thirdDimension ? checkWinCon3D(gridState) : checkWinCon2D(gridState);
            if(checkWin.val) {
                setWin();
                setWinningChar(checkWin.char);
                console.log(checkWin.char + ' wins!');
            }
        }

        return checkWin() 
    },[gridState])

    const cellRef = useRef<HTMLDivElement>(null);
    const cells: React.ReactElement[][][] | null[][][] = Array(Math.pow(gridCellCount, 1/3)).fill(null).map(() => Array(Math.pow(gridCellCount, 1/3)).fill(null).map(() => Array(Math.pow(gridCellCount, 1/3)).fill(null)));

    let key = 0;
    for(let i = 0; i < Math.pow(gridCellCount, 1/3); i++){
        for(let j = 0; j < Math.pow(gridCellCount, 1/3); j++){
            for(let k = 0; k < Math.pow(gridCellCount, 1/3); k++){
                cells[i][j][k] = <Cell i={i} j={j} k={k} key={key}/>
                key++;
            }
        }
    }

    cells[0][0][0] = <Cell i={0} j={0} k={0} key={0} ref={cellRef}/>
        
    
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

    const GridLayer = (props: GridProps) => {

        const { gridZTranslate, layerIndex } = props

        return (
            <div 
                className="grid"
                style={{
                    position: 'absolute',
                    gridTemplateColumns: `repeat(${Math.sqrt(gridCellCount)}, 1fr)`,
                    gridTemplateRows: `repeat(${Math.sqrt(gridCellCount)}, 1fr)`,
                    height: `${gridSize}`,
                    transformStyle: thirdDimension ? 'preserve-3d' : 'flat',
                    transform: thirdDimension ? `perspective(2000px) rotateX(${Xrotate}) rotateZ(${Zrotate}) rotateY(${Yrotate}) translateZ(${gridZTranslate ?? '-100px'})` : ''
                }}
                onWheel={handleGridWheel}
                // onDrag={handleDragRotate}
                >{cells[layerIndex]}
            </div>
        )
    }

    const Grid = () => {
        
        return (
            <div className="grid-container-3d">
                <GridLayer gridZTranslate={'-300px'} layerIndex={0}/>
                {thirdDimension && <GridLayer gridZTranslate={'-100px'} layerIndex={1}/>}
                {thirdDimension && <GridLayer gridZTranslate={'100px'} layerIndex={2}/>}
            </div>
        )
    }

    return (
        <div className="grid-container">
            <Grid/>
        </div>
    );
}
export default GridContainer;