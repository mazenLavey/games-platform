import { BlackjackPlayerType } from 'types/interfaces';
import './index.css';

type Props = {
    playerData: BlackjackPlayerType,
    playerIndex: 0 | 1
}

const PlayerBox: React.FC<Props> = ({ playerData, playerIndex }) => {

    const renderCards = playerData.cards?.map((card, index) => {
        return (
            <img key={index} className="PlayerBox__card-img fedeIn-animation" src={card.img} alt={card.value} />
        )
    })

    return (
        <div className="PlayerBox">
            <div className="PlayerBox__header">
                <div className="PlayerBox__info">
                    <span className="PlayerBox__cards-value">Cards Value: {playerData.handValue}</span>
                    <h2 className="PlayerBox__name">{playerIndex === 0 ?`Player No.1: ${playerData.name}` : `Player No.2: ${playerData.name}`}</h2>
                </div>
            </div>
            <div className="PlayerBox__cards-wrapper">
                {renderCards}
            </div>
        </div>
    )
}

export default PlayerBox;