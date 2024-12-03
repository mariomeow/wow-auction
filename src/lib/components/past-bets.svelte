<script lang="ts">
	import { flip } from "svelte/animate"

	let { bid_history, clearBetHistory } = $props()
</script>

<div class="past-bets">
	<div class="bets-header">
		<h1>Past Auctions</h1>
		<button
			onclick={() => {
				clearBetHistory()
			}}>Reset</button
		>
	</div>
	<div class="bids">
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
</div>
