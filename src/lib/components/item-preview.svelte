<script lang="ts">
	import type { itemType } from "$lib/types"

	let search: string = $state("")
	let items: itemType[] = $state([])
	let timer: number

	async function getItems() {
		clearTimeout(timer)

		if (search.length < 3) {
			items = []
			return
		}

		timer = setTimeout(async () => {
			const request = await fetch(`/api/search?query=${search}`, {
				method: "GET"
			})

			const { items_result } = await request.json()

			items = items_result
		}, 1000)
	}

	$effect(() => {
		search = ""
	})
</script>

<div class="item-preview">
	<div class="search">
		<input
			type="text"
			maxlength="30"
			placeholder="Enter item name"
			bind:value={search}
			oninput={getItems}
		/>
		{#if search}
			<div class="items-container">
				{#if items.length > 0}
					{#each items as { name, quality, image_url }}
						<button>
							<img src={image_url} alt={name} />
							<p class={quality}>{name}</p>
						</button>
					{/each}
				{/if}
			</div>
		{/if}
	</div>
</div>
