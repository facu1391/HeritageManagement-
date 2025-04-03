
"use client";

import { useEffect, useState } from "react";
import { Wrapper,  Modal} from "@/components";
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
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    obtenerMobiliario()
      .then((data) => {
        setMobiliario(data);
        if (data.length > 0) setSelected(data[0]);
      })
      .catch(() => console.error("Error al cargar datos"))
      .finally(() => setLoading(false));
  }, []);

  const filteredMobiliario = mobiliario
    .filter((item) => {
      const searchTerm = search.toLowerCase();
      return (
        item.descripcion.toLowerCase().includes(searchTerm) ||
        item.id.toLowerCase().includes(searchTerm)
      );
    })
    .slice(0, 10);

  return (
    <Wrapper>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-blue-700">Gestión de Mobiliario</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Visualización detallada de mobiliarios registrados
        </p>
      </div>

      {loading ? (
        <p className="text-center text-gray-600 dark:text-gray-300">Cargando...</p>
      ) : mobiliario.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">No hay registros</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Detalle */}
          <div className="col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col gap-4 max-w-md w-full mx-auto">
            <h2 className="text-lg font-semibold text-blue-700 border-b pb-2">Detalle</h2>
            {selected ? (
              <div className="flex flex-col gap-4">
                <div className="flex justify-center">
                  {selected.foto_url ? (
                    <img
                      src={selected.foto_url}
                      alt="Foto del mobiliario"
                      className="w-32 h-32 object-cover rounded-lg shadow"
                    />
                  ) : (
                    <div className="w-32 h-32 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg text-sm text-gray-500 dark:text-gray-300 shadow">
                      Sin foto
                    </div>
                  )}
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <p><strong>ID:</strong> {selected.id}</p>
                  <p><strong>Descripción:</strong> {selected.descripcion}</p>
                  <p><strong>Resolución:</strong> {selected.resolucion}</p>
                  <p><strong>Fecha:</strong> {selected.fecha_resolucion}</p>
                  <p><strong>Estado:</strong> {selected.estado_conservacion}</p>
                  <p><strong>Comentarios:</strong> {selected.comentarios}</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">Seleccione un mobiliario.</p>
            )}
          </div>

          {/* Listado */}
          <div className="col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow p-4 h-fit">
            <h2 className="text-lg font-semibold text-blue-700 border-b pb-2 mb-3">Listado</h2>
            <input
              type="text"
              placeholder="Buscar por ID o descripción"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 mb-3 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-sm"
            />
            <ul className="space-y-2 max-h-[500px] overflow-y-auto">
              {filteredMobiliario.map((item) => (
                <li
                  key={item.id}
                  onDoubleClick={() => {
                    setSelected(item);
                    setIsModalOpen(true);
                  }}
                  onClick={() => setSelected(item)}
                  className={`p-2 rounded-lg cursor-pointer transition ${
                    selected?.id === item.id
                      ? "bg-blue-100 dark:bg-cyan-700"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <p className="font-medium text-gray-800 dark:text-white">{item.descripcion || "Sin descripción"}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">ID: {item.id}</p>
                </li>
              ))}
              {filteredMobiliario.length === 0 && (
                <li className="text-center text-sm text-gray-500 dark:text-gray-400">No hay resultados</li>
              )}
            </ul>
          </div>
        </div>
      )}

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selected && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Detalle Completo</h2>
            <p><strong>ID:</strong> {selected.id}</p>
            <p><strong>Descripción:</strong> {selected.descripcion}</p>
            <p><strong>Resolución:</strong> {selected.resolucion}</p>
            <p><strong>Fecha Resolución:</strong> {selected.fecha_resolucion}</p>
            <p><strong>Estado:</strong> {selected.estado_conservacion}</p>
            <p><strong>Comentarios:</strong> {selected.comentarios}</p>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Cerrar
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Editar
              </button>
            </div>
          </div>
        )}
      </Modal>
    </Wrapper>
  );
}
