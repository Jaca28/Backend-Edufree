import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Grupo} from './grupo.model';
import {Perfil} from './perfil.model';
import {UsuarioPorGrupo} from './usuario-por-grupo.model';

@model()
export class Usuario extends Entity {
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
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: false,
  })
  contrasenia: string;

  @property({
    type: 'string',
    required: false,
  })
  codigo: string;

  @belongsTo(() => Perfil)
  perfilId: string;

  @hasMany(() => Grupo, {through: {model: () => UsuarioPorGrupo}})
  grupos: Grupo[];

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
