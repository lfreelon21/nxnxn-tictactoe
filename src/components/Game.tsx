'use client'

import Grid from "./Grid";
import '@/styles/grid.css'
import Reset from './Reset';
import Player from "./Player";
import CellCount from "./CellCount";

const Game = () => {

    return ( 
        <div className="background">
            <div className="game-container">
                <Player number={1} char='x'/>
                <Grid/>
                <Player number={2} char='c'/>
            </div>
            <CellCount/>
            <Reset/>
        </div>
     );
}
export default Game;