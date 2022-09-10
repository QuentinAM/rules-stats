import fetch from 'node-fetch';

export default function GetUsers() {
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
                        users(slugs: [""]){
							id
                        }
                    }
                `
            })
		})
			.then((res) => res.json())
			.then((res) => {
				if (!res.data) {
					resolve([]);
					return;
				}
				resolve(res.data.users);
			});
	});
}
