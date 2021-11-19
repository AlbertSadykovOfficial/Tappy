<template>
	<div>
		Mistakes Rate:
		{{ count | filterPercent }}
	</div>
</template>

<script>
export default {
	props: ['count']
}
</script>