"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Wrapper, Modal, PatrimonioForm, ConfirmModal } from "@/components";
import {
  obtenerMobiliario,
  editarMobiliario,
  eliminarMobiliario,
} from "@/services/mobiliarioService";
import { toast, Toaster } from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import type { Mobiliario, FormData } from "@/types/types";
import useIsMobile from "@/hooks/useIsMobile";

function parseResolucion(resolucion: string | null) {
  if (!resolucion) return { resolucionNumero: "", resolucionTipo: "" };
  const regex = /Resol Nº(\S+)\s*(.*)/;
  const matches = resolucion.match(regex);
  if (matches) {
    let numero = matches[1];
    const tipo = matches[2];
    if (numero.toLowerCase() === "none") numero = "";
    return { resolucionNumero: numero, resolucionTipo: tipo };
  }
  return { resolucionNumero: "", resolucionTipo: "" };
}

export default function Listings() {
  const [mobiliario, setMobiliario] = useState<Mobiliario[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Mobiliario | null>(null);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const isMobile = useIsMobile();

  useEffect(() => {
    obtenerMobiliario()
      .then((data) => {
        setMobiliario(data);
        if (data.length > 0) setSelected(data[0]);
      })
      .catch(() => console.error("Error al cargar datos"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = mobiliario
    .filter((item) => {
      const term = search.toLowerCase();
      return (
        item.descripcion.toLowerCase().includes(term) ||
        item.id.toLowerCase().includes(term)
      );
    })
    .slice(0, 10);

  const handleEditSubmit = async (form: FormData) => {
    if (!selected) return;
    try {
      await editarMobiliario(selected.id, {
        descripcion: form.descripcion,
        fecha_resolucion: form.fechaResolucion,
        estado_conservacion: form.estado,
        comentarios: form.comentarios,
        resolucion_numero: form.resolucionNumero,
        resolucion_tipo: form.resolucionTipo,
      });
      setMobiliario((prev) =>
        prev.map((m) =>
          m.id === selected.id
            ? {
                ...m,
                descripcion: form.descripcion,
                fecha_resolucion: form.fechaResolucion,
                estado_conservacion: form.estado,
                comentarios: form.comentarios,
                resolucion_numero: form.resolucionNumero,
                resolucion_tipo: form.resolucionTipo,
                resolucion: `Resol Nº${form.resolucionNumero} ${form.resolucionTipo}`.trim(),
              }
            : m
        )
      );
      setIsEditing(false);
      setIsModalOpen(false);
      toast.success("Actualizado correctamente");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al editar");
    }
  };

  const handleDelete = async () => {
    if (!selected) return;
    try {
      setDeleting(true);
      await eliminarMobiliario(selected.id);
      setMobiliario((prev) => prev.filter((m) => m.id !== selected.id));
      setSelected(null);
      setShowConfirmModal(false);
      setIsModalOpen(false);
      toast.success("Eliminado correctamente");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al eliminar");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Wrapper>
      <Toaster />

      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-blue-700">
          Gestión de Mobiliario
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Visualización detallada de mobiliarios registrados
        </p>
      </div>

      {loading ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          Cargando...
        </p>
      ) : mobiliario.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          No hay registros
        </p>
      ) : (
        <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto">
          {/* Listado */}
          <div className="w-full md:w-[40%] bg-white dark:bg-gray-800 rounded-xl shadow p-4 h-fit">
            <h2 className="text-lg font-semibold text-blue-700 border-b pb-2 mb-3">
              Listado
            </h2>
            <input
              type="text"
              placeholder="Buscar por ID o descripción"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 mb-3 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-sm"
            />
            <ul className="space-y-2 max-h-[500px] overflow-y-auto">
              {filtered.map((item) => (
                <li
                  key={item.id}
                  onClick={() => {
                    setSelected(item);
                    if (isMobile) {
                      setIsEditing(true);
                      setIsModalOpen(true);
                    }
                  }}
                  onDoubleClick={() => {
                    if (!isMobile) {
                      setSelected(item);
                      setIsEditing(true);
                      setIsModalOpen(true);
                    }
                  }}
                  className={`p-2 rounded-lg cursor-pointer transition ${
                    selected?.id === item.id
                      ? "bg-blue-100 dark:bg-cyan-700"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <p className="font-medium text-gray-800 dark:text-white">
                    {item.descripcion || "Sin descripción"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    ID: {item.id}
                  </p>
                </li>
              ))}
              {filtered.length === 0 && (
                <li className="text-center text-sm text-gray-500 dark:text-gray-400">
                  No hay resultados
                </li>
              )}
            </ul>
          </div>

          {/* Detalle */}
          <div className="w-full md:w-[60%] bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-blue-700 border-b pb-2">
              Detalle
            </h2>

            {selected ? (
              <div className="flex flex-col gap-4">
                <div className="flex justify-center">
                  {selected.foto_url ? (
                    <Image
                      src={selected.foto_url}
                      alt="Foto del mobiliario"
                      width={288}
                      height={288}
                      className="w-72 h-72 object-cover rounded-lg shadow"
                    />
                  ) : (
                    <div className="w-72 h-72 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg text-sm text-gray-500 dark:text-gray-300 shadow">
                      Sin foto
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm text-gray-700 dark:text-gray-300">
                  <div><strong>ID:</strong> {selected.id}</div>
                  <div><strong>Anexo:</strong> {selected.anexo}</div>
                  <div><strong>Subdependencia:</strong> {selected.subdependencia}</div>
                  <div><strong>Descripción:</strong> {selected.descripcion}</div>
                  {(() => {
                    const { resolucionNumero, resolucionTipo } = parseResolucion(selected.resolucion);
                    return (
                      <>
                        <div><strong>Resol Nº:</strong> {resolucionNumero || "—"}</div>
                        <div><strong>Tipo:</strong> {resolucionTipo || "—"}</div>
                      </>
                    );
                  })()}
                  <div><strong>Fecha resolución:</strong> {selected.fecha_resolucion || "—"}</div>
                  <div><strong>Estado conservación:</strong> {selected.estado_conservacion || "—"}</div>
                  <div><strong>No dado:</strong> {selected.no_dado ? "Sí" : "No"}</div>
                  <div><strong>Para reparación:</strong> {selected.para_reparacion ? "Sí" : "No"}</div>
                  <div><strong>Para baja:</strong> {selected.para_baja ? "Sí" : "No"}</div>
                  <div><strong>Faltante:</strong> {selected.faltante ? "Sí" : "No"}</div>
                  <div><strong>Sobrante:</strong> {selected.sobrante ? "Sí" : "No"}</div>
                  <div><strong>Problema etiqueta:</strong> {selected.problema_etiqueta ? "Sí" : "No"}</div>
                  <div className="col-span-1 md:col-span-2"><strong>Comentarios:</strong> {selected.comentarios || "—"}</div>
                  <div><strong>Creado:</strong> {new Date(selected.fecha_creacion).toLocaleString()}</div>
                  <div><strong>Actualizado:</strong> {new Date(selected.fecha_actualizacion).toLocaleString()}</div>
                </div>

                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => setShowConfirmModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
                  >
                    <FaTrash /> Eliminar
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">Seleccione un mobiliario.</p>
            )}
          </div>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setIsEditing(false); }}>
        {selected && isEditing && (
          <>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Editar Mobiliario</h2>
            {(() => {
              const { resolucionNumero, resolucionTipo } = parseResolucion(selected.resolucion);
              return (
                <PatrimonioForm
                  modo="editar"
                  initialData={{
                    id: selected.id,
                    rubro: "",
                    clase: "",
                    anexo: selected.anexo,
                    subdependencia: selected.subdependencia,
                    descripcion: selected.descripcion,
                    resolucionNumero,
                    resolucionTipo,
                    fechaResolucion: selected.fecha_resolucion ?? "",
                    estado: selected.estado_conservacion ?? "",
                    comentarios: selected.comentarios ?? "",
                    foto_url: selected.foto_url ?? "",
                    opciones: {
                      noDado: selected.no_dado,
                      reparacion: selected.para_reparacion,
                      paraBaja: selected.para_baja,
                      faltante: selected.faltante,
                      sobrante: selected.sobrante,
                      etiqueta: selected.problema_etiqueta,
                    },
                  }}
                  onSubmit={handleEditSubmit}
                  onCancel={() => { setIsModalOpen(false); setIsEditing(false); }}
                />
              );
            })()}
          </>
        )}
      </Modal>

      <ConfirmModal
        isOpen={showConfirmModal}
        onCancel={() => setShowConfirmModal(false)}
        onConfirm={handleDelete}
        loading={deleting}
        title="¿Eliminar mobiliario?"
        message="Esta acción no se puede deshacer. ¿Deseás continuar?"
      />
    </Wrapper>
  );
}
