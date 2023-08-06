'use client'
import '@/app/_styles/cell.css'
import Image from 'next/image'
import { useStore } from '@/app/_stateManagement/store'
import CellHover from '@/app/_components/CellHover'
import { MouseEvent, forwardRef } from 'react'
import { StartPos, Style } from '@/app/_types/types'

interface CellProps {
    i: number,
    j: number,
    k: number
}

const Cell = forwardRef<HTMLDivElement | null, CellProps>((props, ref) => {

    const {i, j, k} = props
    const win = useStore(state => state.win)
    const gridState = useStore(state => state.gridState)
    const setGridState = useStore(state => state.setGridState)
    const thirdDimension = useStore(state => state.thirdDimension)
    const gridSize = useStore(state => state.gridSize)
    const zTranslate = useStore(state => state.cellZTranslate)

    const handleGridStateChange = (row: number, col: number, dim: number, currChar: string) => {
        setGridState(() => {
            const newState = gridState.map((row) => row.map((col) => [...col]));
            newState[row][col][dim] = currChar;
            return newState;
        })
    }

    const handleClick = () => {
        if(gridState[i][j][k] === '' && !win) {
            handleGridStateChange(i, j, k, 'x')
            
        }
        else if(gridState[i][j][k] === 'x' && !win) {
            handleGridStateChange(i, j, k, 'o')
        }
        else if(gridState[i][j][k] === 'c' && !win) {
            handleGridStateChange(i, j, k, '')
        }
    }

    const renderImage = () => {
        if(gridState[i][j][k] !== '') {
            return (
                <Image 
                    src={`/${gridState[i][j][k]}.png`}
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
    //TODO: fix hover
    // const [hover, setHover] = useState<boolean>(false)
    // const [startPos, setStartPos] = useState<StartPos>(StartPos.top)
    // const CellRef = useRef<HTMLDivElement>(null)

    // const dist = (x1: number, y1: number, x2: number, y2: number) => {
    //     return Math.sqrt((x2-x1)**2 + (y2-y1)**2)
    // }
    // const getClosestDist = (event: MouseEvent): StartPos => {
    //     const {x, y, width, height} = CellRef.current!.getBoundingClientRect()
    //     const edges = {
    //         leftEdge: {x: x, y: y+height/2},
    //         rightEdge: {x: x+width, y: y+height/2},
    //         topEdge: {x: x+width/2, y: y},
    //         bottomEdge: {x: x+width/2, y: y+height} 
    //     }
    //     const {clientX, clientY} = event
    //     const {leftDist, rightDist, topDist, bottomDist} = {
    //         leftDist: dist(clientX, clientY, edges.leftEdge.x, edges.leftEdge.y),
    //         rightDist: dist(clientX, clientY, edges.rightEdge.x, edges.rightEdge.y),
    //         topDist: dist(clientX, clientY, edges.topEdge.x, edges.topEdge.y),
    //         bottomDist: dist(clientX, clientY, edges.bottomEdge.x, edges.bottomEdge.y)
    //     }
    //     const minDist = Math.min(leftDist, rightDist, topDist, bottomDist)
        
    //     if(minDist === leftDist) return StartPos.left
    //     else if(minDist === rightDist) return StartPos.right
    //     else if(minDist === topDist) return StartPos.top
    //     else return StartPos.bottom
    // }
    // const handleMouseEnter = (event: MouseEvent) => {
    //     setStartPos(getClosestDist(event))
    //     setHover(true)
    // }
    // const handleMouseLeave = () => {
    //     setHover(false)
    // }
    
    const CubeStyles: Style = {
        'top-cell': {
            transformStyle: 'preserve-3d',
            transform: `translateZ(${2 * zTranslate}px)`
        },
        'left-cell': {
            transformStyle: 'preserve-3d',
            transform: `translateZ(${zTranslate}px) translateY(50%) rotateX(90deg)`
        },
        'right-cell': {
            transformStyle: 'preserve-3d',
            transform: `translateZ(${zTranslate}px) translateY(-50%) rotateX(90deg)`
        },
        'front-cell': {
            transformStyle: 'preserve-3d',
            transform: `translateZ(${zTranslate}px) translateX(50%) rotateY(90deg)`
        },
        'back-cell': {
            transformStyle: 'preserve-3d',
            transform: `translateZ(${zTranslate}px) translateX(-50%) rotateY(90deg)`
        }
    } 

    return (
        <div className="cell-container">
            <div 
                className="cell"
                onClick={handleClick}
                ref = {ref ?? null}
            >
                {renderImage()}
            </div>
            {Object.keys(CubeStyles).map((key, i) => {
                return (
                    <div 
                        className="cell"
                        key={i}
                        onClick={handleClick}
                        style={CubeStyles[key]}
                    >
                        {renderImage()}
                    </div>
                )
            })}
        </div>
     );
})
 
export default Cell;