
// services/mobiliarioService.ts
const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export interface Mobiliario {
  id: string;
  descripcion: string;
  resolucion: string;
  resolucion_tipo: string;
  resolucion_numero: string;
  fecha_resolucion: string | null;
  estado_conservacion: string;
  comentarios: string;
  foto_url: string;
  ubicacion_id: number;
  no_dado: boolean;
  reparacion: boolean;
  para_baja: boolean;
  faltante: boolean;
  sobrante: boolean;
  etiqueta: boolean;
}

export const obtenerMobiliario = async (): Promise<Mobiliario[]> => {
  try {
    const res = await fetch(`${API_BASE}/mobiliario`);
    if (!res.ok) throw new Error("Error al obtener registros");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export interface MobiliarioUpdate {
  descripcion: string;
  fecha_resolucion: string;
  estado_conservacion: string;
  comentarios: string;
  resolucion_numero?: string;
  resolucion_tipo?: string;
}

export const editarMobiliario = async (id: string, datos: MobiliarioUpdate) => {
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

// **Nuevo**: obtiene el detalle completo para el panel “Detalle”
import type { FullDetail } from "@/types/types";

export const obtenerDetalleMobiliario = async (
  id: string
): Promise<FullDetail> => {
  const res = await fetch(`${API_BASE}/mobiliario2/${id}`);
  if (!res.ok) {
    throw new Error("Error al obtener detalle");
  }
  const data: FullDetail[] = await res.json();
  return data[0];
};
