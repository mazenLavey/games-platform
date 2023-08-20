import { useContext } from "react";
import { BlackjackContext } from "context/BlackjackContext";
import Button from '@mui/material/Button';
import './index.css';

const PlayerBtns: React.FC = () => {
    const { gameData, playerInfo, getCard, skipTurn } = useContext(BlackjackContext);

    return (
        <>
            {playerInfo.playerIndex === gameData.currentPlayerIndex && gameData.players.length === 2 ?
                <div className="PlayerBtns__actions fedeIn-animation">
                    <Button
                        variant="contained"
                        size='small'
                        sx={{
                            background: "linear-gradient(60deg, #cd6e6e, #0a3500)",
                            borderRadius: "12px",
                            fontWeight: "500",
                            fontSize: "14px",
                            width: "50px",
                        }}
                        onClick={() => skipTurn(playerInfo.playerIndex)}
                    >
                        stand
                    </Button>
                    <Button
                        variant="contained"
                        size='small'
                        sx={{
                            background: "linear-gradient(60deg, #61000a, #0a3500)",
                            borderRadius: "12px",
                            fontWeight: "500",
                            fontSize: "14px",
                            width: "50px",
                        }}
                        onClick={() => getCard(playerInfo.playerId, playerInfo.playerIndex)}
                    >
                        hit
                    </Button>
                </div>
                :
                <p className="PlayerBtns__text fedeIn-animation">Opponent's move</p>
            }
        </>
    )
}

export default PlayerBtns;