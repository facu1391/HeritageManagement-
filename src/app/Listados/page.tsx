
"use client";

import { useEffect, useState } from "react";
import { Wrapper } from "@/components";
import { obtenerMobiliario } from "@/services/mobiliarioService";

interface Mobiliario {
  id: string;
  descripcion: string;
  resolucion: string;
  fecha_resolucion: string | null;
  estado_conservacion: string;
  comentarios: string;
  foto_url: string;
}

export default function Listings() {
  const [mobiliario, setMobiliario] = useState<Mobiliario[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Mobiliario | null>(null);

  useEffect(() => {
    obtenerMobiliario()
      .then((data) => {
        setMobiliario(data);
        if (data.length > 0) setSelected(data[0]); // Mostrar primero
      })
      .catch(() => console.error("Error al cargar datos"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Wrapper>
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Gestión de Mobiliario</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Visualización detallada de mobiliarios registrados</p>
      </div>

      {loading ? (
        <p className="text-center text-gray-600 dark:text-gray-300">Cargando...</p>
      ) : mobiliario.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">No hay registros</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {/* Listado */}
          <div className="col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow p-4 h-fit">
            <h2 className="text-lg font-semibold mb-3 text-gray-700 dark:text-white">Listado</h2>
            <ul className="space-y-2">
              {mobiliario.map((item) => (
                <li
                  key={item.id}
                  onClick={() => setSelected(item)}
                  className={`p-2 rounded cursor-pointer ${
                    selected?.id === item.id
                      ? "bg-cyan-100 dark:bg-cyan-700"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <p className="font-medium text-gray-800 dark:text-white">{item.descripcion || "Sin descripción"}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">ID: {item.id}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Detalle */}
          <div className="col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            {selected ? (
              <>
                <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-white">Detalle</h2>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex justify-center md:justify-start">
                    {selected.foto_url ? (
                      <img
                        src={selected.foto_url}
                        alt="Foto del mobiliario"
                        className="w-40 h-40 object-cover rounded"
                      />
                    ) : (
                      <div className="w-40 h-40 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded text-sm text-gray-500 dark:text-gray-300">
                        Sin foto
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <p><strong>ID Patrimonio:</strong> {selected.id}</p>
                    <p><strong>Descripción:</strong> {selected.descripcion}</p>
                    <p><strong>Resolución:</strong> {selected.resolucion}</p>
                    <p><strong>Fecha Resolución:</strong> {selected.fecha_resolucion}</p>
                    <p><strong>Estado:</strong> {selected.estado_conservacion}</p>
                    <p><strong>Comentarios:</strong> {selected.comentarios}</p>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">Seleccione un mobiliario para ver los detalles.</p>
            )}
          </div>
        </div>
      )}
    </Wrapper>
  );
}
