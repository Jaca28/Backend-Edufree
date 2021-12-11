import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Credenciales, Usuario} from '../models';
import {UsuarioRepository} from '../repositories';

var jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})

export class SeguridadService {
  llaveSecreta = '@232*'
  constructor(@repository(UsuarioRepository) public usuarioRepositorio: UsuarioRepository) { }

  /*
   * Add service methods here
   */

  //Validar que un usuario exista

  //Generar Tokens

  //Verificar que un token sea válido

  async ValidarUsuario(credenciales: Credenciales) {

    try {

      let usuarioEncontrado = await this.usuarioRepositorio.findOne({
        where: {
          correo: credenciales.correo,
          contrasenia: credenciales.contrasenia
        }
      });

      if (usuarioEncontrado) {
        return usuarioEncontrado;
      }
      else {
        return false;
      }
    } catch (error) {
    }
  }

  async GenerarToken(usuario: Usuario) {

    try {
      const token = jwt.sign({
        email: usuario.correo,
        nombre: usuario.nombres
      }, this.llaveSecreta);
      return token;
    } catch (error) {
      return error;
    }
  }

  VerificarToken(token: string) {

    try {
      const datos = jwt.verify(token, this.llaveSecreta);
      return datos;
    } catch (error) {
      return false;
    }
  }
}
