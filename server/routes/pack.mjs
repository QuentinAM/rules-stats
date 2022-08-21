import fetch from 'node-fetch';

export default function GetPack(slug) {
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
                        pack(slug: "${slug}"){
                            slug,
                            price,
                            maxSupply,
                            cardsPerPack,
                            supply,
                            releaseDate,
                            season,
                            availableQuantity,
                            description,
                            displayName,
							pictureUrl
                        }
                    }
                `
            })
		})
			.then((res) => res.json())
			.then((res) => {
				resolve(res.data.pack);
			});
	});
}
