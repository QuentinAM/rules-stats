import fetch from 'node-fetch';

export default function GetPackBalance(ids) {
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
                        usersByIds(ids: ${JSON.stringify(ids)}){
                            packsBalances{
                                balance,
                                pack{
                                    slug
                                }
                            }
                        }
                    }
                `
            })
		})
			.then((res) => res.json())
			.then((res) => {
				resolve(res.data.usersByIds);
			});
	});
}
