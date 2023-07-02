import {Entity, model, property, hasMany} from '@loopback/repository';
import {Evento} from './evento.model';

@model({settings: {strict: false}})
export class ValorActualXDia extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id_VAXD?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @hasMany(() => Evento)
  eventos: Evento[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ValorActualXDia>) {
    super(data);
  }
}

export interface ValorActualXDiaRelations {
  // describe navigational properties here
}

export type ValorActualXDiaWithRelations = ValorActualXDia & ValorActualXDiaRelations;
