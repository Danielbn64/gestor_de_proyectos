import { Component, OnInit } from '@angular/core';
import { Client } from '../models/Client';
import { CLIENTS } from './client.json';
import { ClientService } from '../services/client.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  clients!: Client[];

  constructor(private clientService: ClientService){
  }

  ngOnInit() {
    this.clientService.getClients().subscribe(
      clients => this.clients = clients
      );
    }

  delete(client: Client): void {
    swal.fire({
      title: '¿Deseas borrar este cliente?',
      text: `Se borrará el cliente ${client.name} de la lista`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'no borrar',
      confirmButtonText: 'Si deseo borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientService.delete(client.id).subscribe(
          response => {
            this.clients = this.clients.filter(cli => cli !== client)
            swal.fire(
              'Borrado',
              `El cliente ${client.name} a sido borrado éxitosamente.`,
              'success'
            )
          }
        )
      }
    })
  }
}
