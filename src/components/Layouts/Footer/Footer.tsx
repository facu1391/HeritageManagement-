
"use client";

import { FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-800 text-gray-300 px-4 py-8 text-sm border-t border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-3 sm:gap-2">
        <p className="text-base font-medium text-gray-200">
          © {new Date().getFullYear()} Dirección de Patrimonio — Todos los derechos reservados.
        </p>

        <p className="text-sm text-gray-300 max-w-xl">
          Desarrollado por el equipo técnico de la Dirección de Patrimonio, Poder Legislativo de La Rioja.
        </p>

        <p className="text-xs text-gray-400">
          Contacto:{" "}
          <a
            href="mailto:patrimonio@legislaturalarioja.gob.ar"
            className="underline hover:text-white transition"
          >
            patrimonio@legislaturalarioja.gob.ar
          </a>{" "}
          | Tel: (0380) 445-0000
        </p>

        <div className="flex justify-center gap-4 mt-2 text-gray-400">
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn institucional"
          >
            <FaLinkedin className="text-2xl hover:text-cyan-500 transition" />
          </a>
        </div>
      </div>
    </footer>
  );
}
