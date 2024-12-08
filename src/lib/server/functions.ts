import { env } from "$env/dynamic/private"
import { env as env2 } from "$env/dynamic/public"

export async function getAccessToken(code: string) {
    const request = await fetch(`https://oauth.battle.net/token?redirect_uri=${env2.PUBLIC_URL}&grant_type=authorization_code&code=${code}`, {
        method: "POST",
        headers: {
            "Authorization": `Basic ${btoa(env2.PUBLIC_CLIENT_ID + ":" + env.CLIENT_SECRET)}`
        }
    })

    const { access_token, expires_in }: { access_token: string, expires_in: number } = await request.json()

    const expires_at: number = Math.floor(new Date().getTime() / 1000) + expires_in

    return {
        access_token,
        expires_at
    }
}

export async function getCharacters(access_token: string) {
    let eu_characters = { wow_accounts: [{ characters: [] }] }
    let na_characters = { wow_accounts: [{ characters: [] }] }

    try {
        const request_na = await fetch(env2.PUBLIC_PROFILE_US, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        })

        na_characters = await request_na.json()
    } catch (e) {
        console.error(e)
    }

    try {
        const request_eu = await fetch(env2.PUBLIC_PROFILE_EU, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        })

        eu_characters = await request_eu.json()
    } catch (e) {
        console.error(e)
    }

    return { na_characters: na_characters.wow_accounts[0].characters, eu_characters: eu_characters.wow_accounts[0].characters }
}

export async function getCharacterImage(access_token: string, region: "eu" | "na", realm: string, characterName: string) {
    const request = await fetch(`https://${region}.api.blizzard.com/profile/wow/character/${realm}/${characterName.toLowerCase()}/character-media?namespace=profile-${region}&locale=${region == "eu" ? "en_GB" : "en_US"}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })

    const { assets } = await request.json()

    return {
        image: assets[0].value
    }
}