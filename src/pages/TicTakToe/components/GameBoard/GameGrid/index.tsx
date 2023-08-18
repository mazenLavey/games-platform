import { useContext } from 'react';
import { TicTakToeContext } from 'context/TicTakToeContext';
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
        if (gameData.Nextplayer === playerInfo.playerSymbol) {
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
            </div>
            {gameData?.winner && gameData?.winner !== 'draw' && <div className="Winner">Player {gameData?.winner.toUpperCase()} wins!</div>}
            {gameData?.winner === 'draw' && <div className="Winner">It's a draw!</div>}
            {gameData?.winner && <button onClick={handleReset}>Restart</button>}
        </>
    );
};

export default GameGrid;
