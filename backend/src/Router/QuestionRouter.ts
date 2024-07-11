import express from 'express';
import { askQuestion } from '../Controller/QuestionController';

const routerAsk = express.Router();

// Rota para enviar uma pergunta
routerAsk.post('/model/dvizioon/ask', askQuestion);

export { routerAsk };