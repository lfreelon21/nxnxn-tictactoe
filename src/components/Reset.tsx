import '@/styles/grid.css'
import { useStore } from '@/stateManagement/store';

const Reset = () => {

    const setGridState = useStore(state => state.setGridState)
    const reset = useStore(state => state.reset)
    const gridCellCount = useStore(state => state.gridCellCount)

    const handleReset = () => {
        setGridState(Array(gridCellCount).fill(''));
        reset();
    }

    return ( 
        <button className="reset" onClick={handleReset}>RESET</button>
     );
}
 
export default Reset;