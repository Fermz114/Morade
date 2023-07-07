import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { UserPermissionsPage } from '../user-permissions/user-permissions.page'
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage {
  users: any[] = [
    { name: 'Usuario 1', email: 'usuario1@example.com' },
    { name: 'Usuario 2', email: 'usuario2@example.com' },
    { name: 'Usuario 3', email: 'usuario3@example.com' },
  ];
  selectedUser: any;

  constructor(private popoverController: PopoverController) {}

  async openPermissions(user: any) {
    this.selectedUser = user;
    const popover = await this.popoverController.create({
      component: UserPermissionsPage,
      componentProps: {
        user: this.selectedUser
      },
      translucent: true,
    });

    return await popover.present();
  }

}

