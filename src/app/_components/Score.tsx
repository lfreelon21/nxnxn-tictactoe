import '@/app/_styles/players.css';

const Score = ({score}: {score: number}) => {

    const scoreString = 'Score: ' + score;

    return ( 
        <div className="score">{scoreString}</div>
     );
}
 
export default Score;