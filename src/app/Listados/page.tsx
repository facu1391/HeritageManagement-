
"use client";

/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Wrapper, ConfirmModal } from "@/components";
import {
  obtenerUltimosMobiliarios,
  eliminarMobiliario,
} from "@/services/mobiliarioService";
import { toast, Toaster } from "react-hot-toast";
import type { MobiliarioUltimo } from "@/types/types";

// Utilidad para parsear la cadena "Resol Nº123 PSA" → { numero, tipo }
function parseResol(res: string | null) {
  if (!res) return { numero: "", tipo: "" };
  const match = res.match(/Resol Nº(\S+)\s*(.*)/);
  return match
    ? { numero: match[1] || "", tipo: match[2] || "" }
    : { numero: "", tipo: "" };
}

export default function Listings() {
  /* ------------------------------------------------------------------ */
  /*  Estado                                                            */
  /* ------------------------------------------------------------------ */
  const [lista, setLista] = useState<MobiliarioUltimo[]>([]);
  const [selected, setSelected] = useState<MobiliarioUltimo | null>(null);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  /* ------------------------------------------------------------------ */
  /*  Cargar últimos 5 al montar                                         */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    obtenerUltimosMobiliarios()
      .then((data) => {
        // Normalizamos para tener una key "id" igual que el resto del código
        const normalizado = data.map((d) => ({
          ...d,
          id: d.id_mobiliario,
        }));
        setLista(normalizado);
        if (normalizado.length) setSelected(normalizado[0]);
      })
      .catch(() => toast.error("Error al cargar datos"))
      .finally(() => setLoading(false));
  }, []);

  /* ------------------------------------------------------------------ */
  /*  Filtro de búsqueda rápido                                           */
  /* ------------------------------------------------------------------ */
  const filtrados = useMemo(() => {
    const term = busqueda.toLowerCase();
    return lista.filter(
      (i) => i.descripcion.toLowerCase().includes(term) || i.id.toLowerCase().includes(term)
    );
  }, [lista, busqueda]);

  /* ------------------------------------------------------------------ */
  /*  Eliminar registro                                                   */
  /* ------------------------------------------------------------------ */
  const handleDelete = async () => {
    if (!selected) return;
    try {
      setDeleting(true);
      await eliminarMobiliario(selected.id);
      setLista((prev) => prev.filter((m) => m.id !== selected.id));
      setSelected(null);
      toast.success("Eliminado correctamente");
    } catch {
      toast.error("Error al eliminar");
    } finally {
      setDeleting(false);
      setShowConfirm(false);
    }
  };

  /* ------------------------------------------------------------------ */
  /*  Render                                                             */
  /* ------------------------------------------------------------------ */
  return (
    <Wrapper>
      <Toaster />
      <h1 className="text-3xl font-bold text-center mt-6 mb-8 text-blue-700">
         Gestión de Mobiliario
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Cargando...</p>
      ) : !lista.length ? (
        <p className="text-center text-gray-500">No hay registros</p>
      ) : (
        <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto">
          {/* Listado */}
          <div className="w-full md:w-1/2 bg-white dark:bg-gray-800 rounded-xl shadow p-4">
            <input
              placeholder="Buscar por ID o descripción"
              className="w-full p-2 mb-4 border rounded-md bg-gray-50 dark:bg-gray-700"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <ul className="space-y-2 max-h-[480px] overflow-y-auto">
              {filtrados.map((item) => (
                <li
                  key={item.id}
                  onClick={() => setSelected(item)}
                  className={`p-2 cursor-pointer rounded transition ${
                    /* highlight */ '${selected?.id === item.id ? "bg-blue-100 dark:bg-cyan-700" : "hover:bg-gray-100 dark:hover:bg-gray-700"}'
                  }`}
                >
                  <p className="font-medium text-gray-800 dark:text-white truncate">
                    {item.descripcion || "Sin descripción"}
                  </p>
                  <p className="text-xs text-gray-500">ID: {item.id}</p>
                </li>
              ))}
              {!filtrados.length && (
                <li className="text-center text-gray-500 text-sm">Sin resultados</li>
              )}
            </ul>
          </div>

          {/* Detalle */}
          <div className="w-full md:w-1/2 bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            {selected ? (
              <>
                <h2 className="text-lg font-semibold mb-4 text-blue-700">Detalle</h2>

                {/* Imagen */}
                <div className="flex justify-center mb-4">
                  {selected.foto_url ? (
                    <Image
                      src={selected.foto_url}
                      alt="Foto"
                      width={260}
                      height={260}
                      className="object-cover rounded-lg shadow"
                    />
                  ) : (
                    <div className="w-64 h-64 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-500 text-sm">
                      Sin foto
                    </div>
                  )}
                </div>

                {/* Datos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm text-gray-700 dark:text-gray-300">
                  <div><strong>ID:</strong> {selected.id}</div>
                  <div><strong>Clase:</strong> {selected.clase_bien || "—"}</div>
                  <div><strong>Rubro:</strong> {selected.rubro || "—"}</div>
                  <div><strong>Anexo:</strong> {selected.anexo}</div>
                  <div><strong>Subdependencia:</strong> {selected.subdependencia}</div>
                  <div className="sm:col-span-2"><strong>Descripción:</strong> {selected.descripcion}</div>
                  {(() => {
                    const { numero, tipo } = parseResol(selected.resolucion);
                    return (
                      <>
                        <div><strong>Resol Nº:</strong> {numero || "—"}</div>
                        <div><strong>Tipo:</strong> {tipo || "—"}</div>
                      </>
                    );
                  })()}
                  <div><strong>Estado:</strong> {selected.estado_conservacion || "—"}</div>
                  <div><strong>Fecha res.:</strong> {selected.fecha_resolucion || "—"}</div>
                </div>

                {/* Botones */}
                <div className="flex justify-end gap-4 mt-6">
                  <Link
                    href={`/patrimonio/editar/${selected.id}`}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600"
                  >
                    <FaEdit /> Editar
                  </Link>
                  <button
                    onClick={() => setShowConfirm(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
                  >
                    <FaTrash /> Eliminar
                  </button>
                </div>
              </>
            ) : (
              <p className="text-gray-500 text-center">Seleccioná un mobiliario.</p>
            )}
          </div>
        </div>
      )}

      {/* Modal eliminar */}
      <ConfirmModal
        isOpen={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        loading={deleting}
        title="¿Eliminar mobiliario?"
        message="Esta acción no se puede deshacer."
      />
    </Wrapper>
  );
}
