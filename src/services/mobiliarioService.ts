
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