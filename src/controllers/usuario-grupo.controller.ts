import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
Usuario,
UsuarioPorGrupo,
Grupo,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioGrupoController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/grupos', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Grupo through UsuarioPorGrupo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Grupo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Grupo>,
  ): Promise<Grupo[]> {
    return this.usuarioRepository.grupos(id).find(filter);
  }

  @post('/usuarios/{id}/grupos', {
    responses: {
      '200': {
        description: 'create a Grupo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Grupo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grupo, {
            title: 'NewGrupoInUsuario',
            exclude: ['id'],
          }),
        },
      },
    }) grupo: Omit<Grupo, 'id'>,
  ): Promise<Grupo> {
    return this.usuarioRepository.grupos(id).create(grupo);
  }

  @patch('/usuarios/{id}/grupos', {
    responses: {
      '200': {
        description: 'Usuario.Grupo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grupo, {partial: true}),
        },
      },
    })
    grupo: Partial<Grupo>,
    @param.query.object('where', getWhereSchemaFor(Grupo)) where?: Where<Grupo>,
  ): Promise<Count> {
    return this.usuarioRepository.grupos(id).patch(grupo, where);
  }

  @del('/usuarios/{id}/grupos', {
    responses: {
      '200': {
        description: 'Usuario.Grupo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Grupo)) where?: Where<Grupo>,
  ): Promise<Count> {
    return this.usuarioRepository.grupos(id).delete(where);
  }
}
