import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {NotificacionesPorUsuario, NotificacionesPorUsuarioRelations} from '../models';

export class NotificacionesPorUsuarioRepository extends DefaultCrudRepository<
  NotificacionesPorUsuario,
  typeof NotificacionesPorUsuario.prototype.id,
  NotificacionesPorUsuarioRelations
> {
  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource,
  ) {
    super(NotificacionesPorUsuario, dataSource);
  }
}
