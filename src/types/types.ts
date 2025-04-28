
// types/types.ts

// --- Para los selects del formulario ---
export interface Anexo {
  id: number;
  nombre: string;
}

export interface Subdependencia {
  id: number;
  nombre: string;
}

// --- Shape que usa PatrimonioForm para creación/edición ---
export interface FormularioPatrimonio {
  id: string;
  anexo: string;
  subdependencia: string;
  rubro: string;
  clase: string;
  descripcion: string;
  resolucionNumero: string;
  resolucionTipo: string;
  fechaResolucion: string;
  estado: string;
  comentarios: string;
  foto_url: string;
  opciones: {
    noDado: boolean;
    reparacion: boolean;
    paraBaja: boolean;
    faltante: boolean;
    sobrante: boolean;
    etiqueta: boolean;
  };
}

// --- Lo que envia PatrimonioForm cuando guardas ---
export interface FormData {
  descripcion: string;
  fechaResolucion: string;
  estado: string;
  comentarios: string;
  resolucionNumero: string;
  resolucionTipo: string;
}

// --- Shape que devuelve GET /api/mobiliario (ahora con ubicación) ---
export interface Mobiliario {
  id: string;
  descripcion: string;
  resolucion: string | null;
  resolucion_tipo: string | null;
  resolucion_numero: string | null;
  fecha_resolucion: string | null;
  estado_conservacion: string | null;
  comentarios: string | null;
  foto_url: string | null;

  ubicacion_id: number;
  subdependencia: string;
  anexo: string;

  no_dado: boolean;
  para_reparacion: boolean;
  para_baja: boolean;
  faltante: boolean;
  sobrante: boolean;
  problema_etiqueta: boolean;

  fecha_creacion: string;
  fecha_actualizacion: string;
}

// --- 🔥 FALTABA AGREGAR ESTA INTERFAZ 🔥 ---
// Este es el shape que se manda cuando creas un patrimonio
export interface PatrimonioData {
  id: string;
  ubicacion_id: number;
  descripcion: string;
  resolucion_numero: string;
  resolucion_tipo: string;
  fecha_resolucion: string;
  estado_conservacion: string;
  no_dado: boolean;
  reparacion: boolean;
  para_baja: boolean;
  faltante: boolean;
  sobrante: boolean;
  etiqueta: boolean;
  comentarios: string;
  foto_url: string;
}
