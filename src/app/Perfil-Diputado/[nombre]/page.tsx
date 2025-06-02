// src/app/Perfil-Diputado/[nombre]/page.tsx
"use client";

import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { Wrapper, diputadosData } from "@/components";
import Image from "next/image";

export default function DiputadoDetalle() {
  const params = useParams();
  const router = useRouter();
  const nombre = decodeURIComponent(params.nombre as string);

  const diputado = diputadosData.find(
    (d) => d.nombre.toLowerCase() === nombre.toLowerCase()
  );

  const datosOficina = {
    anexo: "Anexo Central",
    direccion: "Calle de los Diputados 123, Capital",
  };

  const inventario = [
    { id: "PC-001", descripcion: "Computadora escritorio HP i5" },
    { id: "SILLA-014", descripcion: "Silla ergonómica negra" },
    { id: "MESA-007", descripcion: "Mesa de reuniones 6 personas" },
  ];

  const [search, setSearch] = useState("");
  const filtered = inventario.filter((item) =>
    item.descripcion.toLowerCase().includes(search.toLowerCase()) ||
    item.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen px-6 py-10 bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <Wrapper>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg shadow"
          >
            ← Volver
          </button>
          <input
            type="text"
            placeholder="Buscar en inventario"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 rounded-lg shadow border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-white"
          />
        </div>

        <div className="flex flex-col items-center text-center mb-6">
          {diputado?.foto && (
            <Image
              src={diputado.foto}
              alt={`Foto de ${nombre}`}
              width={100}
              height={100}
              className="rounded-full object-cover mb-3"
            />
          )}
          <h1 className="text-3xl font-bold text-blue-900 dark:text-white mb-2">
            {nombre}
          </h1>
          {diputado && (
            <>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Departamento: {diputado.departamento}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm italic">
                Partido: {diputado.partido}
              </p>
            </>
          )}
        </div>

        <div className="mb-6 text-center text-gray-700 dark:text-gray-200">
          <p><strong>Anexo:</strong> {datosOficina.anexo}</p>
          <p><strong>Dirección:</strong> {datosOficina.direccion}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Inventario de oficina
          </h2>
          {filtered.length > 0 ? (
            <ul className="space-y-3">
              {filtered.map((item) => (
                <li key={item.id} className="p-4 bg-blue-50 dark:bg-gray-700 rounded-md shadow text-gray-900 dark:text-white">
                  <p className="font-semibold">{item.descripcion}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">ID: {item.id}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 italic">
              No se encontraron bienes en el inventario.
            </p>
          )}
        </div>
      </Wrapper>
    </main>
  );
}
