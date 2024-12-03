<script lang="ts">
	import "$lib/css/main.css"
	let { children } = $props()
</script>

<main>
	{@render children()}
</main>
