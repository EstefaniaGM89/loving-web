import { useState, useRef, useEffect } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  // Intentar reproducir al montar (puede bloquearse en algunos navegadores)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {
        // En caso de bloqueo automático
        alert("Pulsa para activar la música");
      });
    }
  };

  const onVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = Number(e.target.value);
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  };

  return (
    <div className="fixed bottom-4 left-4 bg-white/80 backdrop-blur-md rounded-lg shadow-md px-4 py-2 flex items-center space-x-4 z-50">
      <audio
        ref={audioRef}
        src="/music/tu-cancion.mp3"
        loop
        preload="auto"
      />
      <button
        onClick={togglePlay}
        className="text-pink-600 hover:text-pink-800 font-bold text-lg"
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
      >
        {isPlaying ? "⏸️" : "▶️"}
      </button>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={onVolumeChange}
        className="w-24 cursor-pointer"
        aria-label="Control de volumen"
      />
    </div>
  );
}
