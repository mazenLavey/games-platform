import { useNavigate, useLocation, Outlet } from "react-router-dom";
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import BgIntro from './assets/bg.png';
import BgIntroLight from './assets/bg-light.webp';
import BlackjackLogo from './assets/logo.png';
import Cards from './assets/cards.png';
// import ElementX from './assets/element-02.png';
import './index.css';

const Blackjack: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation();

    return (
        <main className="Blackjack">
            <div className="Blackjack__container container">
                {/* <picture>
                    <source srcSet={BgIntroLight} type="image/webp" />
                    <img className="Blackjack__bg" src={BgIntro} alt="background" />
                </picture> */}
                {
                    location.pathname === '/blackjack' ?
                        <div className="Blackjack__logo-container">
                            <img className="Blackjack__logo popIn-animation" src={BlackjackLogo} alt="background" />
                        </div>
                        :
                        null
                }
                <img className="Blackjack__cards" src={Cards} alt="background" />
                {/* <img className="Blackjack__element-x" src={ElementX} alt="background" /> */}

                {
                    location.pathname === '/blackjack' ?
                        <div className="Blackjack__tabs">
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
                        :
                        <div className="Blackjack__content">
                            <Outlet />
                        </div>
                }
                <button
                    className="Blackjack__close"
                    onClick={() => navigate('/')}
                >
                    <FontAwesomeIcon
                        className="Blackjack__close-icon"
                        icon={faCircleXmark} size="2x"
                    />
                </button>
            </div>
        </main>
    )
}

export default Blackjack;