
const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

import type { Mobiliario } from "@/types/types";

export const obtenerMobiliario = async (): Promise<Mobiliario[]> => {
  const res = await fetch(`${API_BASE}/mobiliario`);
  if (!res.ok) throw new Error("Error al obtener registros");
  return await res.json();
};

export interface MobiliarioUpdate {
  descripcion: string;
  fecha_resolucion: string;
  estado_conservacion: string;
  comentarios: string;
  resolucion_numero?: string;
  resolucion_tipo?: string;
  foto_url?: string; // ✅ AÑADIDO

  // 🔥 Agregá estos:
  no_dado: boolean;
  para_reparacion: boolean;
  para_baja: boolean;
  faltante: boolean;
  sobrante: boolean;
  etiqueta: boolean;
}

export const editarMobiliario = async (
  id: string,
  datos: MobiliarioUpdate
) => {
  const res = await fetch(`${API_BASE}/mobiliario/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Error al editar mobiliario");
  }
  return await res.json();
};

export const eliminarMobiliario = async (id: string) => {
  const res = await fetch(`${API_BASE}/mobiliario/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Error al eliminar mobiliario");
  }
  return await res.json();
};

export const darDeBajaMobiliario = async (id: string) => {
  const res = await fetch(`${API_BASE}/mobiliario/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ para_baja: true }),
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Error al dar de baja el mobiliario");
  }
  return await res.json();
};
