
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
  const [filtered, setFiltered] = useState<Mobiliario[]>([]);
  const [selected, setSelected] = useState<Mobiliario | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await obtenerMobiliario();
        const filtrados = data.filter(
          (item) => item.subdependencia?.toLowerCase() === nombre.toLowerCase()
        );
        setMobiliarios(filtrados);
        setFiltered(filtrados);
      } catch (error) {
        console.error("Error al obtener mobiliario", error);
      }
    };
    fetchData();
  }, [nombre]);

  useEffect(() => {
    const term = search.toLowerCase();
    setFiltered(
      mobiliarios.filter(
        (item) =>
          item.id.toLowerCase().includes(term) ||
          item.descripcion?.toLowerCase().includes(term)
      )
    );
  }, [search, mobiliarios]);

  return (
    <main className="min-h-screen px-6 py-10 bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="sticky top-0 z-40 bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-4">
          <h1 className="text-center text-3xl md:text-4xl font-extrabold text-blue-900 dark:text-white pt-4">
            {nombre}
          </h1>

          <div className="flex justify-between items-center mt-4 mb-4 px-2">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg shadow transition-all duration-200 hover:scale-105"
            >
              ← Volver
            </button>

            <input
              type="text"
              placeholder="Buscar por ID o descripción"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-md px-4 py-2 rounded-lg shadow border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-1 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">
              Inventario
            </h2>
            <div className="space-y-3">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelected(item)}
                  className={`cursor-pointer p-4 rounded-lg shadow text-sm transition-all border hover:shadow-md ${
                    selected?.id === item.id
                      ? "bg-blue-100 dark:bg-blue-700 border-blue-400"
                      : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600"
                  }`}
                >
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {item.descripcion || "Sin descripción"}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-xs">
                    ID: {item.id}
                  </p>
                </div>
              ))}
              {filtered.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400">No hay resultados.</p>
              )}
            </div>
          </div>

          <div className="col-span-2 sticky top-[100px] self-start">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">
              Detalle
            </h2>
            {selected ? (
              <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <p><strong>ID:</strong> {selected.id}</p>
                  <p><strong>Anexo:</strong> {selected.anexo}</p>
                  <p><strong>Subdependencia:</strong> {selected.subdependencia}</p>
                  <p><strong>Descripción:</strong> {selected.descripcion || "—"}</p>
                  <p><strong>Resolución:</strong> {selected.resolucion || "—"}</p>
                  <p><strong>Fecha Resolución:</strong> {selected.fecha_resolucion || "—"}</p>
                  <p><strong>Estado:</strong> {selected.estado_conservacion || "—"}</p>
                  <p><strong>Comentarios:</strong> {selected.comentarios || "—"}</p>
                  <p><strong>Faltante:</strong> {selected.faltante ? "Sí" : "No"}</p>
                  <p><strong>No Dado:</strong> {selected.no_dado ? "Sí" : "No"}</p>
                  <p><strong>Para Baja:</strong> {selected.para_baja ? "Sí" : "No"}</p>
                  <p><strong>Para Reparación:</strong> {selected.para_reparacion ? "Sí" : "No"}</p>
                  <p><strong>Etiqueta con Problema:</strong> {selected.problema_etiqueta ? "Sí" : "No"}</p>
                  <p><strong>Sobrante:</strong> {selected.sobrante ? "Sí" : "No"}</p>
                  <p><strong>Ubicación ID:</strong> {selected.ubicacion_id}</p>
                  <p><strong>Creado:</strong> {new Date(selected.fecha_creacion).toLocaleString()}</p>
                  <p><strong>Actualizado:</strong> {new Date(selected.fecha_actualizacion).toLocaleString()}</p>
                </div>
                <div className="w-full h-64 rounded border border-gray-300 dark:border-gray-600 overflow-hidden flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                  {selected.foto_url ? (
                    <img
                      src={selected.foto_url}
                      alt="Foto del mobiliario"
                      className="object-contain max-h-full"
                    />
                  ) : (
                    <span className="text-gray-400 dark:text-gray-300">Sin imagen</span>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">Selecciona un mobiliario para ver los detalles.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}