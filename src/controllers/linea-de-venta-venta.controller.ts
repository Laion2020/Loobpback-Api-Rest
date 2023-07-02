import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  LineaDeVenta,
  Venta,
} from '../models';
import {LineaDeVentaRepository} from '../repositories';

export class LineaDeVentaVentaController {
  constructor(
    @repository(LineaDeVentaRepository)
    public lineaDeVentaRepository: LineaDeVentaRepository,
  ) { }

  @get('/linea-de-ventas/{id}/venta', {
    responses: {
      '200': {
        description: 'Venta belonging to LineaDeVenta',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Venta),
          },
        },
      },
    },
  })
  async getVenta(
    @param.path.string('id') id: typeof LineaDeVenta.prototype.id_Linea,
  ): Promise<Venta> {
    return this.lineaDeVentaRepository.venta(id);
  }
}
