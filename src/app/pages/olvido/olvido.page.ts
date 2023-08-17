import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

@Component({
  selector: 'app-olvido',
  templateUrl: './olvido.page.html',
  styleUrls: ['./olvido.page.scss'],
})
export class OlvidoPage {
  usuario = {
    email: '',
    newPassword: '',
    confirmPassword: '',
  };

  constructor(private http: HttpClient, private router: Router,private toastController: ToastController) {}

  recoverPassword() {
    // Verifica si los campos de correo electrónico y contraseñas están llenos
    if (
      this.usuario.email.trim() === '' ||
      this.usuario.newPassword.trim() === '' ||
      this.usuario.confirmPassword.trim() === ''
    ) {
      console.log('Por favor, completa todos los campos');
      return;
    }
  
    if (this.usuario.newPassword !== this.usuario.confirmPassword) {
      console.log('Las contraseñas no coinciden');
      return;
    }
  
    const data = {
      email: this.usuario.email,
      newPassword: this.usuario.newPassword,
    };
  
    this.http.post<ForgotPasswordResponse>('http://localhost:3000/olvido', data).subscribe(
      async (response) => {
        console.log('Respuesta del servidor:', response);
        if (response.success) {
          const toast = await this.toastController.create({
            message: 'Contraseña actualizada con éxito',
            duration: 5000, // Duración del mensaje en milisegundos
            color: 'success',
            position: 'top'
          });
          await toast.present();
          this.router.navigate(['/login']);
        } else {
          console.log('Error al actualizar la contraseña');
        }
      },
      (error) => {        console.error('Error en la solicitud:', error);
      }
    );
  }
}  