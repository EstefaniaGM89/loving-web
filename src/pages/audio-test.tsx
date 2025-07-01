import { useRef } from 'react';

export default function AudioTest() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => {
        console.log('Error reproduciendo audio:', e);
      });
    }
  };

  return (
    <div className="p-8">
      <button
        onClick={playSound}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Reproducir sonido test
      </button>

      <audio ref={audioRef} src="/audio/system-notifikason-solo-leveling.mp3" preload="auto" />
    </div>
  );
}
