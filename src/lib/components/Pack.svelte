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

<div class="flex flex-col justify-center items-center">
    <a href={pack.link} target="_blank"><img class="w-40 h-64 img" src={pack.pictureUrl} alt="pack"/></a>
    <h1 class="font-bold text-lg">{pack.displayName}</h1>
    <p><span class="font-semibold">{Math.round($progressSell)}</span> ventes</p>
    <p class="break-words">{pack.description}</p>
    <p class="italic">Sorti le {new Date(pack.releaseDate).toLocaleDateString('FR')}</p>
</div>

<style>
    .img{
        transition: transform 100ms;
    }
    .img:hover{
        transform: perspective(400px) rotateY(10deg);
    }
</style>