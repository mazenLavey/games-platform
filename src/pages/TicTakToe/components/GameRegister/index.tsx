import { useState, useContext } from 'react';
import { TicTakToeContext } from 'context/TicTakToeContext';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


const GameRegister: React.FC = () => {
    const { initGame } = useContext(TicTakToeContext);
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
            await initGame(playerName, playerSymbol)
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
                    id="playerName"
                    name='playerName'
                    label="Your Name"
                    variant="outlined"
                    value={playerName}
                    onChange={handleField}
                    required={true}
                />

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

                <Button
                    variant="contained"
                    type='submit'
                >
                    Start
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

export default GameRegister;