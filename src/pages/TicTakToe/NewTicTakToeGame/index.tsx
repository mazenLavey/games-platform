import { useState, useContext } from 'react';
import { TicTakToeContext } from 'context/TicTakToeContext';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import FormInput from 'components/FormInput';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { toastNotifications } from 'components/Toastify';
import routes from 'routes';
import Btn from 'components/Btn';
import GoBackBtn from 'components/GoBackBtn';
import LoadingBackdrop from 'components/LoadingBackdrop';
import { ALERT_MESSAGES } from 'constants/messages';
import './index.scss';

const NewTicTakToeGame: React.FC = () => {
    const { initGame } = useContext(TicTakToeContext);
    const navigate = useNavigate();
    const [playerSymbol, setPlayerSymbol] = useState<'x' | 'o'>('x');
    const [playerName, setPlayerName] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleClose = () => {
        setIsSubmitting(false);
    };

    const handleChange = (
        e: React.MouseEvent<HTMLElement>,
        symbol: 'x' | 'o',
    ) => {
        setPlayerSymbol(symbol);
    };

    const handleField = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlayerName(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setIsSubmitting(true)
            const gameId = nanoid(10);

            await initGame(gameId, playerName, playerSymbol)

            navigate(`${routes.ticTakToeGameBoard}?gameid=${gameId}`);

            setIsSubmitting(false);

            toastNotifications.success(ALERT_MESSAGES.NEW_GAME);
        } catch {
            setIsSubmitting(false);
        }
    }

    return (
        <div className='NewTicTakToeGame'>
            <form className='NewTicTakToeGame__Form' onSubmit={handleSubmit}>
                <div className='NewTicTakToeGame__PlayerInfo'>
                    <FormInput
                        type="text"
                        id="playerName"
                        name='playerName'
                        label="Name"
                        placeholder="Enter your name"
                        value={playerName}
                        onChange={handleField}
                        disabled={false}
                        required
                    />
                    <div className='NewTicTakToeGame__PlayerSymbol'>
                        <span>Symbol</span>
                        <ToggleButtonGroup
                            color="primary"
                            value={playerSymbol}
                            exclusive
                            onChange={handleChange}
                            aria-label="Platform"
                        >
                            <ToggleButton value="x">X</ToggleButton>
                            <ToggleButton value="o">O</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                </div>
                <Btn theme='purple' text='Start' type='submit' isWide />
            </form>

            <GoBackBtn />
            <LoadingBackdrop isLoading={isSubmitting} onClick={handleClose} />
        </div>
    )
}

export default NewTicTakToeGame;