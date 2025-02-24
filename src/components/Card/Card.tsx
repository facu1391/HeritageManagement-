
import Image, { StaticImageData } from "next/image";

interface CardProps {
  title: string;
  imageSrc: string | StaticImageData;
  description: string;
}

export const Card = ({ title, imageSrc, description }: CardProps) => {
  return (
    <div className="relative w-80 h-80 overflow-hidden rounded-lg shadow-md cursor-pointer transition-transform duration-300 hover:scale-105">
      <Image
        src={imageSrc}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-all duration-300 hover:brightness-125"
      />
      <div className="absolute inset-0 flex flex-col justify-end items-center p-4 bg-black bg-opacity-30">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <p className="text-white mt-2">{description}</p>
      </div>
    </div>
  );
};
