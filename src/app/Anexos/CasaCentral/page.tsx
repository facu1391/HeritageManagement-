
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { obtenerSubdependencias } from "@/services/anexosService";

interface Subdependencia {
  id: number;
  nombre: string;
}

export default function CasaCentral() {
  const [subdependencias, setSubdependencias] = useState<Subdependencia[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchSubdependencias = async () => {
      try {
        const data = await obtenerSubdependencias(901);
        const sinRecinto = data.filter((sub: Subdependencia) => sub.nombre.toLowerCase() !== "recinto");
        const ordenadas = sinRecinto.sort((a: Subdependencia, b: Subdependencia) => a.id - b.id);
        setSubdependencias(ordenadas);
      } catch (error) {
        console.error("Error al obtener subdependencias", error);
      }
    };

    fetchSubdependencias();
  }, []);

  return (
    <main className="min-h-screen px-6 py-10 bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-center text-3xl md:text-4xl font-extrabold text-blue-900 dark:text-white mb-10">
          901 CASA CENTRAL
        </h1>

        <div className="flex justify-start mb-8">
          <button
            onClick={() => router.push("/Anexos")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg shadow transition-all duration-200 hover:scale-105"
          >
            ← Regresar a Anexos
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Subdependencias */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 max-h-[500px] overflow-y-auto">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
              Subdependencias
            </h2>
            {subdependencias.length > 0 ? (
              <ul className="space-y-3">
                {subdependencias.map((sub) => (
                  <li
                    key={sub.id}
                    onClick={() => router.push(`/Subdependencia/${encodeURIComponent(sub.nombre)}`)}
                    className="px-4 py-3 bg-blue-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white font-medium cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    {sub.id} - {sub.nombre}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 italic">
                No hay subdependencias registradas.
              </p>
            )}
          </div>

          {/* Recinto */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
              Recinto
            </h2>
            <div
              onClick={() => router.push("/Subdependencia/Recinto")}
              className="px-4 py-3 bg-blue-100 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white font-medium cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow-md text-center"
            >
              Ver mobiliario del Recinto
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
