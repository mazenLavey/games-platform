import { NewGameType, playerInfoType } from "types/interfaces";
import './index.css';
import O from "../GameGrid/O";
import X from "../GameGrid/X";

type Props = {
    playerInfo: playerInfoType,
    gameData: NewGameType
}

const PlayerCard: React.FC<Props> = ({ playerInfo, gameData }) => {
    return (
        <div className="PlayerCard">
            <div className="PlayerCard__body">
                <p className="PlayerCard__name">{playerInfo.playerName}</p>

                {
                    playerInfo.playerSymbol === "x" ?
                        <X />
                        :
                        <O />
                }
            </div>
            <div className="PlayerCard__score">
                <span>Your Score: {playerInfo.playerSymbol === "x" ? gameData.winsX : gameData.winsO}</span>
                <span>Opponent's Score: {playerInfo.playerSymbol === "x" ? gameData.winsO : gameData.winsX}</span>
                <div className="PlayerCard__next-player">
                    {
                        gameData.Nextplayer === "x" ?
                            <>
                                Next&nbsp;Move: <X />
                            </>

                            :
                            <>
                                Next&nbsp;Move: <O />
                            </>
                    }
                </div>
            </div>
        </div>
    )
}

export default PlayerCard;