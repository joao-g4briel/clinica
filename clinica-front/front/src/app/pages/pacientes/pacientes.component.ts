import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PacienteService } from '../../services/paciente.service';
import { Paciente, CadastrarPacienteRequest } from '../../models/paciente.model';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page">
      <h2>Pacientes</h2>

      <div class="card">
        <h3>Cadastrar Paciente</h3>
        <div class="form-row">
          <div class="field">
            <label>Nome *</label>
            <input
              [(ngModel)]="form.nome"
              name="nome"
              placeholder="Nome completo"
              (keydown)="apenasLetras($event)"
            />
          </div>
          <div class="field">
            <label>CPF *</label>
            <input
              [(ngModel)]="form.cpf"
              name="cpf"
              placeholder="000.000.000-00"
              (keydown)="apenasNumeros($event)"
              (input)="mascaraCpf($event)"
              maxlength="14"
            />
          </div>
        </div>
        <div class="form-row">
          <div class="field">
            <label>E-mail</label>
            <input
              [(ngModel)]="form.email"
              name="email"
              placeholder="email@exemplo.com"
              type="email"
            />
          </div>
          <div class="field">
            <label>Telefone</label>
            <input
              [(ngModel)]="form.telefone"
              name="telefone"
              placeholder="(00) 00000-0000"
              (keydown)="apenasNumeros($event)"
              (input)="mascaraTelefone($event)"
              maxlength="15"
            />
          </div>
        </div>
        <div class="form-actions">
          <button class="btn-primary" (click)="cadastrar()">Cadastrar</button>
        </div>
        <p class="mensagem sucesso" *ngIf="mensagem">{{ mensagem }}</p>
        <p class="mensagem erro" *ngIf="erro">{{ erro }}</p>
      </div>

      <div class="card">
        <div class="card-header">
          <h3>Pacientes Cadastrados ({{ pacientesFiltrados.length }})</h3>
        </div>
        <div class="busca">
          <input
            [(ngModel)]="termoBusca"
            (input)="filtrar()"
            placeholder="🔍  Buscar por nome ou CPF..."
          />
        </div>
        <p *ngIf="pacientesFiltrados.length === 0" class="vazio">Nenhum paciente encontrado.</p>
        <table *ngIf="pacientesFiltrados.length > 0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>CPF</th>
              <th>E-mail</th>
              <th>Telefone</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let p of pacientesFiltrados">
              <td>{{ p.id }}</td>
              <td>{{ p.nome }}</td>
              <td>{{ p.cpf }}</td>
              <td>{{ p.email || '—' }}</td>
              <td>{{ p.telefone || '—' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [
    `
      .page {
        padding: 24px;
        max-width: 1000px;
        margin: 0 auto;
      }
      h2 {
        font-size: 1.5rem;
        margin-bottom: 20px;
        color: #1e293b;
      }
      h3 {
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 16px;
        color: #334155;
      }
      .card {
        background: #fff;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 24px;
        margin-bottom: 20px;
      }
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
      }
      .card-header h3 {
        margin-bottom: 0;
      }
      .form-row {
        display: flex;
        gap: 16px;
        margin-bottom: 12px;
      }
      .field {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      label {
        font-size: 0.8rem;
        font-weight: 500;
        color: #64748b;
      }
      input,
      select {
        padding: 8px 12px;
        border: 1px solid #cbd5e1;
        border-radius: 6px;
        font-size: 0.9rem;
        outline: none;
        width: 100%;
        box-sizing: border-box;
      }
      input:focus,
      select:focus {
        border-color: #3b82f6;
        box-shadow: 0 0 0 2px #bfdbfe;
      }
      .form-actions {
        margin-top: 8px;
      }
      .busca {
        margin-bottom: 16px;
      }
      .busca input {
        width: 100%;
      }
      .btn-primary {
        background: #3b82f6;
        color: #fff;
        border: none;
        padding: 9px 20px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.9rem;
      }
      .btn-primary:hover {
        background: #2563eb;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.88rem;
      }
      th {
        text-align: left;
        padding: 10px 12px;
        background: #f8fafc;
        color: #64748b;
        font-weight: 500;
        font-size: 0.8rem;
        border-bottom: 1px solid #e2e8f0;
      }
      td {
        padding: 10px 12px;
        border-bottom: 1px solid #f1f5f9;
        color: #1e293b;
      }
      tr:last-child td {
        border-bottom: none;
      }
      .vazio {
        color: #94a3b8;
        font-size: 0.9rem;
      }
      .mensagem {
        margin-top: 12px;
        font-size: 0.85rem;
        padding: 8px 12px;
        border-radius: 6px;
      }
      .sucesso {
        background: #f0fdf4;
        color: #16a34a;
        border: 1px solid #bbf7d0;
      }
      .erro {
        background: #fef2f2;
        color: #dc2626;
        border: 1px solid #fecaca;
      }
    `,
  ],
})
export class PacientesComponent implements OnInit {
  pacientes: Paciente[] = [];
  pacientesFiltrados: Paciente[] = [];
  termoBusca = '';
  form: CadastrarPacienteRequest = { nome: '', cpf: '', email: '', telefone: '' };
  mensagem = '';
  erro = '';

