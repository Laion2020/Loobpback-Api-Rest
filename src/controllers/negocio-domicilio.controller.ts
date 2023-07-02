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
  Negocio,
  Domicilio,
} from '../models';
import {NegocioRepository} from '../repositories';

export class NegocioDomicilioController {
  constructor(
    @repository(NegocioRepository) protected negocioRepository: NegocioRepository,
  ) { }

  @get('/negocios/{id}/domicilios', {
    responses: {
      '200': {
        description: 'Array of Negocio has many Domicilio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Domicilio)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Domicilio>,
  ): Promise<Domicilio[]> {
    return this.negocioRepository.domicilios(id).find(filter);
  }

  @post('/negocios/{id}/domicilios', {
    responses: {
      '200': {
        description: 'Negocio model instance',
        content: {'application/json': {schema: getModelSchemaRef(Domicilio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Negocio.prototype.id_Negocio,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Domicilio, {
            title: 'NewDomicilioInNegocio',
            exclude: ['id_Domicilio'],
            optional: ['negocioId']
          }),
        },
      },
    }) domicilio: Omit<Domicilio, 'id_Domicilio'>,
  ): Promise<Domicilio> {
    return this.negocioRepository.domicilios(id).create(domicilio);
  }

  @patch('/negocios/{id}/domicilios', {
    responses: {
      '200': {
        description: 'Negocio.Domicilio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
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
    return this.negocioRepository.domicilios(id).patch(domicilio, where);
  }

  @del('/negocios/{id}/domicilios', {
    responses: {
      '200': {
        description: 'Negocio.Domicilio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Domicilio)) where?: Where<Domicilio>,
  ): Promise<Count> {
    return this.negocioRepository.domicilios(id).delete(where);
  }
}
