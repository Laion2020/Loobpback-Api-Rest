import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Negocio,
  Cliente,
} from '../models';
import {NegocioRepository} from '../repositories';

export class NegocioClienteController {
  constructor(
    @repository(NegocioRepository)
    public negocioRepository: NegocioRepository,
  ) { }

  @get('/negocios/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to Negocio',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cliente),
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.string('id') id: typeof Negocio.prototype.id_Negocio,
  ): Promise<Cliente> {
    return this.negocioRepository.cliente(id);
  }
}
