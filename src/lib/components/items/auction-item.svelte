<script lang="ts">
	import { scale } from "svelte/transition"

	let { race, maxBet, decrementBet, incrementBet, highestBid, setBet } = $props()
</script>

<div class="auction-item" style:background-image={`url(${race[1].image})`}>
	<div class="auction-item-buttons">
		<button
			onclick={() => incrementBet(race[0])}
			disabled={race[1].points == race[1].bet || race[1].points < race[1].bet + 50}>+50</button
		>
		<button onclick={() => decrementBet(race[0])} disabled={race[1].bet == 0}>-50</button>
		<button
			disabled={highestBid[1] + 50 > race[1].points || highestBid[0] == race[0]}
			onclick={() => setBet(race[0], highestBid[1] + 50)}>Highest Bid + 50</button
		>
		<button
			disabled={race[1].points == 0 || race[1].points <= highestBid[1]}
			onclick={() => maxBet(race[0])}>Max Bet</button
		>
	</div>
	{#key race[1].bet}
		<div class="auction-item-bet" in:scale={{ duration: 500 }}>
			{race[1].bet}
		</div>
	{/key}
</div>
