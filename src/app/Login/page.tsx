"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Google } from "@/public";
import { Spinner } from "@/components";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar credenciales
    if (email === "patri@gmail.com" && password === "patri2024") {
      setIsLoading(true);

      // Guardar indicador para mostrar el mensaje de bienvenida
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
    <div className="relative flex items-center justify-center h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <Spinner />
        </div>
      )}

      <div className="bg-white p-8 rounded-lg shadow-lg w-96 z-10">
        <h2 className="text-2xl font-bold text-center text-black mb-6">Patrimonio</h2>
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
              className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm placeholder-gray-700 focus:ring-purple-600 focus:border-purple-600"
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
              className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm placeholder-gray-700 focus:ring-purple-600 focus:border-purple-600"
              placeholder="Tu Contraseña"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:ring-2 focus:ring-purple-600 focus:outline-none"
          >
            Iniciar sesión
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-500">O continuar con</div>
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
  );
}
