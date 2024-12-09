<script lang="ts">
	let { mousePosition } = $props()
	/*
			

			ADD FOCUS TO INPUT EDIT
	*/

	$inspect(mousePosition)
</script>

<div class="mouse-info" style={`left: ${mousePosition.x + 10}px; top: ${mousePosition.y + 10}px`}>
	<img src={mousePosition.data.image_url} alt={mousePosition.data.name} />
	<div class="item-data">
		<p class={mousePosition.data.quality}>{mousePosition.data.name}</p>
		{#if mousePosition.data.level}
			<span class="ilvl">Item Level {mousePosition.data.level}</span>
		{/if}
		{#if mousePosition.data.item_info?.binding}
			<span>{mousePosition.data.item_info?.binding}</span>
		{/if}
		{#if mousePosition.data.item_info}
			<div class="item-data-line">
				<span>{mousePosition.data.item_info?.inventory_type}</span>
				<span>{mousePosition.data.item_info?.weapon_type}</span>
			</div>
			<div class="item-data-line">
				<span>{mousePosition.data.item_info?.weapon_damage}</span>
				<span>{mousePosition.data.item_info?.attack_speed}</span>
			</div>
			<span>{mousePosition.data.item_info?.dps}</span>
			{#each mousePosition.data.item_info?.stats as stat}
				<span
					style:color={`rgb(${stat.display.color.r}, ${stat.display.color.g}, ${stat.display.color.b})`}
					>{stat.display.display_string}</span
				>
			{/each}
			<span>{mousePosition.data.item_info?.durability}</span>
			<span>{mousePosition.data.item_info?.required_level}</span>
			{#each mousePosition.data.item_info?.spells as spell}
				<span class="spell">{spell.description}</span>
			{/each}
			{#if mousePosition.data.item_info?.sell_price && (mousePosition.data.item_info?.sell_price?.gold || mousePosition.data.item_info?.sell_price?.silver || mousePosition.data.item_info?.sell_price?.copper)}
				<span class="price"
					>Sell Price:
					<div class="currency">
						{#if mousePosition.data.item_info?.sell_price?.gold}
							{mousePosition.data.item_info?.sell_price?.gold}
							<img src="/currency/money-gold.gif" alt="Gold" />
						{/if}
						{#if mousePosition.data.item_info?.sell_price?.silver}
							{mousePosition.data.item_info?.sell_price?.silver}
							<img src="/currency/money-silver.gif" alt="Silver" />
						{/if}
						{#if mousePosition.data.item_info?.sell_price?.copper}
							{mousePosition.data.item_info?.sell_price?.copper}
							<img src="/currency/money-copper.gif" alt="Copper" />
						{/if}
					</div>
				</span>
			{/if}
		{/if}
	</div>
</div>
