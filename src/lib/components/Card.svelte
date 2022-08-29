<script lang="ts">
	import { goto } from '$app/navigation';
	import Translation from './Translation.svelte';

	export let card: any;
</script>

<div class="flex flex-col justify-center items-center">
	<a href={`https://rules.art/card/${card.slug}`} target="_blank"><img src={card.pictureUrl} loading="lazy" class="lg:h-48 md:h-40 h-32 img rounded-xl cursor-pointer" alt="Movie" /></a>
	<div class="flex flex-col justify-center items-center lg:text-sm text-xs">
		<div class="flex flex-row items-center space-x-2">
			<h2 class="font-semibold text-slate-200">{card.artist.displayName}</h2>
			{#if card.isCommon}
				<div class="badge badge-primary"><Translation id="common"/></div>
			{:else}
				<div class="badge bg-slate-400 text-black"><Translation id="platinum"/></div>
			{/if}
		</div>
		<p>{card.cardsMintedCount} <Translation id="obtained"/></p>
		<p class="italic"><Translation id="season"/> {card.season}</p>
	</div>
</div>

<style>
    .img{
        transition: transform 100ms;
    }
    .img:hover{
        transform: perspective(400px) rotateY(10deg);
    }
</style>