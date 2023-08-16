import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  constructor(private router: Router, private http: HttpClient) { }

  user: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    residencia: string;
  } = { name: '', email: '', password: '', confirmPassword: '', residencia: '',};
  
  registro() {
    console.log('Cargando registro');
  
    this.http.post('http://localhost:3000/registro', this.user).subscribe(
      (response) => {
        console.log(response);
        // Aquí puedes agregar lógica adicional, como mostrar un mensaje de éxito o redirigir al usuario a otra página.
      },
      (error) => {
        console.error(error);
        // Aquí puedes agregar lógica adicional para manejar errores, como mostrar un mensaje de error al usuario.
      }
    );
  
    // Redirige al usuario a la página de inicio de sesión después de enviar el formulario.
    this.router.navigate(['../login']);
  }
  
  
  arePasswordsMatching() {
    return this.user.password === this.user.confirmPassword;
  }
}