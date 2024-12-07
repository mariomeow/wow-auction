<script lang="ts">
	import { PUBLIC_CLIENT_ID, PUBLIC_URL } from "$env/static/public"
	import { fly } from "svelte/transition"
	import Icon from "@iconify/svelte"
	import { page } from "$app/stores"
	import { browser } from "$app/environment"
	import { mainIndex, setMainCharacterIndex } from "$lib/scripts/localstorage.svelte"

	let { children, appState = $bindable(), finish, characters } = $props()
</script>

<div class="races">
	<div class="races-items">
		{@render children()}
	</div>
	<div class="races-buttons">
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
		{#if !$page.data.authorized}
			<a
				href={`https://oauth.battle.net/authorize?response_type=code&scope=openid%20wow.profile&redirect_uri=${PUBLIC_URL}&state=AbCdEfG&client_id=${PUBLIC_CLIENT_ID}`}
				><Icon icon="material-symbols:login" /></a
			>
		{:else}
			<button
				onclick={() => {
					appState = appState != "chooseCharacter" ? "chooseCharacter" : undefined
				}}
			>
				{#if browser}
					<img src={characters[mainIndex.index].image} alt={characters[mainIndex.index].name} />
				{/if}
			</button>
			{#if appState == "chooseCharacter"}
				<div class="character-buttons" transition:fly={{ duration: 300 }}>
					{#each characters as { name, image }, i}
						<button
							onclick={() => {
								setMainCharacterIndex(i)
								appState = undefined
							}}><img src={image} alt={name} /></button
						>
					{/each}
				</div>
			{/if}
		{/if}
	</div>
</div>
