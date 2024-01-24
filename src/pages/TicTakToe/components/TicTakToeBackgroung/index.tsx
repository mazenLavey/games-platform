import BgIntroLight from './assets/bg-game-light.webp';
import BgIntro from './assets/bg-game.png';
import "./index.scss";

const TicTakToeBackgroung: React.FC = () => {
    return(
        <picture>
            <source srcSet={BgIntroLight} type="image/webp" />
            <img className="TicTakToeBackgroung" src={BgIntro} alt="background" />
        </picture>
    )
}

export default TicTakToeBackgroung;