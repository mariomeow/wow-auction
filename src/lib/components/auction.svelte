<script lang="ts">
	let {
		races,
		maxBet,
		endAuction,
		decrementBet,
		incrementBet,
		highestBid,
		setBet,
		totalBidAmount
	} = $props()

	import AuctionItem from "./items/auction-item.svelte"
</script>

<div class="auction-main">
	<h1>Auction</h1>
	<div class="auction-items">
		{#each Object.entries(races) as race}
			<AuctionItem {race} {maxBet} {decrementBet} {incrementBet} {highestBid} {setBet} />
		{/each}
	</div>
	<button disabled={totalBidAmount == 0} onclick={endAuction}>End Auction</button>
</div>
