
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { editarMobiliario } from "@/services/mobiliarioService";
import { FormularioPatrimonio } from "@/types/types";
import PatrimonioForm from "@/components/Forms/PatrimonioForm";
import { toast, Toaster } from "react-hot-toast";
import { Wrapper } from "@/components";

export default function EditarMobiliarioPage() {
  const router = useRouter();
  const [initialData, setInitialData] = useState<FormularioPatrimonio | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const dataString = localStorage.getItem("mobiliario-edicion");
    if (!dataString) {
      toast.error("No se encontraron datos para editar.");
      return;
    }

    try {
      const data = JSON.parse(dataString);
      const resolMatch = data.resolucion?.match(/Resol Nº(\S+)\s*(.*)/) || [];
      const resolucionNumero = resolMatch[1] || "";
      const resolucionTipo = resolMatch[2] || "";

      setInitialData({
        id: data.id,
        rubro: data.rubro || "",
        clase: data.clase || "",
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
    } catch {
      toast.error("Error al procesar los datos.");
    }
  }, []);

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
      });

      toast.success("Mobiliario actualizado correctamente");
      localStorage.removeItem("mobiliario-edicion");
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
          <button
            onClick={() => router.push("/Listados")}
            className="px-4 py-2 bg-gray-200 rounded-lg dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Volver al listado
          </button>
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
