import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Cliente,
  Usuario,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteUsuarioController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/usuario', {
    responses: {
      '200': {
        description: 'Cliente has one Usuario',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Usuario),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Usuario>,
  ): Promise<Usuario> {
    return this.clienteRepository.usuario(id).get(filter);
  }

  @post('/clientes/{id}/usuario', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Cliente.prototype.DNI,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuarioInCliente',
            exclude: ['id_Usuario'],
            optional: ['clienteId']
          }),
        },
      },
    }) usuario: Omit<Usuario, 'id_Usuario'>,
  ): Promise<Usuario> {
    return this.clienteRepository.usuario(id).create(usuario);
  }

  @patch('/clientes/{id}/usuario', {
    responses: {
      '200': {
        description: 'Cliente.Usuario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Partial<Usuario>,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.clienteRepository.usuario(id).patch(usuario, where);
  }

  @del('/clientes/{id}/usuario', {
    responses: {
      '200': {
        description: 'Cliente.Usuario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.clienteRepository.usuario(id).delete(where);
  }
}
