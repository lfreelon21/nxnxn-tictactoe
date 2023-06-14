'use client'
import '@/styles/players.css';
import Score from './Score';
import { useState, useEffect } from 'react';
import { useStore } from '@/stateManagement/store';

const Player = ({ number, char}: {number: number, char: string}) => {
    
    const player = 'Player' + number;
    const winningChar = useStore(state => state.winningChar)
    const [score, setScore] = useState(0)
    useEffect(() => {
        if(winningChar === char) {
            setScore(score + 1)
        }
    },[winningChar])
    
    return (
        <div className="player-container">
            <div className="player">{player}</div>
            <Score score={score}/>  
        </div>
    );
}
 
export default Player;