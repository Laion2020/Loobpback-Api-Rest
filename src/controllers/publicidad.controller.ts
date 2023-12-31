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
import {Publicidad} from '../models';
import {PublicidadRepository} from '../repositories';

export class PublicidadController {
  constructor(
    @repository(PublicidadRepository)
    public publicidadRepository : PublicidadRepository,
  ) {}

  @post('/publicidades')
  @response(200, {
    description: 'Publicidad model instance',
    content: {'application/json': {schema: getModelSchemaRef(Publicidad)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Publicidad, {
            title: 'NewPublicidad',
            exclude: ['id_Publicidad'],
          }),
        },
      },
    })
    publicidad: Omit<Publicidad, 'id_Publicidad'>,
  ): Promise<Publicidad> {
    return this.publicidadRepository.create(publicidad);
  }

  @get('/publicidades/count')
  @response(200, {
    description: 'Publicidad model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Publicidad) where?: Where<Publicidad>,
  ): Promise<Count> {
    return this.publicidadRepository.count(where);
  }

  @get('/publicidades')
  @response(200, {
    description: 'Array of Publicidad model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Publicidad, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Publicidad) filter?: Filter<Publicidad>,
  ): Promise<Publicidad[]> {
    return this.publicidadRepository.find(filter);
  }

  @patch('/publicidades')
  @response(200, {
    description: 'Publicidad PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Publicidad, {partial: true}),
        },
      },
    })
    publicidad: Publicidad,
    @param.where(Publicidad) where?: Where<Publicidad>,
  ): Promise<Count> {
    return this.publicidadRepository.updateAll(publicidad, where);
  }

  @get('/publicidades/{id}')
  @response(200, {
    description: 'Publicidad model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Publicidad, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Publicidad, {exclude: 'where'}) filter?: FilterExcludingWhere<Publicidad>
  ): Promise<Publicidad> {
    return this.publicidadRepository.findById(id, filter);
  }

  @patch('/publicidades/{id}')
  @response(204, {
    description: 'Publicidad PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Publicidad, {partial: true}),
        },
      },
    })
    publicidad: Publicidad,
  ): Promise<void> {
    await this.publicidadRepository.updateById(id, publicidad);
  }

  @put('/publicidades/{id}')
  @response(204, {
    description: 'Publicidad PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() publicidad: Publicidad,
  ): Promise<void> {
    await this.publicidadRepository.replaceById(id, publicidad);
  }

  @del('/publicidades/{id}')
  @response(204, {
    description: 'Publicidad DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.publicidadRepository.deleteById(id);
  }
}
