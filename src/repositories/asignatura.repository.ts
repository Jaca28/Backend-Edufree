import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Asignatura, AsignaturaRelations, ProgramaAcademico, Grupo} from '../models';
import {ProgramaAcademicoRepository} from './programa-academico.repository';
import {GrupoRepository} from './grupo.repository';

export class AsignaturaRepository extends DefaultCrudRepository<
  Asignatura,
  typeof Asignatura.prototype.id,
  AsignaturaRelations
> {

  public readonly programaAcademico: BelongsToAccessor<ProgramaAcademico, typeof Asignatura.prototype.id>;

  public readonly grupos: HasManyRepositoryFactory<Grupo, typeof Asignatura.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('ProgramaAcademicoRepository') protected programaAcademicoRepositoryGetter: Getter<ProgramaAcademicoRepository>, @repository.getter('GrupoRepository') protected grupoRepositoryGetter: Getter<GrupoRepository>,
  ) {
    super(Asignatura, dataSource);
    this.grupos = this.createHasManyRepositoryFactoryFor('grupos', grupoRepositoryGetter,);
    this.registerInclusionResolver('grupos', this.grupos.inclusionResolver);
    this.programaAcademico = this.createBelongsToAccessorFor('programaAcademico', programaAcademicoRepositoryGetter,);
    this.registerInclusionResolver('programaAcademico', this.programaAcademico.inclusionResolver);
  }
}
