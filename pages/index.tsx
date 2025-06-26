import Carousel from '../components/Carousel';
import HeartWithFirework from '../components/HeartWithFirework';
import SpotifyPlayer from '../components/SpotifyPlayer';
import { useEffect, useState } from "react";

const clientId = "dd153b1d6ca844a5a11db40416c28c67";
const redirectUri = "https://loving-web-psi.vercel.app/callback";
const scopes = [
  "streaming",
  "user-read-email",
  "user-read-private",
  "user-modify-playback-state",
  "user-read-playback-state",
  "playlist-modify-private",
];

const getSpotifyAuthUrl = () => {
  const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${encodeURIComponent(scopes.join(" "))}&response_type=token&show_dialog=true`;
  return url;
};

export default function Home() {
  const [showMessage, setShowMessage] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [timeTogether, setTimeTogether] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [titleTyped, setTitleTyped] = useState("");
  const fullTitle = "Nuestra Reacción Perfecta 💘🔬";

  // Estado para token Spotify
  const [tokenState, setTokenState] = useState<string | null>(null);

  // Cargar token de localStorage una vez al montar
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("spotify_access_token");
      setTokenState(storedToken);
    }
  }, []);

  // Máquina de escribir solo si no hay token
  useEffect(() => {
    if (tokenState) {
      setTitleTyped(fullTitle);
      return;
    }
    let index = 0;
    const interval = setInterval(() => {
      setTitleTyped(fullTitle.slice(0, index + 1));
      index++;
      if (index === fullTitle.length) clearInterval(interval);
    }, 120);
    return () => clearInterval(interval);
  }, [tokenState]);

  const isTitleComplete = titleTyped === fullTitle;

  // Cronómetro de tiempo juntos
  useEffect(() => {
    const startDate = new Date("2024-07-29T00:00:00");
    const updateTime = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();

      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / (60 * 60 * 24));
      const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTimeTogether({ days, hours, minutes, seconds });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("spotify_access_token");
    setTokenState(null);
    window.location.reload();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 flex flex-col items-center justify-center px-6 py-12 text-center">

      {/* Título con máquina de escribir y cursor */}
      <h1 className="text-5xl font-extrabold text-gray-800 mb-8 min-h-[4rem] whitespace-pre-wrap">
        {titleTyped}
        {!isTitleComplete && !tokenState && (
          <span className="inline-block w-1 h-8 bg-gray-800 cursor-blink ml-1 align-bottom"></span>
        )}
      </h1>

      {/* Tarjeta con fade-in animación */}
      <div
        className={`max-w-2xl w-full p-8 rounded-3xl border border-white/30 bg-white/70 backdrop-blur-md shadow-2xl
          transition-opacity duration-[1500ms] ease-in-out
          ${isTitleComplete || tokenState ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <p className="text-xl font-semibold text-pink-700 mb-2">Estefanía y Miguel</p>
        <p className="text-lg text-purple-900 font-medium mb-6">
          Llevamos <span className="font-bold">{timeTogether.days}</span> días juntos 💞
        </p>

        <p className="text-2xl font-mono text-gray-800 mb-6">
          Tú (C₆H₆) + Yo (C₈H₁₀N₄O₂) → Amor² + Dopamina⁺ + Oxitocina
        </p>

        {!showMessage && (
          <>
            <button
              className="bg-pink-500 hover:bg-pink-400 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out text-lg"
              onClick={() => setShowMessage(true)}
            >
              Analizar muestra
            </button>

            {!tokenState && (
              <button
                onClick={() => {
                  const url = getSpotifyAuthUrl();
                  window.location.href = url;
                }}
                className="ml-4 bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out text-lg"
              >
                Conectar con Spotify
              </button>
            )}

            {tokenState && (
              <button
                onClick={handleLogout}
                className="ml-4 bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out text-lg"
              >
                Desconectar Spotify
              </button>
            )}
          </>
        )}
      </div>

      {/* Contenido tras "Analizar muestra" con fade-in */}
      {showMessage && (
        <>
          <div className="animate-fade-in mt-10 bg-white/80 backdrop-blur-sm border border-pink-300 shadow-xl rounded-xl p-6 max-w-xl text-gray-800">
            <p className="text-lg leading-relaxed">
              Sabes de compuestos, enlaces y reacciones...
              Pero lo nuestro es pura <strong>química del alma</strong>.
              ¡Gracias por ser mi molécula favorita 💖!
            </p>
          </div>
          <Carousel />

          {/* Cronómetro + compatibilidad */}
          <div className="fixed top-4 right-4 z-50 flex flex-col items-end space-y-4">
            {/* Cronómetro */}
            <div className="w-72 bg-white/90 backdrop-blur-md text-pink-800 border border-pink-300 shadow-lg rounded-xl px-6 py-4 text-base font-semibold leading-relaxed">
              <p className="text-lg">💖 {timeTogether.days} días</p>
              <p className="text-xl tracking-widest">
                ⏰ {String(timeTogether.hours).padStart(2, '0')}h :
                {String(timeTogether.minutes).padStart(2, '0')}m :
                {String(timeTogether.seconds).padStart(2, '0')}s
              </p>
            </div>

            {/* Compatibilidad */}
            <div className="bg-white/90 border border-purple-300 shadow-lg rounded-xl p-5 w-72 text-base text-purple-800 backdrop-blur-md">
              <h3 className="font-bold text-pink-600 text-lg mb-2">✨ Compatibilidad astral</h3>
              <p>
                Géminis ♊ + Cáncer ♋<br />
                Una conexión brillante entre mente y corazón 💫<br />
                Tú, chispa y curiosidad; él, ternura y profundidad.<br />
                ¡Combinación mágica e inolvidable! 💖
              </p>

              <button
                onClick={() => setShowMore(true)}
                className="mt-4 text-pink-600 hover:text-pink-800 font-semibold underline text-sm"
              >
                Dale para saber más
              </button>

              {showMore && (
                <div className="mt-3 text-sm text-purple-900">
                  <p>
                    Géminis aporta ligereza, humor y mil ideas nuevas por minuto.
                    Cáncer, en cambio, construye el hogar emocional que da seguridad.
                    Juntos forman una pareja única que se equilibra entre la emoción y la mente.
                  </p>
                  <p className="mt-2">
                    ✨ Comunicación + ternura = vínculo profundo e inquebrantable.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Personajes con corazón abajo a la derecha */}
          <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center">
            <div className="mb-2 relative z-20">
              <HeartWithFirework />
            </div>
            <div className="flex items-end gap-6 relative z-10">
              {/* Estefanía */}
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

              {/* Miguel */}
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

          {/* Reproductor Spotify solo si hay token */}
          {tokenState && <SpotifyPlayer />}
        </>
      )}
    </main>
  );
}
