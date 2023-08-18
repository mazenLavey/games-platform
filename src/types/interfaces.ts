


export type playerSymbolType = 'x' | 'o'

export type GameStatusType = 'x' | 'o' | 'draw' | null

export type playerInfoType = {
    playerName: string,
    playerSymbol: playerSymbolType
}

export interface NewGameType {
    readonly id: string,
    gameFinished: boolean,
    grid: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ],
    winner: GameStatusType,
    Nextplayer: playerSymbolType | null,
    winsX: number,
    winsO: number
}