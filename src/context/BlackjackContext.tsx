import { createContext, useEffect, useState } from "react";
import { db } from 'config/firebase';
import { ref, set, onValue, child, get } from "firebase/database";
import { toastNotifications } from "components/Toastify";
import { nanoid } from "nanoid";
import { BlackjackPlayerType, BlackjackType, PlayerCard, PlayerInfoType } from "types/interfaces";
import { ALERT_MESSAGES } from "constants/messages";

type Props = {
    children: React.ReactNode
}

type BlackjackContextType = {
    gameData: BlackjackType
    initNewGame: (newGameId: string, playerName: string) =>  Promise<void>,
    joinGame: (gameId: string, playerName: string) => Promise<void>,
    getCard: (playerId: string, playerIndex: number) => void,
    playerInfo: PlayerInfoType,
    skipTurn: (playerIndex: number) => void,
    restartGame: () => void,
}
const BlackjackContext = createContext<BlackjackContextType>({
    gameData: {
        id: '',
        deckId: '',
        gameOver: false,
        winner: null,
        players: [],
        playersInSession: 0,
        currentPlayerIndex: 0
    },
    initNewGame: (newGameId, playerName) => Promise.resolve(),
    joinGame: (gameId, playerName) => Promise.resolve(),
    getCard: (playerId, playerIndex) => { },
    skipTurn: (playerIndex) => { },
    restartGame: () => { },
    playerInfo: {
        playerId: "",
        playerIndex: 0
    }
})

