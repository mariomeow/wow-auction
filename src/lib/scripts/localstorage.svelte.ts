import { browser } from "$app/environment"
import toast from "svelte-french-toast"
import type { bid, race } from "$lib/types"

function getBidHistory() {
    if (browser) {
        const storage = localStorage.getItem("bid_history")

        if (storage) return JSON.parse(storage)

        localStorage.setItem("bid_history", JSON.stringify([]))

        return []
    }
}

export function insertBid(bids: bid[]) {
    if (browser) {
        let storage = getBidHistory()

        storage = [{
            id: crypto.randomUUID(),
            bids
        }, ...storage]

        localStorage.setItem("bid_history", JSON.stringify(storage))

        bid_history.bids = getBidHistory()
    }
}

export function clearBetHistory() {
    if (browser) {
        localStorage.setItem("bid_history", JSON.stringify([]))

        bid_history.bids = getBidHistory()

        toast.success("Deleted auction history", {
            style: "background-color: #333; color: #fff;",
            position: "bottom-right",
            duration: 2000
        })
    }
}

function getMainCharacterIndex() {
    if (browser) {
        const mainIndex: string | null = localStorage.getItem("mainIndex")

        if (mainIndex) return Number(mainIndex)

        localStorage.setItem("mainIndex", "0")
    }

    return 0
}

export function setMainCharacterIndex(index: number) {
    if (browser) {
        localStorage.setItem("mainIndex", String(index))

        mainIndex.index = getMainCharacterIndex()
    }
}

export function saveBoxes(boxes: unknown[]) {
    if (browser) {
        localStorage.setItem("boxes", JSON.stringify(boxes))
    }
}

export function getBoxes() {
    if (browser) {
        const boxes: string | null = localStorage.getItem("boxes")

        if (boxes) return JSON.parse(boxes)

        return []
    }
}

export function getRaces() {
    const empty_races = {
        tauren: {
            name: "Tauren",
            points: 0,
            image: "/models/tauren.avif",
            bet: 0
        },
        undead: {
            name: "Undead",
            points: 0,
            image: "/models/undead.avif",
            bet: 0
        },
        orc: {
            name: "Orc",
            points: 0,
            image: "/models/orc.avif",
            bet: 0
        },
        troll: {
            name: "Troll",
            points: 0,
            image: "/models/troll.png",
            bet: 0
        }
    }

    if (browser) {
        const races: string | null = localStorage.getItem("races")

        if (!races) {
            localStorage.setItem("races", JSON.stringify(empty_races))

            return empty_races
        }

        return JSON.parse(races)
    }

    return empty_races
}

export function updateRaces(races: Record<string, race>) {
    if (browser) localStorage.setItem("races", JSON.stringify(races))
}

export const bid_history = $state({ bids: getBidHistory() })
export const mainIndex = $state({ index: getMainCharacterIndex() })