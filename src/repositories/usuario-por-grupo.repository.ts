import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {UsuarioPorGrupo, UsuarioPorGrupoRelations} from '../models';

export class UsuarioPorGrupoRepository extends DefaultCrudRepository<
  UsuarioPorGrupo,
  typeof UsuarioPorGrupo.prototype.id,
  UsuarioPorGrupoRelations
> {
  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource,
  ) {
    super(UsuarioPorGrupo, dataSource);
  }
}
