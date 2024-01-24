import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.scss";

type Props = {
    onClick: () => void;
}

const CloseBtn: React.FC<Props> = ({ onClick }) => {
    return(
        <button
            className="CloseBtn"
            onClick={onClick}
        >
            <FontAwesomeIcon
                icon={faCircleXmark}
                size="2x"
                color="#fff"
            />
        </button>
    )
}

export default CloseBtn;