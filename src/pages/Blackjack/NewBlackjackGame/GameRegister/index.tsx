import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import FormInput from 'common/FormInput';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { toastNotifications } from 'common/Toastify';
import './index.css';

const GameRegister: React.FC = () => {
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

        try {
            setIsSubmitting(true)
            setIsSubmitting(false)
            toastNotifications.success();
        } catch (error: any) {
            toastNotifications.error(error.message)
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <form className='GameRegister' onSubmit={handleSubmit}>
                <div className='GameRegister__player-info'>
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

                <Button
                    variant="contained"
                    type='submit'
                    sx={{
                        background: "linear-gradient(90deg, #e51d74, #8d4fea)",
                        borderRadius: "12px",
                        fontWeight: "700",
                        fontSize: "20px",
                        width: "100%"
                    }}
                >
                    Start
                </Button>
            </form>
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

export default GameRegister;