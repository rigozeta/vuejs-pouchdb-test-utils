<template>
	<div id="app">
		<h1>4 Values and 12 Principles of Agile</h1>

		<HelloWorld />

		<em>Submitted by: Rigo Gonzalez (rigognzlz@gmail.com)</em>
	</div>
</template>

<script>
	import HelloWorld from './components/HelloWorld.vue'

	export default {
		name: 'App',
		components: {
			HelloWorld
		}
	}
</script>

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}

	em {
		margin:5px;
		font-size:0.8em;
	}
</style>
