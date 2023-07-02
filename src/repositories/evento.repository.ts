import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DatasourceMongodbDataSource} from '../datasources';
import {Evento, EventoRelations} from '../models';

export class EventoRepository extends DefaultCrudRepository<
  Evento,
  typeof Evento.prototype.id_Evento,
  EventoRelations
> {
  constructor(
    @inject('datasources.DatasourceMongodb') dataSource: DatasourceMongodbDataSource,
  ) {
    super(Evento, dataSource);
  }
}
