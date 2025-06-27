
// src/app/patrimonio/editar/[id]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Wrapper } from "@/components";
import { toast, Toaster } from "react-hot-toast";
import { editarMobiliario, obtenerMobiliarioPorId } from "@/services/mobiliarioService";
import { obtenerAnexos, obtenerSubdependencias } from "@/services/anexosService";
import { FormularioPatrimonio, Anexo, Subdependencia } from "@/types/types";
import PatrimonioForm from "@/components/Forms/PatrimonioForm";

export default function EditarMobiliarioPage() {
  const [initialData, setInitialData] = useState<FormularioPatrimonio | null>(null);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const id = params?.id?.toString();

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await obtenerMobiliarioPorId(id);
        const resolMatch = data.resolucion?.match(/Resol Nº(\S+)\s*(.*)/) || [];
        const resolucionNumero = resolMatch[1] || "";
        const resolucionTipo = resolMatch[2] || "";

        const anexos: Anexo[] = await obtenerAnexos();
        const anexoEncontrado = anexos.find((a) => a.nombre === data.anexo);

        let subdependenciaEncontradaId = "";
        if (anexoEncontrado) {
          const subdependencias: Subdependencia[] = await obtenerSubdependencias(anexoEncontrado.id);
          const subdepEncontrada = subdependencias.find((s) => s.nombre === data.subdependencia);
          subdependenciaEncontradaId = subdepEncontrada ? subdepEncontrada.id.toString() : "";
        }

        setInitialData({
          id: data.id,
          rubro: data.rubro || "",
          clase: data.clase_bien || "",
          id_rubro: data.id_rubro || undefined,
          id_clase: data.id_clase || undefined,
          anexo: anexoEncontrado ? anexoEncontrado.id.toString() : "",
          subdependencia: subdependenciaEncontradaId,
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
      } catch {
        toast.error("Error al cargar el mobiliario");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (form: FormularioPatrimonio) => {
    try {
      setLoading(true);
      await editarMobiliario(form.id, {
        ubicacion_id: Number(form.subdependencia),
        clase_bien_id: form.id_clase,
        rubro_id: form.id_rubro,
        descripcion: form.descripcion,
        resolucion_numero: form.resolucionNumero,
        resolucion_tipo: form.resolucionTipo,
        fecha_resolucion: form.fechaResolucion,
        estado_conservacion: form.estado,
        comentarios: form.comentarios,
        foto_url: form.foto_url,
        no_dado: form.opciones.noDado,
        para_reparacion: form.opciones.reparacion,
        para_baja: form.opciones.paraBaja,
        faltante: form.opciones.faltante,
        sobrante: form.opciones.sobrante,
        problema_etiqueta: form.opciones.etiqueta,
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
