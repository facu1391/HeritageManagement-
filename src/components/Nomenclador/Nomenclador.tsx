// components/Nomenclador.tsx
"use client";
import React, { useEffect, useState } from "react";
import {
  obtenerRubros,
  obtenerClasesPorRubro,
  buscarClases,
  Rubro,
  Clase
} from "@/services/nomencladorService";

interface NomencladorProps {
  onSave: (seleccion: { rubro: Rubro; clase: Clase }) => void;
  onClose: () => void;
}

export default function Nomenclador({ onSave, onClose }: NomencladorProps) {
  const [rubros, setRubros] = useState<Rubro[]>([]);
  const [clases, setClases] = useState<Clase[]>([]);
  const [rubroSearch, setRubroSearch] = useState("");
  const [claseSearch, setClaseSearch] = useState("");
  const [selectedRubro, setSelectedRubro] = useState<Rubro | null>(null);
  const [selectedClase, setSelectedClase] = useState<Clase | null>(null);

  // Traer todos los rubros al montar
  useEffect(() => {
    obtenerRubros().then(setRubros).catch(console.error);
  }, []);

  // Cuando cambie de rubro, recargar sus clases
  useEffect(() => {
    if (selectedRubro) {
      obtenerClasesPorRubro(selectedRubro.id_rubro)
        .then(setClases)
        .catch(console.error);
    }
  }, [selectedRubro]);

  // Filtrado de rubros por nombre o por ID
  const filteredRubros = rubros.filter(r =>
    r.nombre.toLowerCase().includes(rubroSearch.toLowerCase()) ||
    r.id_rubro.toString().includes(rubroSearch)
  );

  // Filtrado de clases del rubro seleccionado, por descripción o por ID
  const filteredClases = clases
    .filter(c => (selectedRubro ? c.id_rubro === selectedRubro.id_rubro : true))
    .filter(c =>
      c.descripcion.toLowerCase().includes(claseSearch.toLowerCase()) ||
      c.id_clase.toString().includes(claseSearch)
    );

  const handleSelectRubro = (r: Rubro) => {
    setSelectedRubro(r);
    setSelectedClase(null);
  };

  const handleSelectClase = (c: Clase) => {
    setSelectedClase(c);
  };

  const handleBuscarClaseGlobal = async () => {
    if (!claseSearch) return;
    const resultados = await buscarClases(claseSearch);
    setClases(resultados);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
          onClick={onClose}
        >&times;</button>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Seleccionar Rubro y Clase</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Rubros */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Buscar Rubro:
              </label>
              <input
                type="text"
                placeholder="Filtrar por nombre o ID..."
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                value={rubroSearch}
                onChange={e => setRubroSearch(e.target.value)}
              />
              <div className="max-h-64 overflow-y-auto border rounded">
                <table className="min-w-full text-sm text-gray-700">
                  <thead className="bg-gray-100 uppercase text-xs sticky top-0">
                    <tr>
                      <th className="px-4 py-2">ID</th>
                      <th className="px-4 py-2">Nombre</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRubros.map(r => (
                      <tr
                        key={r.id_rubro}
                        onClick={() => handleSelectRubro(r)}
                        className={`cursor-pointer ${
                          selectedRubro?.id_rubro === r.id_rubro
                            ? "bg-blue-100"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <td className="px-4 py-2">{r.id_rubro}</td>
                        <td className="px-4 py-2">{r.nombre}</td>
                      </tr>
                    ))}
                    {!filteredRubros.length && (
                      <tr>
                        <td colSpan={2} className="px-4 py-2 text-center text-gray-500">
                          No hay rubros
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Clases */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Buscar Clase:
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Filtrar por descripción o ID..."
                  className="flex-1 p-2 border border-gray-300 rounded"
                  value={claseSearch}
                  onChange={e => setClaseSearch(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleBuscarClaseGlobal();
                    }
                  }}
                  disabled={!selectedRubro}
                />
                <button
                  className="px-4 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                  onClick={handleBuscarClaseGlobal}
                  disabled={!claseSearch}
                >
                  Buscar
                </button>
              </div>
              <div className="max-h-64 overflow-y-auto border rounded">
                <table className="min-w-full text-sm text-gray-700">
                  <thead className="bg-gray-100 uppercase text-xs sticky top-0">
                    <tr>
                      <th className="px-4 py-2">ID Clase</th>
                      <th className="px-4 py-2">Descripción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClases.map(c => (
                      <tr
                        key={c.id_clase}
                        onClick={() => handleSelectClase(c)}
                        className={`cursor-pointer ${
                          selectedClase?.id_clase === c.id_clase
                            ? "bg-blue-100"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <td className="px-4 py-2">{c.id_clase}</td>
                        <td className="px-4 py-2">{c.descripcion}</td>
                      </tr>
                    ))}
                    {!filteredClases.length && (
                      <tr>
                        <td colSpan={2} className="px-4 py-2 text-center text-gray-500">
                          {selectedRubro
                            ? "No hay clases para este rubro"
                            : "Seleccioná un rubro primero"}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mt-6 text-right">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              onClick={() => selectedRubro && selectedClase && onSave({ rubro: selectedRubro, clase: selectedClase })}
              disabled={!selectedRubro || !selectedClase}
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
