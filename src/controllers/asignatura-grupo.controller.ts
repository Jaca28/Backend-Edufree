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
  Asignatura,
  Grupo,
} from '../models';
import {AsignaturaRepository} from '../repositories';

export class AsignaturaGrupoController {
  constructor(
    @repository(AsignaturaRepository) protected asignaturaRepository: AsignaturaRepository,
  ) { }

  @get('/asignaturas/{id}/grupos', {
    responses: {
      '200': {
        description: 'Array of Asignatura has many Grupo',
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
    return this.asignaturaRepository.grupos(id).find(filter);
  }

  @post('/asignaturas/{id}/grupos', {
    responses: {
      '200': {
        description: 'Asignatura model instance',
        content: {'application/json': {schema: getModelSchemaRef(Grupo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Asignatura.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grupo, {
            title: 'NewGrupoInAsignatura',
            exclude: ['id'],
            optional: ['asignaturaId']
          }),
        },
      },
    }) grupo: Omit<Grupo, 'id'>,
  ): Promise<Grupo> {
    return this.asignaturaRepository.grupos(id).create(grupo);
  }

  @patch('/asignaturas/{id}/grupos', {
    responses: {
      '200': {
        description: 'Asignatura.Grupo PATCH success count',
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
    return this.asignaturaRepository.grupos(id).patch(grupo, where);
  }

  @del('/asignaturas/{id}/grupos', {
    responses: {
      '200': {
        description: 'Asignatura.Grupo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Grupo)) where?: Where<Grupo>,
  ): Promise<Count> {
    return this.asignaturaRepository.grupos(id).delete(where);
  }
}
