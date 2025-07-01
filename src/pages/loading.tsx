// pages/loading.tsx
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

export default function Loading() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.play().catch(console.error);

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          router.push('/home');
          return 100;
        }
        return oldProgress + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center p-4">
      <h1
        className="text-5xl font-extrabold text-green-400 mb-10 font-mono"
        style={{ textShadow: '0 0 10px #00ff00, 0 0 20px #00cc66, 0 0 40px #33ff99' }}
      >
        Cargando bioma...
      </h1>

      <div className="w-full max-w-xs bg-green-900 rounded-full h-6 overflow-hidden shadow-inner">
        <div
          className="h-6 bg-green-400 transition-all duration-50"
          style={{ width: `${progress}%` }}
        />
      </div>

      <audio ref={audioRef} src="/audio/system-notifikason-solo-leveling.mp3" preload="auto" />
    </div>
  );
}
