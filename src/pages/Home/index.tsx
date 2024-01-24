import TictactoeThumbnail from './assets/tictactoe-thumbnail.png';
import BlackjackThumbnail from './assets/blackjack-thumbnail.png';
import routes from "routes";
import GameCard from "components/GameCard";
import './index.scss';

const Home: React.FC = () => {
    return (
        <main className="Home container">
            <GameCard route={routes.ticTakToePage} src={TictactoeThumbnail} title="Tic Tak Toe"/>
            <GameCard route={routes.blackjackPage} src={BlackjackThumbnail} title="Blackjack" />
        </main>
    );
}

export default Home;
