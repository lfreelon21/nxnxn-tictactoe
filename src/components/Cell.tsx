'use client'
import '@/styles/grid.css'
import Image from 'next/image'
import { useStore } from '@/stateManagement/store';
import { motion } from 'framer-motion'

const Cell = ({index}: {index: number}) => {

    const win = useStore(state => state.win)
    const gridState = useStore(state => state.gridState)
    const setGridState = useStore(state => state.setGridState)

    const handleGridStateChange = (index: number, currChar: string) => {
        setGridState(() => {
            const newState = [...gridState]
            newState[index] = currChar
            return newState
        })
    }

    const handleClick = () => {
        if(gridState[index] === '' && !win) {
            handleGridStateChange(index, 'x')
            
        }
        else if(gridState[index] === 'x' && !win) {
            handleGridStateChange(index, 'c')
        }
        else if(gridState[index] === 'c' && !win) {
            handleGridStateChange(index, '')
        }
    }

    const renderImage = () => {
        if(gridState[index] !== '') {
            return (
                <Image 
                    src={`/${gridState[index]}.png`}
                    alt="X"
                    width="100"
                    height="100"
                    draggable={false}
                    style={{
                        // userDrag: 'none', 
                        pointerEvents: 'none',
                        userSelect: 'none',
                    }}
                    // priority={true}
                ></Image>
            )
        }
    }

    return ( 
        <div 
            className="cell"
            onClick={handleClick}
        >
            {renderImage()}
            {/* <motion.div 
                className="cell-hover"
                // initial={{width: 0}}
                whileHover={{width: '100%'}}
                style={{
                    transition: 'width 0.3s'
                }}
            ></motion.div> */}
        </div>
     );
}
 
export default Cell;