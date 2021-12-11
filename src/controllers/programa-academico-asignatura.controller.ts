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
  ProgramaAcademico,
  Asignatura,
} from '../models';
import {ProgramaAcademicoRepository} from '../repositories';

export class ProgramaAcademicoAsignaturaController {
  constructor(
    @repository(ProgramaAcademicoRepository) protected programaAcademicoRepository: ProgramaAcademicoRepository,
  ) { }

  @get('/programa-academicos/{id}/asignaturas', {
    responses: {
      '200': {
        description: 'Array of ProgramaAcademico has many Asignatura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Asignatura)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Asignatura>,
  ): Promise<Asignatura[]> {
    return this.programaAcademicoRepository.asignaturas(id).find(filter);
  }

  @post('/programa-academicos/{id}/asignaturas', {
    responses: {
      '200': {
        description: 'ProgramaAcademico model instance',
        content: {'application/json': {schema: getModelSchemaRef(Asignatura)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof ProgramaAcademico.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asignatura, {
            title: 'NewAsignaturaInProgramaAcademico',
            exclude: ['id'],
            optional: ['programaAcademicoId']
          }),
        },
      },
    }) asignatura: Omit<Asignatura, 'id'>,
  ): Promise<Asignatura> {
    return this.programaAcademicoRepository.asignaturas(id).create(asignatura);
  }

  @patch('/programa-academicos/{id}/asignaturas', {
    responses: {
      '200': {
        description: 'ProgramaAcademico.Asignatura PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asignatura, {partial: true}),
        },
      },
    })
    asignatura: Partial<Asignatura>,
    @param.query.object('where', getWhereSchemaFor(Asignatura)) where?: Where<Asignatura>,
  ): Promise<Count> {
    return this.programaAcademicoRepository.asignaturas(id).patch(asignatura, where);
  }

  @del('/programa-academicos/{id}/asignaturas', {
    responses: {
      '200': {
        description: 'ProgramaAcademico.Asignatura DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Asignatura)) where?: Where<Asignatura>,
  ): Promise<Count> {
    return this.programaAcademicoRepository.asignaturas(id).delete(where);
  }
}
