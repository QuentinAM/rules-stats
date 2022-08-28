<script lang="ts">
	import { goto } from '$app/navigation';
	import Translation from './Translation.svelte';

	export let card: any;
</script>

<div class="card card-side bg-base-100 shadow-xl w-full">
	<figure><img src={card.pictureUrl} loading="lazy" class="lg:h-52 h-40" alt="Movie" /></figure>
	<div class="card-body">
		<div class="flex flex-row items-center space-x-2">
			<h2 class="card-title">{card.artist.displayName}</h2>
			{#if card.slug.includes('common')}
				<div class="badge badge-primary">Commune</div>
			{:else}
				<div class="badge">Platine</div>
			{/if}
		</div>
		<div>Saison {card.season}</div>
	</div>
</div>
