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
  Negocio,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteNegocioController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/negocios', {
    responses: {
      '200': {
        description: 'Array of Cliente has many Negocio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Negocio)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Negocio>,
  ): Promise<Negocio[]> {
    return this.clienteRepository.negocios(id).find(filter);
  }

  @post('/clientes/{id}/negocios', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Negocio)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Cliente.prototype.DNI,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Negocio, {
            title: 'NewNegocioInCliente',
            exclude: ['id_Negocio'],
            optional: ['clienteId']
          }),
        },
      },
    }) negocio: Omit<Negocio, 'id_Negocio'>,
  ): Promise<Negocio> {
    return this.clienteRepository.negocios(id).create(negocio);
  }

  @patch('/clientes/{id}/negocios', {
    responses: {
      '200': {
        description: 'Cliente.Negocio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Negocio, {partial: true}),
        },
      },
    })
    negocio: Partial<Negocio>,
    @param.query.object('where', getWhereSchemaFor(Negocio)) where?: Where<Negocio>,
  ): Promise<Count> {
    return this.clienteRepository.negocios(id).patch(negocio, where);
  }

  @del('/clientes/{id}/negocios', {
    responses: {
      '200': {
        description: 'Cliente.Negocio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Negocio)) where?: Where<Negocio>,
  ): Promise<Count> {
    return this.clienteRepository.negocios(id).delete(where);
  }
}
