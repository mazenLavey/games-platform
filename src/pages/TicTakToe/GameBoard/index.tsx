import { useContext } from "react";
import { TicTakToeContext } from 'context/TicTakToeContext';
import GameGrid from "./GameGrid";
import JoinLink from "./JoinLink";
import PlayerCard from "./PlayerCard";
import './index.css';

const GameBoard: React.FC = () => {
    const { gameData, playerInfo } = useContext(TicTakToeContext);

    return (
        <div className="GameBoard">
            <div className="GameBoard__info">
                <PlayerCard
                    playerInfo={playerInfo}
                    gameData={gameData}
                />
                <JoinLink gameId={gameData.id} />
            </div>
            <GameGrid />
        </div>
    )
}

export default GameBoard;