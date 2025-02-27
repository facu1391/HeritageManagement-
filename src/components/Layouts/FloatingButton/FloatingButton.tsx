
"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa"; // Ícono de más
import { IoMdClose } from "react-icons/io"; // Ícono de cerrar

export default function FloatingButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Función para manejar la selección de imagen
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {/* Botón flotante */}
      <button
        className="fixed bottom-4 right-4 flex items-center gap-2 bg-purple-600 text-white text-sm font-medium py-3 px-5 rounded-full shadow-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-400 focus:outline-none"
        onClick={() => setIsModalOpen(true)}
      >
        <FaPlus className="w-4 h-4" />
        Nuevo
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
            {/* Header del Modal */}
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Agregar Nuevo Elemento
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <IoMdClose size={20} />
              </button>
            </div>

            {/* Formulario */}
            <form className="mt-4 space-y-4">
              {/* Subir Foto desde el celular */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Foto
                </label>
                <input
                  type="file"
                  accept="image/*" // Solo imágenes
                  capture="environment" // Activa la cámara trasera del celular
                  className="mt-1 block w-full text-sm text-gray-900 dark:text-gray-300 border rounded-lg shadow-sm focus:ring-purple-400 focus:border-purple-400"
                  onChange={handleImageChange}
                />
                
                {/* Vista previa de la imagen seleccionada */}
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

              {/* Descripción */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Descripción
                </label>
                <textarea
                  rows={3}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-purple-400 focus:border-purple-400 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  placeholder="Escribe una descripción..."
                ></textarea>
              </div>

              {/* Número de Oficina */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Número de Oficina
                </label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-purple-400 focus:border-purple-400 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  placeholder="Ejemplo: 101"
                />
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
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
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

{/* id, descripcion, resolucion,  */}