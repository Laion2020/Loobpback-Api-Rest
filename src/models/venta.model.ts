import {Entity, model, property, belongsTo, hasMany, hasOne} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {LineaDeVenta} from './linea-de-venta.model';
import {Recibo} from './recibo.model';

@model({settings: {strict: false}})
export class Venta extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id_Venta?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'date',
    required: true,
  })
  hora: string;

  @property({
    type: 'string',
    default: "inserte descripcion de la venta",
  })
  descripcion?: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @property({
    type: 'array',
    itemType: 'object',
  })
  lista_De_Lineas?: object[];

  @belongsTo(() => Cliente)
  clienteId: number;

  @hasMany(() => LineaDeVenta)
  lineaDeVentas: LineaDeVenta[];

  @hasOne(() => Recibo)
  recibo: Recibo;

  @property({
    type: 'string',
  })
  reciboId?: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Venta>) {
    super(data);
  }
}

export interface VentaRelations {
  // describe navigational properties here
}

export type VentaWithRelations = Venta & VentaRelations;
