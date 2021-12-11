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
Notificaciones,
NotificacionesPorUsuario,
Usuario,
} from '../models';
import {NotificacionesRepository} from '../repositories';

export class NotificacionesUsuarioController {
  constructor(
    @repository(NotificacionesRepository) protected notificacionesRepository: NotificacionesRepository,
  ) { }

  @get('/notificaciones/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Array of Notificaciones has many Usuario through NotificacionesPorUsuario',
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
    return this.notificacionesRepository.usuarios(id).find(filter);
  }

  @post('/notificaciones/{id}/usuarios', {
    responses: {
      '200': {
        description: 'create a Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Notificaciones.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuarioInNotificaciones',
            exclude: ['id'],
          }),
        },
      },
    }) usuario: Omit<Usuario, 'id'>,
  ): Promise<Usuario> {
    return this.notificacionesRepository.usuarios(id).create(usuario);
  }

  @patch('/notificaciones/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Notificaciones.Usuario PATCH success count',
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
    return this.notificacionesRepository.usuarios(id).patch(usuario, where);
  }

  @del('/notificaciones/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Notificaciones.Usuario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.notificacionesRepository.usuarios(id).delete(where);
  }
}
