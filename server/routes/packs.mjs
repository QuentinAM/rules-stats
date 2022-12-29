import fetch from 'node-fetch';

export default function GetPacks(slug) {
	return new Promise((resolve, reject) => {
		fetch('https://api.rules.art/graphql', {
			method: 'POST',
			headers: {
				'Accept-Encoding': 'gzip, deflate, br',
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Connection: 'keep-alive',
				DNT: '1',
				Origin: 'https://api.rules.art'
			},
			body: JSON.stringify({
				query: `
                    query{
                        allClassicPacks{
                                nodes{
                                slug,
								maxSupply,
								cardsPerPack,
								supply,
								releaseDate,
								season,
								availableQuantity,
								description,
								displayName,
								pictureUrl(derivative: "width=512")
                            }
                        }
                    }
                `
            })
		})
			.then((res) => res.json())
			.then((res) => {
				resolve(res.data.allClassicPacks.nodes);
			});
	});
}
