
// --- Para los selects del formulario ---
export interface Anexo {
  id: number;
  nombre: string;
}

export interface Subdependencia {
  id: number;
  nombre: string;
}

// --- Datos que se envían al crear un nuevo mobiliario ---
export interface PatrimonioData {
  id: string;
  ubicacion_id: number;
  id_clase?: number;
  id_rubro?: number;
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

// --- Shape que usa PatrimonioForm para creación/edición ---
export interface FormularioPatrimonio {
  id: string;
  anexo: string;
  subdependencia: string;
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

// --- Datos que devuelve el backend desde GET /api/mobiliario ---
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

  rubro?: string;
  clase?: string;
}

// --- Modelo para editar un mobiliario (PUT) ---
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
  id_clase?: number;
  id_rubro?: number;
}

// --- Datos reducidos para la vista de últimos registrados ---
export interface MobiliarioUltimo {
  id: string;
  id_mobiliario: string;
  descripcion: string;
  clase_bien: string | null;
  rubro: string | null;
  anexo: string;
  subdependencia: string;
  direccion_anexo: string | null;
  piso: string | null;
  estado_conservacion: string | null;
  fecha_resolucion: string | null;
  resolucion: string | null;
  foto_url: string | null;
  no_dado: boolean;
  para_reparacion: boolean;
  para_baja: boolean;
  faltante: boolean;
  sobrante: boolean;
  problema_etiqueta: boolean;
  fecha_creacion: string;
  fecha_actualizacion: string;
  comentarios: string | null;
}
