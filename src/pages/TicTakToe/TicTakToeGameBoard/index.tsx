import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { TicTakToeContext } from 'context/TicTakToeContext';
import GameGrid from "./GameGrid";
import JoinLink from "components/JoinLink";
import PlayerCard from "./PlayerCard";
import LoadingBackdrop from "components/LoadingBackdrop";
import routes from "routes";
import { toastNotifications } from "components/Toastify";
import { ALERT_MESSAGES } from "constants/messages";
import './index.scss';

const TicTakToeGameBoard: React.FC = () => {
    const { gameData, playerInfo } = useContext(TicTakToeContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(gameData.id === '') {
            toastNotifications.warn(ALERT_MESSAGES.NOT_REFRESH);
            navigate(routes.joinTicTakToeGame, { replace: true });
        };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameData.id])

    if (gameData.id === '') {
        return <LoadingBackdrop isLoading={true} />;
    }

    return (
        <div className="TicTakToeGameBoard">
            <div className="TicTakToeGameBoard__info">
                <PlayerCard
                    playerInfo={playerInfo}
                    gameData={gameData}
                />
                <JoinLink />
            </div>
            <GameGrid />
        </div>
    )
}

export default TicTakToeGameBoard;