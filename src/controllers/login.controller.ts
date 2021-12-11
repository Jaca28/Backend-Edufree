// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';
import {service} from '@loopback/core';
import {HttpErrors, post, requestBody} from '@loopback/rest';
import {Credenciales} from '../models';
import {SeguridadService} from '../services';

// @authenticate('seguridad')
export class LoginController {
  constructor(@service(SeguridadService)
  public servicioSeguridad: SeguridadService) { }

  @post('/autenticar', {
    responses: {
      '200': {
        description: 'ok'
      }
    }
  })
  async login(@requestBody() credenciales: Credenciales) {

    let usuarioEncontrado = await this.servicioSeguridad.ValidarUsuario(credenciales);

    if (usuarioEncontrado) {
      //Generar Token
      const token = await this.servicioSeguridad.GenerarToken(usuarioEncontrado)

      if (token) {
        return {
          data: usuarioEncontrado,
          tk: token
        }

      } else {
        throw new HttpErrors[401]('Datos Inválidos')
      }

    }
    else {
      throw new HttpErrors[401]('Datos Inválidos')
    }
  }

}
