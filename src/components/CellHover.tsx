import '@/styles/cell.css'
import { motion } from 'framer-motion'
import { StartPos } from '@/types/types'

const CellHover = ({hover, startPos}: {hover: boolean, startPos: StartPos}) => {

    const {left, right, top, bottom}: {left: boolean, right: boolean, top: boolean, bottom: boolean} = {
        left: startPos === StartPos.left ? true : false,
        right: startPos === StartPos.right ? true : false,
        top: startPos === StartPos.top ? true : false,
        bottom: startPos === StartPos.bottom ? true : false
    }
    const variants = {
        width: {
            width: `${hover ? 100 : 0}%`
        },
        height: {
            height: `${hover ? 100 : 0}%`
        },
        left: {
            left: `${hover ? 100 : 0}%`
        },
        top: {
            top: `${hover ? 100 : 0}%`
        }
    }

    return ( 
        <motion.div 
            className="cell-hover"
            initial={{
                width: `${top || bottom ? 100 : 0}%`,
                height: `${left || right ? 100 : 0}%`,
                top: `${bottom ? 100 : 0}%`,
                bottom: `${top ? 100 : 0}%`,
                left: `${right ? 100 : 0}%`,
                right: `${left ? 100 : 0}%`,
            }}
            animate={
                left ?  'width'
                : right ? 'left'
                : top ? 'height'
                : bottom ? 'top'
                : 'width'
            }
            variants={variants}
            // transition={{duration: 1}}
        ></motion.div>
     );
}
 
export default CellHover;
