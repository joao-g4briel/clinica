import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profissional } from '../models/profissional.model';

@Injectable({ providedIn: 'root' })
export class ProfissionalService {
  private readonly API = 'http://localhost:8080/profissionais';

  constructor(private http: HttpClient) {}

  listar(): Observable<Profissional[]> {
    return this.http.get<Profissional[]>(this.API);
  }
}
