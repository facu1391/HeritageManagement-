
"use client";

import { useState } from "react";

const SubdependenciaForm = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [anexo, setAnexo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nueva Subdependencia:", { nombre, descripcion, anexo });
    setNombre("");
    setDescripcion("");
    setAnexo("");
  };

  return (
    <div className="border p-6 rounded-lg shadow-md w-full max-w-md md:w-1/2">
      <h2 className="text-xl font-semibold mb-4">Agregar Nueva Subdependencia</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nombre de la oficina"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Descripción de la oficina"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <select
          value={anexo}
          onChange={(e) => setAnexo(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Seleccione un anexo</option>
          <option value="Casa Central">Casa Central</option>
          <option value="Anexo 1">Anexo 1</option>
          <option value="Anexo 2">Anexo 2</option>
        </select>
        <button className="w-full bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 dark:bg-cyan-600 dark:hover:bg-cyan-700">
          Agregar Subdependencia
        </button>
      </form>
    </div>
  );
};

export default SubdependenciaForm;
