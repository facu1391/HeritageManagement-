"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FiCalendar } from "react-icons/fi";
import { FaIdBadge, FaWrench, FaRegCommentDots } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { obtenerAnexos, obtenerSubdependencias } from "@/services/anexosService";
import { FormularioPatrimonio, Anexo, Subdependencia } from "@/types/types";

interface Props {
  modo: "crear" | "editar";
  initialData?: FormularioPatrimonio;
  onSubmit: (data: FormularioPatrimonio) => void;
  onCancel: () => void;
  onDelete?: () => void;
  loading?: boolean;
}

export default function PatrimonioForm({
  modo,
  initialData,
  onSubmit,
  onCancel,
  loading,
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
    if (initialData) {
      setForm((prev) => ({
        ...prev,
        ...initialData,
        resolucionNumero: initialData.resolucionNumero || "",
        resolucionTipo: initialData.resolucionTipo || "",
        opciones: {
          ...prev.opciones,
          ...initialData.opciones,
        },
      }));
      setSelectedImage(initialData.foto_url || null);
    }
  }, [initialData]);

  const handleInput = (key: keyof FormularioPatrimonio, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheckbox = (key: keyof FormularioPatrimonio["opciones"]) => {
    setForm((prev) => ({
      ...prev,
      opciones: {
        ...prev.opciones,
        [key]: !prev.opciones[key],
      },
    }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("foto", file);

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/uploads`, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Error al subir imagen");

        const data = await res.json();
        setSelectedImage(data.url);
        handleInput("foto_url", data.url);
        toast.success("Imagen subida correctamente");
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Error al subir imagen");
        }
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <FaIdBadge className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            value={form.id}
            disabled={modo === "editar"}
            onChange={(e) => handleInput("id", e.target.value)}
            placeholder="ID"
            className="w-full p-2 pl-10 text-sm border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
          />
        </div>

        <select
          value={form.anexo}
          onChange={(e) => handleInput("anexo", e.target.value)}
          className="w-full p-2 text-sm border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
        >
          <option value="">Seleccionar Anexo</option>
          {anexos.map((a) => (
            <option key={a.id} value={a.id}>
              {a.nombre}
            </option>
          ))}
        </select>

        <select
          value={form.subdependencia}
          onChange={(e) => handleInput("subdependencia", e.target.value)}
          className="w-full p-2 text-sm border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
        >
          <option value="">Seleccionar Subdependencia</option>
          {subdependencias.map((s) => (
            <option key={s.id} value={s.id}>
              {s.nombre}
            </option>
          ))}
        </select>

        <select
          value={form.rubro}
          onChange={(e) => handleInput("rubro", e.target.value)}
          className="w-full p-2 text-sm border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
        >
          <option>Seleccionar Rubro</option>
          <option>Rubro A</option>
          <option>Rubro B</option>
        </select>

        <select
          value={form.clase}
          onChange={(e) => handleInput("clase", e.target.value)}
          className="w-full p-2 text-sm border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
        >
          <option>Seleccionar Clase</option>
          <option>Clase A</option>
          <option>Clase B</option>
        </select>
      </div>

      <input
        type="text"
        value={form.descripcion}
        onChange={(e) => handleInput("descripcion", e.target.value)}
        placeholder="Descripción"
        className="w-full p-2 text-sm border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
        <input
          type="number"
          value={form.resolucionNumero}
          onChange={(e) => handleInput("resolucionNumero", e.target.value)}
          placeholder="N° Resolución"
          className="w-full border-b border-gray-300 bg-transparent text-sm p-2 dark:text-white focus:outline-none focus:border-cyan-400"
        />
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-700 dark:text-gray-300">Tipo de Resolución</label>
          {["PSA", "Decreto", "Otro"].map((item) => (
            <label key={item} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <input
                type="radio"
                name="resolucionTipo"
                value={item}
                checked={form.resolucionTipo === item}
                onChange={() => handleInput("resolucionTipo", item)}
                className="accent-cyan-700"
              />
              {item}
            </label>
          ))}
        </div>
        <div className="relative w-full">
          <input
            type="date"
            value={form.fechaResolucion}
            onChange={(e) => handleInput("fechaResolucion", e.target.value)}
            className="w-full p-2 pl-10 text-sm border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
          />
          <FiCalendar className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
          <FaWrench /> Estado de Conservación
        </label>
        <div className="flex flex-wrap gap-4">
          {["Nuevo", "Bueno", "Regular", "Inútil"].map((item) => (
            <label key={item} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <input
                type="radio"
                name="estado"
                value={item}
                checked={form.estado === item}
                onChange={() => handleInput("estado", item)}
                className="accent-cyan-700"
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Marcar opciones</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {[
            { key: "noDado", label: "No dado" },
            { key: "reparacion", label: "Reparación" },
            { key: "paraBaja", label: "Para baja" },
            { key: "faltante", label: "Faltante" },
            { key: "sobrante", label: "Sobrante" },
            { key: "etiqueta", label: "Problema etiqueta" },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={form.opciones[key as keyof typeof form.opciones]}
                onChange={() => handleCheckbox(key as keyof typeof form.opciones)}
                className="accent-cyan-700"
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
          <FaRegCommentDots /> Comentarios
        </label>
        <textarea
          rows={3}
          value={form.comentarios}
          onChange={(e) => handleInput("comentarios", e.target.value)}
          placeholder="Comentarios"
          className="w-full p-2 text-sm border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Foto del mobiliario</label>
        <div className="relative w-full border-2 border-dashed border-gray-300 dark:border-gray-500 rounded-lg p-4 flex flex-col items-center justify-center text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <span className="text-cyan-700 font-medium underline">Subir imagen</span> o arrastrar y soltar
          </p>
          <input type="file" onChange={handleImageChange} className="absolute opacity-0 w-full h-full cursor-pointer" />
        </div>
        {selectedImage && (
          <div className="mt-3 flex justify-center">
            <div className="relative w-32 h-32">
              <Image
                src={selectedImage}
                alt="Vista previa"
                fill
                className="rounded-lg shadow object-cover"
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 rounded-lg dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50"
        >
          {loading ? "Guardando..." : modo === "editar" ? "Guardar cambios" : "Crear registro"}
        </button>
      </div>
    </form>
  );
}
