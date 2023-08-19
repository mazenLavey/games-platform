import { useContext } from 'react';
import { TicTakToeContext } from 'context/TicTakToeContext';
import Button from '@mui/material/Button';
import O from './O';
import X from './X';
import './index.css';

const GameGrid: React.FC = () => {
    const { gameData, playerInfo, handleBoxClick, handleReset } = useContext(TicTakToeContext);

    const renderPlayerSymbol = (symbol: 'x' | 'o' | null) => {
        if (symbol === 'x') {
            return <X />;
        } else if (symbol === 'o') {
            return <O />;
        } else {
            return null
        }
    };


    const handleClick = (colIndex: number, rowIndex: number) => {
        if (gameData.Nextplayer === playerInfo.playerSymbol || gameData.Nextplayer === null) {
            handleBoxClick(colIndex, rowIndex)
        }
    }

    return (
        <>
            <div className="GameGrid">
                {gameData?.grid?.map((col, colIndex) => (
                    <div key={colIndex} className="GameGrid__column">
                        {col.map((symbol, rowIndex) => (
                            <div
                                key={rowIndex}
                                className={`GameGrid__box GameGrid__box--${colIndex}-${rowIndex}`}
                                onClick={() => handleClick(colIndex, rowIndex)}
                            >
                                {renderPlayerSymbol(symbol)}
                            </div>
                        ))}
                    </div>
                ))}
                {
                    gameData.gameFinished ?
                        <div className='GameGrid__results'>
                            <div className="GameGrid__winner">
                                {gameData?.winner === "draw" ?
                                    "It's a draw!"
                                    :
                                    gameData?.winner === playerInfo.playerSymbol ?
                                        `You win!`
                                        :
                                        "You loss!"
                                }

                            </div>
                            <Button
                                variant="contained"
                                type='submit'
                                onClick={handleReset}
                                sx={{
                                    background: "linear-gradient(90deg, #e51d74, #8d4fea)",
                                    borderRadius: "12px",
                                    fontWeight: "700",
                                    fontSize: "20px",
                                }}
                            >
                                Restart
                            </Button>
                        </div>
                        :
                        null
                }
            </div>
        </>
    );
};

export default GameGrid;
