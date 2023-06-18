import '@/styles/grid.css'
import { useStore } from '@/stateManagement/store'

const ThirdDimension = () => {

    const thirdDimension = useStore(state => state.thirdDimension)
    const setThirdDimension = useStore(state => state.setThirdDimension)

    return ( 
        <div 
            className="third-dimension-toggle"
            onClick={() => setThirdDimension(!thirdDimension)}
        >Third Dimension Toggle</div> 
    );
}
 
export default ThirdDimension;