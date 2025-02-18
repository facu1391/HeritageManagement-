
import Image from "next/image";

interface CardProps {
  title: string;
  imageSrc: string;
  description: string;
}

export const Card = ({ title, imageSrc, description }: CardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 w-80 text-center">
      <Image src={imageSrc} alt={title} width={150} height={150} className="mx-auto rounded-lg" />
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mt-2">{title}</h2>
      <p className="text-gray-600 dark:text-gray-300 mt-1">{description}</p>
    </div>
  );
};