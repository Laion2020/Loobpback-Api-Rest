import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Negocio} from './negocio.model';

@model({settings: {strict: false}})
export class Publicidad extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id_Publicidad?: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @belongsTo(() => Negocio)
  negocio: Negocio;

  @property({
    type: 'string',
  })
  negocioId?: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Publicidad>) {
    super(data);
  }
}

export interface PublicidadRelations {
  // describe navigational properties here
}

export type PublicidadWithRelations = Publicidad & PublicidadRelations;

