// ─── Primitives ───────────────────────────────────────────────────────────────

/** Monetary value always in centavos (integer). Never use decimals. */
export type Centavos = number;

/** ISO 8601 date string e.g. "2026-05-27T21:00:00.000Z" */
export type ISODateString = string;

// ─── Usuario ─────────────────────────────────────────────────────────────────

export interface Usuario {
  id:         string;
  nombre:     string;
  email:      string;
  foto_url:   string | null;
  creado_en:  ISODateString;
}

// ─── Supermercado / Sucursal ──────────────────────────────────────────────────

export interface Supermercado {
  id:        string;
  nombre:    string;
  logo_url:  string | null;
}

export interface Sucursal {
  id:              string;
  supermercado_id: string;
  supermercado:    Supermercado;
  nombre:          string;
  direccion:       string;
  latitud:         number;
  longitud:        number;
  distancia_metros: number | null;
}

// ─── Categoría / Marca ────────────────────────────────────────────────────────

export interface Categoria {
  id:     string;
  nombre: string;
  slug:   string;
}

export interface Marca {
  id:     string;
  nombre: string;
}

// ─── Producto ─────────────────────────────────────────────────────────────────

export interface Producto {
  id:          string;
  nombre:      string;
  descripcion: string | null;
  imagen_url:  string | null;
  ean:         string | null;
  marca:       Marca;
  categoria:   Categoria;
}

// ─── Precio / Descuento ───────────────────────────────────────────────────────

export type TipoDescuento = 'banco' | 'billetera' | 'promocion';

export interface Descuento {
  id:                  string;
  tipo:                TipoDescuento;
  descripcion:         string;
  porcentaje:          number;
  banco_id:            string | null;
  billetera_id:        string | null;
  valido_desde:        ISODateString;
  valido_hasta:        ISODateString;
}

export interface PrecioFinal {
  sucursal:             Sucursal;
  producto:             Producto;
  precio_centavos:      Centavos;
  precio_final_centavos: Centavos;
  descuentos:           Descuento[];
  actualizado_en:       ISODateString;
}

// ─── Banco / Billetera ────────────────────────────────────────────────────────

export interface Banco {
  id:     string;
  nombre: string;
}

export interface BilleteraVirtual {
  id:     string;
  nombre: string;
}

export interface BancoUsuario {
  id:      string;
  banco:   Banco;
  activo:  boolean;
}

export interface BilleteraUsuario {
  id:         string;
  billetera:  BilleteraVirtual;
  activo:     boolean;
}

// ─── Lista (Carrito) ──────────────────────────────────────────────────────────

export interface ListaItem {
  id:          string;
  lista_id:    string;
  producto:    Producto;
  cantidad:    number;
  agregado_en: ISODateString;
}

export interface Lista {
  id:          string;
  usuario_id:  string;
  nombre:      string;
  items:       ListaItem[];
  creado_en:   ISODateString;
  editado_en:  ISODateString;
}

// ─── Comparación ──────────────────────────────────────────────────────────────

export type EstadoDisponibilidad = 'todos_disponibles' | 'falta_alguno' | 'ninguno_disponible';

export interface AlternativaItem {
  lista_item_id:        string;
  producto:             Producto;
  disponible:           boolean;
  precio_centavos:      Centavos | null;
  precio_final_centavos: Centavos | null;
  descuentos:           Descuento[];
}

export interface Alternativa {
  sucursal:              Sucursal;
  disponibilidad:        EstadoDisponibilidad;
  items:                 AlternativaItem[];
  total_centavos:        Centavos;
  total_final_centavos:  Centavos;
  es_mejor_opcion:       boolean;
}

export interface ComparacionLista {
  lista:        Lista;
  alternativas: Alternativa[];
  generado_en:  ISODateString;
}

// ─── Chat ─────────────────────────────────────────────────────────────────────

export type RolMensaje = 'usuario' | 'bot';

export interface ChatMensaje {
  id:          string;
  sesion_id:   string;
  rol:         RolMensaje;
  contenido:   string;
  enviado_en:  ISODateString;
}

export interface ChatSesion {
  id:          string;
  usuario_id:  string;
  mensajes:    ChatMensaje[];
  creado_en:   ISODateString;
  editado_en:  ISODateString;
}

// ─── API Response wrappers ────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  data:        T[];
  total:       number;
  pagina:      number;
  por_pagina:  number;
}

export interface ApiResponse<T> {
  data: T;
}