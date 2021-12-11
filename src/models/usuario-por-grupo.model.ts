import {Entity, model, property} from '@loopback/repository';

@model()
export class UsuarioPorGrupo extends Entity {
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
  usuarioId: string;

  @property({
    type: 'string',
    required: true,
  })
  grupoId: string;

  @property({
    type: 'string',
    required: false,
  })
  calificacion1: string;

  @property({
    type: 'string',
    required: false,
  })
  calificacion2: string;

  @property({
    type: 'string',
    required: false,
  })
  calificacion3: string;


  constructor(data?: Partial<UsuarioPorGrupo>) {
    super(data);
  }
}

export interface UsuarioPorGrupoRelations {
  // describe navigational properties here
}

export type UsuarioPorGrupoWithRelations = UsuarioPorGrupo & UsuarioPorGrupoRelations;
