import { Injectable } from '@angular/core';
import { CLIENTS } from '../client/client.json';
import { Client } from '../models/Client';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import swall from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private url: string = 'http://localhost:8080';
  constructor(private http: HttpClient, private router: Router) {}

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  getClients(): Observable<Client[]> {
    // return this.http.get(this.url + '/api/' + 'clients/', {
    //   observe: 'response',
    // });
    //return of(CLIENTS);
    //return this.http.get<Client[]>(this.url)
    return this.http
      .get(this.url + '/api/' + 'clients')
      .pipe(map((response) => response as Client[]));
  }

  //FORMAS DISTINTAS DE OBTENER LA RESPUESTA HTTP:

  //Metodo devolviendo objeto generico:
  //-----------------------------------------------------------------

  //getClients(): Observable<any> {
  // return this.http.get(this.url + '/api/' + 'clients/', {
  //   observe: 'response',
  // });

  //ClientComponent:
  //response => this.clients = response.body
  //}

  //----------------------------------------------------------------

  //Metodo utililzando el operador map:
  //----------------------------------------------------------------

  // getClients(): Observable<Client[]> {
  //   return this.http
  //   .get(this.url + '/api/' + 'clients')
  //    .pipe(map((response) => response as Client[]));
  //   }

  //ClientComponent:
  //clients => this.clients = clients
  //----------------------------------------------------------------

  create(Client: Client): Observable<Client> {
    return this.http.post(this.url + '/api/' + 'clients', Client, {
      headers: this.httpHeaders,
    }).pipe(
      map((response: any) => response.client as Client),//Resive un tipo any en ves de un tipo Object
      //para que podamos castear any a tipo Client.
      catchError(e => {

        if(e.status==400){
          return throwError(e);
        }

        console.error(e.error.message);
        swall.fire('Error al crear cliente', e.error.message, 'error');
        return throwError(e);
      })
    );
  }

  getClient(id: Client): Observable<Client> {
    return this.http.get<Client>(`${this.url + '/api/' + 'clients'}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/list-clients']);
        console.error(e.error.message)
        swall.fire('Error al editar', e.error.message, 'error');
        return throwError(e);
      })
    );
  }

  update(Client: Client): Observable<any> {
    return this.http.put<any>(
      `${this.url + '/api/' + 'clients'}/${Client.id}`,
      Client,
      {
        headers: this.httpHeaders,
      }
    ).pipe(
      catchError(e => {

        if(e.status==400){
          return throwError(e);
        }
        
        console.error(e.error.message);
        swall.fire('Error al editar cliente', e.error.message, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Client> {
    return this.http.delete<Client>(`${this.url + '/api/' + 'clients'}/${id}`, {
      headers: this.httpHeaders,
    }).pipe(
      catchError(e => {
        console.error(e.error.message);
        swall.fire('Error al eliminar cliente', e.error.message, 'error');
        return throwError(e);
      })
    );
  }
}
