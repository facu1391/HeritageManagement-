
"use client";

import { useEffect, useState } from "react";
import { obtenerSubdependencias } from "@/services/anexosService";
import { useRouter } from "next/navigation";

export default function AnexoDalmacioVelez() {
  const [subdependencias, setSubdependencias] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchSubdependencias = async () => {
      try {
        const data = await obtenerSubdependencias(900);
        setSubdependencias(data.map((item: { nombre: string }) => item.nombre));
      } catch (error) {
        console.error("Error al obtener subdependencias", error);
      }
    };

    fetchSubdependencias();
  }, []);

  return (
    <main className="min-h-screen px-6 py-10 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-center text-3xl font-bold text-gray-800 dark:text-white mb-10">
          900 ANEXO VIII : DALMACIO VELEZ 7655
        </h1>

        <button
          onClick={() => router.push("/Anexos")}
          className="mb-6 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        >
          ← Regresar a Anexos
        </button>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Mapa */}
          <div className="w-full h-[400px] rounded-lg overflow-hidden shadow">
            <iframe
              title="Mapa Dalmacio Velez"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3545.964701106881!2d-66.86055158498174!3d-29.414737782110206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96834ddc66bdf97f%3A0xf780582d4b00c3e1!2sDalmacio%20V%C3%A9lez%20765%2C%20La%20Rioja!5e0!3m2!1ses!2sar!4v1714916644923!5m2!1ses!2sar"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Subdependencias */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">
              Subdependencias
            </h2>
            {subdependencias.length > 0 ? (
              <ul className="space-y-2">
                {subdependencias.map((nombre, index) => (
                  <li
                    key={index}
                    onClick={() => router.push(`/Subdependencia/${encodeURIComponent(nombre)}`)}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded text-gray-800 dark:text-white cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-600 transition"
                  >
                    {nombre}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                No hay subdependencias registradas.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
