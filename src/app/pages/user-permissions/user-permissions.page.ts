import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-user-permissions',
  templateUrl: './user-permissions.page.html',
  styleUrls: ['./user-permissions.page.scss'],
})
export class UserPermissionsPage implements OnInit {

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {
  }

  dismiss() {
    this.popoverController.dismiss();
  }

}

