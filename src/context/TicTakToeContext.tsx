import { createContext, useEffect, useState } from 'react';
import { db } from 'config/firebase';
import { ref, set, onValue, child, get } from "firebase/database";
import { GameStatusType, NewGameType, playerInfoType, playerSymbolType } from 'types/interfaces';
import { toastNotifications } from 'components/Toastify';
import { ALERT_MESSAGES } from 'constants/messages';

type Props = {
    children: React.ReactNode
}

interface MessagesContextType {
    gameData: NewGameType,
    playerInfo: playerInfoType,
    handleBoxClick: (col: number, row: number) => void,
    handleReset: () => void,
    initGame: (gameId: string, playerName: string, playerSymbol: playerSymbolType) => Promise<void>,
    joinExistingGame: (existingGameId: string, secondPlayerName: string) => Promise<void>,
}

const TicTakToeContext = createContext<MessagesContextType>({
    gameData: {
        id: '',
        gameFinished: false,
        grid: [
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ],
        winner: null,
        Nextplayer: null,
        winsX: 0,
        winsO: 0,
        playersInSession: 0,
    },
    playerInfo: {
        playerName: "",
        playerSymbol: "x"
    },
    handleBoxClick: (col, row) => { },
    handleReset: () => { },
    initGame: (gameId, playerName, playerSymbol) => Promise.resolve(),
    joinExistingGame: (existingGameId, secondPlayerName) => Promise.resolve(),
})


const TicTakToeProvider: React.FC<Props> = ({ children }) => {

    const [gameData, setGameData] = useState<NewGameType>({
        id: '',
        gameFinished: false,
        grid: [
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ],
        winner: null,
        Nextplayer: null,
        winsX: 0,
        winsO: 0,
        playersInSession: 0,
    });

    const [playerInfo, setPlayerInfo] = useState<playerInfoType>({
        playerName: "",
        playerSymbol: "x"
    });

    useEffect(() => {
        if (gameData.id) {
            try {
                const TicTakToeRef = ref(db, 'TicTakToe/' + gameData.id);

                onValue(TicTakToeRef, (snapshot) => {
                    const data = snapshot.val();
                    const parsedData = JSON.parse(data)
                    setGameData(parsedData)
                })

            } catch (error: any) {
                toastNotifications.error(ALERT_MESSAGES.NETWORK_ERROR)
            }
        }
    }, [gameData.id]);


    const initGame = async (gameId: string, playerName: string, playerSymbol: playerSymbolType) => {
        const newGame: NewGameType = {
            id: gameId,
            gameFinished: false,
            grid: [
                [null, null, null],
                [null, null, null],
                [null, null, null],
            ],
            winner: null,
            Nextplayer: playerSymbol === "x" ? "o" : "x",
            winsX: 0,
            winsO: 0,
            playersInSession: 1,
        };
        
        const TicTakToeRef = ref(db, 'TicTakToe/' + newGame.id);

        try {
            await set(TicTakToeRef, JSON.stringify(newGame));
            setPlayerInfo({
                playerName: playerName,
                playerSymbol: playerSymbol
            });
            setGameData(newGame);
            return Promise.resolve();

        } catch (err: any) {
            toastNotifications.error(ALERT_MESSAGES.NETWORK_ERROR);
            console.error("[TicTakToe:initGame]", err);
            return Promise.reject();
        }
    }

    const joinExistingGame = async (existingGameId: string, secondPlayerName: string) => {
        const path = `TicTakToe/${existingGameId}`;

        try {
            const snapshot = await get(child(ref(db), path));
    
            if (!snapshot.exists()) {
                toastNotifications.error(ALERT_MESSAGES.GAME_NOT_EXIST);
                return Promise.reject();
            }
    
            const data = snapshot.val();
            let parsedData = JSON.parse(data);
    
            if ( parsedData.playersInSession > 1 ) {
                toastNotifications.error(ALERT_MESSAGES.SESSION_NOT_AVAILABLE);
                return Promise.reject();
            };
    
            const updatedData: NewGameType = {
                ...parsedData,
                playersInSession: 2,
            };
    
            setPlayerInfo({
                playerName: secondPlayerName,
                playerSymbol: parsedData.Nextplayer,
            });
    
            setGameData(updatedData);
            return Promise.resolve();

        } catch (err: any) {
            toastNotifications.error(ALERT_MESSAGES.NETWORK_ERROR);
            console.error("[TicTakToe:joinExistingGame]", err);
            return Promise.reject();
        };
    }

    const checkWinner = (newGrid: any): GameStatusType => {
        const grid = newGrid;

        // Check rows, columns, and diagonals
        for (let i = 0; i < 3; i++) {
            // Check rows and columns
            if (
                grid[i][0] &&
                grid[i][0] === grid[i][1] &&
                grid[i][0] === grid[i][2]
            ) {
                return grid[i][0];
            }
            if (
                grid[0][i] &&
                grid[0][i] === grid[1][i] &&
                grid[0][i] === grid[2][i]
            ) {
                return grid[0][i];
            }
        }

        // Check diagonals
        if (
            grid[0][0] &&
            grid[0][0] === grid[1][1] &&
            grid[0][0] === grid[2][2]
        ) {
            return grid[0][0];
        }
        if (
            grid[0][2] &&
            grid[0][2] === grid[1][1] &&
            grid[0][2] === grid[2][0]
        ) {
            return grid[0][2];
        }

        // Check for draw
        if (!grid.flat().includes(null)) {
            return 'draw';
        }

        return null; // No winner yet
    };

    const handleBoxClick = async (col: number, row: number) => {
        if (!gameData?.grid[col][row] && !gameData.gameFinished) {
            const newGrid: any = [...gameData?.grid];
            newGrid[col][row] = gameData.Nextplayer;

            let updatedData: NewGameType = {
                ...gameData,
                grid: newGrid,
                Nextplayer: playerInfo?.playerSymbol === 'x' ? 'o' : 'x'
            }

            const isWinner: GameStatusType = checkWinner(newGrid);

            if (isWinner === 'x' || isWinner === 'o') {
                updatedData = {
                    ...updatedData,
                    gameFinished: true,
                    winner: isWinner,
                    winsX: isWinner === 'x' ? updatedData.winsX + 1 : updatedData.winsX,
                    winsO: isWinner === 'o' ? updatedData.winsO + 1 : updatedData.winsO,
                };
            } else if (isWinner === 'draw') {
                updatedData = {
                    ...updatedData,
                    gameFinished: true,
                    winner: isWinner,
                    winsX: updatedData.winsX + 1,
                    winsO: updatedData.winsO + 1,
                };
            }

            const TicTacToeRef = ref(db, 'TicTakToe/' + gameData.id);

            try {
                await set(TicTacToeRef, JSON.stringify(updatedData));
            } catch (error: any) {
                throw new Error(error.message);
            }
        }
    };

    const handleReset = () => {
        setGameData(prev => {
            return {
                ...prev,
                gameFinished: false,
                grid: [
                    [null, null, null],
                    [null, null, null],
                    [null, null, null],
                ],
                winner: null,
                Nextplayer: playerInfo.playerSymbol,
                playersInSession: 0,
            }
        })
    };

    return (
        <TicTakToeContext.Provider value={{ 
            gameData, 
            playerInfo, 
            handleBoxClick, 
            handleReset, 
            initGame, 
            joinExistingGame, 
        }}>
            {children}
        </TicTakToeContext.Provider>
    )
}

export { TicTakToeContext, TicTakToeProvider }
