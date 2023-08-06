import { useStore } from '@/app/_stateManagement/store';
import Image from 'next/image'
import '@/app/_styles/buttons.css'

const CellCount = () => {

    const cellCount = useStore(state => state.gridCellCount)
    const setCellCount = useStore(state => state.setGridCellCount)
    const setGridState = useStore(state => state.setGridState)
    const thirdDimension = useStore(state => state.thirdDimension)

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
                        setGridState(() => {
                            const dim = Math.pow(cellCount, 1/3) 
                            const newState = Array(dim + 1).fill('').map(() => Array(dim).fill('').map(() => Array(dim).fill('')))
                            return newState
                        })
                    }
                    else if(sign === 'minus') {
                        setGridState(() => {
                            const dim = Math.pow(cellCount, 1/3)
                            const newState = Array(dim - 1).fill('').map(() => Array(dim).fill('').map(() => Array(dim).fill('')))
                            return newState
                        })
                    }
                }}
            ></Image>
        )
    }

    return ( 
        <div className="cell-count-container">
            <div className="cell-count">CellCount: {thirdDimension ? cellCount : Math.ceil(Math.pow(cellCount, 2/3))}</div>
            <div className="cell-count-signs">
                <Sign sign="plus"/>
                <Sign sign="minus"/>
            </div>
        </div>
     );
}
 
export default CellCount;