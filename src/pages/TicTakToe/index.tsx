import { useContext } from "react";
import { TicTakToeContext } from 'context/TicTakToeContext';
import StartGame from "./components/StartGame";
import GameBoard from "./components/GameBoard";

const TicTakToe: React.FC = () => {
    const { gameData } = useContext(TicTakToeContext);
    return (
        <main className="TicTakToe">
            {gameData.id.length > 0? 
                <GameBoard/>
                :
                <StartGame />
            }
        </main>
    );
}

export default TicTakToe;
