
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Perfil } from "@/public";
import { useTheme } from "@/Context/ThemeContext";
import { FaBars } from "react-icons/fa";
import { BsSun, BsMoon, BsBell } from "react-icons/bs";

interface NavbarProps {
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export default function Navbar({ setIsSidebarOpen }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { darkMode, setTheme } = useTheme();

  const toggleUserMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleNotifications = () => setIsNotificationsOpen((prev) => !prev);

  const notifications = [
    { id: 1, message: "Nueva solicitud de acceso" },
    { id: 2, message: "Actualización en el sistema" },
  ];

  return (
    <nav className="bg-gray-800 dark:bg-gray-800 px-4 py-3 flex items-center justify-between">
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="lg:hidden text-white focus:outline-none"
      >
        <FaBars size={24} />
      </button>

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
            className="w-full pl-10 pr-4 py-2 rounded-md border dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 relative">
        <button
          onClick={() => setTheme(darkMode === "light" ? "dark" : "light")}
          className="text-white p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition"
        >
          {darkMode === "dark" ? <BsSun size={20} /> : <BsMoon size={20} />}
        </button>

        <div className="relative">
          <button
            onClick={toggleNotifications}
            className="relative text-white p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition"
          >
            <BsBell size={20} />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {notifications.length}
              </span>
            )}
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-700 rounded-md shadow-lg ring-1 ring-black/5 p-2">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-white border-b pb-2">
                Notificaciones
              </h3>
              {notifications.length > 0 ? (
                notifications.map((notif) => (
                  <div key={notif.id} className="p-2 text-sm text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg">
                    {notif.message}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400 p-2 text-sm">No hay notificaciones</p>
              )}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={toggleUserMenu}
            className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2"
          >
            <Image
              className="w-8 h-8 min-w-8 min-h-8 rounded-full"
              src={Perfil}
              alt="Perfil"
              width={32}
              height={32}
            />
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg ring-1 ring-black/5">
              <Link href="/Perfil" className="block px-4 py-2 text-sm text-gray-700 dark:text-white">
                Tu perfil
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}