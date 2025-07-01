// pages/home.tsx
import Carousel from '@/components/Carousel';
import HeartWithFirework from '@/components/HeartWithFirework';
import { useEffect, useState, useRef } from "react";
import Head from 'next/head';
import BlurText from '@/components/BlurText';
import MagnetButton from '@/components/MagnetButton';

export default function Home() {
  const [showMessage, setShowMessage] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [timeTogether, setTimeTogether] = useState({
    years: 0, months: 0, weeks: 0, days: 0,
    hours: 0, minutes: 0, seconds: 0
  });
  const [titleTyped, setTitleTyped] = useState("");
  const fullTitle = "Nuestra Reacción Perfecta 💘🔬";

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTitleTyped(fullTitle.slice(0, index + 1));
      index++;
      if (index === fullTitle.length) clearInterval(interval);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  const isTitleComplete = titleTyped === fullTitle;

  useEffect(() => {
    const startDate = new Date("2024-07-29T00:00:00");
    const updateTime = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();
      const totalSeconds = Math.floor(diff / 1000);
      const totalDays = Math.floor(totalSeconds / 86400);
      const years = Math.floor(totalDays / 365);
      const months = Math.floor((totalDays % 365) / 30.44);
      const weeks = Math.floor(((totalDays % 365) % 30.44) / 7);
      const days = Math.floor(((totalDays % 365) % 30.44) % 7);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      setTimeTogether({ years, months, weeks, days, hours, minutes, seconds });
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (!audioRef.current) return;
    const handleEnded = () => setIsPlaying(false);
    audioRef.current.addEventListener('ended', handleEnded);
    return () => {
      if (audioRef.current) audioRef.current.removeEventListener('ended', handleEnded);
    };
  }, []);

  const toggleShowMore = () => setShowMore(prev => !prev);

  return (
    <>
      <Head>
        <title>Nuestra Reacción Perfecta</title>
        <meta name="description" content="Web amor con cronómetro y animaciones." />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 flex flex-col items-center justify-center px-6 py-12 text-center relative transition-opacity duration-1000 opacity-100">
        {/* ... Aquí va todo tu contenido original sin intro ni loading ... */}

        <div className="flex items-center justify-center gap-3 mb-8 min-h-[4rem] relative">
          <BlurText text="Bienvenido a nuestra Reacción Perfecta" />
          <span className="text-5xl ml-2 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-yellow-400 bg-clip-text text-transparent animate-[sparkle_2s_ease-in-out_infinite] hover:scale-110 transition-transform duration-300 cursor-default select-none">💘</span>
        </div>

        <div className={`max-w-2xl w-full p-8 rounded-3xl border border-white/30 bg-white/70 backdrop-blur-md shadow-2xl transition-opacity duration-[1500ms] ease-in-out ${isTitleComplete ? "opacity-100 pointer-events-auto animate-fade-in-down" : "opacity-0 pointer-events-none"}`}>
          <p className="text-xl font-semibold text-pink-700 mb-2">Estefanía y Miguel</p>
          <p className="text-lg text-purple-900 font-medium mb-6">Llevamos <span className="font-bold">{timeTogether.years}</span> años, <span className="font-bold">{timeTogether.months}</span> meses, <span className="font-bold">{timeTogether.weeks}</span> semanas y <span className="font-bold">{timeTogether.days}</span> días juntos 💞</p>
          <p className="text-2xl font-mono text-gray-800 mb-6">Tú (C₆H₆) + Yo (C₈H₁₀N₄O₂) → Amor² + Dopamina⁺ + Oxitocina</p>

          {!showMessage && (
            <div className="flex justify-center items-center gap-4">
              <MagnetButton onClick={() => setShowMessage(true)} className="relative overflow-hidden text-white font-bold py-3 px-6 rounded-full shadow-lg text-lg bg-pink-500 transition duration-300 group">
                <span className="relative z-10">Analizar muestra</span>
                <span className="absolute inset-0 pointer-events-none"><span className="block w-full h-full animate-shine group-hover:paused" /></span>
              </MagnetButton>
              <MagnetButton onClick={toggleAudio} className="relative overflow-hidden text-white font-bold py-3 px-6 rounded-full shadow-lg text-lg bg-green-600 transition duration-300 group">
                <span className="relative z-10">{isPlaying ? "Pausar canción" : "Reproducir canción"}</span>
                <span className="absolute inset-0 pointer-events-none"><span className="block w-full h-full animate-shine group-hover:paused" /></span>
              </MagnetButton>
            </div>
          )}
        </div>

        {showMessage && (
          <>
            <div className="animate-fade-in mt-10 bg-white/80 backdrop-blur-sm border border-pink-300 shadow-xl rounded-xl p-6 max-w-xl text-gray-800 text-center">
              <p className="text-lg leading-relaxed">Sabes de compuestos, enlaces y reacciones... Pero lo nuestro es pura <strong>química del alma</strong>. ¡Gracias por ser mi molécula favorita 💖!</p>
            </div>

            <div className="mt-10 w-full max-w-5xl flex justify-center">
              <Carousel />
            </div>

            <div className="fixed bottom-6 left-6 z-50 bg-white/90 backdrop-blur-md border border-pink-300 shadow-lg rounded-xl p-4 flex items-center gap-4 min-w-[260px] max-w-xs">
              <button onClick={toggleAudio} className="w-12 h-12 bg-green-600 hover:bg-green-500 rounded-full flex items-center justify-center text-white text-2xl shadow-lg transition">{isPlaying ? "❚❚" : "▶"}</button>
              <div className="text-left flex flex-col overflow-hidden">
                <span className="font-bold text-pink-600 truncate max-w-[150px]">Karol G</span>
                <span className="text-sm text-gray-600 truncate max-w-[150px]">Si Antes Te Hubiera Conocido</span>
              </div>
            </div>

            <div className="fixed top-[100px] right-4 z-50 flex flex-col items-end space-y-4">
              <div className="w-72 bg-white/90 backdrop-blur-md text-pink-800 border border-pink-300 shadow-lg rounded-xl px-6 py-4 text-base font-semibold leading-relaxed">
                <p className="text-lg">💖 {timeTogether.years}a {timeTogether.months}m {timeTogether.weeks}s {timeTogether.days}d</p>
                <p className="text-xl tracking-widest">⏰ {String(timeTogether.hours).padStart(2, '0')}h :{String(timeTogether.minutes).padStart(2, '0')}m :{String(timeTogether.seconds).padStart(2, '0')}s</p>
              </div>

              <div className="bg-white/90 border border-purple-300 shadow-lg rounded-xl p-5 w-72 text-base text-purple-800 backdrop-blur-md">
                <h3 className="font-bold text-pink-600 text-lg mb-2">✨ Compatibilidad astral</h3>
                <p>Géminis ♊ + Cáncer ♋<br />Una conexión brillante entre mente y corazón 💫<br />Tú, chispa y curiosidad; él, ternura y profundidad.<br />¡Combinación mágica e inolvidable! 💖</p>
                <button onClick={toggleShowMore} className="mt-4 text-pink-600 hover:text-pink-800 font-semibold underline text-sm">{showMore ? 'Ocultar detalles' : 'Dale para saber más'}</button>
                {showMore && (
                  <div className="mt-3 text-sm text-purple-900">
                    <p>Géminis aporta ligereza, humor y mil ideas nuevas por minuto. Cáncer, en cambio, construye el hogar emocional que da seguridad. Juntos forman una pareja única que se equilibra entre la emoción y la mente.</p>
                    <p className="mt-2">✨ Comunicación + ternura = vínculo profundo e inquebrantable.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center">
              <div className="mb-2 relative z-20">
                <HeartWithFirework />
              </div>
              <div className="flex items-end gap-6 relative z-10">
                <div className="relative w-14 animate-bounce">
                  <div className="relative w-14 h-14 bg-pink-200 rounded-sm flex flex-col items-center justify-center z-10">
                    <div className="absolute top-0 w-full h-4 bg-yellow-400 rounded-t-sm z-20"></div>
                    <div className="absolute top-4 left-0 w-2 h-10 bg-yellow-300 rounded-sm z-20"></div>
                    <div className="absolute top-4 right-0 w-2 h-10 bg-yellow-300 rounded-sm z-20"></div>
                    <div className="flex gap-2">
                      <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                      <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                    </div>
                    <div className="mt-1 w-2 h-1 bg-rose-500 rounded-sm"></div>
                  </div>
                  <div className="w-14 h-6 bg-pink-500"></div>
                  <div className="flex justify-between mt-0.5">
                    <div className="w-4 h-6 bg-rose-700 rounded-sm"></div>
                    <div className="w-4 h-6 bg-rose-700 rounded-sm"></div>
                  </div>
                </div>

                <div className="relative w-14 animate-bounce">
                  <div className="relative w-14 h-14 bg-blue-200 rounded-sm flex flex-col items-center justify-center z-10">
                    <div className="absolute top-0 w-full h-4 bg-black rounded-t-sm z-20"></div>
                    <div className="flex gap-2">
                      <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                      <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                    </div>
                    <div className="mt-1 w-2 h-1 bg-rose-500 rounded-sm"></div>
                  </div>
                  <div className="w-14 h-6 bg-green-400"></div>
                  <div className="flex justify-between mt-0.5">
                    <div className="w-4 h-6 bg-blue-800 rounded-sm"></div>
                    <div className="w-4 h-6 bg-blue-800 rounded-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      <audio ref={audioRef} src="/audio/karol-g-si-antes-te-hubiera-conocido.mp3" preload="auto" />
    </>
  );
}
