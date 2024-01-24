import { useContext, useEffect } from "react";
import { BlackjackContext } from "context/BlackjackContext";
import { useNavigate } from "react-router-dom";
import routes from "routes";
import LoadingBackdrop from "components/LoadingBackdrop";
import PlayerBox from "./PlayerBox";
import JoinLink from "components/JoinLink";
import PlayerBtns from "./PlayerBtns";
import Btn from "components/Btn";
import { toastNotifications } from "components/Toastify";
import { ALERT_MESSAGES } from "constants/messages";
import './index.scss';

const BlackjackGameBoard: React.FC = () => {
    const { gameData, restartGame } = useContext(BlackjackContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(gameData.id === '') {
            toastNotifications.warn(ALERT_MESSAGES.NOT_REFRESH);
            navigate(routes.joinBlackjackGame, { replace: true });
        };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameData.id])

    if (gameData.id === '') {
        return <LoadingBackdrop isLoading={true} />;
    }

    return (
        <div className="BlackjackGameBoard">
            {gameData.players.length < 2 ?
                <JoinLink />
                :
                <PlayerBox key={gameData.players[1].playerId} playerData={gameData.players[1]} playerIndex={1} />
            }

            {
                gameData.gameOver ?
                    <div className="BlackjackGameBoard__winner">
                        <p >{gameData.winner}</p>
                        <Btn text="play again" theme="darkBrowen" onClick={restartGame}/>
                    </div>
                    :
                    <PlayerBtns />
            }

            <PlayerBox key={gameData.players[0]?.playerId} playerData={gameData.players[0]} playerIndex={0} />
        </div>
    )
}

export default BlackjackGameBoard;