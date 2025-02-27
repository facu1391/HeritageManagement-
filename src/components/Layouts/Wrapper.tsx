
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
      {/* Sidebar para pantallas grandes */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-grow flex flex-col">
        {/* Navbar con botón para abrir el Sidebar */}
        <Navbar setIsSidebarOpen={setIsSidebarOpen} />
        <FloatingButton />

        <main className="flex-grow p-4 bg-gray-100 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
}