
"use client";

import { useState, useEffect } from "react";
import { getAnexos, createAnexo, deleteAnexo, updateAnexo } from "@/services/anexosService";
import { getSubdependencias, createSubdependencia } from "@/services/subdependenciasService";
import { FiTrash2, FiEdit2, FiCheck, FiX } from "react-icons/fi";

export default function CasaCentral() {
  const [anexos, setAnexos] = useState<{ id: number; nombre: string }[]>([]);
  const [subdependencias, setSubdependencias] = useState<{ id: number; nombre: string }[]>([]);
  const [nuevoAnexo, setNuevoAnexo] = useState("");
  const [nuevaSubdependencia, setNuevaSubdependencia] = useState("");
  const [anexoSeleccionado, setAnexoSeleccionado] = useState<number | null>(null);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [nombreEditado, setNombreEditado] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const anexosData = await getAnexos();
        console.log("Anexos recibidos:", anexosData);
        setAnexos(anexosData);
        if (anexosData.length > 0) {
          setAnexoSeleccionado(anexosData[0].id);
          const subdependenciasData = await getSubdependencias(anexosData[0].id);
          setSubdependencias(subdependenciasData);
        }
      } catch (error) {
        console.error("Error cargando los datos", error);
      }
    };
    fetchData();
  }, []);

  const handleAgregarAnexo = async () => {
    try {
      const newAnexo = await createAnexo(nuevoAnexo);
      setAnexos([...anexos, newAnexo]);
      setNuevoAnexo("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleEliminarAnexo = async (id: number) => {
    try {
      await deleteAnexo(id);
      setAnexos(anexos.filter((anexo) => anexo.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditarClick = (id: number, nombre: string) => {
    setEditandoId(id);
    setNombreEditado(nombre);
  };

  const handleGuardarEdicion = async (id: number) => {
    try {
      const updatedAnexo = await updateAnexo(id, nombreEditado);
      setAnexos(
        anexos.map((anexo) => (anexo.id === id ? { ...anexo, nombre: updatedAnexo.nombre } : anexo))
      );
      setEditandoId(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold">Gestión de Anexos y Subdependencias</h1>

      {/* Agregar Anexo */}
      <div className="bg-white p-4 rounded shadow-md mt-4">
        <h2 className="font-semibold text-lg">Agregar Anexo</h2>
        <input
          type="text"
          placeholder="Nombre del Anexo"
          value={nuevoAnexo}
          onChange={(e) => setNuevoAnexo(e.target.value)}
          className="w-full border rounded px-3 py-2 mt-2"
        />
        <button
          onClick={handleAgregarAnexo}
          className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600 transition-colors"
        >
          Agregar Anexo
        </button>
      </div>

      {/* Lista de Anexos */}
      <div className="bg-white p-4 rounded shadow-md mt-4">
        <h2 className="font-semibold text-lg">Anexos</h2>
        {anexos.map((anexo) => (
          <div
            key={anexo.id}
            className="border rounded px-3 py-2 mt-2 flex justify-between items-center"
          >
            {editandoId === anexo.id ? (
              <input
                type="text"
                value={nombreEditado}
                onChange={(e) => setNombreEditado(e.target.value)}
                className="border rounded px-2 py-1"
              />
            ) : (
              <span>{anexo.nombre}</span>
            )}

            <div className="flex gap-2">
              {editandoId === anexo.id ? (
                <>
                  <button
                    onClick={() => handleGuardarEdicion(anexo.id)}
                    className="text-green-500 hover:bg-green-100 p-2 rounded-full transition-all"
                  >
                    <FiCheck size={18} />
                  </button>
                  <button
                    onClick={() => setEditandoId(null)}
                    className="text-gray-500 hover:bg-gray-100 p-2 rounded-full transition-all"
                  >
                    <FiX size={18} />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleEditarClick(anexo.id, anexo.nombre)}
                  className="text-yellow-500 hover:bg-yellow-100 p-2 rounded-full transition-all"
                >
                  <FiEdit2 size={18} />
                </button>
              )}

              <button
                onClick={() => handleEliminarAnexo(anexo.id)}
                className="text-red-500 hover:bg-red-100 p-2 rounded-full transition-all"
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
