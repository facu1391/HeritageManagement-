
"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { toast, Toaster } from "react-hot-toast";

import { createPatrimonio } from "@/services/patrimonioService";
import PatrimonioForm from "@/components/Forms/PatrimonioForm";
import { FormularioPatrimonio, PatrimonioData } from "@/types/types";

export default function PatrimonioModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (form: FormularioPatrimonio) => {
    const payload: PatrimonioData = {
      id: form.id,
      ubicacion_id: parseInt(form.subdependencia),
      descripcion: form.descripcion,
      resolucion_numero: form.resolucionNumero,
      resolucion_tipo: form.resolucionTipo,
      fecha_resolucion: form.fechaResolucion,
      estado_conservacion: form.estado,
      no_dado: form.opciones.noDado,
      reparacion: form.opciones.reparacion,
      para_baja: form.opciones.paraBaja,
      faltante: form.opciones.faltante,
      sobrante: form.opciones.sobrante,
      etiqueta: form.opciones.etiqueta,
      comentarios: form.comentarios,
      foto_url: form.foto_url,
    };

    try {
      setLoading(true);
      await createPatrimonio(payload);
      toast.success("Registro guardado correctamente.");
      setIsModalOpen(false);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Error al guardar";
      toast.error("Error al guardar: " + msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <button
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-cyan-700 text-white text-sm font-medium py-3 px-5 rounded-full shadow-lg hover:bg-cyan-800 dark:bg-cyan-600 dark:hover:bg-cyan-700"
        onClick={() => setIsModalOpen(true)}
      >
        <FaPlus className="w-4 h-4" />
        Nuevo
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-4xl m-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Formulario de Patrimonio
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <IoMdClose size={22} />
              </button>
            </div>

            <PatrimonioForm
              modo="crear"
              onSubmit={handleSubmit}
              onCancel={() => setIsModalOpen(false)}
              loading={loading}
            />
          </div>
        </div>
      )}
    </>
  );
}
