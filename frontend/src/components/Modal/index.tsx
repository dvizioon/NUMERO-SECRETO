import React, { useState, useEffect } from "react";
import ModalView from 'react-modal';
import { Question } from "../Question";
// import { Tilt } from 'react-tilt';

interface ModalProps {
    _openModal: boolean;
    _number: number | string | null;
    _random: number | string | null;
    onClose: () => void; // Função para fechar o modal
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        width: "60vw",
        height: "60vh",
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
};

const ModalComponent: React.FC<ModalProps> = ({ _openModal, _number, _random, onClose }) => {
    const [modalIsOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(_openModal);
    }, [_openModal]);

    const closeModal = () => {
        setIsOpen(false);
        onClose(); 
    }


    ModalView.setAppElement('#root');

    return (
        <ModalView
            isOpen={modalIsOpen}
            // isOpen={true}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Exemplo de Modal"
        >

            <div className="w-full gap-2" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2 className="text-4xl" style={{ color: '#ffffff' }}>Dica para o Número {_number}</h2>
                <p className="text-xl" style={{ color: '#ffffff' }}>Aqui vai uma dica super útil para o jogo!</p>
                <p className="bg-[#1875E8] p-3 text-2xl rounded-2xl">
                    <Question _pergunta={`
                    
                    Dica para Numero Secreto

                    *Verfificação*
                    importante.se  **${_number}** é igual  **${_random}** que dizer que ele acertou a vc vai dizer assim 'você acertou o número secreto'

                    - o numero que o usuario tem que Acertar é **${_random}**
                    - o numero que o usuario digitou é **${_number}**

                    **Regras**
                    0.sempre fale em português.
                    1.Com base no número dé uma dica para ele.
                    2.Não diga qual o éo numero que ele tem que acerta. 
                    3.so diga a dica bem precisa , tipo um enigma para ele decifrar.

                `} />
                </p>
                <button style={{
                    backgroundColor: '#1875E8',
                    color: '#ffffff',
                    padding: '0.75rem 1rem',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    marginTop: '1rem'
                }} onClick={closeModal}>Fechar</button>
            </div>

        </ModalView>
    )
}

export default ModalComponent;
