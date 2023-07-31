import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  showSpinner: boolean = false;

  constructor(private router: Router, private loadingController: LoadingController) {}

  async login() {
    this.showSpinner = true; // Activar el spinner al presionar el botón
  
    const loading = await this.loadingController.create({
      message: 'Cargando...',
      spinner: 'crescent',
    });
  
    await loading.present();
  
    setTimeout(() => {
      this.showSpinner = false; // Desactivar el spinner
      loading.dismiss();
      this.router.navigate(['/acceso']);
    }, 2000);
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
