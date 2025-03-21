<script lang="ts">
	import Races from "$lib/components/races.svelte"
	import { onMount } from "svelte"
	import Race from "$lib/components/items/race.svelte"
	import Auction from "$lib/components/auction.svelte"
	import PastBets from "$lib/components/past-bets.svelte"
	import ItemPreview from "$lib/components/item-preview.svelte"
	import Editing from "$lib/components/editing.svelte"
	import ItemInformation from "$lib/components/item-information.svelte"
	import {
		insertBid,
		bid_history,
		clearBetHistory,
		saveBoxes,
		getBoxes,
		getRaces,
		updateRaces
	} from "$lib/scripts/localstorage.svelte"
	import type { race } from "$lib/types"

	let { data } = $props()

	let races = $state<Record<string, race>>(getRaces())

	onMount(() => {
		removeEmptyBoxes()
	})

	$effect(() => {
		saveBoxes(boxes)
		updateRaces(races)
	})

	let boxes: any[] = $state(getBoxes())

	function createBox() {
		boxes.push([])
	}

	function insertItem(boxID: number) {
		boxes[boxID].push({})
	}

	function removeBox(boxID: number) {
		boxes.splice(boxID, 1)
	}

	let highestBid: [string, number] = $derived.by(() => {
		let highest: [string, number] = ["", 0]

		for (const [key, values] of Object.entries(races)) {
			if (values.bet > highest[1]) highest = [key, values.bet]
		}

		return highest
	})

	let totalBidAmount: number = $derived.by(() => {
		let sum: number = 0

		for (const { bet } of Object.values(races)) {
			sum += bet
		}

		return sum
	})

	function setBet(race: string, bet: number) {
		races[race].bet = bet
	}

	function incrementBet(race: string) {
		if (races[race].points < races[race].bet + 50) return

		races[race].bet += 50
	}

	function decrementBet(race: string) {
		if (races[race].bet - 50 < 0) return

		races[race].bet -= 50
	}

	function endAuction() {
		const allBets = []
		let winner: [string, number] = ["", 0]
		let highestBidCount: number = 0

		// Get winner and reset bets
		for (const [race, values] of Object.entries(races)) {
			if (values.bet > winner[1]) {
				winner = [race, values.bet]
				highestBidCount = 1
			} else if (values.bet == winner[1]) {
				highestBidCount++
			}

			allBets.push({
				race: race,
				bid: values.bet,
				winner: false
			})

			values.bet = 0
		}

		if (highestBidCount > 1) {
			winner = ["", 0]
		}

		if (winner[0] != "") {
			races[winner[0]].points -= winner[1]

			for (const item of allBets) {
				if (item.race == winner[0]) item.winner = true
			}
		}

		// Insert bets into history
		insertBid(allBets)
	}

	function finish() {
		for (let { points } of Object.values(races)) {
			points = Number(points)
		}
	}

	function maxBet(race: string) {
		if (races[race].points == 0) return

		races[race].bet = races[race].points
	}

	const boxInfo: { boxContainerIndex: number; boxIndex: number } = $state({
		boxContainerIndex: 0,
		boxIndex: 0
	})

	function openEditWindow(boxContainerIndex: number, boxIndex: number) {
		boxInfo.boxContainerIndex = boxContainerIndex
		boxInfo.boxIndex = boxIndex
		editWindowState = "opened"
	}

	async function getItemInfo(access_token: string, id: number): Promise<unknown> {
		const itemRequest = await fetch(
			`https://eu.api.blizzard.com/data/wow/item/${id}?namespace=static-classic-eu&locale=en_GB`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${access_token}`
				}
			}
		)

		const { preview_item } = await itemRequest.json()

		return {
			binding: preview_item?.binding?.name,
			weapon_damage: preview_item?.weapon?.damage?.display_string,
			dps: preview_item?.weapon?.dps?.display_string,
			attack_speed: preview_item?.weapon?.attack_speed?.display_string,
			required_level: preview_item?.requirements?.level?.display_string,
			inventory_type: preview_item?.inventory_type?.name,
			weapon_type: preview_item?.item_subclass?.name,
			durability: preview_item?.durability?.display_string,
			stats: preview_item?.stats,
			spells: preview_item?.spells,
			sell_price: {
				gold: Number(preview_item?.sell_price?.display_strings?.gold),
				silver: Number(preview_item?.sell_price?.display_strings?.silver),
				copper: Number(preview_item?.sell_price?.display_strings?.copper)
			}
		}
	}

	async function setItem(
		id: number,
		name: string,
		quality: string,
		image_url: string,
		level: number
	) {
		const item_info = await getItemInfo(data.access_token, id)

		boxes[boxInfo.boxContainerIndex][boxInfo.boxIndex] = {
			id,
			name,
			quality,
			image_url,
			level,
			item_info,
			revealed: false
		}

		editWindowState = "closed"
	}

	function revealPrize(boxContainerIndex: number, boxIndex: number) {
		const box = boxes[boxContainerIndex][boxIndex]

		if (Object.keys(box).length == 0 || box.revealed) return

		box.revealed = true
	}

	function removeEmptyBoxes() {
		boxes = boxes.filter((box) => box.length > 0)
	}

	let mousePosition = $state({
		x: 0,
		y: 0,
		data: undefined
	})

	function pointerMove(e: PointerEvent) {
		mousePosition.x = e.clientX
		mousePosition.y = e.clientY
	}

	let editWindowState = $state<"opened" | "closed">("closed")
	let appState: "setPoints" | "chooseCharacter" | "editing" | undefined = $state(undefined)
</script>

<svelte:window onpointermove={pointerMove} />

<Races bind:appState {finish} characters={data.characters}>
	{#each Object.entries(races) as race}
		<Race {race} {appState} />
	{/each}
</Races>

{#if data.authorized}
	<ItemPreview
		{revealPrize}
		{boxes}
		{createBox}
		{insertItem}
		{appState}
		{openEditWindow}
		{removeBox}
		{removeEmptyBoxes}
		bind:mousePosition
	/>
{/if}

<Auction
	{races}
	{endAuction}
	{decrementBet}
	{incrementBet}
	{highestBid}
	{setBet}
	{totalBidAmount}
	{maxBet}
/>

{#if bid_history?.bids?.length > 0}
	<PastBets {bid_history} {clearBetHistory} />
{/if}

{#if editWindowState == "opened"}
	<Editing bind:editWindowState {setItem} />
{/if}

{#if mousePosition.data}
	<ItemInformation {mousePosition} />
{/if}
