// src/components/LetterGlitch.tsx
import { useEffect, useRef } from "react";

interface Props {
  glitchSpeed?: number;
  centerVignette?: boolean;
  outerVignette?: boolean;
  smooth?: boolean;
}

export default function LetterGlitch({
  glitchSpeed = 50,
  centerVignette = true,
  outerVignette = true,
  smooth = true,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const columnsRef = useRef<number>(0);
  const dropsRef = useRef<number[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const letters = "アァイィウヴエカキクケコサシスセソタチツテトナニヌネノ0123456789";
    const fontSize = 16;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columnsRef.current = Math.floor(canvas.width / fontSize);
      dropsRef.current = Array(columnsRef.current).fill(1);
    };

    resizeCanvas();

    let animationId: number;

    const draw = () => {
      if (!canvas || !ctx) return;

      // Fondo semi-transparente negro
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00ff00";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < columnsRef.current; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        const x = i * fontSize;
        const y = dropsRef.current[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          dropsRef.current[i] = 0;
        }

        dropsRef.current[i]++;
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [glitchSpeed]);

  const vignetteStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    background: centerVignette
      ? "radial-gradient(circle, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 60%)"
      : outerVignette
      ? "radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,0.9) 100%)"
      : "transparent",
  };

  return (
    <div className="absolute inset-0 w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          display: "block",
          backgroundColor: "black",
        }}
      />
      {(centerVignette || outerVignette) && <div style={vignetteStyle}></div>}
    </div>
  );
}
