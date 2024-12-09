<script lang="ts">
	import type { itemType } from "$lib/types"
	import Icon from "@iconify/svelte"

	let search: string = $state("")
	let timer: number

	function getItems(): Promise<itemType[]> {
		return new Promise((resolve, reject) => {
			clearTimeout(timer)

			if (search.length < 3) {
				resolve([])
				return
			}

			timer = setTimeout(async () => {
				try {
					const request = await fetch(`/api/search?query=${search}`, {
						method: "GET"
					})

					const { items_result } = await request.json()

					resolve(items_result.length > 0 ? items_result : [])
				} catch (e) {
					reject(e)
				}
			}, 500)
		})
	}

	$effect(() => {
		search = ""
	})

	let { editWindowState = $bindable(), setItem } = $props()
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="editing-wrapper"
	onclick={(e: Event) => {
		if (e.target == e.currentTarget) editWindowState = "closed"
	}}
>
	<div class="edit-box">
		<input type="text" placeholder="Enter item name..." bind:value={search} oninput={getItems} />
		{#if search != "" && search.length > 3}
			{#await getItems()}
				<div class="searching">
					<Icon icon="line-md:loading-twotone-loop" />
				</div>
			{:then items}
				{#if items.length > 0}
					<div class="edit-box-items">
						{#each items as { id, name, quality, image_url }}
							<button
								onclick={() => {
									setItem(id, name, quality, image_url)
								}}
							>
								<img src={image_url} alt={name} />
								<p class={quality}>{name}</p>
							</button>
						{/each}
					</div>
				{:else}
					<div class="searching">
						<p>Nothing found</p>
					</div>
				{/if}
			{/await}
		{/if}
	</div>
</div>
