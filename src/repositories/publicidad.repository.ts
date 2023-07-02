import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DatasourceMongodbDataSource} from '../datasources';
import {Publicidad, PublicidadRelations, Negocio} from '../models';
import {NegocioRepository} from './negocio.repository';

export class PublicidadRepository extends DefaultCrudRepository<
  Publicidad,
  typeof Publicidad.prototype.id_Publicidad,
  PublicidadRelations
> {

  public readonly PublicidadyNegocio: BelongsToAccessor<Negocio, typeof Publicidad.prototype.id_Publicidad>;

  public readonly negocio: BelongsToAccessor<Negocio, typeof Publicidad.prototype.id_Publicidad>;

  constructor(
    @inject('datasources.DatasourceMongodb') dataSource: DatasourceMongodbDataSource, @repository.getter('NegocioRepository') protected negocioRepositoryGetter: Getter<NegocioRepository>,
  ) {
    super(Publicidad, dataSource);
    this.negocio = this.createBelongsToAccessorFor('negocio', negocioRepositoryGetter,);
    this.registerInclusionResolver('negocio', this.negocio.inclusionResolver);
    this.PublicidadyNegocio = this.createBelongsToAccessorFor('PublicidadyNegocio', negocioRepositoryGetter,);
    this.registerInclusionResolver('PublicidadyNegocio', this.PublicidadyNegocio.inclusionResolver);
  }
}
