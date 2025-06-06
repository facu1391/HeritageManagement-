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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-600 w-full h-64 flex flex-col justify-between items-center p-4 text-center">
      <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-300 dark:bg-gray-600 mb-3">
        {foto && (
          <Image
            src={foto}
            alt={`Foto de ${nombre}`}
            width={80}
            height={80}
            className="object-cover w-full h-full"
          />
        )}
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <p className="font-semibold text-sm text-gray-900 dark:text-white break-words">
          {nombre}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-300">{departamento}</p>
        <p className="text-xs text-gray-400 dark:text-gray-400 italic">{partido}</p>
      </div>
    </div>
  );
}

