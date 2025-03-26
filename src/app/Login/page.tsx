
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Google, Login23 } from "@/public";
import { Spinner } from "@/components";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "patri@gmail.com" && password === "patri2024") {
      setIsLoading(true);
      sessionStorage.setItem("showWelcome", "true");

      setTimeout(() => {
        setIsLoading(false);
        router.push("/Home");
      }, 3000);
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen w-full overflow-hidden bg-gradient-to-br from-blue-300 via-white to-blue-400">
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50">
          <Spinner />
          <p className="mt-4 text-white text-sm">Iniciando sesión...</p>
        </div>
      )}

      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl bg-white rounded-lg shadow-lg z-20 overflow-hidden">
        {/* Imagen ilustrativa */}
        <div className="hidden md:block w-1/2 h-full">
          <Image
            src={Login23}
            alt="Ilustración de login"
            className="object-cover h-full w-full"
          />
        </div>

        {/* Formulario */}
        <div className="w-full md:w-1/2 p-8 bg-white">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Sistema Patrimonial
          </h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Usuario
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm placeholder-gray-600 focus:ring-blue-600 focus:border-blue-600"
                placeholder="Tu Usuario"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm placeholder-gray-600 focus:ring-blue-600 focus:border-blue-600"
                placeholder="Tu Contraseña"
              />
            </div>
            {error && <p className="text-sm text-red-500 mb-2">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            >
              Iniciar sesión
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">O continuar con</div>
          <div className="mt-4">
            <button
              type="button"
              className="w-full flex items-center justify-center bg-white border border-gray-300 py-2 px-4 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Image src={Google} alt="Google logo" width={20} height={20} />
              <span className="ml-2">Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
