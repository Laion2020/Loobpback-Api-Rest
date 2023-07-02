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
  ValorActualXDia,
  Evento,
} from '../models';
import {ValorActualXDiaRepository} from '../repositories';

export class ValorActualXDiaEventoController {
  constructor(
    @repository(ValorActualXDiaRepository) protected valorActualXDiaRepository: ValorActualXDiaRepository,
  ) { }

  @get('/valor-actual-x-dias/{id}/eventos', {
    responses: {
      '200': {
        description: 'Array of ValorActualXDia has many Evento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Evento)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Evento>,
  ): Promise<Evento[]> {
    return this.valorActualXDiaRepository.eventos(id).find(filter);
  }

  @post('/valor-actual-x-dias/{id}/eventos', {
    responses: {
      '200': {
        description: 'ValorActualXDia model instance',
        content: {'application/json': {schema: getModelSchemaRef(Evento)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof ValorActualXDia.prototype.id_VAXD,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Evento, {
            title: 'NewEventoInValorActualXDia',
            exclude: ['id_Evento'],
            optional: ['valorActualXDiaId']
          }),
        },
      },
    }) evento: Omit<Evento, 'id_Evento'>,
  ): Promise<Evento> {
    return this.valorActualXDiaRepository.eventos(id).create(evento);
  }

  @patch('/valor-actual-x-dias/{id}/eventos', {
    responses: {
      '200': {
        description: 'ValorActualXDia.Evento PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
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
    return this.valorActualXDiaRepository.eventos(id).patch(evento, where);
  }

  @del('/valor-actual-x-dias/{id}/eventos', {
    responses: {
      '200': {
        description: 'ValorActualXDia.Evento DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Evento)) where?: Where<Evento>,
  ): Promise<Count> {
    return this.valorActualXDiaRepository.eventos(id).delete(where);
  }
}
