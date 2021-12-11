import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Grupo,
  Asignatura,
} from '../models';
import {GrupoRepository} from '../repositories';

export class GrupoAsignaturaController {
  constructor(
    @repository(GrupoRepository)
    public grupoRepository: GrupoRepository,
  ) { }

  @get('/grupos/{id}/asignatura', {
    responses: {
      '200': {
        description: 'Asignatura belonging to Grupo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Asignatura)},
          },
        },
      },
    },
  })
  async getAsignatura(
    @param.path.string('id') id: typeof Grupo.prototype.id,
  ): Promise<Asignatura> {
    return this.grupoRepository.asignatura(id);
  }
}
