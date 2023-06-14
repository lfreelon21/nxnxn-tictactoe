import { useStore } from '@/stateManagement/store';
import Cell from './Cell';
import { useEffect } from 'react';
import '@/styles/grid.css'
import { checkWinCon } from '@/util/checkWinCon'

const Grid = () => {

    const gridCellCount = useStore(state => state.gridCellCount)
    const gridState = useStore(state => state.gridState)
    const setWin = useStore(state => state.setWin)
    const setWinningChar = useStore(state => state.setWinningChar)

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

    const cells: React.ReactElement[] = []
    while(cells.length < gridCellCount) cells.push(<Cell index={cells.length} key={cells.length}/>)

    // useEffect(() => {
    //     console.log(cells.length)
    //     while(cells.length < gridCellCount) cells.push(<Cell index={cells.length} key={cells.length}/>)
    // }, [cells.length, gridCellCount])
    // while(cells.length < gridCellCount) cells.push(<Cell index={cells.length} key={cells.length}/>)

    return (
        <div 
            className="grid"
            style={{
                gridTemplateColumns: `repeat(${Math.sqrt(gridCellCount)}, 1fr)`,
                gridTemplateRows: `repeat(${Math.sqrt(gridCellCount)}, 1fr)`,
            }}
        >{cells}</div>
    );
}
export default Grid;