const BlackjackProvider: React.FC<Props> = ({ children }) => {
    const [gameData, setGameData] = useState<BlackjackType>({
        id: '',
        deckId: '',
        gameOver: false,
        winner: null,
        players: [],
        playersInSession: 0,
        currentPlayerIndex: 0
    })

    const [playerInfo, setPlayerInfo] = useState<PlayerInfoType>({
        playerIndex: 0,
        playerId: ''
    })

    useEffect(() => {
        if (gameData.id) {
            try {
                const blackjackRef = ref(db, 'blackjack/' + gameData.id);

                onValue(blackjackRef, (snapshot) => {
                    const data = snapshot.val();
                    const parsedData = JSON.parse(data)
                    setGameData(parsedData)
                })

            } catch (error: any) {
                toastNotifications.error(ALERT_MESSAGES.NETWORK_ERROR)
            }
        }
    }, [gameData.id]);


    const initNewGame = async (newGameId: string, playerName: string) => {
        const playerId: string = nanoid();

        try {
            const res = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6")
            const data = await res.json();
            const deckId = data.deck_id;

            const [firstCard, secondCard] = await Promise.all([
                fetchCard(deckId),
                fetchCard(deckId)
            ]);

            const updatedHandValue = calculateHandValue([firstCard, secondCard]);

            const newPlayer: BlackjackPlayerType = {
                playerId: playerId,
                name: playerName,
                cards: [firstCard, secondCard],
                handValue: updatedHandValue
            }

            const updatedGameData: BlackjackType = {
                ...gameData,
                id: newGameId,
                deckId: deckId,
                players: [newPlayer],
                playersInSession: 1
            }

            await updateDb(updatedGameData);

            setGameData(updatedGameData);

            setPlayerInfo({
                playerId: playerId,
                playerIndex: 0
            })

            return Promise.resolve();

        } catch (error: any) {
            toastNotifications.error(ALERT_MESSAGES.NETWORK_ERROR);
            return Promise.reject();
        }
    }

    const joinGame = async (gameId: string, playerName: string) => {
        const blackjackRef = ref(db);
        const playerId: string = nanoid();

        try {
            const snapshot = await get(child(blackjackRef, `blackjack/${gameId}`));
            if (!snapshot.exists()) {
                toastNotifications.warn(ALERT_MESSAGES.GAME_NOT_EXIST);
                return Promise.reject();
            };

            const data = JSON.parse(snapshot.val());

            if (data?.players.length > 1) {
                toastNotifications.warn(ALERT_MESSAGES.SESSION_NOT_AVAILABLE);
                return Promise.reject();
            }

            const [firstCard, secondCard] = await Promise.all([
                fetchCard(data.deckId),
                fetchCard(data.deckId)
            ]);

            const updatedHandValue = calculateHandValue([firstCard, secondCard]);

            const newPlayer: BlackjackPlayerType = {
                playerId: playerId,
                name: playerName,
                cards: [firstCard, secondCard],
                handValue: updatedHandValue
            };

            const updatedGameData: BlackjackType = {
                ...data,
                players: [...data.players, newPlayer],
                playersInSession: 2
            };

            await updateDb(updatedGameData);

            setGameData(updatedGameData);

            setPlayerInfo({
                playerId: playerId,
                playerIndex: 1
            });

            return Promise.resolve();

        } catch (error: any) {
            toastNotifications.error(ALERT_MESSAGES.NETWORK_ERROR);
            return Promise.reject();
        }
    };

    const updateDb = async (updatedGameData: BlackjackType) => {
        const blackjackRef = ref(db, 'blackjack/' + updatedGameData.id);

        try {
            await set(blackjackRef, JSON.stringify(updatedGameData));

        } catch (error: any) {
            toastNotifications.error(ALERT_MESSAGES.NETWORK_ERROR)
        }
    }

    const getCard = async (playerId: string, playerIndex: number) => {

        try {
            const newPlayerCard = await fetchCard(gameData.deckId)

            const updatedPlayers = gameData.players.map(player => {
                if (player.playerId === playerId) {
                    const updatedCards = [...player.cards, newPlayerCard];
                    const updatedHandValue = calculateHandValue(updatedCards);

                    return {
                        ...player,
                        cards: updatedCards,
                        handValue: updatedHandValue
                    };
                } else {
                    return player;
                }
            });

            if (updatedPlayers.length === 2) {
                const player1Cards = updatedPlayers[0].cards?.map(card => card.value);
                const player2Cards = updatedPlayers[1].cards?.map(card => card.value);

                const isWinner = determineWinner(player1Cards, player2Cards)

                if (isWinner) {

                    const updatedGameData: BlackjackType = {
                        ...gameData,
                        players: updatedPlayers,
                        currentPlayerIndex: playerIndex === 0 ? 1 : 0,
                        gameOver: true,
                        winner: isWinner,
                    }

                    await updateDb(updatedGameData);

                } else {

                    const updatedGameData: BlackjackType = {
                        ...gameData,
                        players: updatedPlayers,
                        currentPlayerIndex: playerIndex === 0 ? 1 : 0
                    }

                    await updateDb(updatedGameData);
                }
            }

        } catch (error: any) {
            toastNotifications.error(ALERT_MESSAGES.NETWORK_ERROR)
        }
    }

    const skipTurn = async (playerIndex: number) => {
        try {

            const updatedGameData: BlackjackType = {
                ...gameData,
                currentPlayerIndex: playerIndex === 0 ? 1 : 0
            }

            await updateDb(updatedGameData);

        } catch (error: any) {
            toastNotifications.error(ALERT_MESSAGES.NETWORK_ERROR)
        }
    }

    const determineWinner = (player1Cards: string[], player2Cards: string[]) => {
        const getHandValue = (cards: string[]) => {
            let totalValue = 0;
            let aceCount = 0;

            for (const card of cards) {
                const cardValue = parseInt(card); // Convert numeric cards to their value
                if (!isNaN(cardValue)) {
                    totalValue += cardValue;
                } else if (card !== 'A') {
                    totalValue += 10; // Face cards are worth 10
                } else {
                    aceCount++;
                }
            }

            // Calculate the value of Aces
            while (aceCount > 0 && totalValue + 11 <= 21) {
                totalValue += 11;
                aceCount--;
            }
            totalValue += aceCount;

            return totalValue;
        };

        const player1Value = getHandValue(player1Cards);
        const player2Value = getHandValue(player2Cards);

        if (player1Value > 21) {
            return 'Player 2 wins';
        } else if (player2Value > 21) {
            return 'Player 1 wins';
        } else if (player1Value === player2Value) {
            return 'It\'s a draw';
        } else {
            return null;
        }
    }

    const calculateHandValue = (cards: PlayerCard[]): number => {
        let totalValue = 0;
        let aceCount = 0;

        for (const card of cards) {
            const cardValue = parseInt(card.value);
            if (!isNaN(cardValue)) {
                totalValue += cardValue;
            } else if (card.value !== 'A') {
                totalValue += 10; // Face cards are worth 10
            } else {
                aceCount++;
            }
        }

        // Calculate the value of Aces
        while (aceCount > 0 && totalValue + 11 <= 21) {
            totalValue += 11;
            aceCount--;
        }
        totalValue += aceCount;

        return totalValue;
    }

    const restartGame = async () => {
        try {
            const updatedPlayers: BlackjackPlayerType[] = [];
    
            for (const player of gameData.players) {
                const firstCard = await fetchCard(gameData.deckId);
                const secondCard = await fetchCard(gameData.deckId);
    
                const updatedHandValue = calculateHandValue([firstCard, secondCard]);
    
                updatedPlayers.push({
                    ...player,
                    cards: [firstCard, secondCard],
                    handValue: updatedHandValue
                });
            }
    
            const updatedGameData: BlackjackType = {
                ...gameData,
                playersInSession: 0,
                winner: null,
                gameOver: false,
                players: updatedPlayers
            };
    
            await updateDb(updatedGameData);
    
            setGameData(updatedGameData);
        } catch (error: any) {
            toastNotifications.error(ALERT_MESSAGES.NETWORK_ERROR);
        }
    };
    

    const fetchCard = async (deckId: string) => {
        const res = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        const data = await res.json();
        const card = data.cards[0];

        const newPlayerCard: PlayerCard = {
            value: card.value,
            img: card.image
        }

        return newPlayerCard;
    }

    return (
        <BlackjackContext.Provider value={{ gameData, playerInfo, getCard, initNewGame, joinGame, skipTurn, restartGame }}>
            {children}
        </BlackjackContext.Provider>
    )
}

export { BlackjackContext, BlackjackProvider }