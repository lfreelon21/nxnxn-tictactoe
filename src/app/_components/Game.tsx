'use client'

import GridContainer from "./GridContainer";
import '@/app/_styles/grid.css'
import Buttons from './Buttons';
import Player from "./Player";
import CellCount from "./CellCount";
import { useStore } from '@/app/_stateManagement/store';

const Game = () => {

    return ( 
        <div className="background">
            <div className="game-container">
                <Player number={1} char='x'/>
                <GridContainer/>
                <Player number={2} char='o'/>
            </div>
            <CellCount/>
            <Buttons/>
        </div>
     );
}
export default Game;