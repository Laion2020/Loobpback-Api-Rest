import {Entity, belongsTo, hasMany, hasOne, model, property} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Domicilio} from './domicilio.model';
import {LineaDeFactura} from './linea-de-factura.model';
import {LineaDeVenta} from './linea-de-venta.model';
import {Publicidad} from './publicidad.model';

@model({settings: {strict: false}})
export class Negocio extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id_Negocio?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  id_Usuario: string;

  @property({
    type: 'string',
    required: false,
    itemType: 'string',
  })
  imagen1: string;

  @property({
    type: 'string',
    required: false,
    itemType: 'string',
  })
  imagen2: string;

  @property({
    type: 'string',
    required: false,
    itemType: 'string',
  })
  imagen3: string;

  @property({
    type: 'string',
    required: false,
    itemType: 'string',
  })
  imagen4: string;


  @property({
    type: 'object',
    required: true,
  })
  direccion: object;

  @property({
    type: 'date',
    generated: true,
    required: false,
  })
  fecha_Inicio: string;

  @property({
    type: 'date',
  })
  fecha_Fin?: string;

  @hasMany(() => Publicidad)
  publicidads: Publicidad[];

  @hasMany(() => Domicilio)
  domicilios: Domicilio[];

  @belongsTo(() => Cliente)
  clienteId: number;

  @hasOne(() => LineaDeFactura)
  lineaDeFactura: LineaDeFactura;

  @hasOne(() => LineaDeVenta)
  lineaDeVenta: LineaDeVenta;

  @property({
    type: 'string',
  })
  lineaDeFacturaId?: string;

  @property({
    type: 'string',
  })
  lineaDeVentaId?: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Negocio>) {
    super(data);
  }
}

export interface NegocioRelations {
  // describe navigational properties here
}

export type NegocioWithRelations = Negocio & NegocioRelations;
