// ---------------------------------- Entidades ----------------------------------

export interface Anexo {
  id: number;
  nombre: string;
}

export interface Subdependencia {
  id: number;
  nombre: string;
  anexo_id: number;
}

export interface ClaseBien {
  id_clase: number;
  descripcion: string;
}

export interface Rubro {
  id_rubro: number;
  nombre: string;
}

export interface Mobiliario {
  id: string;
  descripcion: string;
  resolucion: string;
  fecha_resolucion: string;
  estado_conservacion: string;
  estado_control?: string;
  historial_movimientos?: string;
  no_dado: boolean;
  para_reparacion: boolean;
  para_baja: boolean;
  faltante: boolean;
  sobrante: boolean;
  problema_etiqueta: boolean;
  comentarios?: string;
  foto_url?: string;
  anexo: string;
  subdependencia: string;
  rubro?: string;
  clase?: string;
  id_rubro?: number;
  id_clase?: number;
  clase_bien?: string;

  // 👇 campos agregados para evitar errores de compilación
  ubicacion_id: number;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

// Últimos mobiliarios devueltos por API para Listados
export interface MobiliarioUltimo {
  id_mobiliario: string;
  descripcion: string;
  foto_url?: string;
  rubro?: string;
  clase_bien?: string;
  anexo: string;
  subdependencia: string;
  resolucion: string;
  estado_conservacion?: string;
  fecha_resolucion?: string;
}

// ---------------------------------- Formularios ----------------------------------

export interface FormularioPatrimonio {
  id: string;
  anexo: string;
  subdependencia: string;
  rubro: string;
  clase: string;
  id_rubro?: number;
  id_clase?: number;
  descripcion: string;
  resolucionNumero?: string;
  resolucionTipo?: string;
  fechaResolucion?: string;
  estado?: string;
  comentarios?: string;
  foto_url?: string;
  opciones: {
    noDado: boolean;
    reparacion: boolean;
    paraBaja: boolean;
    faltante: boolean;
    sobrante: boolean;
    etiqueta: boolean;
  };
}

// ---------------------------------- Payloads API ----------------------------------

export interface PatrimonioCreatePayload {
  id: string;
  ubicacion_id: number;
  clase_bien_id?: number;
  rubro_id?: number;
  descripcion: string;
  resolucion_numero?: string;
  resolucion_tipo?: string;
  fecha_resolucion?: string;
  estado_conservacion?: string;
  estado_control?: string;
  historial_movimientos?: string;
  no_dado: boolean;
  para_reparacion: boolean;
  para_baja: boolean;
  faltante: boolean;
  sobrante: boolean;
  problema_etiqueta: boolean;
  comentarios?: string;
  foto_url?: string;
}

export type PatrimonioUpdatePayload = Partial<PatrimonioCreatePayload>;

