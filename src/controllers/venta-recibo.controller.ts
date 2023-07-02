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
  Recibo,
} from '../models';
import {VentaRepository} from '../repositories';

export class VentaReciboController {
  constructor(
    @repository(VentaRepository) protected ventaRepository: VentaRepository,
  ) { }

  @get('/ventas/{id}/recibo', {
    responses: {
      '200': {
        description: 'Venta has one Recibo',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Recibo),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Recibo>,
  ): Promise<Recibo> {
    return this.ventaRepository.recibo(id).get(filter);
  }

  @post('/ventas/{id}/recibo', {
    responses: {
      '200': {
        description: 'Venta model instance',
        content: {'application/json': {schema: getModelSchemaRef(Recibo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Venta.prototype.id_Venta,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recibo, {
            title: 'NewReciboInVenta',
            exclude: ['id_Recibo'],
            optional: ['ventaId']
          }),
        },
      },
    }) recibo: Omit<Recibo, 'id_Recibo'>,
  ): Promise<Recibo> {
    return this.ventaRepository.recibo(id).create(recibo);
  }

  @patch('/ventas/{id}/recibo', {
    responses: {
      '200': {
        description: 'Venta.Recibo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recibo, {partial: true}),
        },
      },
    })
    recibo: Partial<Recibo>,
    @param.query.object('where', getWhereSchemaFor(Recibo)) where?: Where<Recibo>,
  ): Promise<Count> {
    return this.ventaRepository.recibo(id).patch(recibo, where);
  }

  @del('/ventas/{id}/recibo', {
    responses: {
      '200': {
        description: 'Venta.Recibo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Recibo)) where?: Where<Recibo>,
  ): Promise<Count> {
    return this.ventaRepository.recibo(id).delete(where);
  }
}
