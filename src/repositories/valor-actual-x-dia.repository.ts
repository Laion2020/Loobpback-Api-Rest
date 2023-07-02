import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DatasourceMongodbDataSource} from '../datasources';
import {ValorActualXDia, ValorActualXDiaRelations, Evento} from '../models';
import {EventoRepository} from './evento.repository';

export class ValorActualXDiaRepository extends DefaultCrudRepository<
  ValorActualXDia,
  typeof ValorActualXDia.prototype.id_VAXD,
  ValorActualXDiaRelations
> {

  public readonly eventos: HasManyRepositoryFactory<Evento, typeof ValorActualXDia.prototype.id_VAXD>;

  constructor(
    @inject('datasources.DatasourceMongodb') dataSource: DatasourceMongodbDataSource, @repository.getter('EventoRepository') protected eventoRepositoryGetter: Getter<EventoRepository>,
  ) {
    super(ValorActualXDia, dataSource);
    this.eventos = this.createHasManyRepositoryFactoryFor('eventos', eventoRepositoryGetter,);
    this.registerInclusionResolver('eventos', this.eventos.inclusionResolver);
  }
}
