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
  Publicidad,
} from '../models';
import {NegocioRepository} from '../repositories';

export class NegocioPublicidadController {
  constructor(
    @repository(NegocioRepository) protected negocioRepository: NegocioRepository,
  ) { }

  @get('/negocios/{id}/publicidads', {
    responses: {
      '200': {
        description: 'Array of Negocio has many Publicidad',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Publicidad)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Publicidad>,
  ): Promise<Publicidad[]> {
    return this.negocioRepository.publicidads(id).find(filter);
  }

  @post('/negocios/{id}/publicidads', {
    responses: {
      '200': {
        description: 'Negocio model instance',
        content: {'application/json': {schema: getModelSchemaRef(Publicidad)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Negocio.prototype.id_Negocio,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Publicidad, {
            title: 'NewPublicidadInNegocio',
            exclude: ['id_Publicidad'],
            optional: ['negocioId']
          }),
        },
      },
    }) publicidad: Omit<Publicidad, 'id_Publicidad'>,
  ): Promise<Publicidad> {
    return this.negocioRepository.publicidads(id).create(publicidad);
  }

  @patch('/negocios/{id}/publicidads', {
    responses: {
      '200': {
        description: 'Negocio.Publicidad PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Publicidad, {partial: true}),
        },
      },
    })
    publicidad: Partial<Publicidad>,
    @param.query.object('where', getWhereSchemaFor(Publicidad)) where?: Where<Publicidad>,
  ): Promise<Count> {
    return this.negocioRepository.publicidads(id).patch(publicidad, where);
  }

  @del('/negocios/{id}/publicidads', {
    responses: {
      '200': {
        description: 'Negocio.Publicidad DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Publicidad)) where?: Where<Publicidad>,
  ): Promise<Count> {
    return this.negocioRepository.publicidads(id).delete(where);
  }
}
