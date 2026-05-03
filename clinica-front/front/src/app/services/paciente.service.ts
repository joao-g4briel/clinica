import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paciente, CadastrarPacienteRequest } from '../models/paciente.model';

@Injectable({ providedIn: 'root' })
export class PacienteService {
  private readonly API = 'http://localhost:8080/pacientes';

  constructor(private http: HttpClient) {}

  listar(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.API);
  }

  cadastrar(request: CadastrarPacienteRequest): Observable<Paciente> {
    return this.http.post<Paciente>(this.API, request);
  }
}
