import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Perfil, PerfilRelations, Usuario} from '../models';
import {UsuarioRepository} from './usuario.repository';

export class PerfilRepository extends DefaultCrudRepository<
  Perfil,
  typeof Perfil.prototype.id,
  PerfilRelations
> {

  public readonly usuarios: HasManyRepositoryFactory<Usuario, typeof Perfil.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Perfil, dataSource);
    this.usuarios = this.createHasManyRepositoryFactoryFor('usuarios', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
  }
}
