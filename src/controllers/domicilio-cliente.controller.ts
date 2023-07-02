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
  Cliente,
} from '../models';
import {DomicilioRepository} from '../repositories';

export class DomicilioClienteController {
  constructor(
    @repository(DomicilioRepository)
    public domicilioRepository: DomicilioRepository,
  ) { }

  @get('/domicilios/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to Domicilio',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cliente),
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.string('id') id: typeof Domicilio.prototype.id_Domicilio,
  ): Promise<Cliente> {
    return this.domicilioRepository.cliente(id);
  }
}
