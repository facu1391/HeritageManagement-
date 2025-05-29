
"use client";

import Link from "next/link";
import Image from "next/image";
import { Perfil } from "../../../public";
import { useState } from "react";

export default function Profile() {
  const [message, setMessage] = useState("");

  const user = {
    nombre: "Juan Pérez",
    usuario: "@juanperez",
    dni: "12345678",
    email: "juan.perez@example.com",
    descripcion:
      "Licenciado en Gestión del Patrimonio Cultural. Amante del arte, la historia y el desarrollo digital de los bienes patrimoniales.",
  };

  const handleSaveChanges = () => {
    setMessage("✅ Cambios guardados correctamente");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <section className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-200 via-white to-blue-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 animate-fade-up">
        {/* Foto y nombre */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500 shadow">
            <Image
              src={Perfil}
              alt="Foto de Perfil"
              width={96}
              height={96}
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{user.nombre}</h1>
            <p className="text-gray-600 dark:text-gray-400">{user.usuario}</p>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400 font-medium">Número de Documento:</span>
            <span className="text-gray-800 dark:text-gray-300">{user.dni}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400 font-medium">Email:</span>
            <span className="text-gray-800 dark:text-gray-300">{user.email}</span>
          </div>
        </div>

        {/* Botón cambiar contraseña */}
        <div className="my-6">
          <button
            disabled
            className="px-4 py-2 bg-gray-400 text-white rounded-lg shadow cursor-not-allowed opacity-60"
            title="Próximamente"
          >
            Cambiar Contraseña
          </button>
        </div>

        {/* Descripción */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Sobre mí</h2>
          <p className="text-gray-600 dark:text-gray-400">{user.descripcion}</p>
        </div>

      

        {/* Botones */}
        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={handleSaveChanges}
            className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
          >
            Guardar Cambios
          </button>
          <Link href="/Home">
            <button className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 transition">
              Volver al Inicio
            </button>
          </Link>
        </div>

        {/* Mensaje de éxito */}
        {message && (
          <div className="mt-4 text-center text-green-600 dark:text-green-400 font-semibold animate-fade-in">
            {message}
          </div>
        )}
      </div>
    </section>
  );
}
