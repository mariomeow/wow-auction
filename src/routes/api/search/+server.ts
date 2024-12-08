import { json } from "@sveltejs/kit"
import type { itemType } from "$lib/types"

export async function GET({ url, cookies }) {
    const access_token_cookie: string | undefined = cookies.get("access_token")
    const query: string | null = url.searchParams.get("query")

    if (!access_token_cookie || !query) return json({ item: null })

    const access_token_json: { access_token: string, expires_at: number } = JSON.parse(access_token_cookie)

    const itemsRequest = await fetch(`https://eu.api.blizzard.com/data/wow/search/item?namespace=static-eu&name.en_US=${query}&orderby=id&_page=1`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${access_token_json.access_token}`
        }
    })

    const { results } = await itemsRequest.json()

    console.log(results)

    if (results.length > 1) results.length = 1

    let item: itemType | null = null

    if (results.length > 0) {
        const image_url: string = await getItemImage(access_token_json.access_token, results[0].data.id)

        item = {
            id: results[0].data.id,
            name: results[0].data.name.en_GB,
            quality: (results[0].data.quality.type).toLowerCase(),
            image_url
        }
    }

    return json({
        item_result: item
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

    return assets[0].value
}