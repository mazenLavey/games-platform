


import PlayerX from './player-x.png';
import './index.css';


const X: React.FC = () => {
    return (
        <div className="X__container">
            <img className="X__img" src={PlayerX} alt="x" />
        </div>
    )
}

export default X;