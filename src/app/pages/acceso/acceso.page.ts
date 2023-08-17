import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.page.html',
  styleUrls: ['./acceso.page.scss'],
})
export class AccesoPage{

  constructor(private http:HttpClient) { }

  cambiarEstadoPuerta() {
      this.http.post<any>('http://192.168.103.57:5000/api/puerta', {}).subscribe(
        (response) => {
          console.log(response.mensaje);
        },
        (error) => {
          console.error('Error:', error);

        }
      );
    
  }

  Generartoken() {
    var num = Math.floor(Math.random() * 10000);
    
    Swal.fire({
      title: "Nuevo token",
      html: "<h1><b>" + num + "</b></h1>",
      icon: "success",
      heightAuto: false,
      showCancelButton: true,
    });
  }
  
}
