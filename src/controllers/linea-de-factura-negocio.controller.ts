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
  LineaDeFactura,
  Negocio,
} from '../models';
import {LineaDeFacturaRepository} from '../repositories';

export class LineaDeFacturaNegocioController {
  constructor(
    @repository(LineaDeFacturaRepository) protected lineaDeFacturaRepository: LineaDeFacturaRepository,
  ) { }

  @get('/linea-de-facturas/{id}/negocio', {
    responses: {
      '200': {
        description: 'LineaDeFactura has one Negocio',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Negocio),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Negocio>,
  ): Promise<Negocio> {
    const idNumerico = parseInt(id, 10);
    return this.lineaDeFacturaRepository.negocio(idNumerico).get(filter);
  }

  @post('/linea-de-facturas/{id}/negocio', {
    responses: {
      '200': {
        description: 'LineaDeFactura model instance',
        content: {'application/json': {schema: getModelSchemaRef(Negocio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof LineaDeFactura.prototype.id_Linea,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Negocio, {
            title: 'NewNegocioInLineaDeFactura',
            exclude: ['id_Negocio'],
            optional: ['lineaDeFacturaId']
          }),
        },
      },
    }) negocio: Omit<Negocio, 'id_Negocio'>,
  ): Promise<Negocio> {
    return this.lineaDeFacturaRepository.negocio(id).create(negocio);
  }

  @patch('/linea-de-facturas/{id}/negocio', {
    responses: {
      '200': {
        description: 'LineaDeFactura.Negocio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Negocio, {partial: true}),
        },
      },
    })
    negocio: Partial<Negocio>,
    @param.query.object('where', getWhereSchemaFor(Negocio)) where?: Where<Negocio>,
  ): Promise<Count> {
    const idNumerico = parseInt(id, 10);
    return this.lineaDeFacturaRepository.negocio(idNumerico).patch(negocio, where);
  }

  @del('/linea-de-facturas/{id}/negocio', {
    responses: {
      '200': {
        description: 'LineaDeFactura.Negocio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Negocio)) where?: Where<Negocio>,
  ): Promise<Count> {
    const idNumerico = parseInt(id, 10);
    return this.lineaDeFacturaRepository.negocio(idNumerico).delete(where);
  }
}
