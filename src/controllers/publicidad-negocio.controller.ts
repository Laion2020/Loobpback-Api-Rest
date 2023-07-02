import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Publicidad,
  Negocio,
} from '../models';
import {PublicidadRepository} from '../repositories';

export class PublicidadNegocioController {
  constructor(
    @repository(PublicidadRepository)
    public publicidadRepository: PublicidadRepository,
  ) { }

  @get('/publicidads/{id}/negocio', {
    responses: {
      '200': {
        description: 'Negocio belonging to Publicidad',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Negocio),
          },
        },
      },
    },
  })
  async getNegocio(
    @param.path.string('id') id: typeof Publicidad.prototype.id_Publicidad,
  ): Promise<Negocio> {
    return this.publicidadRepository.negocio(id);
  }
}
