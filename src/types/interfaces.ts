


export type playerSymbolType = 'x' | 'o'

export type GameStatusType = 'x' | 'o' | 'draw' | null

export type playerInfoType = {
    playerName: string,
    playerSymbol: playerSymbolType
}

export interface NewGameType {
    id: string,
    gameFinished: boolean,
    grid: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ],
    winner: GameStatusType,
    Nextplayer: playerSymbolType | null,
    winsX: number,
    winsO: number,
}

export interface PlayerCard {
    img: string
    value: string
}

export interface BlackjackPlayerType {
    playerId: string,
    name: string,
    handValue: number,
    cards: PlayerCard[]
}

export interface BlackjackType {
    id: string,
    deckId: string,
    players: BlackjackPlayerType[],
    playersInSession: number,
    currentPlayerIndex: 0 | 1,
    gameOver: boolean,
    winner: null | "It\'s a draw" | "Player 1 wins" | "Player 2 wins"
}

export interface PlayerInfoType {
    playerIndex: 0 | 1,
    playerId: string
}