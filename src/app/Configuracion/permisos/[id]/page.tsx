
"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Wrapper } from "@/components";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-hot-toast";
import {
  obtenerPermisosUsuario,
  guardarPermisosUsuario,
} from "@/services/permisosService";

const pantallas = ["Inicio", "Anexos", "Bajas", "Usuarios", "Configuración"];
const acciones = ["Ver", "Crear", "Editar", "Eliminar"];

export default function ConfigurationPermisos() {
  const { id } = useParams();
  const router = useRouter();
  const [permisos, setPermisos] = useState<boolean[][] | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (id) {
      const cargarPermisos = async () => {
        const datos = await obtenerPermisosUsuario(id as string);
        setPermisos(datos);
      };
      cargarPermisos();
    }
  }, [id]);

  const togglePermiso = (pantIdx: number, accIdx: number) => {
    if (!permisos) return;
    const nuevos = [...permisos];
    nuevos[pantIdx][accIdx] = !nuevos[pantIdx][accIdx];
    setPermisos(nuevos);
  };

  const handleGuardar = async () => {
    if (!id || !permisos) return;
    setIsSaving(true);
    await guardarPermisosUsuario(id as string, permisos);
    toast.success("Permisos actualizados correctamente");
    router.push("/Configuracion");
  };

  if (!permisos) {
    return (
      <Wrapper>
        <div className="max-w-6xl mx-auto py-10 px-4 text-center text-gray-500 dark:text-white">
          Cargando permisos...
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="max-w-6xl mx-auto py-10 px-4">
        <div className="flex items-center gap-2 text-gray-800 dark:text-white mb-6">
          <FaArrowLeft className="cursor-pointer" onClick={() => router.back()} />
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Gestión de Permisos</h1>
        </div>

        <p className="text-sm text-gray-500 mb-6">
          Configura los permisos de acceso para el usuario con ID <strong>{id}</strong>.
        </p>

        <div className="w-full overflow-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-sm">
          <table className="w-full min-w-[600px] sm:min-w-[700px] text-sm text-left">
            <thead className="border-b text-gray-600 dark:text-gray-300 dark:border-gray-600">
              <tr>
                <th className="py-2 px-3 font-semibold">Pantalla</th>
                {acciones.map((accion) => (
                  <th key={accion} className="py-2 px-3 font-semibold">{accion}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {pantallas.map((pant, i) => (
                <tr key={pant}>
                  <td className="py-3 px-3 text-gray-700 dark:text-white font-medium">{pant}</td>
                  {acciones.map((_, j) => (
                    <td key={j} className="py-3 px-3">
                      <Switch
                        checked={permisos[i][j]}
                        onCheckedChange={() => togglePermiso(i, j)}
                        title={permisos[i][j] ? "Desactivar permiso" : "Activar permiso"}
                        className="cursor-pointer data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-300 dark:data-[state=unchecked]:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-8">
          <Button
            aria-label="Guardar permisos"
            disabled={isSaving}
            onClick={handleGuardar}
            className="bg-cyan-700 text-white hover:bg-cyan-800 dark:bg-cyan-600 dark:hover:bg-cyan-700"
          >
            {isSaving ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </div>

        <div className="mt-8 text-xs text-gray-500 flex flex-col sm:flex-row gap-3 sm:gap-6 items-start sm:items-center">
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-blue-600" />
            Permiso activado
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-700" />
            Permiso desactivado
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
