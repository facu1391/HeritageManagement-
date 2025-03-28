
"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

export default function PatrimonioModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [estado, setEstado] = useState("");
  const [resolucionTipo, setResolucionTipo] = useState("");
  const [opciones, setOpciones] = useState({
    noDado: false,
    reparacion: false,
    paraBaja: false,
    faltante: false,
    sobrante: false,
    etiqueta: false,
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCheckbox = (name: string) => {
    setOpciones((prev) => ({
      ...prev,
      [name]: !prev[name as keyof typeof prev],
    }));
  };

  return (
    <>
      <button
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-cyan-700 text-white text-sm font-medium py-3 px-5 rounded-full shadow-lg hover:bg-cyan-800 focus:ring-2 focus:ring-gray-400 focus:outline-none dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-gray-600"
        onClick={() => setIsModalOpen(true)}
      >
        <FaPlus className="w-4 h-4" />
        Nuevo
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-5xl m-6">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Formulario de Patrimonio
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <IoMdClose size={20} />
              </button>
            </div>

            <form className="mt-4 space-y-4">
              {/* Primera fila: ID, Ubicación, Rubro y Clase */}
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">ID</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-400 focus:border-gray-400 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Ubicación</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-400 focus:border-gray-400 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Rubro</label>
                  <select className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-400 focus:border-gray-400 dark:bg-gray-700 dark:text-white">
                    <option>Seleccionar Rubro</option>
                    <option>Rubro A</option>
                    <option>Rubro B</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Clase</label>
                  <select className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-400 focus:border-gray-400 dark:bg-gray-700 dark:text-white">
                    <option>Seleccionar Clase</option>
                    <option>Clase A</option>
                    <option>Clase B</option>
                  </select>
                </div>
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Descripción</label>
                <input
                  type="text"
                  placeholder="Ingrese descripción"
                  className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-400 focus:border-gray-400 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Resolución y Fecha */}
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">N° Resolución</label>
                  <input
                    type="number"
                    className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-400 focus:border-gray-400 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tipo</label>
                  <div className="flex gap-2 mt-1">
                    {["PSA", "Decreto", "Otro"].map((item) => (
                      <label key={item} className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300">
                        <input
                          type="radio"
                          name="resolucionTipo"
                          value={item}
                          checked={resolucionTipo === item}
                          onChange={() => setResolucionTipo(item)}
                          className="accent-cyan-700"
                        />
                        {item}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Fecha Resolución</label>
                  <input
                    type="date"
                    className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-400 focus:border-gray-400 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              {/* Estado de conservación */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Estado de Conservación</label>
                <div className="flex flex-wrap gap-4">
                  {["Nuevo", "Bueno", "Regular", "Inútil", "Maso menos"].map((item) => (
                    <label key={item} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <input
                        type="radio"
                        name="estado"
                        value={item}
                        checked={estado === item}
                        onChange={() => setEstado(item)}
                        className="accent-cyan-700"
                      />
                      {item}
                    </label>
                  ))}
                </div>
              </div>

              {/* Marcar opciones */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Marcar opciones</label>
                <div className="grid grid-cols-3 gap-2">
                  {[ 
                    { name: "noDado", label: "Nro dado" },
                    { name: "reparacion", label: "P/Reparación" },
                    { name: "paraBaja", label: "Para baja" },
                    { name: "faltante", label: "Faltante" },
                    { name: "sobrante", label: "Sobrante" },
                    { name: "etiqueta", label: "Problema de etiqueta" },
                  ].map((opt) => (
                    <label key={opt.name} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <input
                        type="checkbox"
                        checked={opciones[opt.name as keyof typeof opciones]}
                        onChange={() => handleCheckbox(opt.name)}
                        className="accent-cyan-700"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Comentarios */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Comentarios</label>
                <textarea
                  rows={3}
                  className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-400 focus:border-gray-400 dark:bg-gray-700 dark:text-white"
                  placeholder="Ingrese comentarios"
                ></textarea>
              </div>

              {/* Foto */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Foto</label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="mt-1 block w-full text-sm text-gray-900 dark:text-gray-300 border rounded-lg shadow-sm focus:ring-gray-400 focus:border-gray-400"
                />
                {selectedImage && (
                  <div className="mt-3 flex justify-center">
                    <img
                      src={selectedImage}
                      alt="Vista previa"
                      className="w-32 h-32 object-cover rounded-lg shadow"
                    />
                  </div>
                )}
              </div>

              {/* Botones */}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 dark:bg-cyan-600 dark:hover:bg-cyan-700"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}