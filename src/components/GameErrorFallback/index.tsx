import { useNavigate } from "react-router-dom";
import routes from "routes";
import Btn from "components/Btn";
import "./index.scss";

const GameErrorFallback: React.FC = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(routes.home, {replace: true});
    }

    return(
        <div className="GameErrorFallback">
            error
            <Btn text="Go back" onClick={handleClick} theme="white" />
        </div>
    )
}

export default GameErrorFallback;