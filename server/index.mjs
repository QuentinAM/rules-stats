import express from 'express';
import cors from 'cors';
import GetAllCardModels from './routes/cards.mjs';
import GetPack from './routes/pack.mjs';
import { Update, DEBUG } from './utils/update.mjs';
import { handler } from '../build/handler.js';

const app = express();

let launchPackCount = 0;
let starterPackCount = 0;
let kushPackCount = 0;
let honeyPackCount = 0;
let halloweenPackCount = 0;
let threeHPacks = 0;
let twoHPacks = 0;
let oneHPacks = 0;
let atLeastOnePack = 0;
let userCount = 0;

async function UpdateCounts() {
	console.log('Updating counts');
	const newRes = await Update();
	launchPackCount = newRes[0];
	starterPackCount = newRes[1];
	atLeastOnePack = newRes[2];
	userCount = newRes[3];
	kushPackCount = newRes[4];
	honeyPackCount = newRes[5];
	halloweenPackCount= newRes[6];
	threeHPacks = newRes[7];
	twoHPacks = newRes[8];
	oneHPacks = newRes[9];

	if (DEBUG){
		console.log('Launch Pack Count: ', launchPackCount);
		console.log('Starter Pack Count: ', starterPackCount);
		console.log('Kush Pack Count: ', kushPackCount);
		console.log('Honey Pack Count: ', honeyPackCount);
		console.log('Halloween Pack Count: ', halloweenPackCount);
		console.log('User Count: ', userCount);
	}
	console.log('Updated counts, next update in 24h');
}
async function Setup(){
	await UpdateCounts();	
	setInterval(async () => {
		await UpdateCounts();
	}, 1000 * 60 * 60 * 24);
}
//Setup();

app.use(cors());
app.get('/api/cards', async (req, res) => {
	let allCardsModels;
	try{
		allCardsModels = await GetAllCardModels();
	}
	catch(err){
		res.status(500).send(err);
		return;
	}
	res.send(allCardsModels);
});
app.get('/api/pack/:slug', async (req, res) => {
	const pack = await GetPack(req.params.slug);
	res.send(pack);
});
app.get('/api/infos', (req, res) =>{
	res.send({
		launchPackCount: launchPackCount,
		starterPackCount: starterPackCount,
		kushPackCount: kushPackCount,
		honeyPackCount: honeyPackCount,	
		halloweenPackCount: halloweenPackCount,
		threeHPacks: threeHPacks,
		twoHPacks: twoHPacks,
		oneHPacks: oneHPacks,
		userCount: userCount,
		atLeastOnePack: atLeastOnePack
	});
})
app.use(handler);
app.listen(3000, () => console.log('Listening on port 3000!'));
