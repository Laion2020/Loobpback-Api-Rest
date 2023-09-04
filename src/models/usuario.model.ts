import {Entity, hasOne, model, property} from '@loopback/repository';
import {Cliente} from './cliente.model';

@model({settings: {strict: false}})
export class Usuario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id_Usuario?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre_Usuario: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'boolean',
    required: false,
    default: false,
  })
  admin: boolean;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @hasOne(() => Cliente, {keyTo: 'DNI'})
  UsuarioyCliente: Cliente;

  @hasOne(() => Cliente)
  cliente: Cliente;

  @property({
    type: 'number',
  })
  clienteId?: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
