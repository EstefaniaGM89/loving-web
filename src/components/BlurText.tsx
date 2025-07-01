import { useEffect, useState } from "react";

type BlurTextProps = {
  text: string;
  duration?: number;
};

export default function BlurText({ text, duration = 120 }: BlurTextProps) {
  const [visibleText, setVisibleText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setVisibleText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, duration);
      return () => clearTimeout(timeout);
    }
  }, [index, text, duration]);

  return (
    <span className="text-5xl font-extrabold text-gray-800 whitespace-pre-wrap inline-block leading-tight">
      <span className="backdrop-blur-sm text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 via-pink-500 to-rose-500">
        {visibleText}
      </span>
      {index < text.length && (
        <span className="inline-block w-1 h-8 bg-gray-800 cursor-blink ml-1 align-bottom"></span>
      )}
    </span>
  );
}

