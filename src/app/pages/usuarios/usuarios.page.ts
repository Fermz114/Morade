import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient para realizar solicitudes HTTP
import { UserPermissionsPage } from '../user-permissions/user-permissions.page';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage {
  users: any[] = []; // Inicializa la matriz de usuarios vacía
  selectedUser: any;

  constructor(
    private popoverController: PopoverController,
    private http: HttpClient // Agrega el servicio HttpClient
  ) {}

  ngOnInit() {
    // Realiza la solicitud HTTP para obtener los datos de los usuarios desde tu servidor
    this.http.get<any[]>('http://localhost:3000/usuarios').subscribe((data) => {
      this.users = data;
    });
  }

  async openPermissions(user: any) {
    this.selectedUser = user;
    const popover = await this.popoverController.create({
      component: UserPermissionsPage,
      componentProps: {
        user: this.selectedUser,
      },
      translucent: true,
    });

    return await popover.present();
  }
}