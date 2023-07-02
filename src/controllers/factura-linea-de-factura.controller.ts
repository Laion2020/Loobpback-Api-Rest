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
  Factura,
  LineaDeFactura,
} from '../models';
import {FacturaRepository} from '../repositories';

export class FacturaLineaDeFacturaController {
  constructor(
    @repository(FacturaRepository) protected facturaRepository: FacturaRepository,
  ) { }

  @get('/facturas/{id}/linea-de-facturas', {
    responses: {
      '200': {
        description: 'Array of Factura has many LineaDeFactura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(LineaDeFactura)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<LineaDeFactura>,
  ): Promise<LineaDeFactura[]> {
    return this.facturaRepository.lineaDeFacturas(id).find(filter);
  }

  @post('/facturas/{id}/linea-de-facturas', {
    responses: {
      '200': {
        description: 'Factura model instance',
        content: {'application/json': {schema: getModelSchemaRef(LineaDeFactura)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Factura.prototype.id_Factura,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineaDeFactura, {
            title: 'NewLineaDeFacturaInFactura',
            exclude: ['id_Linea'],
            optional: ['facturaId']
          }),
        },
      },
    }) lineaDeFactura: Omit<LineaDeFactura, 'id_Linea'>,
  ): Promise<LineaDeFactura> {
    return this.facturaRepository.lineaDeFacturas(id).create(lineaDeFactura);
  }

  @patch('/facturas/{id}/linea-de-facturas', {
    responses: {
      '200': {
        description: 'Factura.LineaDeFactura PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineaDeFactura, {partial: true}),
        },
      },
    })
    lineaDeFactura: Partial<LineaDeFactura>,
    @param.query.object('where', getWhereSchemaFor(LineaDeFactura)) where?: Where<LineaDeFactura>,
  ): Promise<Count> {
    return this.facturaRepository.lineaDeFacturas(id).patch(lineaDeFactura, where);
  }

  @del('/facturas/{id}/linea-de-facturas', {
    responses: {
      '200': {
        description: 'Factura.LineaDeFactura DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(LineaDeFactura)) where?: Where<LineaDeFactura>,
  ): Promise<Count> {
    return this.facturaRepository.lineaDeFacturas(id).delete(where);
  }
}
