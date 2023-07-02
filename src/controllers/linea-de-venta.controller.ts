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
import {LineaDeVenta} from '../models';
import {LineaDeVentaRepository} from '../repositories';

export class LineaDeVentaController {
  constructor(
    @repository(LineaDeVentaRepository)
    public lineaDeVentaRepository : LineaDeVentaRepository,
  ) {}

  @post('/lineasdeventas')
  @response(200, {
    description: 'LineaDeVenta model instance',
    content: {'application/json': {schema: getModelSchemaRef(LineaDeVenta)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineaDeVenta, {
            title: 'NewLineaDeVenta',
            exclude: ['id_Linea'],
          }),
        },
      },
    })
    lineaDeVenta: Omit<LineaDeVenta, 'id_Linea'>,
  ): Promise<LineaDeVenta> {
    return this.lineaDeVentaRepository.create(lineaDeVenta);
  }

  @get('/lineasdeventas/count')
  @response(200, {
    description: 'LineaDeVenta model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(LineaDeVenta) where?: Where<LineaDeVenta>,
  ): Promise<Count> {
    return this.lineaDeVentaRepository.count(where);
  }

  @get('/lineasdeventas')
  @response(200, {
    description: 'Array of LineaDeVenta model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(LineaDeVenta, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(LineaDeVenta) filter?: Filter<LineaDeVenta>,
  ): Promise<LineaDeVenta[]> {
    return this.lineaDeVentaRepository.find(filter);
  }

  @patch('/lineasdeventas')
  @response(200, {
    description: 'LineaDeVenta PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineaDeVenta, {partial: true}),
        },
      },
    })
    lineaDeVenta: LineaDeVenta,
    @param.where(LineaDeVenta) where?: Where<LineaDeVenta>,
  ): Promise<Count> {
    return this.lineaDeVentaRepository.updateAll(lineaDeVenta, where);
  }

  @get('/lineasdeventas/{id}')
  @response(200, {
    description: 'LineaDeVenta model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(LineaDeVenta, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(LineaDeVenta, {exclude: 'where'}) filter?: FilterExcludingWhere<LineaDeVenta>
  ): Promise<LineaDeVenta> {
    return this.lineaDeVentaRepository.findById(id, filter);
  }

  @patch('/lineasdeventas/{id}')
  @response(204, {
    description: 'LineaDeVenta PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineaDeVenta, {partial: true}),
        },
      },
    })
    lineaDeVenta: LineaDeVenta,
  ): Promise<void> {
    await this.lineaDeVentaRepository.updateById(id, lineaDeVenta);
  }

  @put('/lineasdeventas/{id}')
  @response(204, {
    description: 'LineaDeVenta PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() lineaDeVenta: LineaDeVenta,
  ): Promise<void> {
    await this.lineaDeVentaRepository.replaceById(id, lineaDeVenta);
  }

  @del('/lineasdeventas/{id}')
  @response(204, {
    description: 'LineaDeVenta DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.lineaDeVentaRepository.deleteById(id);
  }
}
