<script lang="ts">
	import { scale } from "svelte/transition"

	let { race, appState } = $props()
</script>

<div class="race">
	<h1>{race[1].name}</h1>
	{#if appState == "setPoints"}
		<input type="number" bind:value={race[1].points} />
	{:else}
		{#key race[1].points}
			<h2
				in:scale={{ duration: 500 }}
				class:silver={race[1].points == 0}
				class:red={race[1].points < 1000 && race[1].points > 0}
				class:green={race[1].points >= 1000 && race[1].points < 2000}
				class:gold={race[1].points >= 2000}
			>
				{race[1].points}
			</h2>
		{/key}
	{/if}
</div>
