
const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export const obtenerAnexos = async () => {
  const res = await fetch(`${API_BASE}/anexos`);
  return await res.json();
};

export const agregarAnexo = async (anexo: {
  id: number;
  nombre: string;
  direccion?: string;
}) => {
  const res = await fetch(`${API_BASE}/anexos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(anexo),
  });
  return await res.json();
};

export const obtenerSubdependencias = async (idAnexo: number) => {
  const res = await fetch(`${API_BASE}/anexos/${idAnexo}/subdependencias`);
  return await res.json();
};

export const agregarSubdependencia = async (sub: {
  id: number;
  id_anexo: number;
  nombre: string;
}) => {
  const res = await fetch(`${API_BASE}/subdependencias`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sub),
  });
  return await res.json();
};
