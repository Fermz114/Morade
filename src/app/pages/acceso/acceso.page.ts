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
  private cicloEnProceso = false;

  cambiarEstadoPuerta() {
    if (!this.cicloEnProceso) {
      this.cicloEnProceso = true;

      this.http.post<any>('http://192.168.27.57:5000/api/puerta', {}).subscribe(
        (response) => {
          console.log(response.mensaje);

          // Esperar 20 segundos y luego cerrar la puerta
          setTimeout(() => {
            this.http.post<any>('http://192.168.27.57:5000/api/puerta', {}).subscribe(
            (response) => {
              console.log(response.mensaje);

              // Restablecer la variable para permitir un nuevo ciclo
              this.cicloEnProceso = false;

              // Llamar recursivamente para reiniciar el ciclo
              this.cambiarEstadoPuerta();
              },
              (error) => {
                console.error('Error:', error);

                // Restablecer la variable en caso de error
                this.cicloEnProceso = false;
              }
            );
          }, 20000);
        },
        (error) => {
          console.error('Error:', error);

          // Restablecer la variable en caso de error
          this.cicloEnProceso = false;
        }
      );
    }
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
