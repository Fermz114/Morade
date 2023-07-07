import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  email: string=""
  password: string=""

  constructor(private router: Router) {}

  login() {
    // Aquí puedes realizar la validación de los datos ingresados por el usuario
    // y realizar una llamada a un servicio de autenticación

    // Ejemplo de validación básica
    if (this.email === 'usuario@example.com' && this.password === '123456') {
      // Inicio de sesión exitoso
      this.router.navigate(['/home']);
    } else {
      // Credenciales inválidas, mostrar mensaje de error o tomar alguna acción
    }
  }

  forgotPassword() {
    // Aquí puedes implementar la lógica para la recuperación de contraseña
    // Puedes mostrar un formulario de recuperación de contraseña o redirigir a una página específica
    this.router.navigate(['/forgot-password']);
  }
  loginWithGoogle() {
    // Implementa la lógica de inicio de sesión con Google aquí
  }

  loginWithFacebook() {
    // Implementa la lógica de inicio de sesión con Facebook aquí
  }
}
