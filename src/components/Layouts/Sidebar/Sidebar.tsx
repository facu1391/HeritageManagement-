"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Logo4 } from "../../../../public";
import { LogoutAlert } from "@/components";
import {
  HiHome,
  HiPlusCircle,
  HiClipboardList,
  HiTemplate,
  HiCollection,
  HiCog,
  HiUserGroup,
  HiOutlineLogout,
} from "react-icons/hi";

interface SidebarItem {
  href: string;
  label: string;
  icon: JSX.Element;
  section?: string;
}

const sidebarItems: SidebarItem[] = [
  {
    section: "Principal",
    href: "/Anexos",
    label: "Anexos",
    icon: <HiHome className="w-6 h-6" />,
  },
  {
    href: "/gestion",
    label: "Gestión de Anexos",
    icon: <HiPlusCircle className="w-6 h-6" />,
  },
  {
    href: "/Listados",
    label: "Listados",
    icon: <HiClipboardList className="w-6 h-6" />,
  },
  {
    href: "/Bajas",
    label: "Bajas Mobiliario",
    icon: <HiOutlineLogout className="w-6 h-6" />, // Podés cambiar el ícono si querés
  },
  {
    href: "/Control",
    label: "Control",
    icon: <HiTemplate className="w-6 h-6" />,
  },
  {
    href: "/Inventarios",
    label: "Inventarios",
    icon: <HiCollection className="w-6 h-6" />,
  },
  {
    href: "/Configuracion",
    label: "Configuración",
    icon: <HiCog className="w-6 h-6" />,
  },
  {
    href: "/Diputados",
    label: "Diputados",
    icon: <HiUserGroup className="w-6 h-6" />,
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

      {/* Sidebar móvil con entrada rápida */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        >
          <aside
            className="fixed top-0 left-0 w-64 h-screen pt-20 bg-gray-800 border-r border-gray-700 transition-transform transform translate-x-0 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="transition-none">
              <SidebarContent setIsOpen={setIsOpen} />
            </div>
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
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-24 h-24 bg-gray-700 dark:bg-gray-600 rounded-full p-2 shadow-lg">
            <Image
              src={Logo4}
              alt="Logo"
              className="object-contain w-full h-full"
              priority
            />
          </div>
          <p className="mt-2 text-xs uppercase text-gray-400">
            Dirección de Patrimonio
          </p>
          <hr className="w-10 border-gray-600 mt-2 mb-4" />
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
                  className="flex items-center p-2 text-white rounded-lg group hover:bg-gray-700"
                  onClick={() => setIsOpen && setIsOpen(false)}
                >
                  <span className="text-white group-hover:text-cyan-400">
                    {item.icon}
                  </span>
                  <span className="text-white ms-3 group-hover:text-cyan-400">
                    {item.label}
                  </span>
                </Link>
              </li>
            </div>
          ))}
        </ul>
      </div>

      {/* Logout */}
      <div className="mt-6 border-t border-gray-700 pt-4">
        <button
          onClick={() => setShowAlert(true)}
          className="w-full text-left flex items-center text-white hover:text-red-400 px-3 py-2 rounded-lg"
        >
          <HiOutlineLogout className="w-6 h-6 text-white mr-3" />
          Cerrar sesión
        </button>
      </div>

      {showAlert && <LogoutAlert onConfirm={confirmLogout} onCancel={cancelLogout} />}
    </div>
  );
}
