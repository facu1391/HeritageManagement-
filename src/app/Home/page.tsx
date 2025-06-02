
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Wrapper, ToastMessage } from "@/components";
import { Lesgilatura } from "../../../public";
import { FaMapMarkerAlt } from "react-icons/fa";
import { GOOGLE_MAPS_LINK, GOOGLE_MAPS_EMBED_SRC } from "@/config/constants";

export default function HomePage() {
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const shouldShowWelcome = sessionStorage.getItem("showWelcome");
    if (shouldShowWelcome) {
      setShowWelcome(true);
      sessionStorage.removeItem("showWelcome");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-white to-blue-400 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
      {showWelcome && (
        <ToastMessage message="Bienvenido al sistema de Patrimonio" />
      )}

      <Wrapper>
        <div className="text-center py-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-6">
            Bienvenido al Sistema de Patrimonio
          </h1>
        </div>

        <div className="px-4 pb-12">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
            Ubicación Institucional
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Imagen institucional */}
            <div className="w-full rounded-lg shadow-lg overflow-hidden">
              <Image
                src={Lesgilatura}
                alt="Frente de la Legislatura de La Rioja"
                className="w-full h-full object-cover"
                placeholder="blur"
              />
              <p className="text-center mt-2 text-sm text-gray-700 dark:text-gray-300">
                Frente del edificio legislativo - Vélez Sársfield 874, La Rioja
              </p>
            </div>

            {/* Mapa y botón */}
            <div className="w-full rounded-lg shadow-lg overflow-hidden bg-white dark:bg-gray-800">
              <iframe
                title="Ubicación Poder Legislativo"
                src={GOOGLE_MAPS_EMBED_SRC}
                width="100%"
                height="320"
                className="w-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              <div className="p-4 text-center">
                <p className="flex items-center justify-center gap-2 text-sm text-gray-800 dark:text-gray-200 mb-3">
                  <FaMapMarkerAlt className="text-red-500" />
                  Vélez Sársfield 874, F5300 La Rioja
                </p>

                <a
                  href={GOOGLE_MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-blue-700 text-white text-sm rounded hover:bg-blue-800 transition"
                >
                  Ver en Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
