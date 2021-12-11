import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {ProgramaAcademico, ProgramaAcademicoRelations, Asignatura} from '../models';
import {AsignaturaRepository} from './asignatura.repository';

export class ProgramaAcademicoRepository extends DefaultCrudRepository<
  ProgramaAcademico,
  typeof ProgramaAcademico.prototype.id,
  ProgramaAcademicoRelations
> {

  public readonly asignaturas: HasManyRepositoryFactory<Asignatura, typeof ProgramaAcademico.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('AsignaturaRepository') protected asignaturaRepositoryGetter: Getter<AsignaturaRepository>,
  ) {
    super(ProgramaAcademico, dataSource);
    this.asignaturas = this.createHasManyRepositoryFactoryFor('asignaturas', asignaturaRepositoryGetter,);
    this.registerInclusionResolver('asignaturas', this.asignaturas.inclusionResolver);
  }
}
