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
import {Domicilio} from '../models';
import {DomicilioRepository} from '../repositories';

export class DomicilioController {
  constructor(
    @repository(DomicilioRepository)
    public domicilioRepository : DomicilioRepository,
  ) {}

  @post('/domicilios')
  @response(200, {
    description: 'Domicilio model instance',
    content: {'application/json': {schema: getModelSchemaRef(Domicilio)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Domicilio, {
            title: 'NewDomicilio',
            exclude: ['id_Domicilio'],
          }),
        },
      },
    })
    domicilio: Omit<Domicilio, 'id_Domicilio'>,
  ): Promise<Domicilio> {
    return this.domicilioRepository.create(domicilio);
  }

  @get('/domicilios/count')
  @response(200, {
    description: 'Domicilio model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Domicilio) where?: Where<Domicilio>,
  ): Promise<Count> {
    return this.domicilioRepository.count(where);
  }

  @get('/domicilios')
  @response(200, {
    description: 'Array of Domicilio model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Domicilio, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Domicilio) filter?: Filter<Domicilio>,
  ): Promise<Domicilio[]> {
    return this.domicilioRepository.find(filter);
  }

  @patch('/domicilios')
  @response(200, {
    description: 'Domicilio PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Domicilio, {partial: true}),
        },
      },
    })
    domicilio: Domicilio,
    @param.where(Domicilio) where?: Where<Domicilio>,
  ): Promise<Count> {
    return this.domicilioRepository.updateAll(domicilio, where);
  }

  @get('/domicilios/{id}')
  @response(200, {
    description: 'Domicilio model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Domicilio, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Domicilio, {exclude: 'where'}) filter?: FilterExcludingWhere<Domicilio>
  ): Promise<Domicilio> {
    return this.domicilioRepository.findById(id, filter);
  }

  @patch('/domicilios/{id}')
  @response(204, {
    description: 'Domicilio PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Domicilio, {partial: true}),
        },
      },
    })
    domicilio: Domicilio,
  ): Promise<void> {
    await this.domicilioRepository.updateById(id, domicilio);
  }

  @put('/domicilios/{id}')
  @response(204, {
    description: 'Domicilio PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() domicilio: Domicilio,
  ): Promise<void> {
    await this.domicilioRepository.replaceById(id, domicilio);
  }

  @del('/domicilios/{id}')
  @response(204, {
    description: 'Domicilio DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.domicilioRepository.deleteById(id);
  }
}
