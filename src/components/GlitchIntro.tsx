import { useEffect, useRef, useState } from 'react';
import LetterGlitch from '@/components/LetterGlitch';
import MagnetButton from '@/components/MagnetButton';

const GlitchIntro = ({ onFinish }: { onFinish: () => void }) => {
  const glitchRef = useRef<HTMLHeadingElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!glitchRef.current) return;
    glitchRef.current.classList.add('glitch-animate');
    return () => glitchRef.current?.classList.remove('glitch-animate');
  }, []);

  const handleClick = () => {
    setIsPlaying(true);
    // Al hacer click simplemente disparas el finish para ir a /loading
    onFinish();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <LetterGlitch glitchSpeed={40} centerVignette={false} outerVignette={false} smooth={true} />
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4 transition-opacity duration-700"
        style={{ opacity: isPlaying ? 0.6 : 1 }}
      >
        <h1
          ref={glitchRef}
          className="text-5xl md:text-7xl font-extrabold text-green-400 mb-10 font-mono flicker"
          style={{ textShadow: '0 0 10px #00ff00, 0 0 20px #00cc66, 0 0 40px #33ff99' }}
        >
          ¡Feliz cumpleaños, mi amor!
        </h1>
        <MagnetButton
          onClick={handleClick}
          className="bg-black border border-green-400 text-green-300 font-semibold py-3 px-8 rounded-full text-xl hover:bg-green-600 hover:text-black hover:border-green-300 transition-all duration-300 font-mono"
          disabled={isPlaying}
        >
          Abre tu regalo 🎁
        </MagnetButton>
      </div>
    </div>
  );
};

export default GlitchIntro;
