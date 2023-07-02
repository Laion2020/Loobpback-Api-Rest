import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Negocio} from './negocio.model';
import {Cliente} from './cliente.model';

@model({settings: {strict: false}})
export class Domicilio extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id_Domicilio?: string;

  @property({
    type: 'string',
    required: true,
  })
  calle: string;

  @property({
    type: 'number',
    required: true,
  })
  numero: number;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  provincia: string;

  @belongsTo(() => Negocio)
  negocioId: string;

  @belongsTo(() => Cliente)
  clienteId: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Domicilio>) {
    super(data);
  }
}

export interface DomicilioRelations {
  // describe navigational properties here
}

export type DomicilioWithRelations = Domicilio & DomicilioRelations;
