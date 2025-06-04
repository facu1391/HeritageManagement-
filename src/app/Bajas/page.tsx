
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Wrapper } from "@/components";
import { ConfirmarBajaModal } from "@/components";
import { obtenerMobiliario } from "@/services/mobiliarioService";
import type { Mobiliario } from "@/types/types";
import { Toaster } from "react-hot-toast";

export default function Bajas() {
  const [mobiliarios, setMobiliarios] = useState<Mobiliario[]>([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchAndSetMobiliario();
  }, []);

  const fetchAndSetMobiliario = async () => {
    try {
      const data = await obtenerMobiliario();
      const dadosDeBaja = data.filter((item) => item.para_baja === true);
      setMobiliarios(dadosDeBaja);
    } catch (error) {
      console.error("Error al obtener mobiliario:", error);
    }
  };

  const filtered = mobiliarios.filter(
    (item) =>
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.descripcion?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Wrapper>
      <Toaster />
      <main className="min-h-screen px-6 py-10 bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 dark:text-white">
              Mobiliario Dado de Baja
            </h1>
            <button
              onClick={() => setShowModal(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow"
            >
              Dar de baja
            </button>
          </div>

          <input
            type="text"
            placeholder="Buscar por ID o descripción..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md mx-auto block px-4 py-2 mb-8 rounded-lg shadow border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-white"
          />

          {filtered.length > 0 ? (
            <ul className="space-y-4">
              {filtered.map((item) => (
                <li
                  key={item.id}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow"
                >
                  <p className="text-lg font-semibold text-gray-800 dark:text-white">
                    {item.descripcion || "Sin descripción"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">ID: {item.id}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Anexo: {item.anexo} | Subdependencia: {item.subdependencia}
                  </p>
                  {item.foto_url && (
                    <div className="mt-2 relative w-32 h-32 rounded overflow-hidden">
                      <Image
                        src={item.foto_url}
                        alt="Imagen del mobiliario"
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 italic">
              No se encontraron registros dados de baja.
            </p>
          )}
        </div>
      </main>

      <ConfirmarBajaModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={fetchAndSetMobiliario}
      />
    </Wrapper>
  );
}
