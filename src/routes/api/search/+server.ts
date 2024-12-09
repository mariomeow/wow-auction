import { json } from "@sveltejs/kit"
import type { itemType } from "$lib/types"

export async function GET({ url, cookies, setHeaders }) {
    setHeaders({
        "Cache-Control": "max-age=604800"
    })

    const access_token_cookie: string | undefined = cookies.get("access_token")
    const query: string | null = url.searchParams.get("query")

    if (!access_token_cookie || !query) return json({ items_result: [] })

    const access_token_json: { access_token: string, expires_at: number } = JSON.parse(access_token_cookie)

    const itemsRequest = await fetch(`https://eu.api.blizzard.com/data/wow/search/item?namespace=static-eu&name.en_US=${query}&orderby=id&_page=1`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${access_token_json.access_token}`
        }
    })

    const { results } = await itemsRequest.json()

    const items: itemType[] = []

    if (results.length > 0) {
        for (const resultItem of results) {
            const image_url: string | null = await getItemImage(access_token_json.access_token, resultItem.data.id)

            if (!image_url) continue

            items.push({
                id: resultItem.data.id,
                name: resultItem.data.name.en_GB,
                quality: (resultItem.data.quality.type).toLowerCase(),
                level: resultItem.data.level,
                image_url
            })
        }
    }

    return json({
        items_result: items
    })
}

async function getItemImage(access_token: string, id: number): Promise<string> {
    const imageRequest = await fetch(`https://eu.api.blizzard.com/data/wow/media/item/${id}?namespace=static-classic-eu&locale=en_GB`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    })

    const { assets } = await imageRequest.json()

    return assets?.length > 0 ? assets[0].value : null
}