
"use client";

import { useState } from "react";
import { Wrapper, DiputadoCard, diputadosData } from "@/components";
import Link from "next/link";

export default function Diputados() {
  const [busqueda, setBusqueda] = useState("");

  const diputadosFiltrados = diputadosData.filter((diputado) =>
    diputado.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>
      <Wrapper>
        <div className="flex flex-col items-center justify-center text-center px-4 mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white">
            Bienvenido a la página de Diputados
          </h1>
          <input
            type="text"
            placeholder="Buscar por apellido"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-white w-full max-w-xs"
          />
        </div>

        {diputadosFiltrados.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
            {diputadosFiltrados.map((diputado, index) => (
              <Link
                key={index}
                href={`/Perfil-Diputado/${encodeURIComponent(diputado.nombre)}`}
                className="block"
              >
                <DiputadoCard {...diputado} />
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 italic py-10">
            No se encontraron diputados con ese apellido.
          </p>
        )}
      </Wrapper>
    </div>
  );
}

