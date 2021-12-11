import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Asignatura,
  ProgramaAcademico,
} from '../models';
import {AsignaturaRepository} from '../repositories';

export class AsignaturaProgramaAcademicoController {
  constructor(
    @repository(AsignaturaRepository)
    public asignaturaRepository: AsignaturaRepository,
  ) { }

  @get('/asignaturas/{id}/programa-academico', {
    responses: {
      '200': {
        description: 'ProgramaAcademico belonging to Asignatura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProgramaAcademico)},
          },
        },
      },
    },
  })
  async getProgramaAcademico(
    @param.path.string('id') id: typeof Asignatura.prototype.id,
  ): Promise<ProgramaAcademico> {
    return this.asignaturaRepository.programaAcademico(id);
  }
}
