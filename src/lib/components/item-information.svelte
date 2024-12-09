<script lang="ts">
	let { mousePosition } = $props()
</script>

<div class="mouse-info" style={`left: ${mousePosition.x + 10}px; top: ${mousePosition.y + 10}px`}>
	<img src={mousePosition.data.image_url} alt={mousePosition.data.name} />
	{mousePosition.data.name}
</div>
