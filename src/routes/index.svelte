<script lang="ts">
	import { dev } from '$app/env';
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { quadOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
	import { CalculateNumberOfArtists } from '$lib/utils';
	import Translation from '$lib/components/Translation.svelte';
	import Spinner from '$lib/assets/spinner.png';
	import Discord from '$lib/assets/discord.svg';
	import Pack from '$lib/components/Pack.svelte';
	import Favicon from '$lib/assets/favicon.png';
	import Card from '$lib/components/Card.svelte';

	let loading: boolean = true;
	let loadingCards: boolean = true;
	let allCards: any[] = [];
	let packs: any[] = [];

	// Stats
	let totalPacks: number = 0;
	let totalCards: number = 0;
	let totalMoney: number = 0;

	// Cards
	let rarestCommon: any;
	let rarestPlatinum: any;
	let rarestHalloween: any;

	let wantedCommon: any;
	let wantedPlatinum: any;
	let wantedHalloween: any;

	let leastCommon: any;
	let leastPlatinum: any;
	let leastHalloween: any;

	let mostCommon: any;
	let mostPlatinum: any;
	let mostHalloween: any;

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
	const usersCount = tweened(0, {
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

			// Get common card with the lowest cardMintedCount
			rarestCommon = data.filter((card: any) => card.isCommon && card.cardsMintedCount > 0).sort((a: any, b: any) => a.cardsMintedCount - b.cardsMintedCount)[0];

			// Get platinum card with the lowest cardMintedCount
			rarestPlatinum = data.filter((card: any) => card.slug.includes("platinium") && card.cardsMintedCount > 0).sort((a: any, b: any) => a.cardsMintedCount - b.cardsMintedCount)[0];
			
			// Get halloween card with the lowest cardMintedCount
			rarestHalloween = data.filter((card: any) => card.slug.includes("halloween") && card.cardsMintedCount > 0).sort((a: any, b: any) => a.cardsMintedCount - b.cardsMintedCount)[0];

			// Get common card with the highest cardMintedCount and cardMintedCount > 0
			mostCommon = data.filter((card: any) => card.isCommon && card.cardsMintedCount > 0).sort((a: any, b: any) => b.cardsMintedCount - a.cardsMintedCount)[0];

			// Get platinum card with the highest cardMintedCount and cardMintedCount > 0
			mostPlatinum = data.filter((card: any) => card.slug.includes("platinium") && card.cardsMintedCount > 0).sort((a: any, b: any) => b.cardsMintedCount - a.cardsMintedCount)[0];

			// Get halloween card with the highest cardMintedCount and cardMintedCount > 0
			mostHalloween = data.filter((card: any) => card.slug.includes("halloween") && card.cardsMintedCount > 0).sort((a: any, b: any) => b.cardsMintedCount - a.cardsMintedCount)[0];

			// Get common with the most averageSale
			wantedCommon = data.filter((card: any) => card.isCommon).sort((a: any, b: any) => b.averageSale - a.averageSale)[0];

			// Get platinum with the most averageSale
			wantedPlatinum = data.filter((card: any) => card.slug.includes("platinium")).sort((a: any, b: any) => b.averageSale - a.averageSale)[0];

			// Get halloween with the most averageSale and averageSale !== null
			wantedHalloween = data.filter((card: any) => card.slug.includes("halloween") && card.averageSale !== null).sort((a: any, b: any) => b.averageSale - a.averageSale)[0];

			// Get coomon with the lowest lowestAsk and lowestAsk > 0
			leastCommon = data.filter((card: any) => card.isCommon && card.lowestAsk !== null && card.lowestAsk > 0).sort((a: any, b: any) => a.lowestAsk - b.lowestAsk)[0];
			
			// Get platinum with the lowest lowestAsk and lowestAsk !== null
			leastPlatinum = data.filter((card: any) => card.slug.includes("platinium") && card.lowestAsk !== null).sort((a: any, b: any) => a.lowestAsk - b.lowestAsk)[0];
		
			// Get halloween with the lowest lowestAsk and lowestAsk !== null
			leastHalloween = data.filter((card: any) => card.slug.includes("halloween") && card.lowestAsk !== null).sort((a: any, b: any) => a.lowestAsk - b.lowestAsk)[0];
			
			loadingCards = false;
		});

		// Packs
		res = await fetch(`${dev ? 'http://localhost:3000' : ''}/api/packs`);
		res = await res.json();
		packs = res;

		// Add starter-pack-s1
		res = await fetch(`${dev ? 'http://localhost:3000' : ''}/api/pack/starter-pack-s1`);
		res = await res.json();
		packs = [...packs, res];

		packs.forEach((pack, index, array) => {
			totalPacks += pack.supply + pack.availableQuantity;
			if (index === array.length - 1)
			{
				totalCards = totalPacks * 3;
				totalMoney = totalPacks * 3.6;
				totalPacksProgress.set(totalPacks);
				totalCardsProgress.set(totalCards);
				totalMoneyProgress.set(totalMoney);
			}
		});

		// Add .link to packs
		packs.forEach((pack, index, array) => {
			pack.link = `https://rules.art/pack/${pack.slug}`;
			if (index === array.length - 1)
				loading = false;
		});

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
						<div class="flex flex-col">
							<div class="flex flex-row">
								<p><Translation id="Donated_to"/>&nbsp;</p> 
								{#if loadingCards}
									<img src={Spinner} class="animate-spin h-4 w-4" alt="spinner" />
								{:else}
									{CalculateNumberOfArtists(allCards)}
								{/if}
								<p>&nbsp;<Translation id="indie_artists"/></p>
							</div>
							<p><Translation id="marketplace_contribution"/></p>	
						</div>
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
							<Card {card} market={false}/>
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
		<div class="flex lg:flex-row flex-col lg:space-x-3 lg:space-y-0 space-y-3 h-[20rem]">
			<div class="flex flex-col items-center justify-center space-y-2 glass rounded p-3 lg:w-1/5 w-full h-full">
				<h1 class="font-semibold text-xl text-white">Socials</h1>
				{#if $usersCount > 0}
					<div class=" tooltip tooltip-bottom" data-tip={`Value updated every 24h`}>
						<div class="flex flex-row items-center space-x-2">
							<a href="https://rules.art/" target="_blank"><img src={Favicon} class="h-8 w-8 cursor-pointer" alt="discord" /></a>
							<p>{Math.round($usersCount)} <Translation id="members"/></p>
						</div>
					</div>
				{/if}
				<div class="flex flex-row items-center space-x-2">
					<a href="https://discord.com/invite/DrfezKYUhH" target="_blank"><img src={Discord} class="h-8 w-8 cursor-pointer" alt="discord" /></a>
					<p>{Math.round($discordCount)} <Translation id="members"/></p>
				</div>
			</div>
			<div class="flex lg:flex-row flex-col bg-base-100 items-center justify-center rounded p-3 lg:w-4/5 w-full">
				{#if loadingCards}
					<img src={Spinner} class="animate-spin h-10 w-10" alt="spinner" />
				{:else}
					<div transition:slide class="flex flex-col space-y-2 w-full">
						<p class="font-semibold text-white"><Translation id="rarest"/></p>
						<div class="flex flex-row items-center justify-center space-x-7 w-full overflow-x-auto">
							<Card card={rarestCommon} market={false}/>
							<Card card={rarestPlatinum} market={false}  />
							<Card card={rarestHalloween} market={false}/>
						</div>
					</div>
					<div class="divider lg:divider-horizontal divider-vertical"></div>
					<div transition:slide class="flex flex-col space-y-2 w-full">
						<p class="font-semibold text-white"><Translation id="commons"/></p>
						<div class="flex flex-row items-center justify-center space-x-7 w-full overflow-x-auto">
							<Card card={mostCommon} market={false}  />
							<Card card={mostPlatinum} market={false}  />
							<Card card={mostHalloween} market={false}  />
						</div>
					</div>
				{/if}
			</div>
		</div>
		<div class="flex lg:flex-row flex-col lg:space-x-3 lg:space-y-0 space-y-3">
			<div class="flex lg:flex-row flex-col bg-base-100 items-center justify-center rounded p-3 w-full">
				{#if loadingCards}
					<img src={Spinner} class="animate-spin h-10 w-10" alt="spinner" />
				{:else}
					<div transition:slide class="flex flex-col space-y-2 w-full">
						<p class="font-semibold text-white"><Translation id="most_looked"/></p>
						<div class="flex flex-row items-center justify-center space-x-7 w-full overflow-x-auto">
							<Card card={wantedCommon} market={true} averageSale />
							<Card card={wantedPlatinum}  market={true} averageSale/>
							<Card card={wantedHalloween} market={true} averageSale/>
						</div>
					</div>
					<div class="divider lg:divider-horizontal divider-vertical"></div>
					<div transition:slide class="flex flex-col space-y-2 w-full">
						<p class="font-semibold text-white"><Translation id="least_expensive"/></p>
						<div class="flex flex-row items-center justify-center space-x-7 w-full overflow-x-auto">
							<Card card={leastCommon} market={true} />
							<Card card={leastPlatinum}  market={true} />
							<Card card={leastHalloween} market={true} />
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}
