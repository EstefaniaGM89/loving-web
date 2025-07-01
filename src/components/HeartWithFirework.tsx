import { useEffect, useState } from "react";

interface HeartWithFireworkProps {
  className?: string;
  animated?: boolean; // Nueva prop para controlar animación y clic
}

export default function HeartWithFirework({ className = "", animated = true }: HeartWithFireworkProps) {
  const [kiss, setKiss] = useState(false);

  useEffect(() => {
    if (kiss) {
      const timeout = setTimeout(() => setKiss(false), 1200);
      return () => clearTimeout(timeout);
    }
  }, [kiss]);

  if (!animated) {
    // Corazón estático sin botón ni animación
    return (
      <div className={`relative inline-block ${className}`}>
        <span className="text-5xl select-none">💖</span>
      </div>
    );
  }

  // Corazón animado y clicable
  return (
    <div className={`relative inline-block ${className}`}>
      <button
        onClick={() => setKiss(true)}
        className="text-5xl transition-transform duration-300 ease-in-out hover:scale-125 select-none"
        aria-label="Corazón"
        type="button"
      >
        💖
      </button>

      {kiss && (
        <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-4 text-3xl animate-float-up select-none">
          💋
        </span>
      )}
    </div>
  );
}
