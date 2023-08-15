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

  user: { name: string; email: string; password: string;  confirmPassword: string } = { name: '', email: '', password: '', confirmPassword: '' };

  registro() {
    console.log('Cargando registro');

    this.http.post('http://localhost:3000/registro', this.user).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
    this.router.navigate(['../login']);
  }
  
  arePasswordsMatching() {
    return this.user.password === this.user.confirmPassword;
  }
}