import {Entity, model, property, hasOne, belongsTo} from '@loopback/repository';
import {Negocio} from './negocio.model';
import {Factura} from './factura.model';

@model({settings: {strict: false}})
export class LineaDeFactura extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id_Linea: number;

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

  @belongsTo(() => Factura)
  facturaId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<LineaDeFactura>) {
    super(data);
  }
}

export interface LineaDeFacturaRelations {
  // describe navigational properties here
}

export type LineaDeFacturaWithRelations = LineaDeFactura & LineaDeFacturaRelations;
