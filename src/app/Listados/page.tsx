
"use client";

import { useEffect, useState } from "react";
import { Wrapper, Modal } from "@/components";
import {
  editarMobiliario,
  eliminarMobiliario,
  obtenerMobiliario,
} from "@/services/mobiliarioService";

import {
  FaIdBadge,
  FaFileAlt,
  FaCalendarAlt,
  FaRegCommentDots,
  FaWrench,
  FaInfoCircle,
} from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";

interface Mobiliario {
  id: string;
  descripcion: string;
  resolucion: string;
  fecha_resolucion: string | null;
  estado_conservacion: string;
  comentarios: string;
  foto_url: string;
}

export default function Listings() {
  const [mobiliario, setMobiliario] = useState<Mobiliario[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Mobiliario | null>(null);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [formValues, setFormValues] = useState({
    descripcion: "",
    fecha_resolucion: "",
    estado_conservacion: "",
    comentarios: "",
  });

  useEffect(() => {
    obtenerMobiliario()
      .then((data) => {
        setMobiliario(data);
        if (data.length > 0) setSelected(data[0]);
      })
      .catch(() => console.error("Error al cargar datos"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selected) {
      setFormValues({
        descripcion: selected.descripcion || "",
        fecha_resolucion: selected.fecha_resolucion || "",
        estado_conservacion: selected.estado_conservacion || "",
        comentarios: selected.comentarios || "",
      });
    }
  }, [selected]);

  const handleEdit = async () => {
    if (!selected) return;
    try {
      await editarMobiliario(selected.id, formValues);
      toast.success("Actualizado correctamente");
      const updated = mobiliario.map((item) =>
        item.id === selected.id ? { ...item, ...formValues } : item
      );
      setMobiliario(updated);
      setIsEditing(false);
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Error al editar";
      toast.error(msg);
    }
  };

  const handleDelete = async () => {
    if (!selected) return;
    try {
      await eliminarMobiliario(selected.id);
      toast.success("Eliminado correctamente");
      setMobiliario((prev) => prev.filter((m) => m.id !== selected.id));
      setSelected(null);
      setIsModalOpen(false);
      setShowDeleteConfirm(false);
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Error al eliminar";
      toast.error(msg);
    }
  };

  const filteredMobiliario = mobiliario
    .filter((item) => {
      const searchTerm = search.toLowerCase();
      return (
        item.descripcion.toLowerCase().includes(searchTerm) ||
        item.id.toLowerCase().includes(searchTerm)
      );
    })
    .slice(0, 10);

  return (
    <Wrapper>
      <Toaster />
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-blue-700">Gestión de Mobiliario</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Visualización detallada de mobiliarios registrados
        </p>
      </div>

      {loading ? (
        <p className="text-center text-gray-600 dark:text-gray-300">Cargando...</p>
      ) : mobiliario.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">No hay registros</p>
      ) : (
        <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto">
          <div className="w-full md:w-[40%] bg-white dark:bg-gray-800 rounded-xl shadow p-4 h-fit">
            <h2 className="text-lg font-semibold text-blue-700 border-b pb-2 mb-3">Listado</h2>
            <input
              type="text"
              placeholder="Buscar por ID o descripción"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 mb-3 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-sm"
            />
            <ul className="space-y-2 max-h-[500px] overflow-y-auto">
              {filteredMobiliario.map((item) => (
                <li
                  key={item.id}
                  onDoubleClick={() => {
                    setSelected(item);
                    setIsModalOpen(true);
                    setIsEditing(false);
                  }}
                  onClick={() => setSelected(item)}
                  className={`p-2 rounded-lg cursor-pointer transition ${
                    selected?.id === item.id
                      ? "bg-blue-100 dark:bg-cyan-700"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <p className="font-medium text-gray-800 dark:text-white">{item.descripcion || "Sin descripción"}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">ID: {item.id}</p>
                </li>
              ))}
              {filteredMobiliario.length === 0 && (
                <li className="text-center text-sm text-gray-500 dark:text-gray-400">No hay resultados</li>
              )}
            </ul>
          </div>

          <div className="w-full md:w-[60%] bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-blue-700 border-b pb-2">Detalle</h2>
            {selected ? (
              <div className="flex flex-col gap-4">
                <div className="flex justify-center">
                  {selected.foto_url ? (
                    <img
                      src={selected.foto_url}
                      alt="Foto del mobiliario"
                      className="w-72 h-72 object-cover rounded-lg shadow"
                    />
                  ) : (
                    <div className="w-72 h-72 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg text-sm text-gray-500 dark:text-gray-300 shadow">
                      Sin foto
                    </div>
                  )}
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                  <p><strong>ID:</strong> {selected.id}</p>
                  <p><strong>Descripción:</strong> {selected.descripcion}</p>
                  <p><strong>Resolución:</strong> {selected.resolucion}</p>
                  <p><strong>Fecha:</strong> {selected.fecha_resolucion}</p>
                  <p><strong>Estado:</strong> {selected.estado_conservacion}</p>
                  <p><strong>Comentarios:</strong> {selected.comentarios}</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">Seleccione un mobiliario.</p>
            )}
          </div>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => {
        setIsModalOpen(false);
        setIsEditing(false);
        setShowDeleteConfirm(false);
      }}>
        {selected && (
          <div className="w-full max-w-4xl mx-auto p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              {isEditing ? "Editar Mobiliario" : "Detalle Completo"}
            </h2>

            <div className="flex justify-center mb-6">
              {selected.foto_url ? (
                <img
                  src={selected.foto_url}
                  alt="Foto del mobiliario"
                  className="w-72 h-72 object-cover rounded-lg shadow"
                />
              ) : (
                <div className="w-72 h-72 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg text-sm text-gray-500 dark:text-gray-300 shadow">
                  Sin foto
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-800 dark:text-gray-200">
              <div>
                <p className="font-semibold flex items-center gap-2"><FaIdBadge /> ID:</p>
                <p>{selected.id}</p>
              </div>

              <div>
                <p className="font-semibold flex items-center gap-2"><FaInfoCircle /> Descripción:</p>
                {isEditing ? (
                  <input
                    className="w-full mt-1 p-2 rounded border border-gray-300 dark:bg-gray-700 dark:text-white"
                    value={formValues.descripcion}
                    onChange={(e) => setFormValues({ ...formValues, descripcion: e.target.value })}
                  />
                ) : (
                  <p>{selected.descripcion}</p>
                )}
              </div>

              <div>
                <p className="font-semibold flex items-center gap-2"><FaFileAlt /> Resolución:</p>
                <p>{selected.resolucion}</p>
              </div>

              <div>
                <p className="font-semibold flex items-center gap-2"><FaCalendarAlt /> Fecha Resolución:</p>
                {isEditing ? (
                  <input
                    type="date"
                    className="w-full mt-1 p-2 rounded border border-gray-300 dark:bg-gray-700 dark:text-white"
                    value={formValues.fecha_resolucion}
                    onChange={(e) => setFormValues({ ...formValues, fecha_resolucion: e.target.value })}
                  />
                ) : (
                  <p>{selected.fecha_resolucion}</p>
                )}
              </div>

              <div>
                <p className="font-semibold flex items-center gap-2"><FaWrench /> Estado:</p>
                {isEditing ? (
                  <input
                    className="w-full mt-1 p-2 rounded border border-gray-300 dark:bg-gray-700 dark:text-white"
                    value={formValues.estado_conservacion}
                    onChange={(e) => setFormValues({ ...formValues, estado_conservacion: e.target.value })}
                  />
                ) : (
                  <p>{selected.estado_conservacion}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <p className="font-semibold flex items-center gap-2"><FaRegCommentDots /> Comentarios:</p>
                {isEditing ? (
                  <textarea
                    className="w-full mt-1 p-2 rounded border border-gray-300 dark:bg-gray-700 dark:text-white"
                    value={formValues.comentarios}
                    onChange={(e) => setFormValues({ ...formValues, comentarios: e.target.value })}
                  />
                ) : (
                  <p>{selected.comentarios || "Sin comentarios"}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Cerrar
              </button>
              {isEditing ? (
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Guardar
                </button>
              ) : showDeleteConfirm ? (
                <>
                  <button
                    onClick={() => handleDelete()}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Confirmar eliminación
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-500"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </Modal>
    </Wrapper>
  );
}
