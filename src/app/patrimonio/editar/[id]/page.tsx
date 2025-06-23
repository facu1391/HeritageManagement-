
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Wrapper } from "@/components";
import { toast, Toaster } from "react-hot-toast";
import { editarMobiliario, obtenerMobiliarioPorId } from "@/services/mobiliarioService";
import { FormularioPatrimonio } from "@/types/types";
import PatrimonioForm from "@/components/Forms/PatrimonioForm";

export default function EditarMobiliarioPage() {
  const [initialData, setInitialData] = useState<FormularioPatrimonio | null>(null);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const id = params?.id?.toString();

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    obtenerMobiliarioPorId(id)
      .then((data) => {
        const resolMatch = data.resolucion?.match(/Resol Nº(\S+)\s*(.*)/) || [];
        const resolucionNumero = resolMatch[1] || "";
        const resolucionTipo = resolMatch[2] || "";

        setInitialData({
          id: data.id,
          rubro: data.rubro || "",
          clase: data.clase || "",
          id_rubro: data.id_rubro || undefined,
          id_clase: data.id_clase || undefined,
          anexo: data.anexo,
          subdependencia: data.subdependencia,
          descripcion: data.descripcion,
          resolucionNumero,
          resolucionTipo,
          fechaResolucion: data.fecha_resolucion ?? "",
          estado: data.estado_conservacion ?? "",
          comentarios: data.comentarios ?? "",
          foto_url: data.foto_url ?? "",
          opciones: {
            noDado: data.no_dado,
            reparacion: data.para_reparacion,
            paraBaja: data.para_baja,
            faltante: data.faltante,
            sobrante: data.sobrante,
            etiqueta: data.problema_etiqueta,
          },
        });
      })
      .catch(() => toast.error("Error al cargar el mobiliario"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (form: FormularioPatrimonio) => {
    try {
      setLoading(true);
      await editarMobiliario(form.id, {
        descripcion: form.descripcion,
        fecha_resolucion: form.fechaResolucion,
        estado_conservacion: form.estado,
        comentarios: form.comentarios,
        resolucion_numero: form.resolucionNumero,
        resolucion_tipo: form.resolucionTipo,
        foto_url: form.foto_url,
        no_dado: form.opciones.noDado,
        para_reparacion: form.opciones.reparacion,
        para_baja: form.opciones.paraBaja,
        faltante: form.opciones.faltante,
        sobrante: form.opciones.sobrante,
        etiqueta: form.opciones.etiqueta,
        id_clase: form.id_clase,
        id_rubro: form.id_rubro,
      });

      toast.success("Mobiliario actualizado correctamente");
    } catch {
      toast.error("Error al guardar los cambios");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <main className="max-w-5xl mx-auto py-8 px-4">
        <Toaster />
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-700">Editar Mobiliario</h1>
        </div>

        {initialData ? (
          <PatrimonioForm
            modo="editar"
            initialData={initialData}
            onSubmit={handleSubmit}
            onCancel={() => null}
            loading={loading}
          />
        ) : (
          <p className="text-gray-600 dark:text-gray-300">Cargando datos...</p>
        )}
      </main>
    </Wrapper>
  );
}
