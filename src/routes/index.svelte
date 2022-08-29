<script lang="ts">
	import { dev } from '$app/env';
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { quadOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
	import Translation from '$lib/components/Translation.svelte';
	import Spinner from '$lib/assets/spinner.png';
	import Discord from '$lib/assets/discord.svg';
	import Pack from '$lib/components/Pack.svelte';
	import Card from '$lib/components/Card.svelte';

	let loading: boolean = true;
	let loadingCards: boolean = true;
	let allCards: any[] = [];
	let packs: any[] = [];

	// Stats
	let numberOfCards: number = 0;
	let totalPacks: number = 0;
	let totalCards: number = 0;
	let totalMoney: number = 0;

	// Cards
	let rarestCommon: any;
	let rarestPlatinum: any;
	let rarestPlatinumSecond: any;

	let mostCommon: any;
	let mostPlatinum: any;
	let mostPlatinumSecond: any;

	// Progress
	const totalPacksProgress = tweened(0, {
		duration: 4500,
		easing: quadOut
	});
	const totalCardsProgress = tweened(0, {
		duration: 6000,
		easing: quadOut
	});
	const totalMoneyProgress = tweened(0, {
		duration: 3000,
		easing: quadOut
	});
	const discordCount = tweened(0, {
		duration: 3000,
		easing: quadOut
	}); 

	onMount(async () => {
		let res: any;

		// Cards async
		fetch(`${dev ? 'http://localhost:3000' : ''}/api/cards`)
		.then((response) => response.json())
		.then((data) => {
			allCards = data;
			numberOfCards = data.length / 2;

			// Get common card with the lowest cardMintedCount
			rarestCommon = data.filter((card: any) => card.isCommon).sort((a: any, b: any) => a.cardsMintedCount - b.cardsMintedCount)[0];

			// Get platinum card with the lowest cardMintedCount
			rarestPlatinum = data.filter((card: any) => !card.isCommon).sort((a: any, b: any) => a.cardsMintedCount - b.cardsMintedCount)[0];
			
			// Check if there is another card with the same cardMintedCount as the platinum card
			rarestPlatinumSecond = data.filter((card: any) => !card.isCommon && card.slug !== rarestPlatinum.slug && card.cardsMintedCount === rarestPlatinum.cardsMintedCount)[0];

			// Get common card with the highest cardMintedCount
			mostCommon = data.filter((card: any) => card.isCommon).sort((a: any, b: any) => b.cardsMintedCount - a.cardsMintedCount)[0];

			// Get platinum card with the highest cardMintedCount
			mostPlatinum = data.filter((card: any) => !card.isCommon).sort((a: any, b: any) => b.cardsMintedCount - a.cardsMintedCount)[0];

			// Check if there is another card with the same cardMintedCount as the platinum card
			mostPlatinumSecond = data.filter((card: any) => !card.isCommon && card.slug !== mostPlatinum.slug && card.cardsMintedCount === mostPlatinum.cardsMintedCount)[0];
			loadingCards = false;
		});

		// Packs
		res = await fetch(`${dev ? 'http://localhost:3000' : ''}/api/pack/launch-pack-s1`)
		res = await res.json();
		res.pictureUrl = 'https://assets.rules.art/eyJidWNrZXQiOiJydWxlc2xhYnMtaW1hZ2VzIiwia2V5IjoicGFja3MvbGF1bmNoLXBhY2stczEucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjozMjAsImZpdCI6ImNvbnRhaW4ifX19';
		res.link = 'https://rules.art/pack/launch-pack-s1';
		packs = [...packs, res];

		res = await fetch(`${dev ? 'http://localhost:3000' : ''}/api/pack/starter-pack-s1`)
		res = await res.json();
		res.pictureUrl = 'https://assets.rules.art/eyJidWNrZXQiOiJydWxlc2xhYnMtaW1hZ2VzIiwia2V5IjoicGFja3Mvc3RhcnRlci1wYWNrLXMxLnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6NTEyLCJmaXQiOiJjb250YWluIn19fQ==';
		res.link = 'https://rules.art/pack/starter-pack-s1';
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
		loading = false;

		// Socials
		fetch(`https://discord.com/api/v9/invites/DrfezKYUhH?with_counts=true&with_expiration=true`)
		.then(res => res.json())
		.then(res => {
			discordCount.set(res.approximate_member_count);
		}).catch(err => console.log(err));
	});
</script>

<div class=" z-10">
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
	<div class="flex flex-col w-full space-y-3 z-10">
		<div class="stats stats-horizontal bg-primary overflow-y-hidden">
			<div class="stat w-[20rem]">
				<div class=" stat-title text-slate-300">
					Contribution
				</div>
				<div class="stat-value text-white">
					{Math.round($totalMoneyProgress * 100) / 100}€
				</div>
				<div class="stat-desc text-slate-300">
					<div class="flex flex-row">
						<p><Translation id="Donated_to"/>&nbsp;</p> 
						{#if loadingCards}
							<img src={Spinner} class="animate-spin h-4 w-4" alt="spinner" />
						{:else}
							{numberOfCards}
						{/if}
						<p>&nbsp;<Translation id="indie_artists"/></p>
						<div class="radial-progress h-8 w-8" style={`--value:${Math.abs((($totalMoneyProgress / totalMoney) - 0.3)) * 100}; --size:2rem; --thickness: 0.5rem;`}>
						</div>
					</div>
				</div>
			</div>
			<div class="stat w-[20rem]">	
				<div class="stat-title text-slate-300">
					Packs
				</div>
				<div class="stat-value text-white">
					{Math.round($totalPacksProgress)}
				</div>
				<div class="stat-desc text-slate-300">
					<Translation id="ex_sold"/>
					<div class="radial-progress h-8 w-8" style={`--value:${Math.abs((($totalPacksProgress / totalPacks) - 0.2)) * 100}; --size:2rem; --thickness: 0.5rem;`}>
					</div>
				</div>
			</div>
			<div class="stat w-[20rem]">
				<div class="stat-title text-slate-300">
					<Translation id="Cards"/>
				</div>	
				<div class="stat-value text-white">
					{Math.round($totalCardsProgress)}
				</div>
				<div class="stat-desc text-slate-300">
					<Translation id="Cards_owned"/>
					<div class="radial-progress h-8 w-8" style={`--value:${Math.abs((($totalCardsProgress / totalCards) - 0.1)) * 100}; --size:2rem; --thickness: 0.5rem;`}>
					</div>
				</div>
			</div>
		</div>
		<div class="flex lg:flex-row flex-col lg:h-[33rem] lg:space-x-3 lg:space-y-0 space-y-3">
			<div class="bg-base-100 rounded p-3 h-full lg:w-3/5 w-full">
				{#if loadingCards}
					<div class="flex items-center justify-center">
						<img src={Spinner} class="animate-spin h-10 w-10" alt="spinner" />
					</div>
				{:else}
					<h1 class="font-semibold">{allCards.length} <Translation id="cards"/> !</h1>
					<div transition:slide class="grid lg:grid-cols-4 overflow-x-hidden md:grid-cols-3 grid-cols-2 space-x-3 space-y-5 h-[30rem] rounded overflow-y-auto">
						{#each allCards as card}
							<Card {card}/>
						{/each}
					</div>
				{/if}
			</div>
			<div class="flex flex-col items-center h-full space-y-2 glass rounded p-3 lg:w-2/5 w-full">
				<h1 class="font-semibold text-xl text-white">Packs</h1>
				<div class="grid grid-cols-2 space-x-4 space-y-3 rounded overflow-y-auto">
					{#each packs as pack}
						<Pack {pack}/>
					{/each}
				</div>
			</div>
		</div>
		<div class="flex lg:flex-row flex-col lg:space-x-3 lg:space-y-0 space-y-3">
			<div class="flex flex-col items-center space-y-2 glass rounded p-3 lg:w-1/5 w-full h-full">
				<h1 class="font-semibold text-xl text-white">Socials</h1>
				<div class="flex flex-row items-center space-x-2">
					<a href="https://discord.com/invite/DrfezKYUhH" target="_blank"><img src={Discord} class="h-8 w-8 cursor-pointer" alt="discord" /></a>
					<p>{Math.round($discordCount)} membres</p>
				</div>
			</div>
			<div class="flex lg:flex-row flex-col bg-base-100 items-center justify-center rounded p-3 lg:w-4/5 w-full">
				{#if loadingCards}
					<img src={Spinner} class="animate-spin h-10 w-10" alt="spinner" />
				{:else}
					<div transition:slide class="flex flex-col space-y-2 w-full">
						<p class="font-semibold text-white"><Translation id="rarest"/></p>
						<div class="flex flex-row items-center justify-center space-x-7 w-full overflow-x-auto">
							<Card card={rarestCommon} />
							{#if rarestPlatinumSecond}
								<div class="flex flex-row">
									<Card card={rarestPlatinum} />
									<Card card={rarestPlatinumSecond} />
								</div>
							{:else}
								<Card card={rarestPlatinum} />
							{/if}
						</div>
					</div>
					<div class="divider lg:divider-horizontal divider-vertical"></div>
					<div transition:slide class="flex flex-col space-y-2 w-full">
						<p class="font-semibold text-white"><Translation id="commons"/></p>
						<div class="flex flex-row items-center justify-center space-x-7 w-full overflow-x-auto">
							<Card card={mostCommon} />
							{#if mostPlatinumSecond}
								<div class="flex flex-row">
									<Card card={mostPlatinum} />
									<Card card={mostPlatinumSecond} />
								</div>
							{:else}
								<Card card={mostPlatinum} />
							{/if}
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}