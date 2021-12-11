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
import {Asignatura} from '../models';
import {AsignaturaRepository} from '../repositories';

export class AsignaturaController {
  constructor(
    @repository(AsignaturaRepository)
    public asignaturaRepository : AsignaturaRepository,
  ) {}

  @post('/asignaturas')
  @response(200, {
    description: 'Asignatura model instance',
    content: {'application/json': {schema: getModelSchemaRef(Asignatura)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asignatura, {
            title: 'NewAsignatura',
            exclude: ['id'],
          }),
        },
      },
    })
    asignatura: Omit<Asignatura, 'id'>,
  ): Promise<Asignatura> {
    return this.asignaturaRepository.create(asignatura);
  }

  @get('/asignaturas/count')
  @response(200, {
    description: 'Asignatura model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Asignatura) where?: Where<Asignatura>,
  ): Promise<Count> {
    return this.asignaturaRepository.count(where);
  }

  @get('/asignaturas')
  @response(200, {
    description: 'Array of Asignatura model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Asignatura, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Asignatura) filter?: Filter<Asignatura>,
  ): Promise<Asignatura[]> {
    return this.asignaturaRepository.find(filter);
  }

  @patch('/asignaturas')
  @response(200, {
    description: 'Asignatura PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asignatura, {partial: true}),
        },
      },
    })
    asignatura: Asignatura,
    @param.where(Asignatura) where?: Where<Asignatura>,
  ): Promise<Count> {
    return this.asignaturaRepository.updateAll(asignatura, where);
  }

  @get('/asignaturas/{id}')
  @response(200, {
    description: 'Asignatura model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Asignatura, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Asignatura, {exclude: 'where'}) filter?: FilterExcludingWhere<Asignatura>
  ): Promise<Asignatura> {
    return this.asignaturaRepository.findById(id, filter);
  }

  @patch('/asignaturas/{id}')
  @response(204, {
    description: 'Asignatura PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asignatura, {partial: true}),
        },
      },
    })
    asignatura: Asignatura,
  ): Promise<void> {
    await this.asignaturaRepository.updateById(id, asignatura);
  }

  @put('/asignaturas/{id}')
  @response(204, {
    description: 'Asignatura PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() asignatura: Asignatura,
  ): Promise<void> {
    await this.asignaturaRepository.replaceById(id, asignatura);
  }

  @del('/asignaturas/{id}')
  @response(204, {
    description: 'Asignatura DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.asignaturaRepository.deleteById(id);
  }
}
