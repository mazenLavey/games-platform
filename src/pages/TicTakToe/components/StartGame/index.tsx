import GameRegister from "../GameRegister";
import JoinExistingGame from "../JoinExistingGame";



const StartGame: React.FC = () => {
    return (
        <div>
            <GameRegister />
            <br />
            <JoinExistingGame />
        </div>
    )
}

export default StartGame;