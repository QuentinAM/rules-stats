<script lang="ts">
	import { dev } from '$app/env';
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { expoOut } from 'svelte/easing';
	import Translation from '$lib/components/Translation.svelte';
	import Spinner from '$lib/assets/spinner.png';
	import Pack from '$lib/components/Pack.svelte';

	let loading: boolean = true;
	let allCards: any[] = [];
	let packs: any[] = [];

	// Stats
	let numberOfCards: number = 0;
	let totalPacks: number = 0;
	let totalCards: number = 0;
	let totalMoney: number = 0;

	// Stats progress
	const totalPacksProgress = tweened(0, {
		duration: 2000,
		easing: expoOut
	});
	const totalCardsProgress = tweened(0, {
		duration: 2000,
		easing: expoOut
	});
	const totalMoneyProgress = tweened(0, {
		duration: 3000,
		easing: expoOut
	});

	onMount(async () => {
		// Cards
		let res: any = await fetch(`${dev ? 'http://localhost:3000' : ''}/api/cards`);
		res = await res.json();
		allCards = res;
		numberOfCards = res.length;
		loading = false;

		// Packs
		res = await fetch(`${dev ? 'http://localhost:3000' : ''}/api/pack/launch-pack-s1`)
		res = await res.json();
		res.pictureUrl = 'https://assets.rules.art/eyJidWNrZXQiOiJydWxlc2xhYnMtaW1hZ2VzIiwia2V5IjoicGFja3MvbGF1bmNoLXBhY2stczEucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjozMjAsImZpdCI6ImNvbnRhaW4ifX19';
		packs = [...packs, res];

		res = await fetch(`${dev ? 'http://localhost:3000' : ''}/api/pack/starter-pack-s1`)
		res = await res.json();
		res.pictureUrl = 'https://assets.rules.art/eyJidWNrZXQiOiJydWxlc2xhYnMtaW1hZ2VzIiwia2V5IjoicGFja3Mvc3RhcnRlci1wYWNrLXMxLnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6NTEyLCJmaXQiOiJjb250YWluIn19fQ==';
		packs = [...packs, res];
		console.log(packs);

		packs.forEach((pack, index, array) => {
			totalPacks += pack.supply + pack.availableQuantity;
			if (index === array.length - 1)
			{
				totalCards = totalPacks * 3;
				totalMoney = totalPacks * 3.6;
				console.log(`Total packs: ${totalPacks}`);
				console.log(`Total cards: ${totalCards}`);
				console.log(`Total money: ${totalMoney}`);

				totalPacksProgress.set(totalPacks);
				totalCardsProgress.set(totalCards);
				totalMoneyProgress.set(totalMoney);
			}
		});
	});
</script>

<div>
	<a class="text-primary hover:underline" href="https://rules.art/" target="_blank"
		>Rules</a
	>
	<Translation id="description" />
	(s/o
	<a class="text-primary hover:underline" href="https://github.com/0xChqrles" target="_blank"
		>Chqrles</a
	>)
	<Translation id="by" /> <a class="text-primary hover:underline" href="https://quentinam.fr/" target="_blank">
		QuentinAM
	</a>
</div>
{#if loading}
	<img src={Spinner} class="animate-spin h-10" alt="spinner" />
{:else}
	<div class="flex flex-row space-x-3">
		<div class="flex flex-col space-y-3">
			<div class="radial-progress" style={`--value:${Math.abs((($totalMoneyProgress / totalMoney) - 0.3)) * 100}; --size:12rem; --thickness: 0.5rem;`}>
				{Math.round($totalMoneyProgress * 100) / 100}€
			</div>
			<p>Reversés à {numberOfCards} artistes indés !</p>
			<div class="radial-progress" style={`--value:${Math.abs((($totalPacksProgress / totalPacks) - 0.2)) * 100}; --size:12rem; --thickness: 0.5rem;`}>
				{Math.round($totalPacksProgress)} packs
			</div>
			<div class="radial-progress" style={`--value:${Math.abs((($totalCardsProgress / totalCards) - 0.1)) * 100}; --size:12rem; --thickness: 0.5rem;`}>
				{Math.round($totalCardsProgress)} cartes
			</div>
		</div>
		<div class="flex flex-row space-x-4">
			{#each packs as pack}
				<Pack {pack}/>
			{/each}
		</div>
	</div>
{/if}
