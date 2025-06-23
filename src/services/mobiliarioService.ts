
"use client";

import {
  Mobiliario,
  MobiliarioUltimo,
  MobiliarioUpdate,
  PatrimonioData,
} from "@/types/types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;

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

export const editarMobiliario = async (
  id: string,
  datos: MobiliarioUpdate,
): Promise<Mobiliario> => {
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

export const createMobiliario = async (payload: PatrimonioData): Promise<Mobiliario> => {
  const res = await fetch(`${API_BASE}/mobiliario`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error((await res.text()) || "Error al crear mobiliario");
  return res.json();
};

