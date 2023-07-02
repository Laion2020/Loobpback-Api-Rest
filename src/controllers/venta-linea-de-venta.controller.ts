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
  Venta,
  LineaDeVenta,
} from '../models';
import {VentaRepository} from '../repositories';

export class VentaLineaDeVentaController {
  constructor(
    @repository(VentaRepository) protected ventaRepository: VentaRepository,
  ) { }

  @get('/ventas/{id}/linea-de-ventas', {
    responses: {
      '200': {
        description: 'Array of Venta has many LineaDeVenta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(LineaDeVenta)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<LineaDeVenta>,
  ): Promise<LineaDeVenta[]> {
    return this.ventaRepository.lineaDeVentas(id).find(filter);
  }

  @post('/ventas/{id}/linea-de-ventas', {
    responses: {
      '200': {
        description: 'Venta model instance',
        content: {'application/json': {schema: getModelSchemaRef(LineaDeVenta)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Venta.prototype.id_Venta,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineaDeVenta, {
            title: 'NewLineaDeVentaInVenta',
            exclude: ['id_Linea'],
            optional: ['ventaId']
          }),
        },
      },
    }) lineaDeVenta: Omit<LineaDeVenta, 'id_Linea'>,
  ): Promise<LineaDeVenta> {
    return this.ventaRepository.lineaDeVentas(id).create(lineaDeVenta);
  }

  @patch('/ventas/{id}/linea-de-ventas', {
    responses: {
      '200': {
        description: 'Venta.LineaDeVenta PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineaDeVenta, {partial: true}),
        },
      },
    })
    lineaDeVenta: Partial<LineaDeVenta>,
    @param.query.object('where', getWhereSchemaFor(LineaDeVenta)) where?: Where<LineaDeVenta>,
  ): Promise<Count> {
    return this.ventaRepository.lineaDeVentas(id).patch(lineaDeVenta, where);
  }

  @del('/ventas/{id}/linea-de-ventas', {
    responses: {
      '200': {
        description: 'Venta.LineaDeVenta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(LineaDeVenta)) where?: Where<LineaDeVenta>,
  ): Promise<Count> {
    return this.ventaRepository.lineaDeVentas(id).delete(where);
  }
}
