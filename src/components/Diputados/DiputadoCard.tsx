
import Image from "next/image";

interface DiputadoCardProps {
  nombre: string;
  departamento: string;
  partido: string;
  foto?: string;
}

export default function DiputadoCard({
  nombre,
  departamento,
  partido,
  foto,
}: DiputadoCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 flex flex-col items-center text-center border border-gray-200 dark:border-gray-600">
      {foto && (
        <div className="w-20 h-20 mb-2 rounded-full overflow-hidden bg-gray-300 dark:bg-gray-600">
          <Image
            src={foto}
            alt={`Foto de ${nombre}`}
            width={80}
            height={80}
            className="object-cover w-full h-full"
          />
        </div>
      )}
      <p className="font-semibold text-sm text-gray-900 dark:text-white">{nombre}</p>
      <p className="text-xs text-gray-500 dark:text-gray-300">{departamento}</p>
      <p className="text-xs text-gray-400 dark:text-gray-400 italic">{partido}</p>
    </div>
  );
}

