import express from 'express';
import cors from 'cors';
import GetAllCardModels from './routes/cards.mjs';
import GetPack from './routes/pack.mjs';
import { handler } from '../build/handler.js';

const app = express();
app.use(cors());
app.get('/api/cards', async (req, res) => {
	const allCardsModels = await GetAllCardModels();
	res.send(allCardsModels);
});
app.get('/api/pack/:slug', async (req, res) => {
	const pack = await GetPack(req.params.slug);
	res.send(pack);
});
app.use(handler);
app.listen(3000, () => console.log('Listening on port 3000!'));
