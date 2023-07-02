import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  LineaDeFactura,
  Factura,
} from '../models';
import {LineaDeFacturaRepository} from '../repositories';

export class LineaDeFacturaFacturaController {
  constructor(
    @repository(LineaDeFacturaRepository)
    public lineaDeFacturaRepository: LineaDeFacturaRepository,
  ) { }

  @get('/linea-de-facturas/{id}/factura', {
    responses: {
      '200': {
        description: 'Factura belonging to LineaDeFactura',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Factura),
          },
        },
      },
    },
  })
  async getFactura(
    @param.path.string('id') id: typeof LineaDeFactura.prototype.id_Linea,
  ): Promise<Factura> {
    return this.lineaDeFacturaRepository.factura(id);
  }
}
