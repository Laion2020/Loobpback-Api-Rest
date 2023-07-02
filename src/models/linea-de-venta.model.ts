import {Entity, model, property, hasOne, belongsTo} from '@loopback/repository';
import {Negocio} from './negocio.model';
import {Venta} from './venta.model';

@model({settings: {strict: false}})
export class LineaDeVenta extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id_Linea?: number;

  @property({
    type: 'number',
    required: true,
  })
  sub_Total: number;

  @property({
    type: 'string',
  })
  negocioId?: string;
  @hasOne(() => Negocio)
  negocio: Negocio;

  @belongsTo(() => Venta)
  ventaId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<LineaDeVenta>) {
    super(data);
  }
}

export interface LineaDeVentaRelations {
  // describe navigational properties here
}

export type LineaDeVentaWithRelations = LineaDeVenta & LineaDeVentaRelations;
