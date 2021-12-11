import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  Perfil,
  Usuario
} from '../models';
import {PerfilRepository} from '../repositories';

export class PerfilUsuarioController {
  constructor(
    @repository(PerfilRepository) protected perfilRepository: PerfilRepository,
  ) { }

  @get('/perfils/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Array of Perfil has many Usuario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.perfilRepository.usuarios(id).find(filter);
  }

  @post('/perfils/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Perfil model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Perfil.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuarioInPerfil',
            exclude: ['id'],
            optional: ['perfilId']
          }),
        },
      },
    }) usuario: Omit<Usuario, 'id'>,
  ): Promise<Usuario> {
    return this.perfilRepository.usuarios(id).create(usuario);
  }

  @patch('/perfils/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Perfil.Usuario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Partial<Usuario>,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.perfilRepository.usuarios(id).patch(usuario, where);
  }

  @del('/perfils/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Perfil.Usuario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.perfilRepository.usuarios(id).delete(where);
  }
}
