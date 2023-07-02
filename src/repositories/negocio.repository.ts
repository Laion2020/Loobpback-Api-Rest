import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {DatasourceMongodbDataSource} from '../datasources';
import {Negocio, NegocioRelations, Publicidad, Domicilio, Cliente, LineaDeFactura, LineaDeVenta} from '../models';
import {PublicidadRepository} from './publicidad.repository';
import {DomicilioRepository} from './domicilio.repository';
import {ClienteRepository} from './cliente.repository';
import {LineaDeFacturaRepository} from './linea-de-factura.repository';
import {LineaDeVentaRepository} from './linea-de-venta.repository';

export class NegocioRepository extends DefaultCrudRepository<
  Negocio,
  typeof Negocio.prototype.id_Negocio,
  NegocioRelations
> {

  public readonly publicidads: HasManyRepositoryFactory<Publicidad, typeof Negocio.prototype.id_Negocio>;

  public readonly domicilios: HasManyRepositoryFactory<Domicilio, typeof Negocio.prototype.id_Negocio>;

  public readonly cliente: BelongsToAccessor<Cliente, typeof Negocio.prototype.id_Negocio>;

  public readonly lineaDeFactura: HasOneRepositoryFactory<LineaDeFactura, typeof Negocio.prototype.id_Negocio>;

  public readonly lineaDeVenta: HasOneRepositoryFactory<LineaDeVenta, typeof Negocio.prototype.id_Negocio>;

  constructor(
    @inject('datasources.DatasourceMongodb') dataSource: DatasourceMongodbDataSource, @repository.getter('PublicidadRepository') protected publicidadRepositoryGetter: Getter<PublicidadRepository>, @repository.getter('DomicilioRepository') protected domicilioRepositoryGetter: Getter<DomicilioRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('LineaDeFacturaRepository') protected lineaDeFacturaRepositoryGetter: Getter<LineaDeFacturaRepository>, @repository.getter('LineaDeVentaRepository') protected lineaDeVentaRepositoryGetter: Getter<LineaDeVentaRepository>,
  ) {
    super(Negocio, dataSource);
    this.lineaDeVenta = this.createHasOneRepositoryFactoryFor('lineaDeVenta', lineaDeVentaRepositoryGetter);
    this.registerInclusionResolver('lineaDeVenta', this.lineaDeVenta.inclusionResolver);
    this.lineaDeFactura = this.createHasOneRepositoryFactoryFor('lineaDeFactura', lineaDeFacturaRepositoryGetter);
    this.registerInclusionResolver('lineaDeFactura', this.lineaDeFactura.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
    this.domicilios = this.createHasManyRepositoryFactoryFor('domicilios', domicilioRepositoryGetter,);
    this.registerInclusionResolver('domicilios', this.domicilios.inclusionResolver);
    this.publicidads = this.createHasManyRepositoryFactoryFor('publicidads', publicidadRepositoryGetter,);
    this.registerInclusionResolver('publicidads', this.publicidads.inclusionResolver);
  }
}
