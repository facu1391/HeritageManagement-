
"use client";

import { Wrapper } from "@/components";
import PatrimonioForm from "@/components/Forms/PatrimonioForm";
import { createMobiliario } from "@/services/mobiliarioService";
import { FormularioPatrimonio } from "@/types/types";
import { toast, Toaster } from "react-hot-toast";

export default function CrearPatrimonioPage() {
  const handleSubmit = async (form: FormularioPatrimonio) => {
    try {
      const payload = {
        id: form.id,
        ubicacion_id: Number(form.subdependencia),
        clase_bien_id: form.id_clase,
        rubro_id: form.id_rubro,
        descripcion: form.descripcion,
        resolucion_numero: form.resolucionNumero,
        resolucion_tipo: form.resolucionTipo,
        fecha_resolucion: form.fechaResolucion,
        estado_conservacion: form.estado,
        no_dado: form.opciones.noDado,
        para_reparacion: form.opciones.reparacion,
        para_baja: form.opciones.paraBaja,
        faltante: form.opciones.faltante,
        sobrante: form.opciones.sobrante,
        problema_etiqueta: form.opciones.etiqueta,
        comentarios: form.comentarios,
        foto_url: form.foto_url,
      };

      await createMobiliario(payload);
      toast.success("Registro creado correctamente.");
    } catch {
      toast.error("Error al crear el mobiliario");
    }
  };

  return (
    <Wrapper>
      <main className="min-h-screen px-4 py-8">
        <Toaster />
        <h1 className="text-2xl font-bold text-center mb-6">
          Registrar nuevo mobiliario
        </h1>
        <PatrimonioForm
          modo="crear"
          onSubmit={handleSubmit}
          onCancel={() => {}}
          resetOnSuccess
        />
      </main>
    </Wrapper>
  );
}
