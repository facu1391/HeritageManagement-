
"use client";

import { useState } from "react";

const AnexoForm = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nuevo Anexo:", { nombre, descripcion });
    setNombre("");
    setDescripcion("");
  };

  return (
    <div className="border p-6 rounded-lg shadow-md w-full max-w-md md:w-1/2">
      <h2 className="text-xl font-semibold mb-4">Agregar Nuevo Anexo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nombre del edificio"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Descripción del edificio"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button className="w-full bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 dark:bg-cyan-600 dark:hover:bg-cyan-700">
          Agregar Anexo
        </button>
      </form>
    </div>
  );
};

export default AnexoForm;
