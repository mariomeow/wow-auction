import { browser } from "$app/environment"
import type { bid } from "$lib/types"

export function getLocalStorage() {
    if (browser) {
        const storage = localStorage.getItem("bid_history")

        if (storage) return JSON.parse(storage)

        localStorage.setItem("bid_history", JSON.stringify([]))

        getLocalStorage()
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
    }
}

export const bid_history = $state({ bids: getLocalStorage() })