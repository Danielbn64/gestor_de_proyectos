import { Component, OnInit } from '@angular/core';
import { Client } from '../models/Client';
import { ClientService } from '../services/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  public client: Client = new Client();
  public errors: string[];

  constructor(
    private clientService: ClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  loadClient(): void {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.clientService
          .getClient(id)
          .subscribe((client) => (this.client = client));
      }
    });
  }

  ngOnInit(): void {
    this.loadClient();
  }

  public create(): void {
    this.clientService.create(this.client).subscribe(
      (client) => {
        this.router.navigate(['list-clients']);
        swal.fire(
          'Nuevo cliente',
          `${client.name} creado con éxito`,
          'success'
        );
      },
      (err) => {
        this.errors = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

  update(): void {
    this.clientService.update(this.client).subscribe(
      (response) => {
        this.router.navigate(['list-clients']);
        swal.fire(
          'Cliente Actualizado',
          `El cliene ${response.client.name} fue editado con éxito`,
          'success'
        );
      },
      (err) => {
        this.errors = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }
}
