
// services/mobiliarioService.ts
"use client";

import type {
  Mobiliario,
  MobiliarioUltimo,   // interface con los campos que trae /mobiliario/ultimos
} from "@/types/types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;

/* ------------------------------------------------------------------ */
/*  Interfaces                                                         */
/* ------------------------------------------------------------------ */
export interface MobiliarioUpdate {
  descripcion: string;
  fecha_resolucion: string;
  estado_conservacion: string;
  comentarios: string;
  resolucion_numero?: string;
  resolucion_tipo?: string;
  foto_url?: string;

  no_dado: boolean;
  para_reparacion: boolean;
  para_baja: boolean;
  faltante: boolean;
  sobrante: boolean;
  etiqueta: boolean;
}

/* ------------------------------------------------------------------ */
/*  GET – todos los registros (listado completo)                       */
/* ------------------------------------------------------------------ */
export const obtenerMobiliario = async (): Promise<Mobiliario[]> => {
  const res = await fetch(`${API_BASE}/mobiliario`);
  if (!res.ok) throw new Error("Error al obtener registros");
  return res.json();
};

/* ------------------------------------------------------------------ */
/*  GET – últimos 5 registros (nuevo endpoint)                         */
/* ------------------------------------------------------------------ */
export const obtenerUltimosMobiliarios = async (): Promise<MobiliarioUltimo[]> => {
  const res = await fetch(`${API_BASE}/mobiliario/ultimos`);
  if (!res.ok) throw new Error("Error al obtener últimos mobiliarios");
  return res.json();
};

/* ------------------------------------------------------------------ */
/*  GET – uno por ID                                                   */
/* ------------------------------------------------------------------ */
export const obtenerMobiliarioPorId = async (id: string): Promise<Mobiliario> => {
  const res = await fetch(`${API_BASE}/mobiliario/${id}`);
  if (!res.ok) throw new Error("Error al obtener mobiliario");
  return res.json();
};

/* ------------------------------------------------------------------ */
/*  PUT – editar                                                       */
/* ------------------------------------------------------------------ */
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
  return res.json();
};

/* ------------------------------------------------------------------ */
/*  DELETE – eliminar                                                  */
/* ------------------------------------------------------------------ */
export const eliminarMobiliario = async (id: string) => {
  const res = await fetch(`${API_BASE}/mobiliario/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error((await res.text()) || "Error al eliminar mobiliario");
  return res.json();
};

/* ------------------------------------------------------------------ */
/*  PATCH – dar de baja                                                */
/* ------------------------------------------------------------------ */
export const darDeBajaMobiliario = async (id: string) => {
  const res = await fetch(`${API_BASE}/mobiliario/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ para_baja: true }),
  });

  if (!res.ok) throw new Error((await res.text()) || "Error al dar de baja");
  return res.json();
};
