import Image from "next/image";
import { Google } from "@/public";

export default function Login() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="flex justify-center mb-6"></div>
        <h2 className="text-2xl font-bold text-center text-black mb-6">Patrimonio</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Usuario
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-purple-600 focus:border-purple-600"
              placeholder="you@example.com"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-purple-600 focus:border-purple-600"
              placeholder="********"
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-purple-600 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Recordar
              </label>
            </div>
            <a href="#" className="text-sm text-purple-600 hover:underline">
              ¿Has olvidado tu contraseña?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:ring-2 focus:ring-purple-600 focus:outline-none"
          >
            Iniciar sesión
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-500">
          O continuar con
        </div>
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