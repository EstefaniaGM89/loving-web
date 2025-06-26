import Carousel from '../components/Carousel';
import HeartWithFirework from '../components/HeartWithFirework';
import { useEffect, useState } from "react";

const clientId = "dd153b1d6ca844a5a11db40416c28c67"; // Pon aquí tu Client ID
const redirectUri = "https://loving-web-psi.vercel.app/callback";
const scopes = [
  "streaming",
  "user-read-email",
  "user-read-private",
  "user-modify-playback-state",
  "user-read-playback-state",
];

const getSpotifyAuthUrl = () => {
  return `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${encodeURIComponent(scopes.join(" "))}&response_type=token&show_dialog=true`;
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

  // Si quieres condicionar mostrar botón Spotify solo cuando no hay token
  const token = typeof window !== "undefined" ? localStorage.getItem("spotify_access_token") : null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="bg-white/70 backdrop-blur-md shadow-2xl rounded-3xl p-8 max-w-2xl w-full border border-white/30">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
          Nuestra Reacción Perfecta 💘🔬
        </h1>
        <p className="text-xl font-semibold text-pink-700">Estefanía y Miguel</p>
        <p className="text-lg text-purple-900 font-medium mt-2">
          Llevamos <span className="font-bold">{timeTogether.days}</span> días juntos 💞
        </p>
        <p className="text-2xl font-mono text-gray-800 mt-6">
          Tú (C₆H₆) + Yo (C₈H₁₀N₄O₂) → Amor² + Dopamina⁺ + Oxitocina
        </p>

        {!showMessage && (
          <button
            className="mt-8 bg-pink-500 hover:bg-pink-400 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out text-lg"
            onClick={() => setShowMessage(true)}
          >
            Analizar muestra
          </button>
        )}

        {!token && (
          <button
            onClick={() => (window.location.href = getSpotifyAuthUrl())}
            className="mt-6 bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out text-lg"
          >
            Conectar con Spotify
          </button>
        )}
      </div>

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
          {/* Cronómetro, compatibilidad y personajes abajo... (igual que antes) */}
          {/* Aquí puedes dejar el resto de tu código igual */}
        </>
      )}
    </main>
  );
}
