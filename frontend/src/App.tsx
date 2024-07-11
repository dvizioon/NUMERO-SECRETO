import React, { useState, useEffect, useRef } from "react";
import ModalComponent from "./components/Modal";
import RandomNumberGenerator from "./Modules/genaratorNumber";
import { ToastContainer, TypeOptions, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Tally5, RotateCcw, Pointer, Lightbulb } from "lucide-react";
import Cookies from 'js-cookie';
import applauseAudio from "./Sounds/crowd-cheer-ii-6263.mp3";

export function App() {
  const [number, setNumber] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [randomNumber, setRandomNumber] = useState<number | null>(null);
  const [tipsLeft, setTipsLeft] = useState<number>(3);
  const [isCooldown, setIsCooldown] = useState<boolean>(false);
  const [cooldownEnd, setCooldownEnd] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isCorrectNumber, setIsCorrectNumber] = useState<boolean>(false);
  const cooldownTime = 300000; // 5 minutos em milissegundos
  const audioRef = useRef<HTMLAudioElement>(new Audio(applauseAudio));
  const [randomNumbers, setRandomNumbers] = useState<number[]>([]);
  const [guessStatus, setGuessStatus] = useState<'maior' | 'menor' | null>(null);
  const [attempts, setAttempts] = useState<number>(0);


  useEffect(() => {
    handleNewGame();
    const savedTips = Cookies.get('tipsLeft');
    const savedCooldownEnd = Cookies.get('cooldownEnd');
    if (savedTips) {
      setTipsLeft(Number(savedTips));
    }
    if (savedCooldownEnd) {
      const end = Number(savedCooldownEnd);
      setCooldownEnd(end);
      const now = new Date().getTime();
      if (now < end) {
        setIsCooldown(true);
        setTimeLeft(end - now);
        const interval = setInterval(() => {
          const newTimeLeft = end - new Date().getTime();
          if (newTimeLeft <= 0) {
            clearInterval(interval);
            setIsCooldown(false);
            setTipsLeft(3);
            Cookies.set('tipsLeft', '3', { expires: 1 });
            setTimeLeft(0);
          } else {
            setTimeLeft(newTimeLeft);
          }
        }, 1000);
        return () => clearInterval(interval);
      }
    }
  }, []);

  const notify = (msg: string, _type: TypeOptions = 'default', _id: string) => {
    toast(msg, {
      type: _type,
      draggable: "mouse",
      toastId: _id
    });
  };

  const handleChangerValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(event.target.value);
  }

  const handleButton_Dica = () => {
    if (tipsLeft > 0 && !isCooldown) {
      setIsModalOpen(true);
      const newTipsLeft = tipsLeft - 1;
      setTipsLeft(newTipsLeft);
      Cookies.set('tipsLeft', String(newTipsLeft), { expires: 1 });
      if (newTipsLeft === 0) {
        const end = new Date().getTime() + cooldownTime;
        setCooldownEnd(end);
        Cookies.set('cooldownEnd', String(end), { expires: 1 });
        setIsCooldown(true);
        setTimeLeft(cooldownTime);
        const interval = setInterval(() => {
          const newTimeLeft = end - new Date().getTime();
          if (newTimeLeft <= 0) {
            clearInterval(interval);
            setIsCooldown(false);
            setTipsLeft(3);
            Cookies.set('tipsLeft', '3', { expires: 1 });
            setTimeLeft(0);
          } else {
            setTimeLeft(newTimeLeft);
          }
        }, 1000);
      }
    } else if (isCooldown) {
      notify("Por favor, aguarde antes de pedir outra dica.", "warning", "cooldown");
    } else {
      notify("Você não tem mais dicas disponíveis.", "warning", "no-tips-left");
    }
  }

  const handleButton_Chute = () => {
    if (!number) {
      notify("Erro: Insira um Valor...", "error", "erro-campo-vazio");
    } else if (randomNumber !== null) {
      const guessedNumber = Number(number);
      setAttempts(attempts + 1); // Incrementa o número de tentativas
      if (guessedNumber === randomNumber) {
        setIsCorrectNumber(true);
        playApplauseAudio();
      } else {
        setIsCorrectNumber(false);
        if (guessedNumber < randomNumber) {
          setGuessStatus('maior'); // Define que o palpite foi menor
        } else {
          setGuessStatus('menor'); // Define que o palpite foi maior
        }
      }
    }
  }

  const playApplauseAudio = () => {
    const audio = audioRef.current;
    audio.pause();
    audio.currentTime = 0;
    audio.play();
  };

  const handleNewGame = () => {
    let newRandomNum = RandomNumberGenerator(1, 100);


    while (randomNumbers.includes(newRandomNum)) {
      newRandomNum = RandomNumberGenerator(1, 100);
    }

    const audio = audioRef.current;
    audio.pause();
    audio.currentTime = 0;

    console.log(newRandomNum)
    setRandomNumber(newRandomNum);
    setRandomNumbers([...randomNumbers, newRandomNum]);
    setAttempts(0)
    setIsCorrectNumber(false);
    setNumber('');
    setIsModalOpen(false);
    setTipsLeft(3);
    Cookies.set('tipsLeft', '3', { expires: 1 });
    setIsCooldown(false);
    setTimeLeft(0);
    Cookies.remove('cooldownEnd');
  };

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }


  return (
    <div className="w-full h-screen flex flex-col justify-center items-center" style={{ backgroundImage: isCorrectNumber ? "url('https://i0.wp.com/gifs.eco.br/wp-content/uploads/2022/08/gifs-de-confete-24.gif?resize=650,400')" : "" }}>
      <div className="w-90p h-4/5 bg-slate-50 flex items-center justify-between border border-[#1875E8] rounded-2xl img-ruido bg-transparent gap-2">
        <div className="p-2 w-full h-full flex flex-col gap-3" style={{ padding: "1rem" }}>
          <div className="w-full mb-10">
            <h1 className="text-h1 leading-[4.5rem] font-Chakra text-white">Jogo do número secreto</h1>
          </div>
          <div className="w-full mb-2">
            <p className={`text-zinc-950 mb-1 rounded-2xl px-2 text-h2 font-Chakra ${attempts <= 10 ? "bg-green-500" : attempts < 20 ? "bg-yellow-500" : "bg-red-500"}`}>{attempts > 1 ? "Tentativas" :"Tentativa"}: {attempts}</p>
            {isCorrectNumber ? (
              <p className="text-white text-h2 font-Inter ">Você Venceu o Jogo Parabéns 🥳</p>
            ) : (
              <p className="text-white text-h2 font-Inter ">{guessStatus ? `O Número é ${guessStatus}` : "Escolha um número entre 1 e 100"}</p>
            )}
          </div>
          <div className="w-full mb-2 flex items-center justify-center gap-2">
            <Tally5 className="w-1/5 h-16 font-Inter text-[#1875E8] outline-none rounded-2xl px-2 text-3xl font-semibold" />
            <input
              type="number"
              className="w-full h-16 font-Inter text-[#1875E8] outline-none rounded-2xl px-2 text-3xl font-semibold"
              placeholder="Enter number..."
              value={number}
              onChange={handleChangerValue}
            />
            {number && (
              isCorrectNumber ? (
                <button
                  className={`w-1/5 h-16 bg-yellow-400 rounded-2xl px-4 py-6 flex items-center justify-center gap-2 ${tipsLeft === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={true}
                >
                  <RotateCcw className="text-white size-10" /> {cooldownEnd}
                </button>

              ) : (

                <button
                  onClick={handleButton_Dica}
                  className={`w-1/5 h-16 bg-yellow-400 rounded-2xl px-4 py-6 flex items-center justify-center gap-2 ${tipsLeft === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={tipsLeft === 0 || isCooldown}

                >
                  <Lightbulb className="text-white size-10" />
                  <span className="text-[#031731]  text-h2 font-Chakra font-semibold ">{tipsLeft}</span>
                </button>
              )
            )}
          </div>
          {isCooldown && (
            <div className="text-white text-center mt-2">
              <p className="text-h4">Tempo restante: {formatTime(timeLeft)}</p>
            </div>
          )}
          <div className="w-full flex items-center justify-between gap-2 text-2xl font-semibold text-white">
            <button onClick={handleButton_Chute} className="w-full bg-[#1875E8] rounded-2xl px-4 py-6 flex items-center justify-center gap-2">
              <Pointer /> Chutar
            </button>
            <button disabled={isCorrectNumber ? false : true} onClick={handleNewGame} className={`w-full ${isCorrectNumber ? ' bg-[#1875E8]' : 'bg-gray-600'} rounded-2xl px-4 py-6 flex items-center justify-center gap-2`}>
              <RotateCcw /> Novo jogo
            </button>
          </div>
        </div>
        <div className="w-full h-full">
          {isCorrectNumber ? (
            <div className="w-full h-full flex flex-col items-center justify-end">
              <img src="https://media.tenor.com/N2x4kM8wz9QAAAAj/win-winner.gif" className="w-100p" alt="Vencedor" />
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-end">
              <img src="ia.png" className="w-100p" alt="IA" />
            </div>
          )}
        </div>
      </div>
      <ModalComponent _openModal={isModalOpen} _number={parseInt(number)} _random={randomNumber} onClose={closeModal} />
      <ToastContainer limit={1} />
    </div>
  )
}
