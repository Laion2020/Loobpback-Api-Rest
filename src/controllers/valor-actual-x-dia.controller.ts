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
import {ValorActualXDia} from '../models';
import {ValorActualXDiaRepository} from '../repositories';

export class ValorActualXDiaController {
  constructor(
    @repository(ValorActualXDiaRepository)
    public valorActualXDiaRepository : ValorActualXDiaRepository,
  ) {}

  @post('/valoresxdias')
  @response(200, {
    description: 'ValorActualXDia model instance',
    content: {'application/json': {schema: getModelSchemaRef(ValorActualXDia)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ValorActualXDia, {
            title: 'NewValorActualXDia',
            exclude: ['id_VAXD'],
          }),
        },
      },
    })
    valorActualXDia: Omit<ValorActualXDia, 'id_VAXD'>,
  ): Promise<ValorActualXDia> {
    return this.valorActualXDiaRepository.create(valorActualXDia);
  }

  @get('/valoresxdias/count')
  @response(200, {
    description: 'ValorActualXDia model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ValorActualXDia) where?: Where<ValorActualXDia>,
  ): Promise<Count> {
    return this.valorActualXDiaRepository.count(where);
  }

  @get('/valoresxdias')
  @response(200, {
    description: 'Array of ValorActualXDia model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ValorActualXDia, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ValorActualXDia) filter?: Filter<ValorActualXDia>,
  ): Promise<ValorActualXDia[]> {
    return this.valorActualXDiaRepository.find(filter);
  }

  @patch('/valoresxdias')
  @response(200, {
    description: 'ValorActualXDia PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ValorActualXDia, {partial: true}),
        },
      },
    })
    valorActualXDia: ValorActualXDia,
    @param.where(ValorActualXDia) where?: Where<ValorActualXDia>,
  ): Promise<Count> {
    return this.valorActualXDiaRepository.updateAll(valorActualXDia, where);
  }

  @get('/valoresxdias/{id}')
  @response(200, {
    description: 'ValorActualXDia model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ValorActualXDia, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ValorActualXDia, {exclude: 'where'}) filter?: FilterExcludingWhere<ValorActualXDia>
  ): Promise<ValorActualXDia> {
    return this.valorActualXDiaRepository.findById(id, filter);
  }

  @patch('/valoresxdias/{id}')
  @response(204, {
    description: 'ValorActualXDia PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ValorActualXDia, {partial: true}),
        },
      },
    })
    valorActualXDia: ValorActualXDia,
  ): Promise<void> {
    await this.valorActualXDiaRepository.updateById(id, valorActualXDia);
  }

  @put('/valoresxdias/{id}')
  @response(204, {
    description: 'ValorActualXDia PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() valorActualXDia: ValorActualXDia,
  ): Promise<void> {
    await this.valorActualXDiaRepository.replaceById(id, valorActualXDia);
  }

  @del('/valoresxdias/{id}')
  @response(204, {
    description: 'ValorActualXDia DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.valorActualXDiaRepository.deleteById(id);
  }
}
