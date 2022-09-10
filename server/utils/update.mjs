import GetUsers from "./users.mjs";
import GetPackBalance from "./packBalance.mjs";

export const DEBUG = true;

export function Update(){
    return new Promise(async (resolve, reject) => {
        const users = await GetUsers();
        if (users === []) {
            console.log('No users found');
            resolve([0, 0, 0, 0]);
            return;
        }

        const length = users.length;
        const p = 500;

        if (DEBUG)
            console.log('Got users', length);

        let launchPackCount = 0;
        let starterPackCount = 0;
        let atLeastOnePack = 0;
        let requestCount = 1;

        for (let i = 0; i < length; i += p) {

            const ids = users.slice(i, i + p).map(user => user.id);
            const packBalanceArray = await GetPackBalance(ids);

            if (DEBUG)
                console.log('Processing from ', i, ' to ', i + p);
            requestCount++;
            
            for (let j = 0; j < packBalanceArray.length; j++) {
                const packBalance = packBalanceArray[j].packsBalances;
                const launchPack = packBalance.find(pack => pack.pack.slug === 'launch-pack-s1');
                const starterPack = packBalance.find(pack => pack.pack.slug === 'starter-pack-s1');
                launchPackCount += launchPack ? launchPack.balance : 0;
                starterPackCount += starterPack ? starterPack.balance : 0;
                atLeastOnePack += launchPack || starterPack ? 1 : 0;
            
                if (j === packBalanceArray.length - 1) {
                    if (i + p >= length) {
                        if (DEBUG)
                            console.log('Request count: ', requestCount);
                        resolve([launchPackCount, starterPackCount, atLeastOnePack, length]);
                    }
                }
            }
        }
    });    
}