
export const getSubdependencias = async (anexoId: number) => {
    const response = await fetch(`https://anexos.onrender.com/api/subdependencias/${anexoId}`);
    if (!response.ok) throw new Error("Error al obtener subdependencias");
    return response.json();
  };
  
  export const createSubdependencia = async (nombre: string, anexo_id: number) => {
    const response = await fetch(`https://anexos.onrender.com/api/subdependencias`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, anexo_id }),
    });
  
    if (!response.ok) throw new Error("Error al crear subdependencia");
    return response.json();
  };
  
  export const updateSubdependencia = async (id: number, nombre: string, anexo_id: number) => {
    const response = await fetch(`https://anexos.onrender.com/api/subdependencias/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, anexo_id }),
    });
  
    if (!response.ok) throw new Error("Error al actualizar subdependencia");
    return response.json();
  };
  
  export const deleteSubdependencia = async (id: number) => {
    const response = await fetch(`https://anexos.onrender.com/api/subdependencias/${id}`, {
      method: "DELETE",
    });
  
    if (!response.ok) throw new Error("Error al eliminar subdependencia");
  };