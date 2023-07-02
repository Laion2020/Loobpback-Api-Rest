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
import {Recibo} from '../models';
import {ReciboRepository} from '../repositories';

export class ReciboController {
  constructor(
    @repository(ReciboRepository)
    public reciboRepository : ReciboRepository,
  ) {}

  @post('/recibos')
  @response(200, {
    description: 'Recibo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Recibo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recibo, {
            title: 'NewRecibo',
            exclude: ['id_Recibo'],
          }),
        },
      },
    })
    recibo: Omit<Recibo, 'id_Recibo'>,
  ): Promise<Recibo> {
    return this.reciboRepository.create(recibo);
  }

  @get('/recibos/count')
  @response(200, {
    description: 'Recibo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Recibo) where?: Where<Recibo>,
  ): Promise<Count> {
    return this.reciboRepository.count(where);
  }

  @get('/recibos')
  @response(200, {
    description: 'Array of Recibo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Recibo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Recibo) filter?: Filter<Recibo>,
  ): Promise<Recibo[]> {
    return this.reciboRepository.find(filter);
  }

  @patch('/recibos')
  @response(200, {
    description: 'Recibo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recibo, {partial: true}),
        },
      },
    })
    recibo: Recibo,
    @param.where(Recibo) where?: Where<Recibo>,
  ): Promise<Count> {
    return this.reciboRepository.updateAll(recibo, where);
  }

  @get('/recibos/{id}')
  @response(200, {
    description: 'Recibo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Recibo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Recibo, {exclude: 'where'}) filter?: FilterExcludingWhere<Recibo>
  ): Promise<Recibo> {
    return this.reciboRepository.findById(id, filter);
  }

  @patch('/recibos/{id}')
  @response(204, {
    description: 'Recibo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recibo, {partial: true}),
        },
      },
    })
    recibo: Recibo,
  ): Promise<void> {
    await this.reciboRepository.updateById(id, recibo);
  }

  @put('/recibos/{id}')
  @response(204, {
    description: 'Recibo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() recibo: Recibo,
  ): Promise<void> {
    await this.reciboRepository.replaceById(id, recibo);
  }

  @del('/recibos/{id}')
  @response(204, {
    description: 'Recibo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.reciboRepository.deleteById(id);
  }
}
