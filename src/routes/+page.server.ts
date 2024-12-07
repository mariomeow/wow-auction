import type { Actions } from "./$types"
import type { character } from "$lib/types"

export async function load({ cookies }) {
    const access_token: string | undefined = cookies.get("access_token")
    const characters: string | undefined = cookies.get("characters")

    if (!access_token || !characters) return { authorized: false }

    return {
        authorized: true,
        characters: JSON.parse(characters) as character[]
    }
}

export const actions: Actions = {
    default: async () => {

    }
}