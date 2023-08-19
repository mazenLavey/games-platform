import { useNavigate, useLocation, Outlet } from "react-router-dom";
import Button from '@mui/material/Button';
import BgIntro from './assets/bg-game.png';
import BgIntroLight from './assets/bg-game-light.webp';
import tictaktoeLogo from './assets/tictaktoe-logo.png';
import ElementO from './assets/element-01.png';
import ElementX from './assets/element-02.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import './index.css';

const TicTakToe: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation();

    return (
        <main className="TicTakToe">
            <div className="TicTakToe__container container">
                <picture>
                    <source srcSet={BgIntroLight} type="image/webp" />
                    <img className="TicTakToe__bg" src={BgIntro} alt="background" />
                </picture>
                {
                    location.pathname === '/tic-tak-toe' ?
                        <div className="TicTakToe__logo-container">
                            <img className="TicTakToe__logo popIn-animation" src={tictaktoeLogo} alt="background" />
                        </div>
                        :
                        null
                }
                <img className="TicTakToe__element-o" src={ElementO} alt="background" />
                <img className="TicTakToe__element-x" src={ElementX} alt="background" />

                {
                    location.pathname === '/tic-tak-toe' ?
                        <div className="TicTakToe__tabs">
                            <Button
                                variant="contained"
                                onClick={() => navigate('new-game')}
                                sx={{
                                    background: "linear-gradient(90deg, #e51d74, #8d4fea)",
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
                                onClick={() => navigate('join-game')}
                                sx={{
                                    background: "linear-gradient(90deg, #e51d74, #8d4fea)",
                                    borderRadius: "12px",
                                    fontWeight: "700",
                                    fontSize: "20px",
                                    width: "170px",
                                }}
                            >
                                Join Game

                            </Button>
                        </div>
                        :
                        <div className="TicTakToe__content">
                            <Outlet />
                        </div>
                }
                <button
                    className="TicTakToe__close"
                    onClick={() => navigate('/')}
                >
                    <FontAwesomeIcon
                        className="TicTakToe__close-icon"
                        icon={faCircleXmark} size="2x"
                    />
                </button>
            </div>
        </main>
    );
}

export default TicTakToe;
