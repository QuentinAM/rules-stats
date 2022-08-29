<script lang="ts">
    import { scale } from 'svelte/transition';
    import { tweened } from 'svelte/motion';
	import { sineOut } from 'svelte/easing';
    import { onMount } from 'svelte';
import Translation from './Translation.svelte';

    export let pack: any;

	const progressSell = tweened(0, {
        delay: 500,
		duration: 3000,
		easing: sineOut
	});

    onMount(() => {
        progressSell.set(pack.supply + pack.availableQuantity);
    })

</script>

<div class="flex flex-col justify-center items-center">
    <a transition:scale={{ duration: 1000 }} href={pack.link} target="_blank"><img class="lg:w-40 lg:h-64 w-32 h-48 img" src={pack.pictureUrl} alt="pack"/></a>
    <h1 class="font-bold text-lg text-white">{pack.displayName}</h1>
    <p class="text-slate-300"><span class="font-semibold">{Math.round($progressSell)}</span> <Translation id="sales"/></p>
    <p class="break-words">{pack.description}</p>
    <p class="italic"><Translation id="released_on"/> {new Date(pack.releaseDate).toLocaleDateString('FR')}</p>
</div>

<style>
    .img{
        transition: transform 100ms;
    }
    .img:hover{
        transform: perspective(400px) rotateY(10deg);
    }
</style>