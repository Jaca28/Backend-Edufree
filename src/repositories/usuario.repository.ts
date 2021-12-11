import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Perfil, Grupo, UsuarioPorGrupo} from '../models';
import {PerfilRepository} from './perfil.repository';
import {UsuarioPorGrupoRepository} from './usuario-por-grupo.repository';
import {GrupoRepository} from './grupo.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly perfil: BelongsToAccessor<Perfil, typeof Usuario.prototype.id>;

  public readonly grupos: HasManyThroughRepositoryFactory<Grupo, typeof Grupo.prototype.id,
          UsuarioPorGrupo,
          typeof Usuario.prototype.id
        >;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('PerfilRepository') protected perfilRepositoryGetter: Getter<PerfilRepository>, @repository.getter('UsuarioPorGrupoRepository') protected usuarioPorGrupoRepositoryGetter: Getter<UsuarioPorGrupoRepository>, @repository.getter('GrupoRepository') protected grupoRepositoryGetter: Getter<GrupoRepository>,
  ) {
    super(Usuario, dataSource);
    this.grupos = this.createHasManyThroughRepositoryFactoryFor('grupos', grupoRepositoryGetter, usuarioPorGrupoRepositoryGetter,);
    this.registerInclusionResolver('grupos', this.grupos.inclusionResolver);
    this.perfil = this.createBelongsToAccessorFor('perfil', perfilRepositoryGetter,);
    this.registerInclusionResolver('perfil', this.perfil.inclusionResolver);
  }
}
