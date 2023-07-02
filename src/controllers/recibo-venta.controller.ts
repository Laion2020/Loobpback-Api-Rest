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
  Recibo,
  Venta,
} from '../models';
import {ReciboRepository} from '../repositories';

export class ReciboVentaController {
  constructor(
    @repository(ReciboRepository) protected reciboRepository: ReciboRepository,
  ) { }

  @get('/recibos/{id}/venta', {
    responses: {
      '200': {
        description: 'Recibo has one Venta',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Venta),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Venta>,
  ): Promise<Venta> {
    return this.reciboRepository.venta(id).get(filter);
  }

  @post('/recibos/{id}/venta', {
    responses: {
      '200': {
        description: 'Recibo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Venta)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Recibo.prototype.id_Recibo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Venta, {
            title: 'NewVentaInRecibo',
            exclude: ['id_Venta'],
            optional: ['reciboId']
          }),
        },
      },
    }) venta: Omit<Venta, 'id_Venta'>,
  ): Promise<Venta> {
    return this.reciboRepository.venta(id).create(venta);
  }

  @patch('/recibos/{id}/venta', {
    responses: {
      '200': {
        description: 'Recibo.Venta PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Venta, {partial: true}),
        },
      },
    })
    venta: Partial<Venta>,
    @param.query.object('where', getWhereSchemaFor(Venta)) where?: Where<Venta>,
  ): Promise<Count> {
    return this.reciboRepository.venta(id).patch(venta, where);
  }

  @del('/recibos/{id}/venta', {
    responses: {
      '200': {
        description: 'Recibo.Venta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Venta)) where?: Where<Venta>,
  ): Promise<Count> {
    return this.reciboRepository.venta(id).delete(where);
  }
}
