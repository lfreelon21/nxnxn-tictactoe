import '@/app/_styles/buttons.css'
import { useStore } from '@/app/_stateManagement/store';

const Buttons = () => {

    const reset = useStore(state => state.reset)
    const resetScore = useStore(state => state.resetScore)
    const setThirdDimension = useStore(state => state.setThirdDimension)
    const thirdDimension = useStore(state => state.thirdDimension)

    const handleReset = () => {
        reset();
    }
    const handleGlobalReset = () => {
        reset();
        resetScore();
        setThirdDimension(false);
    }

    return (
        <div className="reset-container">
            <button className="button" onClick={handleReset}>Reset Board</button>
            <button className="button" onClick ={handleGlobalReset}>Global Reset</button>
            <button 
                className="button"
                onClick={() => setThirdDimension(!thirdDimension)}
            >Third Dimension Toggle</button> 
        </div> 
     );
}
 
export default Buttons;