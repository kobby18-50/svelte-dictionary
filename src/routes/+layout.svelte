<script>
	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';

	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/skeleton.css';

	import '../app.postcss';
	import Navbar from '../components/Navbar.svelte';
</script>

<Navbar/>

<div class="">
	<slot />
</div>
