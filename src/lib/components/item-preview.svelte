<script lang="ts">
	import Icon from "@iconify/svelte"

	let {
		revealPrize,
		boxes,
		createBox,
		mousePosition = $bindable(),
		insertItem,
		appState,
		openEditWindow,
		removeBox
	} = $props()
</script>

<div class="item-preview">
	<div class="box-actions">
		{#if appState == "editing"}
			<button
				onclick={() => {
					appState = undefined
				}}>Editing</button
			>
			<button onclick={createBox}>Create a box</button>
		{:else}
			<button
				onclick={() => {
					appState = "editing"
				}}>Opening</button
			>
		{/if}
	</div>
	{#if boxes.length > 0}
		<div class="boxes">
			{#each boxes as box, i}
				<div class="box">
					{#if box.length > 0}
						{#each box as boxItem, j}
							{#if appState == "editing"}
								{#if boxItem.revealed}
									<button
										onclick={() => {
											openEditWindow(i, j)
										}}
										class:empty={Object.keys(boxItem).length == 0}
										class:full={Object.keys(boxItem).length > 0}
									>
										<img src={boxItem.image_url} alt={boxItem.name} />
									</button>
								{:else}
									<button
										onclick={() => {
											openEditWindow(i, j)
										}}
										class:empty={Object.keys(boxItem).length == 0}
										class:full={Object.keys(boxItem).length > 0}
									>
										<Icon icon="tabler:gift-filled" />
									</button>
								{/if}
							{:else if boxItem.revealed}
								<button
									onmousemove={() => {
										if (!mousePosition.data) {
											mousePosition.data = boxItem
										}
									}}
									onmouseleave={() => {
										mousePosition.data = undefined
									}}><img src={boxItem.image_url} alt={boxItem.name} /></button
								>
							{:else}
								<button onclick={() => revealPrize(i, j)}>
									<Icon icon="tabler:gift-filled" />
								</button>
							{/if}
						{/each}
					{/if}
					{#if appState == "editing"}
						<button
							class="add_button"
							onclick={() => {
								insertItem(i)
							}}><Icon icon="ic:baseline-plus" /></button
						>
						<button
							class="add_button"
							onclick={() => {
								removeBox(i)
							}}><Icon icon="mdi:trash" /></button
						>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</div>
