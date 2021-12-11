import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {NotificacionesPorUsuario} from '../models';
import {NotificacionesPorUsuarioRepository} from '../repositories';

export class NotificacionesPorUsuarioController {
  constructor(
    @repository(NotificacionesPorUsuarioRepository)
    public notificacionesPorUsuarioRepository : NotificacionesPorUsuarioRepository,
  ) {}

  @post('/notificaciones-por-usuarios')
  @response(200, {
    description: 'NotificacionesPorUsuario model instance',
    content: {'application/json': {schema: getModelSchemaRef(NotificacionesPorUsuario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NotificacionesPorUsuario, {
            title: 'NewNotificacionesPorUsuario',
            exclude: ['id'],
          }),
        },
      },
    })
    notificacionesPorUsuario: Omit<NotificacionesPorUsuario, 'id'>,
  ): Promise<NotificacionesPorUsuario> {
    return this.notificacionesPorUsuarioRepository.create(notificacionesPorUsuario);
  }

  @get('/notificaciones-por-usuarios/count')
  @response(200, {
    description: 'NotificacionesPorUsuario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(NotificacionesPorUsuario) where?: Where<NotificacionesPorUsuario>,
  ): Promise<Count> {
    return this.notificacionesPorUsuarioRepository.count(where);
  }

  @get('/notificaciones-por-usuarios')
  @response(200, {
    description: 'Array of NotificacionesPorUsuario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(NotificacionesPorUsuario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(NotificacionesPorUsuario) filter?: Filter<NotificacionesPorUsuario>,
  ): Promise<NotificacionesPorUsuario[]> {
    return this.notificacionesPorUsuarioRepository.find(filter);
  }

  @patch('/notificaciones-por-usuarios')
  @response(200, {
    description: 'NotificacionesPorUsuario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NotificacionesPorUsuario, {partial: true}),
        },
      },
    })
    notificacionesPorUsuario: NotificacionesPorUsuario,
    @param.where(NotificacionesPorUsuario) where?: Where<NotificacionesPorUsuario>,
  ): Promise<Count> {
    return this.notificacionesPorUsuarioRepository.updateAll(notificacionesPorUsuario, where);
  }

  @get('/notificaciones-por-usuarios/{id}')
  @response(200, {
    description: 'NotificacionesPorUsuario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(NotificacionesPorUsuario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(NotificacionesPorUsuario, {exclude: 'where'}) filter?: FilterExcludingWhere<NotificacionesPorUsuario>
  ): Promise<NotificacionesPorUsuario> {
    return this.notificacionesPorUsuarioRepository.findById(id, filter);
  }

  @patch('/notificaciones-por-usuarios/{id}')
  @response(204, {
    description: 'NotificacionesPorUsuario PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NotificacionesPorUsuario, {partial: true}),
        },
      },
    })
    notificacionesPorUsuario: NotificacionesPorUsuario,
  ): Promise<void> {
    await this.notificacionesPorUsuarioRepository.updateById(id, notificacionesPorUsuario);
  }

  @put('/notificaciones-por-usuarios/{id}')
  @response(204, {
    description: 'NotificacionesPorUsuario PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() notificacionesPorUsuario: NotificacionesPorUsuario,
  ): Promise<void> {
    await this.notificacionesPorUsuarioRepository.replaceById(id, notificacionesPorUsuario);
  }

  @del('/notificaciones-por-usuarios/{id}')
  @response(204, {
    description: 'NotificacionesPorUsuario DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.notificacionesPorUsuarioRepository.deleteById(id);
  }
}
