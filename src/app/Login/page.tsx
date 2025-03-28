
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
        document.body.classList.add("fade-out");
        setIsLoading(false);
        router.push("/Home");
      }, 3000);
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen w-full overflow-hidden bg-gradient-to-br from-blue-300 via-white to-blue-400 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50">
          <Spinner />
          <p className="mt-4 text-white text-sm">Iniciando sesión...</p>
        </div>
      )}

      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl bg-white dark:bg-gray-900 rounded-lg shadow-lg z-20 overflow-hidden">
        {/* Imagen en escritorio */}
        <div className="hidden md:block w-1/2 h-full">
          <Image
            src={Login23}
            alt="Ilustración de login"
            className="object-cover h-full w-full"
          />
        </div>

        {/* Imagen en mobile con fondo y animación */}
        <div className="flex md:hidden w-full h-48 bg-gradient-to-r from-white to-blue-100 dark:from-gray-800 dark:to-gray-700 justify-center items-center animate-fade-in">
          <Image
            src={Login23}
            alt="Ilustración de login móvil"
            className="object-contain h-full rounded-xl shadow-lg"
          />
        </div>

        {/* Formulario con transición */}
        <div className="w-full md:w-1/2 p-8 bg-white dark:bg-gray-900 animate-fade-up">
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
            Sistema Patrimonio
          </h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Usuario
              </label>
              <input
                type="email"
                id="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border text-black dark:text-white border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-600 dark:placeholder-gray-400 bg-white dark:bg-gray-800 focus:ring-blue-600 focus:border-blue-600 transition"
                placeholder="Tu Usuario"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border text-black dark:text-white border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-600 dark:placeholder-gray-400 bg-white dark:bg-gray-800 focus:ring-blue-600 focus:border-blue-600 transition"
                placeholder="Tu Contraseña"
              />
            </div>
            {error && (
                <div className="mb-4 p-3 rounded-md bg-red-100 dark:bg-red-800/30 text-red-700 dark:text-red-300 flex items-center gap-2 animate-fade-in">
                  <svg className="w-5 h-5 text-red-500 dark:text-red-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zM9 5a1 1 0 012 0v4a1 1 0 01-2 0V5zm1 8a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" clipRule="evenodd" />
                  </svg>
                  <span>{error}</span>
                </div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800 focus:ring-2 focus:ring-blue-600 focus:outline-none transition duration-300"
            >
              Iniciar sesión
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">O continuar con</div>
          <div className="mt-4 animate-fade-in">
            <button
              type="button"
              className="w-full flex items-center justify-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 py-2 px-4 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transform transition duration-300 hover:scale-105"
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