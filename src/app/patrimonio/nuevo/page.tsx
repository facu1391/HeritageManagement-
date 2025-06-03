
"use client";

import { useRouter } from "next/navigation";
import PatrimonioForm from "@/components/Forms/PatrimonioForm";
import { createPatrimonio } from "@/services/patrimonioService";
import { FormularioPatrimonio } from "@/types/types";
import { toast, Toaster } from "react-hot-toast";
import { Wrapper } from "@/components";

export default function CrearPatrimonioPage() {
  const router = useRouter();

  const handleSubmit = async (form: FormularioPatrimonio) => {
    try {
      const payload = {
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

      await createPatrimonio(payload);
      toast.success("Registro creado correctamente.");
      // No redirigimos más
    } catch (error) {
      toast.error("Error al crear el mobiliario");
    }
  };

  return (
    <Wrapper>
      <main className="min-h-screen px-4 py-8 bg-gray-50 dark:bg-gray-900">
        <Toaster />
        <h1 className="text-2xl font-bold text-center text-blue-900 dark:text-white mb-6">
          Registrar nuevo mobiliario
        </h1>
        <PatrimonioForm
          modo="crear"
          onSubmit={handleSubmit}
          onCancel={() => {}} // ya no redirige
          resetOnSuccess={true} // limpia el formulario
        />
      </main>
    </Wrapper>
  );
}
