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
  LineaDeVenta,
  Negocio,
} from '../models';
import {LineaDeVentaRepository} from '../repositories';

export class LineaDeVentaNegocioController {
  constructor(
    @repository(LineaDeVentaRepository) protected lineaDeVentaRepository: LineaDeVentaRepository,
  ) { }

  @get('/linea-de-ventas/{id}/negocio', {
    responses: {
      '200': {
        description: 'LineaDeVenta has one Negocio',
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
    return this.lineaDeVentaRepository.negocio(idNumerico).get(filter);
  }

  @post('/linea-de-ventas/{id}/negocio', {
    responses: {
      '200': {
        description: 'LineaDeVenta model instance',
        content: {'application/json': {schema: getModelSchemaRef(Negocio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof LineaDeVenta.prototype.id_Linea,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Negocio, {
            title: 'NewNegocioInLineaDeVenta',
            exclude: ['id_Negocio'],
            optional: ['lineaDeVentaId']
          }),
        },
      },
    }) negocio: Omit<Negocio, 'id_Negocio'>,
  ): Promise<Negocio> {
    return this.lineaDeVentaRepository.negocio(id).create(negocio);
  }

  @patch('/linea-de-ventas/{id}/negocio', {
    responses: {
      '200': {
        description: 'LineaDeVenta.Negocio PATCH success count',
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
    return this.lineaDeVentaRepository.negocio(idNumerico).patch(negocio, where);
  }

  @del('/linea-de-ventas/{id}/negocio', {
    responses: {
      '200': {
        description: 'LineaDeVenta.Negocio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Negocio)) where?: Where<Negocio>,
  ): Promise<Count> {
    const idNumerico = parseInt(id, 10);
    return this.lineaDeVentaRepository.negocio(idNumerico).delete(where);
  }
}
