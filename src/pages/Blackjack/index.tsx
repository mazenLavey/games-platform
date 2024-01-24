import { useNavigate, useLocation, Outlet } from "react-router-dom";
import Button from '@mui/material/Button';
import { ErrorBoundary } from "react-error-boundary";
import GameErrorFallback from "components/GameErrorFallback";
import routes from "routes";
import BlackjackLogo from "./components/BlackjackLogo";
import BlackjackBoardWrapper from "./components/BlackjackBoardWrapper";
import './index.scss';

const Blackjack: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <main className="Blackjack">
            <BlackjackBoardWrapper>
                {
                    location.pathname === routes.blackjackPage ?
                    <>
                        <BlackjackLogo />
                        <div className="Blackjack__Tabs">
                            <Button
                                variant="contained"
                                onClick={() => navigate(routes.newBlackjackGame)}
                                sx={{
                                    background: "linear-gradient(60deg, #61000a, #0a3500)",
                                    borderRadius: "12px",
                                    fontWeight: "700",
                                    fontSize: "20px",
                                    width: "170px",
                                }}
                            >
                                New Game
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => navigate(routes.joinBlackjackGame)}
                                sx={{
                                    background: "linear-gradient(60deg, #61000a, #0a3500)",
                                    borderRadius: "12px",
                                    fontWeight: "700",
                                    fontSize: "20px",
                                    width: "170px",
                                }}
                            >
                                Join Game

                            </Button>
                        </div>
                    </>
                        :
                        <div className="Blackjack__Content">
                            <ErrorBoundary FallbackComponent={GameErrorFallback}>
                                <Outlet />
                            </ErrorBoundary>
                        </div>
                }
            </BlackjackBoardWrapper>
        </main>
    )
}

export default Blackjack;