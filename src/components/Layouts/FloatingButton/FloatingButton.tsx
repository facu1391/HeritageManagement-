
"use client";

import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { Toaster } from "react-hot-toast";

export default function PatrimonioBotonNuevo() {
  return (
    <>
      <Toaster position="top-right" />
      <Link
        href="/patrimonio/nuevo"
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-cyan-700 text-white text-sm font-medium py-3 px-5 rounded-full shadow-lg hover:bg-cyan-800 dark:bg-cyan-600 dark:hover:bg-cyan-700"
      >
        <FaPlus className="w-4 h-4" />
        Nuevo
      </Link>
    </>
  );
}
