
"use client";

import { ReactNode, useState } from "react";
import { Sidebar, Navbar, FloatingButton, Footer } from "@/components";

interface WrapperProps {
  children: ReactNode;
}

export default function Wrapper({ children }: WrapperProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-grow flex flex-col lg:ml-64">
        <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <FloatingButton />

        <main className="flex-grow p-4 bg-gray-100 dark:bg-gray-900 mt-16 overflow-auto">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}
