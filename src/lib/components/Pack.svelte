<script lang="ts">
    import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
    import { onMount } from 'svelte';

    export let pack: any;

	const progressSell = tweened(0, {
		duration: 2000,
		easing: cubicOut
	});

    onMount(() => {
        progressSell.set(pack.supply + pack.availableQuantity);
    })

</script>

<div class="w-[11rem]">
    <img class="w-full h-72" src={pack.pictureUrl} alt="pack"/>
    <h1 class="font-bold text-lg">{pack.displayName}</h1>
    <p><span class="font-semibold">{Math.round($progressSell)}</span> ventes</p>
    <p class="break-words">{pack.description}</p>
    <p class="">Sorti le {new Date(pack.releaseDate).toLocaleDateString('FR')}</p>
</div>