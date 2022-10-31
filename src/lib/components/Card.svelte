<script lang="ts">
	import { goto } from '$app/navigation';
	import Translation from './Translation.svelte';

	function FormatPrice(str: string){
		// Hexa to decimal
		let price = parseInt(str, 16);

		// Wei to ETH and 4 digit precision
		price = price / 1000000000000000000;
		price = Math.round(price * 10000) / 10000;
		return price;
	}

	function FormatAverageSale(str: string){
		// Parse int
		let price = parseInt(str);

		return (price / 1000000000000000000).toFixed(6);
	}

	export let card: any;
	export let market: boolean = false;
	export let averageSale: boolean = false;
</script>

<div class="flex flex-col justify-center items-center">
	<a href={`https://rules.art/card/${card.slug}`} target="_blank"><img src={card.pictureUrl} loading="lazy" class="lg:h-48 md:h-40 h-32 img rounded-xl cursor-pointer" alt="Movie" /></a>
	<div class="flex flex-col justify-center items-center lg:text-sm text-xs">
		<div class="flex flex-row items-center space-x-2">
			<h2 class="font-semibold text-slate-200">{card.artist.displayName}</h2>
			{#if card.slug.includes('halloween')}
				<div class="badge bg-orange-400 text-black">Halloween</div>
			{:else if card.isCommon}
				<div class="badge badge-primary"><Translation id="common"/></div>
			{:else}
				<div class="badge bg-slate-400 text-black"><Translation id="platinum"/></div>
			{/if}
		</div>
		{#if market}
			{#if averageSale}
				<p><Translation id="average_sale"/>: {FormatAverageSale(card.averageSale)} ETH</p>
			{:else}
				<p><Translation id="lowest_ask"/>: {FormatPrice(card.lowestAsk)} ETH</p>
			{/if}
		{:else}
			<p>{card.cardsMintedCount} <Translation id="obtained"/></p>
		{/if}
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