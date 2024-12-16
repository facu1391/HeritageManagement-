import { FaPlus } from "react-icons/fa"; // Importa el ícono de más

export default function FloatingButton() {
  return (
    <button
      className="fixed bottom-4 right-4 flex items-center gap-2 bg-purple-600 text-white text-sm font-medium py-3 px-5 rounded-full shadow-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-400 focus:outline-none"
      onClick={() => alert("Nuevo elemento!")} // Acción al hacer clic
    >
      <FaPlus className="w-4 h-4" /> {/* Ícono de más */}
      Nuevo
    </button>
  );
}