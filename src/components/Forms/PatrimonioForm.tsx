
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FiCalendar } from "react-icons/fi";
import { FaIdBadge, FaWrench, FaRegCommentDots } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { obtenerAnexos, obtenerSubdependencias } from "@/services/anexosService";
import { FormularioPatrimonio, Anexo, Subdependencia } from "@/types/types";
import { Nomenclador } from "@/components";

interface Props {
  modo: "crear" | "editar";
  initialData?: FormularioPatrimonio;
  onSubmit: (data: FormularioPatrimonio) => void;
  onCancel: () => void;
  loading?: boolean;
  resetOnSuccess?: boolean;
}

export default function PatrimonioForm({
  modo,
  initialData,
  onSubmit,
  loading,
  resetOnSuccess,
}: Props) {
  const [form, setForm] = useState<FormularioPatrimonio>({
    id: "",
    anexo: "",
    subdependencia: "",
    rubro: "",
    clase: "",
    descripcion: "",
    resolucionNumero: "",
    resolucionTipo: "",
    fechaResolucion: "",
    estado: "",
    comentarios: "",
    foto_url: "",
    opciones: {
      noDado: false,
      reparacion: false,
      paraBaja: false,
      faltante: false,
      sobrante: false,
      etiqueta: false,
    },
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [anexos, setAnexos] = useState<Anexo[]>([]);
  const [subdependencias, setSubdependencias] = useState<Subdependencia[]>([]);
  const [nomencladorOpen, setNomencladorOpen] = useState(false);

  useEffect(() => {
    obtenerAnexos().then(setAnexos);
  }, []);

  useEffect(() => {
    if (form.anexo) {
      obtenerSubdependencias(Number(form.anexo)).then(setSubdependencias);
    } else {
      setSubdependencias([]);
    }
  }, [form.anexo]);

  useEffect(() => {
    if (!initialData) return;
    setForm({
      id: initialData.id ?? "",
      anexo: initialData.anexo ?? "",
      subdependencia: initialData.subdependencia ?? "",
      rubro: initialData.rubro ?? "",
      clase: initialData.clase ?? "",
      descripcion: initialData.descripcion ?? "",
      resolucionNumero: initialData.resolucionNumero ?? "",
      resolucionTipo: initialData.resolucionTipo ?? "",
      fechaResolucion: initialData.fechaResolucion ?? "",
      estado: initialData.estado ?? "",
      comentarios: initialData.comentarios ?? "",
      foto_url: initialData.foto_url ?? "",
      opciones: {
        noDado: initialData.opciones.noDado ?? false,
        reparacion: initialData.opciones.reparacion ?? false,
        paraBaja: initialData.opciones.paraBaja ?? false,
        faltante: initialData.opciones.faltante ?? false,
        sobrante: initialData.opciones.sobrante ?? false,
        etiqueta: initialData.opciones.etiqueta ?? false,
      },
    });
    setSelectedImage(initialData.foto_url ?? null);
  }, [initialData]);

  const handleInput = (key: keyof FormularioPatrimonio, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleCheckbox = (key: keyof FormularioPatrimonio["opciones"]) => {
    setForm(prev => ({
      ...prev,
      opciones: { ...prev.opciones, [key]: !prev.opciones[key] },
    }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("foto", file);

    const base = process.env.NEXT_PUBLIC_API_BASE!;
    const uploadUrl = base.endsWith("/api") ? `${base}/uploads` : `${base}/api/uploads`;

    try {
      const res = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al subir imagen");
      setSelectedImage(data.url);
      handleInput("foto_url", data.url);
      toast.success("Imagen subida correctamente");
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modo === "editar" && (!form.anexo || !form.subdependencia)) {
      toast.error("Anexo y Subdependencia son obligatorios");
      return;
    }
    onSubmit(form);
    if (resetOnSuccess) {
      setForm({
        id: "",
        anexo: "",
        subdependencia: "",
        rubro: "",
        clase: "",
        descripcion: "",
        resolucionNumero: "",
        resolucionTipo: "",
        fechaResolucion: "",
        estado: "",
        comentarios: "",
        foto_url: "",
        opciones: {
          noDado: false,
          reparacion: false,
          paraBaja: false,
          faltante: false,
          sobrante: false,
          etiqueta: false,
        },
      });
      setSelectedImage(null);
    }
  };

  return (
    <form className="space-y-8 max-w-5xl mx-auto" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <FaIdBadge className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            value={form.id}
            disabled={modo === "editar"}
            onChange={e => handleInput("id", e.target.value)}
            placeholder="ID"
            className="w-full p-3 pl-10 text-sm border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
          />
        </div>

        <select
          value={form.anexo}
          onChange={e => handleInput("anexo", e.target.value)}
          className="w-full p-3 text-sm border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
        >
          <option value="">Seleccionar Anexo</option>
          {anexos.map(a => (
            <option key={a.id} value={a.id}>{a.nombre}</option>
          ))}
        </select>

        <select
          value={form.subdependencia}
          onChange={e => handleInput("subdependencia", e.target.value)}
          className="w-full p-3 text-sm border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
        >
          <option value="">Seleccionar Subdependencia</option>
          {subdependencias.map(s => (
            <option key={s.id} value={s.id}>{s.nombre}</option>
          ))}
        </select>

        <div className="col-span-1 sm:col-span-2 lg:col-span-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
             <p>
                <strong>Rubro:</strong>{" "}
                {form.rubro ? `${form.rubro} ` : "No seleccionado"}
                {form.id_rubro && <span className="text-sm text-black font-medium"> (ID: {form.id_rubro})</span>}
              </p>
              <p>
                <strong>Clase:</strong>{" "}
                {form.clase ? `${form.clase} ` : "No seleccionada"}
                {form.id_clase && <span className="text-sm text-black font-medium"> (ID: {form.id_clase})</span>}
              </p>
          </div>
          <button
            type="button"
            onClick={() => setNomencladorOpen(true)}
            className="px-4 py-2 bg-cyan-700 text-white rounded-md hover:bg-cyan-800 dark:bg-cyan-600 dark:hover:bg-cyan-700 transition"
          >
            Nomenclador
          </button>
        </div>
      </div>

      <input
        type="text"
        value={form.descripcion}
        onChange={e => handleInput("descripcion", e.target.value)}
        placeholder="Descripción"
        className="w-full p-3 text-sm border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        <input
          type="number"
          value={form.resolucionNumero}
          onChange={e => handleInput("resolucionNumero", e.target.value)}
          placeholder="N° Resolución"
          className="w-full border-b border-gray-300 bg-transparent text-sm p-3 dark:text-white focus:outline-none focus:border-indigo-500"
        />
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-700 dark:text-gray-300">Tipo de Resolución</label>
          {["PSA", "Decreto", "Otro"].map(item => (
            <label key={item} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <input
                type="radio"
                name="resolucionTipo"
                value={item}
                checked={form.resolucionTipo === item}
                onChange={() => handleInput("resolucionTipo", item)}
                className="accent-indigo-600"
              />
              {item}
            </label>
          ))}
        </div>
        <div className="relative w-full">
          <input
            type="date"
            value={form.fechaResolucion}
            onChange={e => handleInput("fechaResolucion", e.target.value)}
            className="w-full p-3 pl-10 text-sm border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
          />
          <FiCalendar className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
          <FaWrench /> Estado de Conservación
        </label>
        <div className="flex flex-wrap gap-6">
          {["Nuevo", "Bueno", "Regular", "Inútil"].map(item => (
            <label key={item} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <input
                type="radio"
                name="estado"
                value={item}
                checked={form.estado === item}
                onChange={() => handleInput("estado", item)}
                className="accent-indigo-600"
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Marcar opciones
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {["noDado", "reparacion", "paraBaja", "faltante", "sobrante", "etiqueta"].map(key => (
            <label key={key} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={form.opciones[key as keyof typeof form.opciones]}
                onChange={() => handleCheckbox(key as keyof typeof form.opciones)}
                className="accent-indigo-600"
              />
              {{
                noDado: "No dado",
                reparacion: "Reparación",
                paraBaja: "Para baja",
                faltante: "Faltante",
                sobrante: "Sobrante",
                etiqueta: "Problema etiqueta",
              }[key as keyof typeof form.opciones]}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
          <FaRegCommentDots /> Comentarios
        </label>
        <textarea
          rows={3}
          value={form.comentarios}
          onChange={e => handleInput("comentarios", e.target.value)}
          placeholder="Comentarios"
          className="w-full p-3 text-sm border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div className="mt-8 relative w-full border-2 border-dashed border-gray-300 dark:border-gray-500 rounded-lg p-6 flex items-center justify-center text-center">
        {selectedImage ? (
          <div className="relative w-40 h-40">
            <Image src={selectedImage} alt="Vista previa" fill className="rounded-lg object-cover" />
          </div>
        ) : (
          <div className="space-y-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="text-indigo-600 font-medium underline">Subir imagen</span> o arrastrar y soltar
            </p>
          </div>
        )}
        <input
          type="file"
          onChange={handleImageChange}
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50"
        >
          {loading ? "Guardando..." : modo === "editar" ? "Guardar cambios" : "Crear registro"}
        </button>
      </div>

      {nomencladorOpen && (
        <Nomenclador
          onSave={sel => {
            setForm(prev => ({
              ...prev,
              rubro: sel.rubro.nombre,
              clase: sel.clase.descripcion,
              id_rubro: sel.rubro.id_rubro, // 👈 agregado
              id_clase: sel.clase.id_clase, // 👈 agregado
            }));
            setNomencladorOpen(false);
          }}
          onClose={() => setNomencladorOpen(false)}
        />
      )}
    </form>
  );
}
