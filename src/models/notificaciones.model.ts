import {Entity, model, property, hasMany} from '@loopback/repository';
import {Usuario} from './usuario.model';
import {NotificacionesPorUsuario} from './notificaciones-por-usuario.model';

@model()
export class Notificaciones extends Entity {
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
  estado: string;

  @property({
    type: 'string',
    required: true,
  })
  mensaje: string;

  @hasMany(() => Usuario, {through: {model: () => NotificacionesPorUsuario}})
  usuarios: Usuario[];

  constructor(data?: Partial<Notificaciones>) {
    super(data);
  }
}

export interface NotificacionesRelations {
  // describe navigational properties here
}

export type NotificacionesWithRelations = Notificaciones & NotificacionesRelations;
