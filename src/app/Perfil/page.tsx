"use client"
import Link from "next/link";
import Image from "next/image";
import { Perfil } from "@/public";
import { useState } from "react";

export default function Profile() {
  const [message, setMessage] = useState("");

  const handleSaveChanges = () => {
    setMessage("Se guardaron los cambios correctamente");
    setTimeout(() => setMessage(""), 3000); // Clear the message after 3 seconds
  };

  return (
    <section className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        {/* Header Section */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500">
            <Image
              src={Perfil}
              alt="Foto de Perfil"
              width={96}
              height={96}
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Nombre Apellido</h1>
            <p className="text-gray-600 dark:text-gray-400">@nombreusuario</p>
          </div>
        </div>

        {/* Info Section */}
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400 font-medium">Número de Documento:</span>
            <span className="text-gray-800 dark:text-gray-300">12345678</span>
          </div>
       
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400 font-medium">Email:</span>
            <span className="text-gray-800 dark:text-gray-300">nombre.apellido@example.com</span>
          </div>
        </div>

        {/* Change Password Section */}
        <div className="my-6">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
            Cambiar Contraseña
          </button>
        </div>

        {/* Description Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Sobre mí</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Breve descripción sobre mí. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
            tincidunt, ipsum non ultrices tempor, nunc sapien malesuada lorem, at posuere nisl eros
            vitae nulla.
          </p>
        </div>

        {/* Social Media Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Redes Sociales</h2>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook text-2xl"></i>
            </a>
            <a
              href="#"
              className="text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter text-2xl"></i>
            </a>
            <a
              href="#"
              className="text-pink-500 hover:text-pink-600 dark:hover:text-pink-400"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram text-2xl"></i>
            </a>
            <a
              href="#"
              className="text-blue-700 hover:text-blue-800 dark:hover:text-blue-600"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin text-2xl"></i>
            </a>
          </div>
        </div>

        {/* Action Buttons Section */}
        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={handleSaveChanges}
            className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
          >
            Guardar Cambios
          </button>
          <Link href="/Home">
            <button className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600">
              Volver al Inicio
            </button>
          </Link>
        </div>

        {/* Success Message */}
        {message && (
          <div className="mt-4 text-center text-green-500 font-bold">{message}</div>
        )}
      </div>
    </section>
  );
}
