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

<a href={pack.link} target="_blank" class="w-[11rem] cursor-pointer">
    <img class="w-full h-72 img" src={pack.pictureUrl} alt="pack"/>
    <h1 class="font-bold text-lg">{pack.displayName}</h1>
    <p><span class="font-semibold">{Math.round($progressSell)}</span> ventes</p>
    <p class="break-words">{pack.description}</p>
    <p class="">Sorti le {new Date(pack.releaseDate).toLocaleDateString('FR')}</p>
</a>

<style>
.img{
    transition: transform 100ms;
}
.img:hover{
    transform: perspective(400px) rotateY(10deg);
}
</style>