<script lang="ts">
	import Icon from "@iconify/svelte"

	let { children, appState = $bindable(), finish } = $props()
</script>

<div class="races">
	<div class="races-items">
		{@render children()}
	</div>
	{#if appState == "setPoints"}
		<button
			onclick={() => {
				appState = undefined
				finish()
			}}><Icon icon="material-symbols:done" /></button
		>
	{:else}
		<button
			onclick={() => {
				appState = "setPoints"
			}}><Icon icon="material-symbols:edit" /></button
		>
	{/if}
</div>
