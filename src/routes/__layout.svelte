<script>
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import PackBg from '$lib/assets/pack-bg.svg';
</script>

<Navbar />
<img src={PackBg} class="absolute left-0 right-auto opacity-20" alt="bg"/>
<div class="bg-base-200 flex justify-center">
	<div class="flex flex-col items-center space-y-4 mt-4 w-[95%] mx-20 lg:w-5/6 lg:mx-0 mb-10">
		<slot />
	</div>
</div>
