export type race = {
    name: string,
    points: number,
    image: string,
    bet: number
}

export type bid = {
    race: string,
    bid: number,
    winner: boolean
}