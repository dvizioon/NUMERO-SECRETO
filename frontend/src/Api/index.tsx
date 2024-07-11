import axios from "axios";

const URL_BACKEND = import.meta.env.VITE_URL_BACKEND;

async function createAsk(question: string , pointer:string) {
    try {
        const response = await axios.post(`${URL_BACKEND}${pointer}`, { question });
        // console.log('Resposta da API:', response.data);
        return response.data;
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error; // Ou faça o tratamento adequado do erro conforme necessário
    }
}

export { createAsk }