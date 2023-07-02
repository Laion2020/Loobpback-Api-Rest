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
  LineaDeFactura,
} from '../models';
import {NegocioRepository} from '../repositories';

export class NegocioLineaDeFacturaController {
  constructor(
    @repository(NegocioRepository) protected negocioRepository: NegocioRepository,
  ) { }

  @get('/negocios/{id}/linea-de-factura', {
    responses: {
      '200': {
        description: 'Negocio has one LineaDeFactura',
        content: {
          'application/json': {
            schema: getModelSchemaRef(LineaDeFactura),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<LineaDeFactura>,
  ): Promise<LineaDeFactura> {
    return this.negocioRepository.lineaDeFactura(id).get(filter);
  }

  @post('/negocios/{id}/linea-de-factura', {
    responses: {
      '200': {
        description: 'Negocio model instance',
        content: {'application/json': {schema: getModelSchemaRef(LineaDeFactura)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Negocio.prototype.id_Negocio,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineaDeFactura, {
            title: 'NewLineaDeFacturaInNegocio',
            exclude: ['id_Linea'],
            optional: ['negocioId']
          }),
        },
      },
    }) lineaDeFactura: Omit<LineaDeFactura, 'id_Linea'>,
  ): Promise<LineaDeFactura> {
    return this.negocioRepository.lineaDeFactura(id).create(lineaDeFactura);
  }

  @patch('/negocios/{id}/linea-de-factura', {
    responses: {
      '200': {
        description: 'Negocio.LineaDeFactura PATCH success count',
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
    return this.negocioRepository.lineaDeFactura(id).patch(lineaDeFactura, where);
  }

  @del('/negocios/{id}/linea-de-factura', {
    responses: {
      '200': {
        description: 'Negocio.LineaDeFactura DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(LineaDeFactura)) where?: Where<LineaDeFactura>,
  ): Promise<Count> {
    return this.negocioRepository.lineaDeFactura(id).delete(where);
  }
}
