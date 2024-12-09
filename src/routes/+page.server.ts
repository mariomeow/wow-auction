import type { character } from "$lib/types"

export async function load({ cookies }) {
    const access_token: string | undefined = cookies.get("access_token")
    const characters: string | undefined = cookies.get("characters")
    const timeInSeconds: number = Math.floor(new Date().getTime() / 1000)

    if (!access_token || !characters) return { authorized: false }

    const { expires_at } = JSON.parse(access_token)

    if (expires_at < timeInSeconds) return { authorized: false }

    return {
        authorized: true,
        access_token: JSON.parse(access_token).access_token,
        characters: JSON.parse(characters) as character[]
    }
}