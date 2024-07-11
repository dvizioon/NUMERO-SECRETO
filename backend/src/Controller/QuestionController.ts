import { Request, Response } from 'express';
import { makeApiRequest } from '../Service/createQuestion';


export async function askQuestion(req: Request, res: Response) {
    try {
        const { question } = req.body; 

        const apiResponse = await makeApiRequest(question);

        return res.status(200).json({ response: apiResponse });
    } catch (error) {
        console.error('Erro ao processar pergunta:', error);
        return res.status(500).json({ error: 'Erro ao processar pergunta' });
    }
}
