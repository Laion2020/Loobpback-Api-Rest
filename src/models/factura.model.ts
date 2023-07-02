import {Entity, model, property, hasMany} from '@loopback/repository';
import {LineaDeFactura} from './linea-de-factura.model';

@model({settings: {strict: false}})
export class Factura extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id_Factura?: string;

  @property({
    type: 'string',
    default: "inserte descripcion aqui",
  })
  descripcion?: string;

  @property({
    type: 'number',
    required: true,
  })
  monto: number;

  @property({
    type: 'array',
    itemType: 'object',
  })
  lista_De_Lineas?: object[];

  @hasMany(() => LineaDeFactura)
  lineaDeFacturas: LineaDeFactura[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Factura>) {
    super(data);
  }
}

export interface FacturaRelations {
  // describe navigational properties here
}

export type FacturaWithRelations = Factura & FacturaRelations;
