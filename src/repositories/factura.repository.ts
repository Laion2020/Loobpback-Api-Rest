import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DatasourceMongodbDataSource} from '../datasources';
import {Factura, FacturaRelations, LineaDeFactura} from '../models';
import {LineaDeFacturaRepository} from './linea-de-factura.repository';

export class FacturaRepository extends DefaultCrudRepository<
  Factura,
  typeof Factura.prototype.id_Factura,
  FacturaRelations
> {

  public readonly lineaDeFacturas: HasManyRepositoryFactory<LineaDeFactura, typeof Factura.prototype.id_Factura>;

  constructor(
    @inject('datasources.DatasourceMongodb') dataSource: DatasourceMongodbDataSource, @repository.getter('LineaDeFacturaRepository') protected lineaDeFacturaRepositoryGetter: Getter<LineaDeFacturaRepository>,
  ) {
    super(Factura, dataSource);
    this.lineaDeFacturas = this.createHasManyRepositoryFactoryFor('lineaDeFacturas', lineaDeFacturaRepositoryGetter,);
    this.registerInclusionResolver('lineaDeFacturas', this.lineaDeFacturas.inclusionResolver);
  }
}
