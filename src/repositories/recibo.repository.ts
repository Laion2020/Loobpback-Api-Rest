import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {DatasourceMongodbDataSource} from '../datasources';
import {Recibo, ReciboRelations, Venta} from '../models';
import {VentaRepository} from './venta.repository';

export class ReciboRepository extends DefaultCrudRepository<
  Recibo,
  typeof Recibo.prototype.id_Recibo,
  ReciboRelations
> {

  public readonly venta: HasOneRepositoryFactory<Venta, typeof Recibo.prototype.id_Recibo>;

  constructor(
    @inject('datasources.DatasourceMongodb') dataSource: DatasourceMongodbDataSource, @repository.getter('VentaRepository') protected ventaRepositoryGetter: Getter<VentaRepository>,
  ) {
    super(Recibo, dataSource);
    this.venta = this.createHasOneRepositoryFactoryFor('venta', ventaRepositoryGetter);
    this.registerInclusionResolver('venta', this.venta.inclusionResolver);
  }
}
