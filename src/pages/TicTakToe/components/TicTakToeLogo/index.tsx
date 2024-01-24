import tictaktoeLogo from './assets/tictaktoe-logo.png';
import "./index.scss";

const TicTakToeLogo: React.FC = () => {
    return(
        <div className="TicTakToeLogo">
            <img className="TicTakToeLogo__Img popIn-animation" src={tictaktoeLogo} alt="TicTakToe Logo" />
        </div>
    )
}

export default TicTakToeLogo;