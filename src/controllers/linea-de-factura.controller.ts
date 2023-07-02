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
import {LineaDeFactura} from '../models';
import {LineaDeFacturaRepository} from '../repositories';

export class LineaDeFacturaController {
  constructor(
    @repository(LineaDeFacturaRepository)
    public lineaDeFacturaRepository : LineaDeFacturaRepository,
  ) {}

  @post('/lineasdefacturas')
  @response(200, {
    description: 'LineaDeFactura model instance',
    content: {'application/json': {schema: getModelSchemaRef(LineaDeFactura)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineaDeFactura, {
            title: 'NewLineaDeFactura',
            exclude: ['id_Linea'],
          }),
        },
      },
    })
    lineaDeFactura: Omit<LineaDeFactura, 'id_Linea'>,
  ): Promise<LineaDeFactura> {
    return this.lineaDeFacturaRepository.create(lineaDeFactura);
  }

  @get('/lineasdefacturas/count')
  @response(200, {
    description: 'LineaDeFactura model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(LineaDeFactura) where?: Where<LineaDeFactura>,
  ): Promise<Count> {
    return this.lineaDeFacturaRepository.count(where);
  }

  @get('/lineasdefacturas')
  @response(200, {
    description: 'Array of LineaDeFactura model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(LineaDeFactura, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(LineaDeFactura) filter?: Filter<LineaDeFactura>,
  ): Promise<LineaDeFactura[]> {
    return this.lineaDeFacturaRepository.find(filter);
  }

  @patch('/lineasdefacturas')
  @response(200, {
    description: 'LineaDeFactura PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineaDeFactura, {partial: true}),
        },
      },
    })
    lineaDeFactura: LineaDeFactura,
    @param.where(LineaDeFactura) where?: Where<LineaDeFactura>,
  ): Promise<Count> {
    return this.lineaDeFacturaRepository.updateAll(lineaDeFactura, where);
  }

  @get('/lineasdefacturas/{id}')
  @response(200, {
    description: 'LineaDeFactura model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(LineaDeFactura, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(LineaDeFactura, {exclude: 'where'}) filter?: FilterExcludingWhere<LineaDeFactura>
  ): Promise<LineaDeFactura> {
    return this.lineaDeFacturaRepository.findById(id, filter);
  }

  @patch('/lineasdefacturas/{id}')
  @response(204, {
    description: 'LineaDeFactura PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineaDeFactura, {partial: true}),
        },
      },
    })
    lineaDeFactura: LineaDeFactura,
  ): Promise<void> {
    await this.lineaDeFacturaRepository.updateById(id, lineaDeFactura);
  }

  @put('/lineasdefacturas/{id}')
  @response(204, {
    description: 'LineaDeFactura PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() lineaDeFactura: LineaDeFactura,
  ): Promise<void> {
    await this.lineaDeFacturaRepository.replaceById(id, lineaDeFactura);
  }

  @del('/lineasdefacturas/{id}')
  @response(204, {
    description: 'LineaDeFactura DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.lineaDeFacturaRepository.deleteById(id);
  }
}
