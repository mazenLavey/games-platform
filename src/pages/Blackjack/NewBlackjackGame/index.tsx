import { useState, useContext } from 'react';
import { BlackjackContext } from 'context/BlackjackContext';
import { useNavigate } from 'react-router-dom';
import FormInput from 'components/FormInput';
import Btn from 'components/Btn';
import GoBackBtn from 'components/GoBackBtn';
import LoadingBackdrop from 'components/LoadingBackdrop';
import { toastNotifications } from 'components/Toastify';
import routes from 'routes';
import { ALERT_MESSAGES } from 'constants/messages';
import { nanoid } from 'nanoid';
import './index.scss';

const NewBlackjackGame: React.FC = () => {
    const { initNewGame } = useContext(BlackjackContext);
    const navigate = useNavigate();
    const [playerName, setPlayerName] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleClose = () => {
        setIsSubmitting(false);
    };

    const handleField = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlayerName(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newGameId = nanoid(10);

        try {
            setIsSubmitting(true);

            await initNewGame(newGameId, playerName);

            navigate(`${routes.blackjackGameBoard}?gameid=${newGameId}`)

            setIsSubmitting(false);

            toastNotifications.success(ALERT_MESSAGES.NEW_GAME);
        } catch {
            setIsSubmitting(false);
        }
    }

    return (
        <div className='NewBlackjackGame'>
            <form className='NewBlackjackGame__Form' onSubmit={handleSubmit}>
                <div className='NewBlackjackGame__PLayerInfo'>
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
                </div>

                <Btn theme='darkBrowen' text='Start' type='submit' isWide />
            </form>

            <GoBackBtn />
            <LoadingBackdrop isLoading={isSubmitting} onClick={handleClose} />
        </div>
    )
}

export default NewBlackjackGame;