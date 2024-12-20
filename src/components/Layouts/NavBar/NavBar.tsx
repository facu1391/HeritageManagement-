"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Perfil } from "@/public";
import { useTheme } from "@/Context/ThemeContext"; // Importa tu hook personalizado

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const { darkMode, setTheme } = useTheme(); // Obtén darkMode y setTheme del contexto

  const toggleUserMenu = () => setIsMenuOpen((prev) => !prev);
  const handleLogout = () => router.push("/");

  // Maneja el cambio del interruptor
  const handleThemeToggle = () => {
    setTheme(darkMode === "light" ? "dark" : "light");
  };

  return (
    <nav className="bg-gray-800 ">
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
            <input
              type="checkbox"
              checked={darkMode === "dark"}
              onChange={handleThemeToggle}
              className="sr-only peer"
            />
            <div
              className={`relative w-11 h-6 rounded-full transition-colors ${
                darkMode === "dark" ? "bg-slate-600" : "bg-gray-200"
              }`}
            >
              <div
                className={`absolute top-[2px] start-[2px] h-5 w-5 bg-white border border-gray-300 rounded-full transition-transform ${
                  darkMode === "dark" ? "translate-x-full" : "translate-x-0"
                }`}
              ></div>
            </div>
          </label>

          {/* Botones de notificación y menú */}
          <div className="flex items-center pr-2 space-x-4 sm:ml-6 sm:pr-0">
            {/* Botón de notificación */}
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="sr-only ">View notifications</span>
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
                className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2"
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
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black/5">
                  <Link href="/Perfil" className="block px-4 py-2 text-sm text-gray-700">
                    Tu perfil
                  </Link>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700">
                    Ajustes
                  </a>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700"
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
