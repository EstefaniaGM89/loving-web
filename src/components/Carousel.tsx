import Image from 'next/image';
import { useEffect, useState } from 'react';

const images = [
  "/images/foto1.jpg",
  "/images/foto2.jpg",
  "/images/foto3.jpg",
  "/images/foto4.jpg",
  "/images/foto5.jpg",
  "/images/foto6.jpg",
  "/images/foto7.jpg",
  "/images/foto8.jpg",
  "/images/foto9.jpg",
  "/images/foto10.jpg",
  "/images/foto11.jpg",
  "/images/foto12.jpg",
  "/images/foto13.jpg",
  "/images/foto14.jpg",
  "/images/foto15.jpg",
  "/images/foto16.jpg",
];

export default function Carousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto mt-10 relative">
      <div className="overflow-hidden rounded-xl shadow-lg">
        <Image
          src={images[index]}
          alt={`Foto ${index + 1}`}
          width={800}
          height={600}
          className="object-cover w-full h-auto transition-all duration-1000 ease-in-out"
        />
      </div>
    </div>
  );
}
