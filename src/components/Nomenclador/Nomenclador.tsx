
"use client";
import React, { useState } from "react";

interface Rubro {
  id_rubro: number;
  nombre: string;
}

interface Clase {
  id_rubro: number;
  id_clase: number;
  descripcion: string;
}

interface NomencladorProps {
  rubros: Rubro[];
  clases: Clase[];
  onSave: (seleccion: { rubro: Rubro; clase: Clase }) => void;
  onClose: () => void;
}

export default function Nomenclador({
  rubros = [],
  clases = [],
  onSave,
  onClose,
}: NomencladorProps) {
  // Estados de búsqueda (uno para rubros y otro para clases)
  const [rubroSearch, setRubroSearch] = useState("");
  const [claseSearch, setClaseSearch] = useState("");

  // Estados de selección
  const [selectedRubro, setSelectedRubro] = useState<Rubro | null>(null);
  const [selectedClase, setSelectedClase] = useState<Clase | null>(null);

  // Filtrado de Rubros por el texto ingresado
  const filteredRubros = rubros.filter((r) =>
    r.nombre.toLowerCase().includes(rubroSearch.toLowerCase())
  );

  // Filtrado de Clases: solo se muestran las que coincidan con el Rubro seleccionado
  // y también se filtra por la descripción según claseSearch.
  const filteredClases = clases
    .filter((c) => (selectedRubro ? c.id_rubro === selectedRubro.id_rubro : false))
    .filter((c) => c.descripcion.toLowerCase().includes(claseSearch.toLowerCase()));

  // Maneja la selección de un Rubro y limpia la clase seleccionada
  const handleSelectRubro = (r: Rubro) => {
    setSelectedRubro(r);
    setSelectedClase(null); // Reiniciar selección de clase al cambiar de rubro
  };

  // Maneja la selección de una Clase
  const handleSelectClase = (c: Clase) => {
    setSelectedClase(c);
  };

  // Maneja la acción de "Guardar"
  const handleGuardar = () => {
    if (selectedRubro && selectedClase) {
      onSave({ rubro: selectedRubro, clase: selectedClase });
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl relative">
        {/* Botón de cierre */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Seleccionar Rubro y Clase</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* BLOQUE IZQUIERDO: LISTA DE RUBROS */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Buscar Rubro:
              </label>
              <input
                type="text"
                placeholder="Ej. 'Maquinaria'"
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                value={rubroSearch}
                onChange={(e) => setRubroSearch(e.target.value)}
              />
              <div className="max-h-64 overflow-y-auto border rounded">
                <table className="min-w-full text-sm text-left text-gray-700">
                  <thead className="bg-gray-100 text-gray-700 uppercase text-xs sticky top-0">
                    <tr>
                      <th className="px-4 py-2">ID Rubro</th>
                      <th className="px-4 py-2">Nombre</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRubros.map((item) => (
                      <tr
                        key={item.id_rubro}
                        onClick={() => handleSelectRubro(item)}
                        className={`cursor-pointer ${
                          selectedRubro && selectedRubro.id_rubro === item.id_rubro
                            ? "bg-blue-100"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <td className="px-4 py-2">{item.id_rubro}</td>
                        <td className="px-4 py-2">{item.nombre}</td>
                      </tr>
                    ))}
                    {filteredRubros.length === 0 && (
                      <tr>
                        <td colSpan={2} className="px-4 py-2 text-center text-gray-500">
                          No se encontraron rubros.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* BLOQUE DERECHO: LISTA DE CLASES (DEPENDE DEL RUBRO SELECCIONADO) */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Buscar Clase:
              </label>
              <input
                type="text"
                placeholder="Ej. 'Impresora'"
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                value={claseSearch}
                onChange={(e) => setClaseSearch(e.target.value)}
                disabled={!selectedRubro} // Deshabilitar mientras no haya rubro seleccionado
              />
              <div className="max-h-64 overflow-y-auto border rounded">
                <table className="min-w-full text-sm text-left text-gray-700">
                  <thead className="bg-gray-100 text-gray-700 uppercase text-xs sticky top-0">
                    <tr>
                      <th className="px-4 py-2">ID Clase</th>
                      <th className="px-4 py-2">Descripción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClases.map((item) => (
                      <tr
                        key={`${item.id_rubro}-${item.id_clase}`}
                        onClick={() => handleSelectClase(item)}
                        className={`cursor-pointer ${
                          selectedClase &&
                          selectedClase.id_rubro === item.id_rubro &&
                          selectedClase.id_clase === item.id_clase
                            ? "bg-blue-100"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <td className="px-4 py-2">{item.id_clase}</td>
                        <td className="px-4 py-2">{item.descripcion}</td>
                      </tr>
                    ))}
                    {/* Aviso si no hay clases (o si el rubro no está seleccionado) */}
                    {selectedRubro && filteredClases.length === 0 && (
                      <tr>
                        <td colSpan={2} className="px-4 py-2 text-center text-gray-500">
                          No se encontraron clases para el rubro seleccionado.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Botón Guardar */}
          <div className="mt-6 text-right">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              onClick={handleGuardar}
              // Deshabilitamos mientras no haya Rubro y Clase seleccionados
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

