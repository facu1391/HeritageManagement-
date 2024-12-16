"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Importa useRouter
import Image from "next/image";
import { Perfil } from "@/public";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Para menú de usuario

  const router = useRouter();

  const toggleUserMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    router.push("/"); // Redirige a la raíz
  };

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Buscador centrado */}
          <div className="flex-grow flex justify-center">
            <div className="relative w-full max-w-md">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35"
                />
              </svg>
              <input
                type="text"
                placeholder="Buscar"
                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div> 
            {/* Interruptor */}
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-300">Toggle me</span>
            </label>

          {/* Botones de notificación, interruptor y menú de usuario */}
          <div className="flex items-center pr-2 space-x-4 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            
            {/* Botón de notificación */}
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="sr-only">View notifications</span>
              <svg
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                />
              </svg>
            </button>

          

            {/* Menú de usuario */}
            <div className="relative">
              <button
                type="button"
                className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                id="user-menu-button"
                aria-expanded={isMenuOpen}
                aria-haspopup="true"
                onClick={toggleUserMenu}
              >
                <span className="sr-only">Open user menu</span>
                <Image
                  className="size-8 rounded-full"
                  src={Perfil}
                  alt="Perfil"
                  width={32}
                  height={32}
                />
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                  >
                    Tu perfil
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                  >
                    Ajustes
                  </a>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
