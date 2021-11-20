<script>
	import Router from 'svelte-spa-router';
	import Landing from './pages/Landing.svelte';
	import Login from './pages/Login.svelte';
	import Register from './pages/Register.svelte';
	import Dasboard from './pages/Dasboard.svelte';
	import Main_toor from './pages/Dasboard_toor.svelte';
</script>

<Router routes={{
	'/': Landing,
	'/Login': Login,
	'/Register': Register,
	'/Dasboard' : Dasboard,
	'/Toor': Main_toor,
}} />

<style lang="scss">

</style>