import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  constructor(private router: Router, private http: HttpClient,  private toastController: ToastController) { }

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
      async (response) => {
        console.log(response);
  
        try {
          const toast = await this.toastController.create({
            message: 'Registro exitoso. ¡Bienvenido!',
            duration: 5000, // Duración del mensaje en milisegundos
            color: 'success',
            position: 'top'
          });
          await toast.present();
        } catch (error) {
          console.error(error);
          // Aquí puedes agregar lógica adicional para manejar errores, como mostrar un mensaje de error al usuario.
        }
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