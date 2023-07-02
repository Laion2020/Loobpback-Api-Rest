import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {DatasourceMongodbDataSource} from '../datasources';
import {LineaDeVenta, LineaDeVentaRelations, Negocio, Venta} from '../models';
import {NegocioRepository} from './negocio.repository';
import {VentaRepository} from './venta.repository';

export class LineaDeVentaRepository extends DefaultCrudRepository<
  LineaDeVenta,
  typeof LineaDeVenta.prototype.id_Linea,
  LineaDeVentaRelations
> {

  public readonly negocio: HasOneRepositoryFactory<Negocio, typeof LineaDeVenta.prototype.id_Linea>;

  public readonly venta: BelongsToAccessor<Venta, typeof LineaDeVenta.prototype.id_Linea>;

  constructor(
    @inject('datasources.DatasourceMongodb') dataSource: DatasourceMongodbDataSource, @repository.getter('NegocioRepository') protected negocioRepositoryGetter: Getter<NegocioRepository>, @repository.getter('VentaRepository') protected ventaRepositoryGetter: Getter<VentaRepository>,
  ) {
    super(LineaDeVenta, dataSource);
    this.venta = this.createBelongsToAccessorFor('venta', ventaRepositoryGetter,);
    this.registerInclusionResolver('venta', this.venta.inclusionResolver);
    this.negocio = this.createHasOneRepositoryFactoryFor('negocio', negocioRepositoryGetter);
    this.registerInclusionResolver('negocio', this.negocio.inclusionResolver);
  }
}
