import { useContext } from "react";
import { BlackjackContext } from "context/BlackjackContext";
import PlayerBox from "./PlayerBox";
import JoinLink from "./JoinLink";
import PlayerBtns from "./PlayerBtns";
import Button from '@mui/material/Button';
import './index.css';

const BlackjackGameBoard: React.FC = () => {
    const { gameData, restartGame } = useContext(BlackjackContext);

    return (
        <div className="BlackjackGameBoard">
            {gameData.players.length < 2 ?
                <JoinLink gameId={gameData.id} />
                :
                <PlayerBox key={gameData.players[1].playerId} playerData={gameData.players[1]} playerIndex={1} />
            }

            {
                gameData.gameOver ?
                    <div className="BlackjackGameBoard__winner">
                        <p >{gameData.winner}</p>
                        <Button
                            variant="contained"
                            size='small'
                            sx={{
                                background: "linear-gradient(60deg, #61000a, #0a3500)",
                                borderRadius: "12px",
                                fontWeight: "500",
                                fontSize: "14px",
                                width: "fit-content",
                            }}
                            onClick={() => restartGame()}
                        >
                            play&nbsp;again
                        </Button>
                    </div>
                    :
                    <PlayerBtns />
            }

            <PlayerBox key={gameData.players[0]?.playerId} playerData={gameData.players[0]} playerIndex={0} />
        </div>
    )
}

export default BlackjackGameBoard;