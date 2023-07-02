import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {DatasourceMongodbDataSource} from '../datasources';
import {Cliente, ClienteRelations, Usuario, Domicilio, Negocio, Venta, Evento} from '../models';
import {UsuarioRepository} from './usuario.repository';
import {DomicilioRepository} from './domicilio.repository';
import {NegocioRepository} from './negocio.repository';
import {VentaRepository} from './venta.repository';
import {EventoRepository} from './evento.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.DNI,
  ClienteRelations
> {

  public readonly usuario: HasOneRepositoryFactory<Usuario, typeof Cliente.prototype.DNI>;

  public readonly domicilios: HasManyRepositoryFactory<Domicilio, typeof Cliente.prototype.DNI>;

  public readonly negocios: HasManyRepositoryFactory<Negocio, typeof Cliente.prototype.DNI>;

  public readonly ventas: HasManyRepositoryFactory<Venta, typeof Cliente.prototype.DNI>;

  public readonly eventos: HasManyRepositoryFactory<Evento, typeof Cliente.prototype.DNI>;

  constructor(
    @inject('datasources.DatasourceMongodb') dataSource: DatasourceMongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('DomicilioRepository') protected domicilioRepositoryGetter: Getter<DomicilioRepository>, @repository.getter('NegocioRepository') protected negocioRepositoryGetter: Getter<NegocioRepository>, @repository.getter('VentaRepository') protected ventaRepositoryGetter: Getter<VentaRepository>, @repository.getter('EventoRepository') protected eventoRepositoryGetter: Getter<EventoRepository>,
  ) {
    super(Cliente, dataSource);
    this.eventos = this.createHasManyRepositoryFactoryFor('eventos', eventoRepositoryGetter,);
    this.registerInclusionResolver('eventos', this.eventos.inclusionResolver);
    this.ventas = this.createHasManyRepositoryFactoryFor('ventas', ventaRepositoryGetter,);
    this.registerInclusionResolver('ventas', this.ventas.inclusionResolver);
    this.negocios = this.createHasManyRepositoryFactoryFor('negocios', negocioRepositoryGetter,);
    this.registerInclusionResolver('negocios', this.negocios.inclusionResolver);
    this.domicilios = this.createHasManyRepositoryFactoryFor('domicilios', domicilioRepositoryGetter,);
    this.registerInclusionResolver('domicilios', this.domicilios.inclusionResolver);
    this.usuario = this.createHasOneRepositoryFactoryFor('usuario', usuarioRepositoryGetter);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
