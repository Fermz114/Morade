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

  user: { username: string; email: string; password: string } = { username: '', email: '', password: '' };

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
}
