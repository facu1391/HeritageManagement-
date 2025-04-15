"use client";

import Link from "next/link";
import Image from "next/image";
import { Logo4 } from "@/public";
import { useState } from "react";
import { LogoutAlert } from "@/components";

interface SidebarItem {
  href: string;
  label: string;
  svgPath: string;
  section?: string;
}

const sidebarItems: SidebarItem[] = [
  {
    section: "Principal",
    href: "/Anexos",
    label: "Anexos",
    svgPath:
      "M4 12L12 4l8 8M6 10.5V19a1 1 0 001 1h3v-3a1 1 0 011-1h2a1 1 0 011 1v3h3a1 1 0 001-1v-8.5",
  },
  {
    href: "/Listados",
    label: "Listados",
    svgPath: "M4 6h16M4 12h16m-7 6h7",
  },
  {
    href: "/Control",
    label: "Control",
    svgPath:
      "M12 4.5V19m0-14.5c4.142 0 7.5 3.358 7.5 7.5S16.142 19.5 12 19.5M12 4.5c-4.142 0-7.5 3.358-7.5 7.5s3.358 7.5 7.5 7.5m6.364-12.05l-2.121-2.121m-8.486 0L4.95 9.95m12.05 4.243 2.121 2.121m-12.728 0 2.121-2.121",
  },
  {
    href: "/Inventarios",
    label: "Inventarios",
    svgPath:
      "M3 10.75l9-4.5 9 4.5-9 4.5-9-4.5Zm0 4.5l9 4.5 9-4.5m-9-4.5V4.5",
  },
  {
    href: "/Configuracion",
    label: "Configuración",
    svgPath:
      "M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75",
  },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <>
      {/* Sidebar fijo en pantallas grandes */}
      <aside className="hidden lg:flex fixed top-0 left-0 flex-col justify-between w-64 h-screen pt-20 bg-gray-800 border-r border-gray-700">
        <SidebarContent />
      </aside>

      {/* Sidebar desplegable en móviles */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        >
          <aside
            className="fixed top-0 left-0 w-64 h-screen pt-20 bg-gray-800 border-r border-gray-700 transition-transform transform translate-x-0 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarContent setIsOpen={setIsOpen} />
          </aside>
        </div>
      )}
    </>
  );
}

function SidebarContent({ setIsOpen }: { setIsOpen?: (isOpen: boolean) => void }) {
  const [showAlert, setShowAlert] = useState(false);

  const confirmLogout = () => {
    setShowAlert(false);
    window.location.href = "/";
  };

  const cancelLogout = () => {
    setShowAlert(false);
  };

  return (
    <div className="h-full flex flex-col justify-between px-3 pb-4 overflow-y-auto">
      <div>
        <div className="flex justify-center items-center mb-6">
          <Link href="/Home">
            <Image
              src={Logo4}
              alt="Logo"
              className="h-28 w-auto cursor-pointer"
            />
          </Link>
        </div>
        <ul className="space-y-2 font-medium">
          {sidebarItems.map((item, index) => (
            <div key={index}>
              {item.section && (
                <span className="text-white ms-3">{item.section}</span>
              )}
              <li>
                <Link
                  href={item.href}
                  className="flex items-center p-2 text-white rounded-lg group"
                  onClick={() => setIsOpen && setIsOpen(false)}
                >
                  <svg
                    className="w-6 h-6 text-white group-hover:text-D0298A"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={item.svgPath}
                    />
                  </svg>
                  <span className="text-white ms-3 group-hover:text-D0298A">
                    {item.label}
                  </span>
                </Link>
              </li>
            </div>
          ))}
        </ul>
      </div>

      {/* Botón Cerrar sesión */}
      <div className="mt-6 border-t border-gray-700 pt-4">
        <button
          onClick={() => setShowAlert(true)}
          className="w-full text-left flex items-center text-white hover:text-red-400 px-3 py-2 rounded-lg"
        >
          <svg
            className="w-6 h-6 text-white mr-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
            />
          </svg>
          Cerrar sesión
        </button>
      </div>

      {showAlert && (
        <LogoutAlert onConfirm={confirmLogout} onCancel={cancelLogout} />
      )}
    </div>
  );
}
