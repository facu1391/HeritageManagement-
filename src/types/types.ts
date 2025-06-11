
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
  anexo: string; // nombre del anexo (editable por select)
  subdependencia: string; // nombre de la subdependencia (editable por select)
  rubro: string;
  clase: string;
  id_rubro?: number;
  id_clase?: number;
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

// --- Lo que se devuelve desde GET /api/mobiliario ---
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
  subdependencia: string; // nombre real (join)
  anexo: string; // nombre real (join)

  no_dado: boolean;
  para_reparacion: boolean;
  para_baja: boolean;
  faltante: boolean;
  sobrante: boolean;
  problema_etiqueta: boolean;

  fecha_creacion: string;
  fecha_actualizacion: string;

  // opcional: usado para frontend
  rubro?: string;
  clase?: string;
}

// --- Datos que se envían al crear un nuevo mobiliario ---
export interface PatrimonioData {
  id: string;
  ubicacion_id: number;
  descripcion: string;
  resolucion_numero: string;
  resolucion_tipo: string;
  fecha_resolucion: string;
  estado_conservacion: string;
  comentarios: string;
  foto_url: string;
  no_dado: boolean;
  reparacion: boolean;
  para_baja: boolean;
  faltante: boolean;
  sobrante: boolean;
  etiqueta: boolean;
}
