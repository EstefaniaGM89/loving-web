import React, { useRef } from "react";

interface MagnetButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export default function MagnetButton({
  children,
  onClick,
  disabled = false,
  className = "",
}: MagnetButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  function handleMouseMove(e: React.MouseEvent) {
    if (!btnRef.current) return;

    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Mueve el botón hacia el cursor con un factor de 0.2 para que sea suave
    btnRef.current.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
  }

  function handleMouseLeave() {
    if (!btnRef.current) return;
    // Cuando el cursor sale, vuelve a la posición original
    btnRef.current.style.transform = "";
  }

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } transition-transform duration-200 focus:outline-none`}
    >
      {children}
    </button>
  );
}
