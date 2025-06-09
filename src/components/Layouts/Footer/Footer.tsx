
"use client";

import { FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-800 text-gray-300 py-6 px-4 text-center text-sm border-t border-gray-700 mt-auto">
      <div className="mb-2 font-medium text-gray-200">
        © {new Date().getFullYear()} Dirección de Patrimonio — Todos los derechos reservados.
      </div>

      <div className="mb-2 text-sm">
        Desarrollado por el equipo técnico de la Dirección de Patrimonio, Poder Legislativo de La Rioja.
      </div>

      <div className="mb-2 text-xs text-gray-400">
        Contacto: <a href="mailto:patrimonio@legislaturalarioja.gob.ar" className="underline hover:text-white">patrimonio@legislaturalarioja.gob.ar</a> | Tel: (0380) 445-0000
      </div>

      <div className="flex justify-center gap-4 mt-2 text-gray-400">
        <FaLinkedin className="hover:text-cyan-500 text-xl cursor-pointer transition" />
      </div>
    </footer>
  );
}
