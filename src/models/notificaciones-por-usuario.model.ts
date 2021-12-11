import {Entity, model, property} from '@loopback/repository';

@model()
export class NotificacionesPorUsuario extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  usuarioId: string;

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
  notificacionId: string;


  constructor(data?: Partial<NotificacionesPorUsuario>) {
    super(data);
  }
}

export interface NotificacionesPorUsuarioRelations {
  // describe navigational properties here
}

export type NotificacionesPorUsuarioWithRelations = NotificacionesPorUsuario & NotificacionesPorUsuarioRelations;
