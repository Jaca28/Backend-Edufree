import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Notificaciones, NotificacionesRelations, Usuario, NotificacionesPorUsuario} from '../models';
import {NotificacionesPorUsuarioRepository} from './notificaciones-por-usuario.repository';
import {UsuarioRepository} from './usuario.repository';

export class NotificacionesRepository extends DefaultCrudRepository<
  Notificaciones,
  typeof Notificaciones.prototype.id,
  NotificacionesRelations
> {

  public readonly usuarios: HasManyThroughRepositoryFactory<Usuario, typeof Usuario.prototype.id,
          NotificacionesPorUsuario,
          typeof Notificaciones.prototype.id
        >;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('NotificacionesPorUsuarioRepository') protected notificacionesPorUsuarioRepositoryGetter: Getter<NotificacionesPorUsuarioRepository>, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Notificaciones, dataSource);
    this.usuarios = this.createHasManyThroughRepositoryFactoryFor('usuarios', usuarioRepositoryGetter, notificacionesPorUsuarioRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
  }
}
