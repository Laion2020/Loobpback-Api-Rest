import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Evento extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id_Evento?: string;

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
    type: 'date',
    required: true,
  })
  fecha_Inicio: string;

  @property({
    type: 'date',
  })
  fecha_Fin?: string;

  @property({
    type: 'date',
  })
  hora_Fin?: string;

  @property({
    type: 'date',
    required: true,
  })
  hora_Inicio: string;

  @property({
    type: 'string',
  })
  valorActualXDiaId?: string;

  @property({
    type: 'number',
  })
  clienteId?: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Evento>) {
    super(data);
  }
}

export interface EventoRelations {
  // describe navigational properties here
}

export type EventoWithRelations = Evento & EventoRelations;
