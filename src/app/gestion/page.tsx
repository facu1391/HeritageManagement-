// src/app/GestionAnexos/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  obtenerAnexos,
  agregarAnexo,
  obtenerSubdependencias,
  agregarSubdependencia,
  eliminarAnexo,
  eliminarSubdependencia,
} from "@/services/anexosService";
import { toast, Toaster } from "react-hot-toast";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { DeleteModal } from "@/components";

interface Anexo {
  id: number;
  nombre: string;
  direccion: string;
}

interface Subdependencia {
  id: number;
  nombre: string;
}

export default function GestionAnexos() {
  const router = useRouter();
  const [anexos, setAnexos] = useState<Anexo[]>([]);
  const [subdependencias, setSubdependencias] = useState<Subdependencia[]>([]);
  const [idAnexo, setIdAnexo] = useState("");
  const [nombreAnexo, setNombreAnexo] = useState("");
  const [direccionAnexo, setDireccionAnexo] = useState("");
  const [idSub, setIdSub] = useState("");
  const [nombreSub, setNombreSub] = useState("");
  const [anexoSeleccionado, setAnexoSeleccionado] = useState("");
  const [loadingAnexos, setLoadingAnexos] = useState(true);
  const [loadingSubs, setLoadingSubs] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [onConfirmDelete, setOnConfirmDelete] = useState<() => void>(() => () => {});
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    cargarAnexos();
  }, []);

  const cargarAnexos = async () => {
    try {
      const data = await obtenerAnexos();
      setAnexos(data.sort((a: Anexo, b: Anexo) => a.id - b.id));
    } catch {
      toast.error("Error al cargar anexos");
    } finally {
      setLoadingAnexos(false);
    }
  };

  useEffect(() => {
    if (anexoSeleccionado) {
      setLoadingSubs(true);
      obtenerSubdependencias(parseInt(anexoSeleccionado))
        .then((subs) => setSubdependencias(subs.sort((a: Subdependencia, b: Subdependencia) => a.id - b.id)))
        .catch(() => toast.error("Error al cargar subdependencias"))
        .finally(() => setLoadingSubs(false));
    } else {
      setSubdependencias([]);
    }
  }, [anexoSeleccionado]);

  const handleGuardarAnexo = async () => {
    try {
      await agregarAnexo({ id: parseInt(idAnexo), nombre: nombreAnexo, direccion: direccionAnexo });
      toast.success("Anexo guardado correctamente");
      setIdAnexo("");
      setNombreAnexo("");
      setDireccionAnexo("");
      cargarAnexos();
    } catch {
      toast.error("Error al guardar anexo");
    }
  };

  const confirmarEliminarAnexo = (id: number) => {
    setOnConfirmDelete(() => async () => {
      try {
        await eliminarAnexo(id);
        toast.success("Anexo eliminado");
        cargarAnexos();
        if (parseInt(anexoSeleccionado) === id) {
          setAnexoSeleccionado("");
          setSubdependencias([]);
        }
      } catch {
        toast.error("Error al eliminar anexo");
      }
    });
    setModalMessage("¿Estás seguro que deseas eliminar este anexo?");
    setModalOpen(true);
  };

  const confirmarEliminarSubdependencia = (id: number) => {
    setOnConfirmDelete(() => async () => {
      try {
        await eliminarSubdependencia(id);
        toast.success("Subdependencia eliminada");
        const actualizadas = await obtenerSubdependencias(parseInt(anexoSeleccionado));
        setSubdependencias(actualizadas.sort((a: Subdependencia, b: Subdependencia) => a.id - b.id));
      } catch {
        toast.error("Error al eliminar subdependencia");
      }
    });
    setModalMessage("¿Eliminar esta subdependencia?");
    setModalOpen(true);
  };

  const handleGuardarSubdependencia = async () => {
    try {
      await agregarSubdependencia({
        id: parseInt(idSub),
        id_anexo: parseInt(anexoSeleccionado),
        nombre: nombreSub,
      });
      toast.success("Subdependencia guardada correctamente");
      setIdSub("");
      setNombreSub("");
      const actualizadas = await obtenerSubdependencias(parseInt(anexoSeleccionado));
      setSubdependencias(actualizadas.sort((a: Subdependencia, b: Subdependencia) => a.id - b.id));
    } catch {
      toast.error("Error al guardar subdependencia");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#1a1a1a] text-gray-900 dark:text-white flex flex-col items-center px-4 py-10">
      <Toaster position="top-right" />
      <DeleteModal
        isOpen={modalOpen}
        onCancel={() => setModalOpen(false)}
        onConfirm={() => {
          onConfirmDelete();
          setModalOpen(false);
        }}
        message={modalMessage}
      />

      <div className="fixed top-0 left-0 w-full bg-white dark:bg-gray-800 px-6 py-4 flex items-center gap-2 shadow-md z-50">
        <button
          onClick={() => router.push("/Anexos")}
          className="flex items-center text-sm text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
        >
          <FaArrowLeft className="mr-2" /> Regresar
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-8 mt-24 text-center">Gestión de Anexos</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-4xl lg:max-w-5xl mx-auto">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Agregar Anexo</h2>
          <input type="text" placeholder="ID" value={idAnexo} onChange={(e) => setIdAnexo(e.target.value)} lang="es" spellCheck={true} className="w-full mb-3 p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700" />
          <input type="text" placeholder="Nombre" value={nombreAnexo} onChange={(e) => setNombreAnexo(e.target.value)} lang="es" spellCheck={true} className="w-full mb-3 p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700" />
          <input type="text" placeholder="Dirección" value={direccionAnexo} onChange={(e) => setDireccionAnexo(e.target.value)} lang="es" spellCheck={true} className="w-full mb-4 p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700" />
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded" onClick={handleGuardarAnexo}>Guardar Anexo</button>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-h-[400px] overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Seleccionar Anexo</h2>
          {loadingAnexos ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">Cargando anexos...</p>
          ) : (
            <select className="w-full mb-3 p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700" value={anexoSeleccionado} onChange={(e) => setAnexoSeleccionado(e.target.value)}>
              <option value="">Seleccione un Anexo</option>
              {anexos.map((anexo) => (
                <option key={anexo.id} value={anexo.id}>{anexo.id} - {anexo.nombre}</option>
              ))}
            </select>
          )}

          {loadingSubs ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">Cargando subdependencias...</p>
          ) : (
            <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
              {subdependencias.length === 0 && anexoSeleccionado && <li>No hay subdependencias</li>}
              {subdependencias.map((sub) => (
                <li key={sub.id} className="flex justify-between items-center">
                  <span>{sub.id} - {sub.nombre}</span>
                  <FaTrash onClick={() => confirmarEliminarSubdependencia(sub.id)} className="cursor-pointer text-red-500 hover:text-red-700 ml-3" />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Agregar Subdependencia</h2>
          <input type="text" placeholder="ID" value={idSub} onChange={(e) => setIdSub(e.target.value)} lang="es" spellCheck={true} className="w-full mb-3 p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700" />
          <input type="text" placeholder="Nombre" value={nombreSub} onChange={(e) => setNombreSub(e.target.value)} lang="es" spellCheck={true} className="w-full mb-4 p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700" />
          <button className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded" onClick={handleGuardarSubdependencia}>Guardar Subdependencia</button>
        </div>
      </div>

      {anexos.length > 0 && (
        <div className="mt-10 w-full max-w-4xl">
          <h3 className="text-lg font-semibold mb-4">Eliminar Anexos</h3>
          <ul className="divide-y divide-gray-300 dark:divide-gray-600">
            {anexos.map((anexo) => (
              <li key={anexo.id} className="flex justify-between items-center py-2">
                <span>{anexo.id} - {anexo.nombre}</span>
                <FaTrash onClick={() => confirmarEliminarAnexo(anexo.id)} className="cursor-pointer text-red-500 hover:text-red-700" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}