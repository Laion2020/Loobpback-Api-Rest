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
  Domicilio,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteDomicilioController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/domicilios', {
    responses: {
      '200': {
        description: 'Array of Cliente has many Domicilio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Domicilio)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Domicilio>,
  ): Promise<Domicilio[]> {
    return this.clienteRepository.domicilios(id).find(filter);
  }

  @post('/clientes/{id}/domicilios', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Domicilio)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Cliente.prototype.DNI,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Domicilio, {
            title: 'NewDomicilioInCliente',
            exclude: ['id_Domicilio'],
            optional: ['clienteId']
          }),
        },
      },
    }) domicilio: Omit<Domicilio, 'id_Domicilio'>,
  ): Promise<Domicilio> {
    return this.clienteRepository.domicilios(id).create(domicilio);
  }

  @patch('/clientes/{id}/domicilios', {
    responses: {
      '200': {
        description: 'Cliente.Domicilio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Domicilio, {partial: true}),
        },
      },
    })
    domicilio: Partial<Domicilio>,
    @param.query.object('where', getWhereSchemaFor(Domicilio)) where?: Where<Domicilio>,
  ): Promise<Count> {
    return this.clienteRepository.domicilios(id).patch(domicilio, where);
  }

  @del('/clientes/{id}/domicilios', {
    responses: {
      '200': {
        description: 'Cliente.Domicilio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Domicilio)) where?: Where<Domicilio>,
  ): Promise<Count> {
    return this.clienteRepository.domicilios(id).delete(where);
  }
}
