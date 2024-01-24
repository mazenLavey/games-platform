import CloseBtn from "components/CloseBtn";
import DecorationFigure from "../DecorationFigure";
import TicTakToeBackgroung from "../TicTakToeBackgroung";
import { useNavigate } from "react-router-dom";
import routes from "routes";
import "./index.scss";

type Props = {
    children: React.ReactNode,
}

const TicTakToeBoardWrapper: React.FC<Props> = ({ children }) => {
    const navigate = useNavigate();

    return(
        <div className="TicTakToeBoardWrapper container">
            <TicTakToeBackgroung />
            <DecorationFigure figure="o" />
            <DecorationFigure figure="x" />

            { children }

            <CloseBtn onClick={() => navigate(routes.home)} />
        </div>
    );
};

export default TicTakToeBoardWrapper;