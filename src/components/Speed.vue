<template>
	<div>
		Speed: 
		{{ speed | filterPerMinute }}
	</div>
</template>

<script>
export default {
	props: ['count'],
	data () {
		return {
			initTime: Date.now()
		}
	},

	computed: {
		speed () {
			let delta = () => ( ((Date.now() - this.initTime) / 1000) / 60 )
			return this.count / delta()
		}
	}
}
</script>