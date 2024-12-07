import { redirect } from "@sveltejs/kit"
import type { character, character_item } from "$lib/types"
import { getAccessToken, getCharacters, getCharacterImage } from "$lib/server/functions"

export async function GET({ url, cookies }) {
    const code: string | null = url.searchParams.get("code")

    if (!code) redirect(302, "/")

    const { access_token } = await getAccessToken(code)

    const { na_characters, eu_characters }: { na_characters: character_item[] | [], eu_characters: character_item[] | [] } = await getCharacters(access_token)

    const allCharacters: character[] = []

    if (eu_characters.length > 0) {
        for (const character of eu_characters) {
            const name: string = character.name
            const id: number = character.id
            const realm: string = character.realm.slug
            const playable_class: string = character.playable_class.name
            const race: string = character.playable_race.name
            const gender: string = character.gender.name
            const faction: string = character.faction.name
            const level: number = character.level
            const region: "eu" | "na" = "eu"
            const { image } = await getCharacterImage(access_token, region, realm, name)

            allCharacters.push({
                name,
                id,
                realm,
                playable_class,
                race,
                gender,
                faction,
                level,
                region,
                image
            })
        }
    }

    if (na_characters.length > 0) {
        for (const character of na_characters) {
            const name: string = character.name
            const id: number = character.id
            const realm: string = character.realm.slug
            const playable_class: string = character.playable_class.name
            const race: string = character.playable_race.name
            const gender: string = character.gender.name
            const faction: string = character.faction.name
            const level: number = character.level
            const region: "eu" | "na" = "na"
            const { image } = await getCharacterImage(access_token, region, realm, name)

            allCharacters.push({
                name,
                id,
                realm,
                playable_class,
                race,
                gender,
                faction,
                level,
                region,
                image
            })
        }
    }

    cookies.set("characters", JSON.stringify(allCharacters), { sameSite: "lax", httpOnly: true, path: "/" })
    cookies.set("access_token", access_token, { sameSite: "lax", httpOnly: true, path: "/" })

    redirect(307, "/")
}