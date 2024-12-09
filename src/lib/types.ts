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

export type character = {
    name: string,
    id: number,
    realm: string,
    playable_class: string,
    race: string,
    gender: string,
    faction: string,
    level: number,
    region: "eu" | "na",
    image: string
}

export type character_item = {
    name: string,
    id: number,
    realm: { slug: string },
    playable_class: { name: string },
    playable_race: { name: string },
    gender: { name: string },
    faction: { name: string },
    level: number,
    region: "eu" | "na",
    image: string
}

export type itemType = {
    id?: number,
    name?: string,
    quality?: string,
    image_url?: string,
    level?: number
}