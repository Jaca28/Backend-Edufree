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
import {Grupo} from '../models';
import {GrupoRepository} from '../repositories';

export class GrupoController {
  constructor(
    @repository(GrupoRepository)
    public grupoRepository : GrupoRepository,
  ) {}

  @post('/grupos')
  @response(200, {
    description: 'Grupo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Grupo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grupo, {
            title: 'NewGrupo',
            exclude: ['id'],
          }),
        },
      },
    })
    grupo: Omit<Grupo, 'id'>,
  ): Promise<Grupo> {
    return this.grupoRepository.create(grupo);
  }

  @get('/grupos/count')
  @response(200, {
    description: 'Grupo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Grupo) where?: Where<Grupo>,
  ): Promise<Count> {
    return this.grupoRepository.count(where);
  }

  @get('/grupos')
  @response(200, {
    description: 'Array of Grupo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Grupo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Grupo) filter?: Filter<Grupo>,
  ): Promise<Grupo[]> {
    return this.grupoRepository.find(filter);
  }

  @patch('/grupos')
  @response(200, {
    description: 'Grupo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grupo, {partial: true}),
        },
      },
    })
    grupo: Grupo,
    @param.where(Grupo) where?: Where<Grupo>,
  ): Promise<Count> {
    return this.grupoRepository.updateAll(grupo, where);
  }

  @get('/grupos/{id}')
  @response(200, {
    description: 'Grupo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Grupo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Grupo, {exclude: 'where'}) filter?: FilterExcludingWhere<Grupo>
  ): Promise<Grupo> {
    return this.grupoRepository.findById(id, filter);
  }

  @patch('/grupos/{id}')
  @response(204, {
    description: 'Grupo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grupo, {partial: true}),
        },
      },
    })
    grupo: Grupo,
  ): Promise<void> {
    await this.grupoRepository.updateById(id, grupo);
  }

  @put('/grupos/{id}')
  @response(204, {
    description: 'Grupo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() grupo: Grupo,
  ): Promise<void> {
    await this.grupoRepository.replaceById(id, grupo);
  }

  @del('/grupos/{id}')
  @response(204, {
    description: 'Grupo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.grupoRepository.deleteById(id);
  }
}
