import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Grupo, GrupoRelations, Asignatura} from '../models';
import {AsignaturaRepository} from './asignatura.repository';

export class GrupoRepository extends DefaultCrudRepository<
  Grupo,
  typeof Grupo.prototype.id,
  GrupoRelations
> {

  public readonly asignatura: BelongsToAccessor<Asignatura, typeof Grupo.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('AsignaturaRepository') protected asignaturaRepositoryGetter: Getter<AsignaturaRepository>,
  ) {
    super(Grupo, dataSource);
    this.asignatura = this.createBelongsToAccessorFor('asignatura', asignaturaRepositoryGetter,);
    this.registerInclusionResolver('asignatura', this.asignatura.inclusionResolver);
  }
}
