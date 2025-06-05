
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Wrapper } from "@/components";
import { FaSearch } from "react-icons/fa";

const usuarios = [
  {
    id: 7,
    email: "prueba11@gmail.com",
    nombre: "jonatan",
    rol: "Administrador",
    fecha: "5 abr 2025",
  },
  {
    id: 8,
    email: "prueba18@gmail.com",
    nombre: "Lucas",
    rol: "Usuario",
    fecha: "7 abr 2025",
  },
];

export default function Configuration() {
  const router = useRouter();
  const [busqueda, setBusqueda] = useState("");

  const usuariosFiltrados = usuarios.filter((u) =>
    u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    u.email.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <Wrapper>
      <div className="max-w-6xl mx-auto py-10 px-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Gestión de Permisos
        </h1>
        <p className="text-sm text-gray-500 mb-4">
          Administra los usuarios y sus permisos dentro del sistema.
        </p>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">
          <div className="relative w-full sm:max-w-md">
            <input
              type="text"
              placeholder="Buscar por nombre o correo..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm"
            />
            <FaSearch className="absolute left-3 top-2.5 text-gray-500" />
          </div>
        </div>

        <div className="w-full overflow-x-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md">
          <table className="w-full min-w-[600px] text-sm text-left">
            <thead className="text-gray-600 dark:text-gray-300 border-b dark:border-gray-600">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Rol</th>
                <th className="px-4 py-3">Fecha de creación</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuariosFiltrados.map((u) => (
                <tr key={u.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-4 py-3 whitespace-nowrap">{u.id}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{u.email}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{u.nombre}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                        u.rol === "Administrador"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {u.rol}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{u.fecha}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      className="text-sm text-blue-600 hover:underline"
                      onClick={() => router.push(`/Configuracion/permisos/${u.id}`)}
                    >
                      Configurar permisos
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Wrapper>
  );
}
