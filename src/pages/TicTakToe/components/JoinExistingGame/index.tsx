import { useState, useContext } from 'react';
import { TicTakToeContext } from 'context/TicTakToeContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


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

    const handleClose = () => {
        setIsSubmitting(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
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
            setIsSubmitting(false)
        } catch (error: any) {
            console.log("error", error.message)
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <TextField
                    id="gameId"
                    name='gameId'
                    label="Game Id"
                    variant="outlined"
                    value={userData.gameId}
                    onChange={handleChange}
                    required={true}
                />
                <TextField
                    id="userName"
                    name='userName'
                    label="Your Name"
                    variant="outlined"
                    value={userData.userName}
                    onChange={handleChange}
                    required={true}
                />
                <Button
                    variant="contained"
                    type='submit'
                >
                    Join
                </Button>
            </form>
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