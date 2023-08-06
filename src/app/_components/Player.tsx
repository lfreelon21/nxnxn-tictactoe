'use client'
import '@/app/_styles/players.css';
import Score from './Score';
import { useState, useEffect } from 'react';
import { useStore } from '@/app/_stateManagement/store';

const Player = ({ number, char}: {number: number, char: string}) => {
    
    const player = 'Player' + number;
    const winningChar = useStore(state => state.winningChar)
    const score = number == 1 ? useStore(state => state.player1Score) : useStore(state => state.player2Score)
    const setScore = number == 1 ? useStore(state => state.setPlayer1Score) : useStore(state => state.setPlayer2Score)
    
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