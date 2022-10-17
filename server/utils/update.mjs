import GetUsers from "./users.mjs";
import GetPackBalance from "./packBalance.mjs";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export const DEBUG = true;

export function Update(){
    return new Promise(async (resolve, reject) => {
        let users = await GetUsers();

        let length = users.length;
        const p = 400   ;

        console.log('Got users', length);

        if (length == 0)
        {
            // Get data from file
            // Load ../data.json
            users = require('../data.json');
            length = users.length; 
        }

        let launchPackCount = 0;
        let starterPackCount = 0;
        let kushPackCount = 0;
        let honeyPackCount = 0;
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
                const kushPack = packBalance.find(pack => pack.pack.slug === 'kush-base-pack');
                const honeyPack = packBalance.find(pack => pack.pack.slug === 'honey-base-pack');
                launchPackCount += launchPack ? launchPack.balance : 0;
                starterPackCount += starterPack ? starterPack.balance : 0;
                kushPackCount += kushPack ? kushPack.balance : 0;
                honeyPackCount += honeyPack ? honeyPack.balance : 0;
                atLeastOnePack += (launchPack && launchPack.balance > 0) || (starterPack && starterPack.balance > 0) ? 1 : 0;
            
                if (j === packBalanceArray.length - 1) {
                    if (i + p >= length) {
                        if (DEBUG)
                            console.log('Request count: ', requestCount);
                        resolve([launchPackCount, starterPackCount, atLeastOnePack, length, kushPackCount, honeyPackCount]);
                    }
                }
            }
        }
    });    
}