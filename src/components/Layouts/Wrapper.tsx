"use client";

import { ReactNode } from "react";
import { Sidebar, Navbar ,FloatingButton}from"@/components";

interface WrapperProps {
  children: ReactNode;
}

export default function Wrapper({ children }: WrapperProps) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-grow flex flex-col">
        <Navbar /> 
        <FloatingButton/> 
        
        <main className="flex-grow p-4 bg-gray-100 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
}

