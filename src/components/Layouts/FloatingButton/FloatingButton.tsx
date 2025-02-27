
"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

export default function PatrimonioModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
      <button
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-cyan-700 text-white text-sm font-medium py-3 px-5 rounded-full shadow-lg hover:bg-cyan-800 focus:ring-2 focus:ring-gray-400 focus:outline-none dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-gray-600"
        onClick={() => setIsModalOpen(true)}
      >
        <FaPlus className="w-4 h-4" />
        Nuevo
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-lg">
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">ID</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-400 focus:border-gray-400 dark:bg-gray-700 dark:text-white"
                    defaultValue="003265"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Resolución</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-400 focus:border-gray-400 dark:bg-gray-700 dark:text-white"
                    defaultValue="19"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Anexo</label>
                  <select className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-400 focus:border-gray-400 dark:bg-gray-700 dark:text-white">
                    <option>Anexo A</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sub Dependencia</label>
                  <select className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-400 focus:border-gray-400 dark:bg-gray-700 dark:text-white">
                    <option>Sub A1</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Estado</label>
                  <select className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-400 focus:border-gray-400 dark:bg-gray-700 dark:text-white">
                    <option>Bueno</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Imagen</label>
                  <input
                    type="file"
                    className="mt-1 block w-full text-sm text-gray-900 dark:text-gray-300 border rounded-lg shadow-sm focus:ring-gray-400 focus:border-gray-400"
                    onChange={handleImageChange}
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
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Descripción</label>
                <textarea
                  rows={3}
                  className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-400 focus:border-gray-400 dark:bg-gray-700 dark:text-white"
                  placeholder="Ingrese la descripción del patrimonio"
                ></textarea>
              </div>

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