  constructor(
    private pacienteService: PacienteService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.carregar();
  }

  carregar() {
    this.pacienteService.listar().subscribe({
      next: (data) => {
        this.pacientes = data;
        this.filtrar();
        this.cdr.detectChanges();
      },
    });
  }
  filtrar() {
    const termo = this.termoBusca.toLowerCase().trim();
    this.pacientesFiltrados = !termo
      ? [...this.pacientes]
      : this.pacientes.filter(
          (p) => p.nome.toLowerCase().includes(termo) || p.cpf.toLowerCase().includes(termo),
        );
    this.cdr.detectChanges();
  }

  /*cadastrar() {
    this.mensagem = '';
    this.erro = '';
    if (!this.form.nome || !this.form.cpf) {
      this.erro = 'Nome e CPF são obrigatórios.';
      return;
    }
    this.pacienteService.cadastrar(this.form).subscribe({
      next: () => {
        this.mensagem = 'Paciente cadastrado com sucesso!';
        this.form = { nome: '', cpf: '', email: '', telefone: '' };
        this.carregar();
        setTimeout(() => this.mensagem = '', 3000);
      },
      error: (err) => this.erro = err.error?.message || 'Erro ao cadastrar paciente.'
    });
  }*/

  // Máscara de CPF — chame no (input) do campo CPF
  mascaraCpf(event: Event) {
    let v = (event.target as HTMLInputElement).value.replace(/\D/g, '');
    v = v.substring(0, 11);
    if (v.length > 9) v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    else if (v.length > 6) v = v.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    else if (v.length > 3) v = v.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    this.form.cpf = v;
  }

  // Máscara de telefone — chame no (input) do campo Telefone
  mascaraTelefone(event: Event) {
    let v = (event.target as HTMLInputElement).value.replace(/\D/g, '');
    v = v.substring(0, 11);
    if (v.length > 6) v = v.replace(/(\d{2})(\d{5})(\d{1,4})/, '($1) $2-$3');
    else if (v.length > 2) v = v.replace(/(\d{2})(\d{1,5})/, '($1) $2');
    this.form.telefone = v;
  }

  // Bloqueia números e símbolos no nome
  apenasLetras(event: KeyboardEvent) {
    const permitido = /^[a-zA-ZÀ-ÿ\s]$/;
    if (
      !permitido.test(event.key) &&
      !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(event.key)
    ) {
      event.preventDefault();
    }
  }

  // Bloqueia letras no CPF e telefone
  apenasNumeros(event: KeyboardEvent) {
    if (
      !/^\d$/.test(event.key) &&
      !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(event.key)
    ) {
      event.preventDefault();
    }
  }

  // Validação antes de enviar
  cadastrar() {
    this.mensagem = '';
    this.erro = '';

    if (!this.form.nome || !this.form.cpf) {
      this.erro = 'Nome e CPF são obrigatórios.';
      return;
    }

    const cpfValido = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(this.form.cpf);
    if (!cpfValido) {
      this.erro = 'CPF inválido. Use o formato 000.000.000-00.';
      return;
    }

    if (this.form.email) {
      const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email);
      if (!emailValido) {
        this.erro = 'E-mail inválido.';
        return;
      }
    }

    if (this.form.telefone) {
      const telValido = /^\(\d{2}\)\s?\d{4,5}-\d{4}$/.test(this.form.telefone);
      if (!telValido) {
        this.erro = 'Telefone inválido. Use o formato (00) 00000-0000.';
        return;
      }
    }

    this.pacienteService.cadastrar(this.form).subscribe({
      next: () => {
        this.mensagem = 'Paciente cadastrado com sucesso!';
        this.form = { nome: '', cpf: '', email: '', telefone: '' };
        this.carregar();
        setTimeout(() => (this.mensagem = ''), 3000);
      },
      error: (err) => (this.erro = err.error?.message || 'Erro ao cadastrar paciente.'),
    });
  }
}
