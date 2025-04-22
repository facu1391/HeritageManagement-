
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
  
  export interface Anexo {
    id: number;
    nombre: string;
  }
  
  export interface Subdependencia {
    id: number;
    nombre: string;
  }
  
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
  
  export interface Mobiliario {
    id: string;
    descripcion: string;
    resolucion: string;
    resolucion_tipo: string;
    resolucion_numero: string;
    fecha_resolucion: string | null;
    estado_conservacion: string;
    comentarios: string;
    foto_url: string;
    ubicacion_id: number;
    no_dado: boolean;
    reparacion: boolean;
    para_baja: boolean;
    faltante: boolean;
    sobrante: boolean;
    etiqueta: boolean;
  }
  
  // Se actualiza la interfaz de datos para la edición
  export interface FormData {
    descripcion: string;
    fechaResolucion: string;
    estado: string;
    comentarios: string;
    resolucionNumero: string;
    resolucionTipo: string;
  }
  