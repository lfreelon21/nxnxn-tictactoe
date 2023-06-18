'use client'

import GridContainer from "./GridContainer";
import '@/styles/grid.css'
import Reset from './Reset';
import Player from "./Player";
import CellCount from "./CellCount";
import ThirdDimension from "./ThirdDimension";
import { useStore } from '@/stateManagement/store';

const Game = () => {

    return ( 
        <div className="background">
            <div className="game-container">
                <Player number={1} char='x'/>
                <GridContainer/>
                <Player number={2} char='c'/>
            </div>
            <CellCount/>
            <Reset/>
            <ThirdDimension/>
        </div>
     );
}
export default Game;