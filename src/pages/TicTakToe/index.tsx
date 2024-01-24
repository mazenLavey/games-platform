import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import GameErrorFallback from "components/GameErrorFallback";
import routes from "routes";
import TicTakToeLogo from "./components/TicTakToeLogo";
import Btn from "components/Btn";
import TicTakToeBoardWrapper from "./components/TicTakToeBoardWrapper";
import './index.scss';

const TicTakToe: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <main className="TicTakToe">
            <TicTakToeBoardWrapper>
                {
                    location.pathname === routes.ticTakToePage ?
                    <>
                        <TicTakToeLogo />
                        <div className="TicTakToe__Tabs">
                            <Btn theme="purple" text="New Game" onClick={() => navigate(routes.newTicTakToeGame)} />
                            <Btn theme="purple" text="Join Game" onClick={() => navigate(routes.joinTicTakToeGame)} />
                        </div>
                    </>
                        :
                        <div className="TicTakToe__Content">
                            <ErrorBoundary FallbackComponent={GameErrorFallback}>
                                <Outlet />
                            </ErrorBoundary>
                        </div>
                }
            </TicTakToeBoardWrapper>
        </main>
    );
}

export default TicTakToe;
