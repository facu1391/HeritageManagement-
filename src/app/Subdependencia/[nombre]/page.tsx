
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { obtenerMobiliario } from "@/services/mobiliarioService";
import type { Mobiliario } from "@/types/types";

export default function MobiliarioPorSubdependencia() {
  const params = useParams();
  const router = useRouter();
  const nombre = decodeURIComponent(params.nombre as string);
  const [mobiliarios, setMobiliarios] = useState<Mobiliario[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await obtenerMobiliario();
        const filtrados = data.filter(
          (item) => item.subdependencia?.toLowerCase() === nombre.toLowerCase()
        );
        setMobiliarios(filtrados);
      } catch (error) {
        console.error("Error al obtener mobiliario", error);
      }
    };

    fetchData();
  }, [nombre]);

  return (
    <main className="min-h-screen px-6 py-10 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          {nombre}
        </h1>

        <button
          onClick={() => router.back()}
          className="mb-6 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        >
          ← Volver
        </button>

        {mobiliarios.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {mobiliarios.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {item.descripcion || "Sin descripción"}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>ID:</strong> {item.id}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Resolución:</strong> {item.resolucion || "—"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Estado:</strong> {item.estado_conservacion || "—"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center">
            No hay mobiliarios registrados para esta subdependencia.
          </p>
        )}
      </div>
    </main>
  );
}
