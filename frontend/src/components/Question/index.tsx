import React, { useEffect, useState } from "react";
import { createAsk } from "../../Api";


interface ModalProps {
    _pergunta: string;
}

const Question: React.FC<ModalProps> = ({ _pergunta }) => {
    const [responseText, setResponseText] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            try {
                const response = await createAsk(_pergunta, "/model/dvizioon/ask");
                const cleanedResponse = response.response.replace(/\$@\$.+?\$@\$/g, '');
                setResponseText(cleanedResponse.trim());
            } catch (error) {
                console.error('Erro ao fazer a requisição:', error);
                setResponseText('Erro ao carregar a resposta.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [_pergunta]);

    return (
        <div>
            {!isLoading && responseText && (
                <div>{responseText}</div>
            )}
            {isLoading && (
                <div className='flex items-center justify-center'>
                    <div className="w-10 h-10 border-4 border-black border-dashed rounded-full animate-spin"></div>
                    <p className="ml-4">Carregando...</p>
                </div>
            )}
        </div>
    );
};

export { Question };
