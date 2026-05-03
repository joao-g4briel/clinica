import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Agendamento,
  CriarAgendamentoRequest,
  CancelarAgendamentoRequest,
  StatusAgendamento
} from '../models/agendamento.model';

@Injectable({ providedIn: 'root' })
export class AgendamentoService {
  private readonly API = 'http://localhost:8080/agendamentos';

  constructor(private http: HttpClient) {}

  listar(pacienteId?: number, profissionalId?: number, status?: StatusAgendamento): Observable<Agendamento[]> {
    let params = new HttpParams();
    if (pacienteId)     params = params.set('pacienteId', pacienteId);
    if (profissionalId) params = params.set('profissionalId', profissionalId);
    if (status)         params = params.set('status', status);
    return this.http.get<Agendamento[]>(this.API, { params });
  }

  criar(request: CriarAgendamentoRequest): Observable<Agendamento> {
    return this.http.post<Agendamento>(this.API, request);
  }

  cancelar(id: number, request: CancelarAgendamentoRequest): Observable<Agendamento> {
    return this.http.patch<Agendamento>(`${this.API}/${id}/cancelar`, request);
  }
}
