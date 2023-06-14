import { useStore } from '@/stateManagement/store';
import Image from 'next/image'

const CellCount = () => {

    const cellCount = useStore(state => state.gridCellCount)
    const setCellCount = useStore(state => state.setGridCellCount)
    const setGridState = useStore(state => state.setGridState)

    const Sign = ({sign}: {sign: string}) => {
        return (
            <Image 
                src={`/${sign}.png`}
                alt={sign}
                width="50"
                height="50"
                draggable={false}
                style={{
                    userSelect: 'none',
                    margin: '0 10px',
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    cursor: 'pointer',
                }}
                priority={true}
                onClick={() => {
                    if(sign === 'plus') {
                        setCellCount(Math.pow(Math.sqrt(cellCount) + 1, 2))
                        setGridState(() => {
                            const newState = Array(Math.pow(Math.sqrt(cellCount) + 1, 2)).fill('')
                            return newState
                        })
                    }
                    else if(sign === 'minus') {
                        setCellCount(Math.pow(Math.sqrt(cellCount) - 1, 2))
                        setGridState(() => {
                            const newState = Array(Math.pow(Math.sqrt(cellCount) - 1, 2)).fill('')
                            return newState
                        })
                    }
                }}
            ></Image>
        )
    }

    return ( 
        <div className="cell-count-container">
            <div className="cell-count">CellCount: {cellCount}</div>
            <div className="cell-count-signs">
                <Sign sign="plus"/>
                <Sign sign="minus"/>
            </div>
        </div>
     );
}
 
export default CellCount;