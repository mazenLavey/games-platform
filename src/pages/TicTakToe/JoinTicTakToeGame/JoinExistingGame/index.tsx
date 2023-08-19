import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TicTakToeContext } from 'context/TicTakToeContext';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import FormInput from 'common/FormInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { toastNotifications } from 'common/Toastify';
import './index.css';

type UserType = {
    gameId: string,
    userName: string
}

const JoinExistingGame: React.FC = () => {
    const { joinExistingGame } = useContext(TicTakToeContext);
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
            setIsSubmitting(true)
            await joinExistingGame(userData.gameId, userData.userName)
            setTimeout(() => {
                setIsSubmitting(false)
            }, 300)
            navigate(`/tic-tak-toe/${userData.gameId}`)
        } catch (error: any) {
            toastNotifications.error(error.message)
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <form className='JoinExistingGame' onSubmit={handleSubmit}>
                <div className='JoinExistingGame__inputs'>
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

                <Button
                    variant="contained"
                    type='submit'
                    sx={{
                        background: "linear-gradient(90deg, #e51d74, #8d4fea)",
                        borderRadius: "12px",
                        fontWeight: "700",
                        fontSize: "20px",
                    }}
                >
                    Join
                </Button>
            </form >
            <Button
                variant="text"
                type='button'
                onClick={() => navigate(-1)}
                startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
                sx={{
                    color: "white"
                }}
            >
                Go back
            </Button>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isSubmitting}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}

export default JoinExistingGame;