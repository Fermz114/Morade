// login.page.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface LoginResponse {
  success: boolean;
  message: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  usuario = {
    email: '',
    password: '',
  };

  constructor(private router: Router, private http: HttpClient) {}

  authenticate() {
    if (this.usuario.email.trim() === '' || this.usuario.password.trim() === '') {
      console.log('Por favor, completa todos los campos');
      return; 
    }

    const data = {
      email: this.usuario.email,
      password: this.usuario.password,
    };

    this.http.post<LoginResponse>('http://localhost:3000/login', data).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        if (response.success) {
          console.log('Inicio de sesión con éxito');
          this.router.navigate(['/acceso']);
        } else {
          console.log('Usuario y/o contraseña incorrecta');
        }
      },
      (error) => {
        console.error('Error en la solicitud:', error);
      }
    );
  }
}

