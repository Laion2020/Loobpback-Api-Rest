import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Domicilio,
  Negocio,
} from '../models';
import {DomicilioRepository} from '../repositories';

export class DomicilioNegocioController {
  constructor(
    @repository(DomicilioRepository)
    public domicilioRepository: DomicilioRepository,
  ) { }

  @get('/domicilios/{id}/negocio', {
    responses: {
      '200': {
        description: 'Negocio belonging to Domicilio',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Negocio),
          },
        },
      },
    },
  })
  async getNegocio(
    @param.path.string('id') id: typeof Domicilio.prototype.id_Domicilio,
  ): Promise<Negocio> {
    return this.domicilioRepository.negocio(id);
  }
}
