
import { PatrimonioData } from "@/types/patrimonio";

export const createPatrimonio = async (data: PatrimonioData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/mobiliario`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error al guardar");
    }

    const result = await res.json();
    return result;
  } catch (error) {
    throw error;
  }
};
