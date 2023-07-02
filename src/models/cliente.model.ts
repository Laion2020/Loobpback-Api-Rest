import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {Usuario} from './usuario.model';
import {Domicilio} from './domicilio.model';
import {Negocio} from './negocio.model';
import {Venta} from './venta.model';
import {Evento} from './evento.model';

@model({settings: {strict: false}})
export class Cliente extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  DNI: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'object',
    required: true,
  })
  direccion: object;

  @property({
    type: 'string',
  })
  usuarioId?: string;

  @hasOne(() => Usuario)
  usuario: Usuario;

  @hasMany(() => Domicilio)
  domicilios: Domicilio[];

  @hasMany(() => Negocio)
  negocios: Negocio[];

  @hasMany(() => Venta)
  ventas: Venta[];

  @hasMany(() => Evento)
  eventos: Evento[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
