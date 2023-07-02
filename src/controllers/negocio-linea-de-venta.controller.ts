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
  LineaDeVenta,
} from '../models';
import {NegocioRepository} from '../repositories';

export class NegocioLineaDeVentaController {
  constructor(
    @repository(NegocioRepository) protected negocioRepository: NegocioRepository,
  ) { }

  @get('/negocios/{id}/linea-de-venta', {
    responses: {
      '200': {
        description: 'Negocio has one LineaDeVenta',
        content: {
          'application/json': {
            schema: getModelSchemaRef(LineaDeVenta),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<LineaDeVenta>,
  ): Promise<LineaDeVenta> {
    return this.negocioRepository.lineaDeVenta(id).get(filter);
  }

  @post('/negocios/{id}/linea-de-venta', {
    responses: {
      '200': {
        description: 'Negocio model instance',
        content: {'application/json': {schema: getModelSchemaRef(LineaDeVenta)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Negocio.prototype.id_Negocio,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineaDeVenta, {
            title: 'NewLineaDeVentaInNegocio',
            exclude: ['id_Linea'],
            optional: ['negocioId']
          }),
        },
      },
    }) lineaDeVenta: Omit<LineaDeVenta, 'id_Linea'>,
  ): Promise<LineaDeVenta> {
    return this.negocioRepository.lineaDeVenta(id).create(lineaDeVenta);
  }

  @patch('/negocios/{id}/linea-de-venta', {
    responses: {
      '200': {
        description: 'Negocio.LineaDeVenta PATCH success count',
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
    return this.negocioRepository.lineaDeVenta(id).patch(lineaDeVenta, where);
  }

  @del('/negocios/{id}/linea-de-venta', {
    responses: {
      '200': {
        description: 'Negocio.LineaDeVenta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(LineaDeVenta)) where?: Where<LineaDeVenta>,
  ): Promise<Count> {
    return this.negocioRepository.lineaDeVenta(id).delete(where);
  }
}
