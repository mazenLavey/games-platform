import { useNavigate } from "react-router-dom";
import routes from "routes";
import CloseBtn from "components/CloseBtn";
import BlackjackBackground from "../BlackjackBackground";
import "./index.scss";

type Props = {
    children: React.ReactNode,
}

const BlackjackBoardWrapper: React.FC<Props> = ({ children }) => {
    const navigate = useNavigate();

    return(
        <div className="BlackjackBoardWrapper container">
            <BlackjackBackground />

            { children }

            <CloseBtn onClick={() => navigate(routes.home)} />
        </div>
    )
}

export default BlackjackBoardWrapper;