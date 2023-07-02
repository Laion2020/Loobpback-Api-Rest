import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {DatasourceMongodbDataSource} from '../datasources';
import {Venta, VentaRelations, Cliente, LineaDeVenta, Recibo} from '../models';
import {ClienteRepository} from './cliente.repository';
import {LineaDeVentaRepository} from './linea-de-venta.repository';
import {ReciboRepository} from './recibo.repository';

export class VentaRepository extends DefaultCrudRepository<
  Venta,
  typeof Venta.prototype.id_Venta,
  VentaRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Venta.prototype.id_Venta>;

  public readonly lineaDeVentas: HasManyRepositoryFactory<LineaDeVenta, typeof Venta.prototype.id_Venta>;

  public readonly recibo: HasOneRepositoryFactory<Recibo, typeof Venta.prototype.id_Venta>;

  constructor(
    @inject('datasources.DatasourceMongodb') dataSource: DatasourceMongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('LineaDeVentaRepository') protected lineaDeVentaRepositoryGetter: Getter<LineaDeVentaRepository>, @repository.getter('ReciboRepository') protected reciboRepositoryGetter: Getter<ReciboRepository>,
  ) {
    super(Venta, dataSource);
    this.recibo = this.createHasOneRepositoryFactoryFor('recibo', reciboRepositoryGetter);
    this.registerInclusionResolver('recibo', this.recibo.inclusionResolver);
    this.lineaDeVentas = this.createHasManyRepositoryFactoryFor('lineaDeVentas', lineaDeVentaRepositoryGetter,);
    this.registerInclusionResolver('lineaDeVentas', this.lineaDeVentas.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
