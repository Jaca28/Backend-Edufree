import {Entity, model, property, hasMany} from '@loopback/repository';
import {Usuario} from './usuario.model';

@model()
export class Perfil extends Entity {
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
  tipoUsuario: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'string',
  })
  codigoAcceso?: string;

  @hasMany(() => Usuario)
  usuarios: Usuario[];

  constructor(data?: Partial<Perfil>) {
    super(data);
  }
}

export interface PerfilRelations {
  // describe navigational properties here
}

export type PerfilWithRelations = Perfil & PerfilRelations;
