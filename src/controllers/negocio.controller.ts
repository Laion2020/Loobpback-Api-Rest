import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Negocio} from '../models';
import {NegocioRepository} from '../repositories';

export class NegocioController {
  constructor(
    @repository(NegocioRepository)
    public negocioRepository : NegocioRepository,
  ) {}

  @post('/negocios')
  @response(200, {
    description: 'Negocio model instance',
    content: {'application/json': {schema: getModelSchemaRef(Negocio)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Negocio, {
            title: 'NewNegocio',
            exclude: ['id_Negocio'],
          }),
        },
      },
    })
    negocio: Omit<Negocio, 'id_Negocio'>,
  ): Promise<Negocio> {
    return this.negocioRepository.create(negocio);
  }

  @get('/negocios/count')
  @response(200, {
    description: 'Negocio model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Negocio) where?: Where<Negocio>,
  ): Promise<Count> {
    return this.negocioRepository.count(where);
  }

  @get('/negocios')
  @response(200, {
    description: 'Array of Negocio model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Negocio, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Negocio) filter?: Filter<Negocio>,
  ): Promise<Negocio[]> {
    return this.negocioRepository.find(filter);
  }

  @patch('/negocios')
  @response(200, {
    description: 'Negocio PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Negocio, {partial: true}),
        },
      },
    })
    negocio: Negocio,
    @param.where(Negocio) where?: Where<Negocio>,
  ): Promise<Count> {
    return this.negocioRepository.updateAll(negocio, where);
  }

  @get('/negocios/{id}')
  @response(200, {
    description: 'Negocio model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Negocio, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Negocio, {exclude: 'where'}) filter?: FilterExcludingWhere<Negocio>
  ): Promise<Negocio> {
    return this.negocioRepository.findById(id, filter);
  }

  @patch('/negocios/{id}')
  @response(204, {
    description: 'Negocio PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Negocio, {partial: true}),
        },
      },
    })
    negocio: Negocio,
  ): Promise<void> {
    await this.negocioRepository.updateById(id, negocio);
  }

  @put('/negocios/{id}')
  @response(204, {
    description: 'Negocio PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() negocio: Negocio,
  ): Promise<void> {
    await this.negocioRepository.replaceById(id, negocio);
  }

  @del('/negocios/{id}')
  @response(204, {
    description: 'Negocio DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.negocioRepository.deleteById(id);
  }
}
