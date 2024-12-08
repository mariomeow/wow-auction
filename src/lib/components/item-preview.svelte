<script lang="ts">
	import type { itemType } from "$lib/types"

	let search: string = $state("")
	let item: itemType | null = $state(null)
	let timer: number

	async function getItems() {
		clearTimeout(timer)

		if (search.length < 3) return

		timer = setTimeout(async () => {
			const request = await fetch(`/api/search?query=${search}`, {
				method: "GET"
			})

			const { item_result } = await request.json()

			item = item_result
		}, 1000)
	}
</script>

<div class="item-preview">
	<input type="text" placeholder="Item name..." bind:value={search} oninput={getItems} />
	{#if item}
		<div class="item-container">
			<h1 class={item.quality}>{item.name}</h1>
			<img src={item.image_url} alt={item.name} />
		</div>
	{/if}
</div>
