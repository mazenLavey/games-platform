import { NavLink } from "react-router-dom";
import TictactoeThumbnail from './assets/tictactoe-thumbnail.png';
import BlackjackThumbnail from './assets/blackjack-thumbnail.png';
import './index.css';

const Home: React.FC = () => {
    return (
        <main className="Home container">
            <NavLink className={"Home__thumbnail-wrapper"} to={"tic-tak-toe"}>
                <div className="Home__thumbnail-container">
                    <img className="Home__thumbnail-img" src={TictactoeThumbnail} alt="tictactoe Thumbnail" />
                </div>
                <h2 className="Home__thumbnail-title">Tic&nbsp;Tak&nbsp;Toe</h2>
            </NavLink>

            <NavLink className={"Home__thumbnail-wrapper"} to={"blackjack"}>
                <div className="Home__thumbnail-container">
                    <img className="Home__thumbnail-img" src={BlackjackThumbnail} alt="tictactoe Thumbnail" />
                </div>
                <h2 className="Home__thumbnail-title">Blackjack</h2>
            </NavLink>
        </main>
    );
}

export default Home;
