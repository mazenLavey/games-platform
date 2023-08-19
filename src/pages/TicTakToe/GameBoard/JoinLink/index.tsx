import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { toastNotifications } from "common/Toastify";
import './index.css';

type Props = {
    gameId: string
}

const JoinLink: React.FC<Props> = ({gameId}) => {
    const idRef = useRef<HTMLDivElement>(null)

    const handleClick = (e: React.MouseEvent<HTMLDivElement>)=>{
        const copiedId = idRef.current?.dataset.id;
        if(copiedId) {
            try {
                navigator.clipboard.writeText(copiedId)
                toastNotifications.info()
            } catch(error: any) {
                toastNotifications.error(error.message)
            }
        }
    }


    return (
        <div className="JoinLink">
            <h3 className="JoinLink__title">Share the Game</h3>
            <div
                className="JoinLink__wrapper"
                onClick={handleClick}
            >
                <span className="JoinLink__text" ref={idRef} data-id={gameId}>{gameId}</span>
                <FontAwesomeIcon className="JoinLink__icon" icon={faCopy} />
            </div>
        </div>
    )
}

export default JoinLink;