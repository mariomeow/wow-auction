import { browser } from "$app/environment"
import toast from "svelte-french-toast"
import type { bid } from "$lib/types"

export function getLocalStorage() {
    if (browser) {
        const storage = localStorage.getItem("bid_history")

        if (storage) return JSON.parse(storage)

        localStorage.setItem("bid_history", JSON.stringify([]))

        return []
    }
}

export function insertBid(bids: bid[]) {
    if (browser) {
        let storage = getLocalStorage()

        storage = [{
            id: crypto.randomUUID(),
            bids
        }, ...storage]

        localStorage.setItem("bid_history", JSON.stringify(storage))

        bid_history.bids = getLocalStorage()
    }
}

export function clearBetHistory() {
    if (browser) {
        localStorage.setItem("bid_history", JSON.stringify([]))

        bid_history.bids = getLocalStorage()

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

export const bid_history = $state({ bids: getLocalStorage() })
export const mainIndex = $state({ index: getMainCharacterIndex() })