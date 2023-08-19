import PlayerO from './player-o.png';
import './index.css';


const O: React.FC = () => {
    return (
        <div className="O__container">
            <img className="O__img" src={PlayerO} alt="o" />
        </div>
    )
}

export default O;