
const API_URL = "https://anexos.onrender.com/api";

export const getAnexos = async () => {
  const response = await fetch(`${API_URL}/anexos`);
  if (!response.ok) throw new Error("Error al obtener anexos");
  return response.json();
};

export const createAnexo = async (nombre: string) => {
  const response = await fetch(`${API_URL}/anexos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nombre }),
  });

  if (!response.ok) throw new Error("Error al crear anexo");
  return response.json();
};

export const updateAnexo = async (id: number, nombre: string) => {
  const response = await fetch(`${API_URL}/anexos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nombre }),
  });

  if (!response.ok) throw new Error("Error al actualizar anexo");
  return response.json();
};

export const deleteAnexo = async (id: number) => {
  const response = await fetch(`${API_URL}/anexos/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Error al eliminar anexo");
};