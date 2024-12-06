<script lang="ts">
	import "$lib/css/main.css"
	import { Toaster } from "svelte-french-toast"

	let { children } = $props()
</script>

<main>
	{@render children()}
</main>

<Toaster />
