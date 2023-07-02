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
  Evento,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteEventoController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/eventos', {
    responses: {
      '200': {
        description: 'Array of Cliente has many Evento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Evento)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Evento>,
  ): Promise<Evento[]> {
    return this.clienteRepository.eventos(id).find(filter);
  }

  @post('/clientes/{id}/eventos', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Evento)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Cliente.prototype.DNI,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Evento, {
            title: 'NewEventoInCliente',
            exclude: ['id_Evento'],
            optional: ['clienteId']
          }),
        },
      },
    }) evento: Omit<Evento, 'id_Evento'>,
  ): Promise<Evento> {
    return this.clienteRepository.eventos(id).create(evento);
  }

  @patch('/clientes/{id}/eventos', {
    responses: {
      '200': {
        description: 'Cliente.Evento PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Evento, {partial: true}),
        },
      },
    })
    evento: Partial<Evento>,
    @param.query.object('where', getWhereSchemaFor(Evento)) where?: Where<Evento>,
  ): Promise<Count> {
    return this.clienteRepository.eventos(id).patch(evento, where);
  }

  @del('/clientes/{id}/eventos', {
    responses: {
      '200': {
        description: 'Cliente.Evento DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Evento)) where?: Where<Evento>,
  ): Promise<Count> {
    return this.clienteRepository.eventos(id).delete(where);
  }
}
