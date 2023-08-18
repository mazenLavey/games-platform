import { useContext } from "react";
import { TicTakToeContext } from 'context/TicTakToeContext';
import GameGrid from "./GameGrid";
import JoinLink from "./JoinLink";
import './index.css';


const GameBoard: React.FC = () => {
    const { gameData, playerInfo } = useContext(TicTakToeContext);
    return (
        <div>
            <GameGrid />
            <JoinLink gameId={gameData.id}/>
            <p>player name: {playerInfo.playerName}</p>
            <p>player Symbol: {playerInfo.playerSymbol}</p>
        </div>
    )
}

export default GameBoard;