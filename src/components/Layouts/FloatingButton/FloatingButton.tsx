
"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { createPatrimonio } from "@/services/patrimonioService";
import { toast, Toaster } from "react-hot-toast";
import { PatrimonioData } from "@/types/patrimonio";

export default function PatrimonioModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [id, setId] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [rubro, setRubro] = useState("");
  const [clase, setClase] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [resolucionNumero, setResolucionNumero] = useState("");
  const [resolucionTipo, setResolucionTipo] = useState("");
  const [fechaResolucion, setFechaResolucion] = useState("");
  const [estado, setEstado] = useState("");
  const [comentarios, setComentarios] = useState("");

  const [opciones, setOpciones] = useState({
    noDado: false,
    reparacion: false,
    paraBaja: false,
    faltante: false,
    sobrante: false,
    etiqueta: false,
  });

  const resetForm = () => {
    setId("");
    setUbicacion("");
    setRubro("");
    setClase("");
    setDescripcion("");
    setResolucionNumero("");
    setResolucionTipo("");
    setFechaResolucion("");
    setEstado("");
    setComentarios("");
    setOpciones({
      noDado: false,
      reparacion: false,
      paraBaja: false,
      faltante: false,
      sobrante: false,
      etiqueta: false,
    });
    setSelectedImage(null);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCheckbox = (name: string) => {
    setOpciones((prev) => ({
      ...prev,
      [name]: !prev[name as keyof typeof prev],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id || !ubicacion || !descripcion || !resolucionNumero || !resolucionTipo || !fechaResolucion || !estado) {
      toast.error("Por favor complete todos los campos obligatorios.");
      return;
    }

    const payload: PatrimonioData = {
      id,
      ubicacion_id: parseInt(ubicacion),
      descripcion,
      resolucion_numero: resolucionNumero,
      resolucion_tipo: resolucionTipo,
      fecha_resolucion: fechaResolucion,
      estado_conservacion: estado,
      no_dado: opciones.noDado,
      reparacion: opciones.reparacion,
      para_baja: opciones.paraBaja,
      faltante: opciones.faltante,
      sobrante: opciones.sobrante,
      etiqueta: opciones.etiqueta,
      comentarios,
      foto_url: selectedImage || "",
    };

    try {
      setLoading(true);
      await createPatrimonio(payload);
      toast.success("Registro guardado correctamente.");
      setIsModalOpen(false);
      resetForm();
    } catch (err: any) {
      toast.error("Error al guardar: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <button
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-cyan-700 text-white text-xs sm:text-sm font-medium py-3 px-4 sm:px-5 rounded-full shadow-lg hover:bg-cyan-800 focus:ring-2 focus:ring-gray-400 focus:outline-none dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-gray-600"
        onClick={() => setIsModalOpen(true)}
      >
        <FaPlus className="w-4 h-4" />
        Nuevo
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-5xl m-6 sm:m-2 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white text-sm sm:text-lg">
                Formulario de Patrimonio
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <IoMdClose size={20} />
              </button>
            </div>

            <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <input
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder="ID"
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-cyan-400 focus:border-cyan-400 dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="text"
                  value={ubicacion}
                  onChange={(e) => setUbicacion(e.target.value)}
                  placeholder="Ubicación"
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-cyan-400 focus:border-cyan-400 dark:bg-gray-700 dark:text-white"
                />
                <select
                  value={rubro}
                  onChange={(e) => setRubro(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-cyan-400 focus:border-cyan-400 dark:bg-gray-700 dark:text-white"
                >
                  <option>Seleccionar Rubro</option>
                  <option>Rubro A</option>
                  <option>Rubro B</option>
                </select>
                <select
                  value={clase}
                  onChange={(e) => setClase(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-cyan-400 focus:border-cyan-400 dark:bg-gray-700 dark:text-white"
                >
                  <option>Seleccionar Clase</option>
                  <option>Clase A</option>
                  <option>Clase B</option>
                </select>
              </div>

              <input
                type="text"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Descripción"
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-cyan-400 focus:border-cyan-400 dark:bg-gray-700 dark:text-white"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <input
                  type="number"
                  value={resolucionNumero}
                  onChange={(e) => setResolucionNumero(e.target.value)}
                  placeholder="N° Resolución"
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-cyan-400 focus:border-cyan-400 dark:bg-gray-700 dark:text-white"
                />
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-gray-700 dark:text-gray-300">Tipo Resolución</label>
                  {["PSA", "Decreto", "Otro"].map((item) => (
                    <label key={item} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="resolucionTipo"
                        value={item}
                        checked={resolucionTipo === item}
                        onChange={() => setResolucionTipo(item)}
                        className="accent-cyan-700"
                      />
                      {item}
                    </label>
                  ))}
                </div>
                <input
                  type="date"
                  value={fechaResolucion}
                  onChange={(e) => setFechaResolucion(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-cyan-400 focus:border-cyan-400 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Estado de Conservación</label>
                <div className="flex flex-wrap gap-4">
                  {["Nuevo", "Bueno", "Regular", "Inútil"].map((item) => (
                    <label key={item} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <input
                        type="radio"
                        name="estado"
                        value={item}
                        checked={estado === item}
                        onChange={() => setEstado(item)}
                        className="accent-cyan-700"
                      />
                      {item}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Marcar opciones</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {[ 
                    { name: "noDado", label: "Nro dado" },
                    { name: "reparacion", label: "P/Reparación" },
                    { name: "paraBaja", label: "Para baja" },
                    { name: "faltante", label: "Faltante" },
                    { name: "sobrante", label: "Sobrante" },
                    { name: "etiqueta", label: "Problema de etiqueta" },
                  ].map((opt) => (
                    <label key={opt.name} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <input
                        type="checkbox"
                        checked={opciones[opt.name as keyof typeof opciones]}
                        onChange={() => handleCheckbox(opt.name)}
                        className="accent-cyan-700"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>

              <textarea
                rows={3}
                value={comentarios}
                onChange={(e) => setComentarios(e.target.value)}
                placeholder="Comentarios"
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-cyan-400 focus:border-cyan-400 dark:bg-gray-700 dark:text-white"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Foto</label>
                <div className="relative w-full border-2 border-dashed border-gray-300 dark:border-gray-500 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="text-cyan-700 dark:text-cyan-400 font-medium cursor-pointer underline">Subir un archivo</span> o arrastrar y soltar
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF hasta 10MB</p>
                  <input type="file" onChange={handleImageChange} className="absolute opacity-0 w-full h-full cursor-pointer" />
                </div>

                {selectedImage && (
                  <div className="mt-3 flex justify-center">
                    <img src={selectedImage} alt="Vista previa" className="w-32 h-32 object-cover rounded-lg shadow" />
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 dark:bg-cyan-600 dark:hover:bg-cyan-700 ${loading && "opacity-50"}`}
                >
                  {loading ? "Guardando..." : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
