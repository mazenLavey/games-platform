import { useState, useContext } from 'react';
import { BlackjackContext } from 'context/BlackjackContext';
import { useNavigate } from 'react-router-dom';
import FormInput from 'components/FormInput';
import { toastNotifications } from 'components/Toastify';
import routes from 'routes';
import Btn from 'components/Btn';
import GoBackBtn from 'components/GoBackBtn';
import LoadingBackdrop from 'components/LoadingBackdrop';
import { ALERT_MESSAGES } from 'constants/messages';
import './index.scss';

type UserType = {
    gameId: string,
    userName: string
}

const JoinBlackjackGame: React.FC = () => {
    const { joinGame } = useContext(BlackjackContext)
    const [userData, setUserData] = useState<UserType>({
        gameId: "",
        userName: ""
    })
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleClose = () => {
        setIsSubmitting(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUserData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setIsSubmitting(true);

            await joinGame(userData.gameId, userData.userName);

            navigate(`${routes.blackjackGameBoard}?gameid=${userData.gameId}`);

            setIsSubmitting(false);

            toastNotifications.success(ALERT_MESSAGES.JOIN_GAME);
        } catch {
            setIsSubmitting(false);
        }
    }

    return (
        <div className='JoinBlackjackGame'>
            <form className='JoinBlackjackGame__Form' onSubmit={handleSubmit}>
                <div className='JoinBlackjackGame__inputs'>
                    <FormInput
                        type="text"
                        id="gameId"
                        name='gameId'
                        label="Game Id"
                        placeholder='Join with Id'
                        value={userData.gameId}
                        onChange={handleChange}
                        required
                    />
                    <FormInput
                        type="text"
                        id="userName"
                        name='userName'
                        label="Your Name"
                        placeholder="Enter your name"
                        value={userData.userName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <Btn theme='darkBrowen' text='Join' type='submit' isWide />
            </form >
            <GoBackBtn />
            <LoadingBackdrop isLoading={isSubmitting} onClick={handleClose} />
        </div>
    )
}

export default JoinBlackjackGame;