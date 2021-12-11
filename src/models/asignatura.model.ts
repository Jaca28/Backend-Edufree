import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Grupo} from './grupo.model';
import {ProgramaAcademico} from './programa-academico.model';

@model()
export class Asignatura extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  creditos: string;

  @property({
    type: 'string',
    required: true,
  })
  codigoAsignatura: string;

  @property({
    type: 'string',
    required: false,
  })
  areaDeConocimiento: string;

  @belongsTo(() => ProgramaAcademico)
  programaAcademicoId: string;

  @hasMany(() => Grupo)
  grupos: Grupo[];

  constructor(data?: Partial<Asignatura>) {
    super(data);
  }
}

export interface AsignaturaRelations {
  // describe navigational properties here
}

export type AsignaturaWithRelations = Asignatura & AsignaturaRelations;
