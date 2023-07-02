import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {DatasourceMongodbDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Cliente} from '../models';
import {ClienteRepository} from './cliente.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id_Usuario,
  UsuarioRelations
> {

  public readonly cliente: HasOneRepositoryFactory<Cliente, typeof Usuario.prototype.id_Usuario>;

  constructor(
    @inject('datasources.DatasourceMongodb') dataSource: DatasourceMongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Usuario, dataSource);
    this.cliente = this.createHasOneRepositoryFactoryFor('cliente', clienteRepositoryGetter);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
