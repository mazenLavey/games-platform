import Cards from './assets/cards.png';
import "./index.scss";

const BlackjackBackground: React.FC = () => {
    return(
        <img className="BlackjackBackground" src={Cards} alt="background" />
    )
}

export default BlackjackBackground;