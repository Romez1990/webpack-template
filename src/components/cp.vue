<template lang="pug">
	<!--<h1>{{ msg }}</h1>-->
	h1 {{ msg }}
</template>

<script>
	export default {
		data() {
			return {
				msg: 'Hello, World!'
			}
		}
	}
</script>

<style lang="stylus" scoped>
	/*
	h1 {
		color: red;
	}
	*/
	h1
		color red
</style>
