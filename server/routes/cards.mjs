import fetch from 'node-fetch';

export default function GetAllCardModels() {
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
						allCardModels{
							slug,
							pictureUrl,
							artist{
							displayName
							},
							season,
							cardsMintedCount,
							averageSale,
							lowestAsk
						}
					}
				`
			})
		})
			.then((res) => res.json())
			.then((res) => {
				const r = res.data.allCardModels.map((card) => {
					return {
						...card,
						isCommon: card.slug.includes('common')
					}
				})
				resolve(r);
			})
			.catch((err) => {
				console.log(err);
				reject(err);
			});
	});
}
