
"use client";

import { useEffect, useState } from "react";
import { obtenerSubdependencias } from "@/services/anexosService";
import { useRouter } from "next/navigation";

export default function Anexo1() {
  const [subdependencias, setSubdependencias] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchSubdependencias = async () => {
      try {
        const data = await obtenerSubdependencias(901); // ← Asegurate que este sea el ID correcto en tu base
        setSubdependencias(data.map((item: { nombre: string }) => item.nombre));
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
          901 ANEXO I : COPIAPÓ N° 110
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
          {/* Mapa */}
          <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg border border-blue-200 dark:border-gray-700">
            <iframe
              title="Mapa Copiapó 110"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3545.801224505802!2d-66.85000000000001!3d-29.417000000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96834ddb65b4abef%3A0x0!2sCopiap%C3%B3%20110%2C%20La%20Rioja!5e0!3m2!1ses-419!2sar!4v1715000000000!5m2!1ses-419!2sar"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Subdependencias */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
              Subdependencias
            </h2>
            {subdependencias.length > 0 ? (
              <ul className="space-y-3">
                {subdependencias.map((nombre, index) => (
                  <li
                    key={index}
                    onClick={() =>
                      router.push(`/Subdependencia/${encodeURIComponent(nombre)}`)
                    }
                    className="px-4 py-3 bg-blue-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white font-medium cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    {nombre}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 italic">
                No hay subdependencias registradas.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
