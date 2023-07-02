import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {DatasourceMongodbDataSource} from '../datasources';
import {LineaDeFactura, LineaDeFacturaRelations, Negocio, Factura} from '../models';
import {NegocioRepository} from './negocio.repository';
import {FacturaRepository} from './factura.repository';

export class LineaDeFacturaRepository extends DefaultCrudRepository<
  LineaDeFactura,
  typeof LineaDeFactura.prototype.id_Linea,
  LineaDeFacturaRelations
> {

  public readonly negocio: HasOneRepositoryFactory<Negocio, typeof LineaDeFactura.prototype.id_Linea>;

  public readonly factura: BelongsToAccessor<Factura, typeof LineaDeFactura.prototype.id_Linea>;

  constructor(
    @inject('datasources.DatasourceMongodb') dataSource: DatasourceMongodbDataSource, @repository.getter('NegocioRepository') protected negocioRepositoryGetter: Getter<NegocioRepository>, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>,
  ) {
    super(LineaDeFactura, dataSource);
    this.factura = this.createBelongsToAccessorFor('factura', facturaRepositoryGetter,);
    this.registerInclusionResolver('factura', this.factura.inclusionResolver);
    this.negocio = this.createHasOneRepositoryFactoryFor('negocio', negocioRepositoryGetter);
    this.registerInclusionResolver('negocio', this.negocio.inclusionResolver);
  }
}
