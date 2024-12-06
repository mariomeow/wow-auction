<script lang="ts">
	import { flip } from "svelte/animate"
	import { slide } from "svelte/transition"

	let { bid_history, clearBetHistory } = $props()

	let showBetHistory: boolean = $state(true)
</script>

<div class="past-bets">
	<div class="bets-header">
		<h1>Past Auctions</h1>
		<div class="button-group">
			<button
				onclick={() => {
					clearBetHistory()
				}}>Reset</button
			>
			<button
				onclick={() => {
					showBetHistory = !showBetHistory
				}}>{showBetHistory ? "Hide" : "Show"}</button
			>
		</div>
	</div>
	{#if showBetHistory}
		<div class="bids" transition:slide={{ duration: 300 }}>
			<div class="bid">
				<p>Tauren</p>
				<p>Undead</p>
				<p>Orc</p>
				<p>Troll</p>
			</div>
			{#each bid_history.bids as bid_item (bid_item.id)}
				<div class="bid" animate:flip={{ duration: 300 }}>
					{#each bid_item.bids as { bid, winner }}
						<p class:gold={winner}>{bid}</p>
					{/each}
				</div>
			{/each}
		</div>
	{/if}
</div>
