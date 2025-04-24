

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export const obtenerMobiliario = async () => {
  try {
    const res = await fetch(`${API_BASE}/mobiliario`);
    if (!res.ok) throw new Error("Error al obtener registros");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

interface MobiliarioUpdate {
  descripcion: string;
  fecha_resolucion: string;
  estado_conservacion: string;
  comentarios: string;
  // Se agregan los nuevos campos; se usan opcionales si no son obligatorios en el backend
  resolucion_numero?: string;
  resolucion_tipo?: string;
}

export const editarMobiliario = async (id: string, datos: MobiliarioUpdate) => {
  try {
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
  } catch (error) {
    throw error;
  }
};

export const eliminarMobiliario = async (id: string) => {
  try {
    const res = await fetch(`${API_BASE}/mobiliario/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || "Error al eliminar mobiliario");
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
};