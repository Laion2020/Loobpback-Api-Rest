import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DatasourceMongodbDataSource} from '../datasources';
import {Domicilio, DomicilioRelations, Negocio, Cliente} from '../models';
import {NegocioRepository} from './negocio.repository';
import {ClienteRepository} from './cliente.repository';

export class DomicilioRepository extends DefaultCrudRepository<
  Domicilio,
  typeof Domicilio.prototype.id_Domicilio,
  DomicilioRelations
> {

  public readonly DomicilioyNegocio: BelongsToAccessor<Negocio, typeof Domicilio.prototype.id_Domicilio>;

  public readonly DomicilioyCliente: BelongsToAccessor<Cliente, typeof Domicilio.prototype.id_Domicilio>;

  public readonly negocio: BelongsToAccessor<Negocio, typeof Domicilio.prototype.id_Domicilio>;

  public readonly cliente: BelongsToAccessor<Cliente, typeof Domicilio.prototype.id_Domicilio>;

  constructor(
    @inject('datasources.DatasourceMongodb') dataSource: DatasourceMongodbDataSource, @repository.getter('NegocioRepository') protected negocioRepositoryGetter: Getter<NegocioRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Domicilio, dataSource);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
    this.negocio = this.createBelongsToAccessorFor('negocio', negocioRepositoryGetter,);
    this.registerInclusionResolver('negocio', this.negocio.inclusionResolver);
    this.DomicilioyCliente = this.createBelongsToAccessorFor('DomicilioyCliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('DomicilioyCliente', this.DomicilioyCliente.inclusionResolver);
    this.DomicilioyNegocio = this.createBelongsToAccessorFor('DomicilioyNegocio', negocioRepositoryGetter,);
    this.registerInclusionResolver('DomicilioyNegocio', this.DomicilioyNegocio.inclusionResolver);
  }
}
