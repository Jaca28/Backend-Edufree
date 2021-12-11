import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Usuario,
  Perfil,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioPerfilController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/perfil', {
    responses: {
      '200': {
        description: 'Perfil belonging to Usuario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Perfil)},
          },
        },
      },
    },
  })
  async getPerfil(
    @param.path.string('id') id: typeof Usuario.prototype.id,
  ): Promise<Perfil> {
    return this.usuarioRepository.perfil(id);
  }
}
