import dotenv from 'dotenv';
import path from 'path';
import { setQuestion, data, headers } from '../Auth/auth';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const URL_API = process.env.API || 'https://www.blackbox.ai/api/chat';

async function makeApiRequest(question: string): Promise<string> {
    try {
        await setQuestion(question);

        const apiUrl = URL_API;

        const requestOptions = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        };

        const response = await fetch(apiUrl, requestOptions);

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
        }

        const responseData = await response.text();
        // console.log('Resposta da API (texto):', responseData);
        return responseData;
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error; 
    }
}

// Exemplo de uso da função
// makeApiRequest('Qual é o seu nome?')
//     .then(response => {
//         console.log(response)
//     })
//     .catch(error => {
//         console.log(error)
//     });

export { makeApiRequest };
