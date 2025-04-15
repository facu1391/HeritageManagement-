
"use client";

import { ReactNode, useState } from "react";
import { Sidebar, Navbar, FloatingButton } from "@/components";

interface WrapperProps {
  children: ReactNode;
}

export default function Wrapper({ children }: WrapperProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar (fijo en escritorio y desplegable en móvil) */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Contenedor principal: se añade un margen izquierdo en escritorio para que el contenido no se superponga con el sidebar fijo */}
      <div className="flex-grow flex flex-col lg:ml-64">
        {/* Navbar fijo */}
        <Navbar setIsSidebarOpen={setIsSidebarOpen} />
        <FloatingButton />

        {/* Para que el contenido no quede oculto por el Navbar fijo, se agrega margen superior */}
        <main className="flex-grow p-4 bg-gray-100 dark:bg-gray-900 mt-16">
          {children}
        </main>
      </div>
    </div>
  );
}
