
"use client";

import {
  Mobiliario,
  MobiliarioUltimo,
} from "@/types/types";

// Base de la API
const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;

/* --------------------------------- Tipos --------------------------------- */

export interface PatrimonioCreatePayload {
  id: string;
  ubicacion_id: number;
  clase_bien_id?: number;
  rubro_id?: number;
  descripcion: string;
  resolucion_numero?: string;
  resolucion_tipo?: string;
  fecha_resolucion?: string;
  estado_conservacion?: string;
  no_dado: boolean;
  para_reparacion: boolean;
  para_baja: boolean;
  faltante: boolean;
  sobrante: boolean;
  problema_etiqueta: boolean;
  comentarios?: string;
  foto_url?: string;
}

export type PatrimonioUpdatePayload = Partial<PatrimonioCreatePayload>;

/* ----------------------------- Funciones GET ----------------------------- */

export const obtenerMobiliario = async (): Promise<Mobiliario[]> => {
  const res = await fetch(`${API_BASE}/mobiliario`);
  if (!res.ok) throw new Error("Error al obtener registros");
  return res.json();
};

export const obtenerUltimosMobiliarios = async (): Promise<MobiliarioUltimo[]> => {
  const res = await fetch(`${API_BASE}/mobiliario/ultimos`);
  if (!res.ok) throw new Error("Error al obtener últimos mobiliarios");
  return res.json();
};

export const obtenerMobiliarioPorId = async (
  id: string,
): Promise<Mobiliario & { id_clase?: number; id_rubro?: number }> => {
  const res = await fetch(`${API_BASE}/mobiliario/${id}`);
  if (!res.ok) throw new Error("Error al obtener mobiliario");
  return res.json();
};

/* ------------------------- Crear / Editar / Eliminar ------------------------- */

export const createMobiliario = async (
  payload: PatrimonioCreatePayload
): Promise<Mobiliario> => {
  const res = await fetch(`${API_BASE}/mobiliario`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error((await res.text()) || "Error al crear mobiliario");
  return res.json();
};

export const editarMobiliario = async (
  id: string,
  datos: PatrimonioUpdatePayload
): Promise<Mobiliario> => {
  const res = await fetch(`${API_BASE}/mobiliario/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });

  if (!res.ok) throw new Error((await res.text()) || "Error al editar mobiliario");
  return res.json();
};

export const eliminarMobiliario = async (id: string): Promise<Mobiliario> => {
  const res = await fetch(`${API_BASE}/mobiliario/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error((await res.text()) || "Error al eliminar mobiliario");
  return res.json();
};

export const darDeBajaMobiliario = async (id: string): Promise<Mobiliario> => {
  const res = await fetch(`${API_BASE}/mobiliario/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ para_baja: true }),
  });

  if (!res.ok) throw new Error((await res.text()) || "Error al dar de baja");
  return res.json();
};

