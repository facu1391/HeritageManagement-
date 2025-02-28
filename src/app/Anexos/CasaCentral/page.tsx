"use client";

import { useRouter } from "next/navigation"; // Importamos useRouter
import AnexoForm from "@/components/Formulario/AnexoForm";
import SubdependenciaForm from "@/components/Formulario/SubdependenciaForm";
import ListaAnexos from "@/components/Formulario/ListaAnexos";

const CasaCentral = () => {
  const router = useRouter(); // Hook para manejar navegación

  return (
    <div className="container mx-auto p-8">
      <button
        onClick={() => router.push("/Anexos")} // Navega a la página de Anexos
        className="mb-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-800"
      >
        ← Volver a Anexos
      </button>

      <h1 className="text-2xl font-bold mb-6 text-center">
        Gestión de Anexos y Subdependencias
      </h1>

      <div className="flex flex-col md:flex-row gap-6 justify-center">
        <AnexoForm />
        <SubdependenciaForm />
      </div>

      <ListaAnexos />
    </div>
  );
};

export default CasaCentral;

  