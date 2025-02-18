"use client";

import { useEffect, useState } from "react";
import { Wrapper, ToastMessage } from "@/components";

export default function HomePage() {
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Verificar si debe mostrarse el mensaje de bienvenida
    const shouldShowWelcome = sessionStorage.getItem("showWelcome");

    if (shouldShowWelcome) {
      setShowWelcome(true); // Mostrar el mensaje
      sessionStorage.removeItem("showWelcome"); // Eliminar la clave para no repetir el mensaje
    }
  }, []);

  return (
    <div>
      {showWelcome && <ToastMessage message="Bienvenido al sistema de Patrimonio" />}
      <Wrapper>
        <div className="flex justify-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white my-6 text-center">
            Bienvenido al Home
          </h1>
        </div>
      </Wrapper>
    </div>
  );
}
