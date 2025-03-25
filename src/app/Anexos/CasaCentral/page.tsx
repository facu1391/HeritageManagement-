
"use client";
import { useEffect, useState } from "react";
import {
  obtenerAnexos,
  agregarAnexo,
  obtenerSubdependencias,
  agregarSubdependencia,
} from "@/services/anexosService";

export default function CasaCentral() {
  const [anexos, setAnexos] = useState([]);
  const [subdependencias, setSubdependencias] = useState([]);
  const [idAnexo, setIdAnexo] = useState("");
  const [nombreAnexo, setNombreAnexo] = useState("");
  const [direccionAnexo, setDireccionAnexo] = useState("");
  const [idSub, setIdSub] = useState("");
  const [nombreSub, setNombreSub] = useState("");
  const [anexoSeleccionado, setAnexoSeleccionado] = useState("");

  useEffect(() => {
    obtenerAnexos().then(setAnexos);
  }, []);

  useEffect(() => {
    if (anexoSeleccionado) {
      obtenerSubdependencias(parseInt(anexoSeleccionado)).then(setSubdependencias);
    } else {
      setSubdependencias([]);
    }
  }, [anexoSeleccionado]);

  const handleGuardarAnexo = async () => {
    await agregarAnexo({
      id: parseInt(idAnexo),
      nombre: nombreAnexo,
      direccion: direccionAnexo,
    });
    setIdAnexo("");
    setNombreAnexo("");
    setDireccionAnexo("");
    const nuevos = await obtenerAnexos();
    setAnexos(nuevos);
  };

  const handleGuardarSubdependencia = async () => {
    await agregarSubdependencia({
      id: parseInt(idSub),
      id_anexo: parseInt(anexoSeleccionado),
      nombre: nombreSub,
    });
    setIdSub("");
    setNombreSub("");
    const actualizadas = await obtenerSubdependencias(parseInt(anexoSeleccionado));
    setSubdependencias(actualizadas);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10">
      <h1 className="text-2xl font-bold mb-8">Gestión de Anexos</h1>

      {/* Agregar Anexo */}
      <div className="bg-gray-800 p-6 rounded-md w-full max-w-md mb-6">
        <h2 className="text-lg font-semibold mb-4">Agregar Anexo</h2>
        <input
          type="text"
          placeholder="ID"
          value={idAnexo}
          onChange={(e) => setIdAnexo(e.target.value)}
          className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
        />
        <input
          type="text"
          placeholder="Nombre"
          value={nombreAnexo}
          onChange={(e) => setNombreAnexo(e.target.value)}
          className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
        />
        <input
          type="text"
          placeholder="Dirección"
          value={direccionAnexo}
          onChange={(e) => setDireccionAnexo(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
        />
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
          onClick={handleGuardarAnexo}
        >
          Guardar Anexo
        </button>
      </div>

      {/* Seleccionar Anexo */}
      <div className="bg-gray-800 p-6 rounded-md w-full max-w-md mb-6">
        <h2 className="text-lg font-semibold mb-4">Seleccionar Anexo</h2>
        <select
          className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
          value={anexoSeleccionado}
          onChange={(e) => setAnexoSeleccionado(e.target.value)}
        >
          <option value="">Seleccione un Anexo</option>
          {anexos.map((anexo) => (
            <option key={anexo.id} value={anexo.id}>
              {anexo.id} - {anexo.nombre}
            </option>
          ))}
        </select>
        <ul className="list-disc pl-5 text-sm text-gray-300">
          {subdependencias.map((sub) => (
            <li key={sub.id}>{sub.id} - {sub.nombre}</li>
          ))}
        </ul>
      </div>

      {/* Agregar Subdependencia */}
      <div className="bg-gray-800 p-6 rounded-md w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Agregar Subdependencia</h2>
        <input
          type="text"
          placeholder="ID"
          value={idSub}
          onChange={(e) => setIdSub(e.target.value)}
          className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
        />
        <input
          type="text"
          placeholder="Nombre"
          value={nombreSub}
          onChange={(e) => setNombreSub(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
        />
        <button
          className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded"
          onClick={handleGuardarSubdependencia}
        >
          Guardar Subdependencia
        </button>
      </div>
    </div>
  );
}
