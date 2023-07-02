import {Entity, model, property, hasOne} from '@loopback/repository';
import {Venta} from './venta.model';

@model({settings: {strict: false}})
export class Recibo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id_Recibo?: string;
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
    type: 'number',
    required: true,
  })
  valor: number;

  @property({
    type: 'string',
    default: "inserte descripcion aqui",
  })
  descripcion?: string;

  @property({
    type: 'string',
  })
  ventaId?: string;

  @hasOne(() => Venta)
  venta: Venta;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Recibo>) {
    super(data);
  }
}

export interface ReciboRelations {
  // describe navigational properties here
}

export type ReciboWithRelations = Recibo & ReciboRelations;
