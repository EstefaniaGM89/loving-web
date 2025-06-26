import { useEffect, useState } from "react";

export default function HeartWithFirework({ className = "" }: { className?: string }) {
  const [kiss, setKiss] = useState(false);

  useEffect(() => {
    if (kiss) {
      const timeout = setTimeout(() => setKiss(false), 1200);
      return () => clearTimeout(timeout);
    }
  }, [kiss]);

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

