import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgendamentoService } from '../../services/agendamento.service';
import { PacienteService } from '../../services/paciente.service';
import { ProfissionalService } from '../../services/profissional.service';
import { Agendamento, CriarAgendamentoRequest, StatusAgendamento } from '../../models/agendamento.model';
import { Paciente } from '../../models/paciente.model';
import { Profissional } from '../../models/profissional.model';

@Component({
  selector: 'app-agendamentos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page">
      <h2>Agendamentos</h2>

      <!-- Formulário -->
      <div class="card">
        <h3>Criar Agendamento</h3>

        <!-- Busca paciente -->
        <div class="form-row">
          <div class="field">
            <label>Paciente *</label>
            <input
              [(ngModel)]="buscaPaciente"
              (ngModelChange)="filtrarPacientes()"
              placeholder="🔍  Buscar paciente por nome..."
            />
            <div class="dropdown" *ngIf="pacientesFiltrados.length > 0 && !pacienteSelecionado">
              <div
                class="dropdown-item"
                *ngFor="let p of pacientesFiltrados"
                (click)="selecionarPaciente(p)"
              >
                {{ p.nome }} <span class="cpf">{{ p.cpf }}</span>
              </div>
            </div>
            <div class="selecionado" *ngIf="pacienteSelecionado">
              ✅ {{ pacienteSelecionado.nome }}
              <button class="btn-limpar" (click)="limparPaciente()">✕</button>
            </div>
          </div>

          <!-- Busca profissional -->
          <div class="field">
            <label>Profissional *</label>
            <input
              [(ngModel)]="buscaProfissional"
              (ngModelChange)="filtrarProfissionais()"
              placeholder="🔍  Buscar profissional por nome..."
            />
            <div class="dropdown" *ngIf="profissionaisFiltrados.length > 0 && !profissionalSelecionado">
              <div
                class="dropdown-item"
                *ngFor="let p of profissionaisFiltrados"
                (click)="selecionarProfissional(p)"
              >
                {{ p.nome }} <span class="cpf">{{ p.especialidade }}</span>
              </div>
            </div>
            <div class="selecionado" *ngIf="profissionalSelecionado">
              ✅ {{ profissionalSelecionado.nome }}
              <button class="btn-limpar" (click)="limparProfissional()">✕</button>
            </div>
          </div>
        </div>

        <div class="form-row">
          <div class="field">
            <label>Data e Hora *</label>
            <input [(ngModel)]="form.dataHora" name="dataHora" type="datetime-local" />
          </div>
          <div class="field">
            <label>Tipo de Atendimento *</label>
            <select [(ngModel)]="form.tipoAtendimento" name="tipoAtendimento">
              <option value="">Selecione...</option>
              <option value="Consulta">Consulta</option>
              <option value="Retorno">Retorno</option>
              <option value="Exame">Exame</option>
            </select>
          </div>
        </div>

        <div class="form-actions">
          <button class="btn-primary" (click)="criar()">Criar Agendamento</button>
        </div>
        <p class="mensagem sucesso" *ngIf="mensagemCriar">{{ mensagemCriar }}</p>
        <p class="mensagem erro" *ngIf="erroCriar">{{ erroCriar }}</p>
      </div>

      <!-- Lista -->
      <div class="card">
        <div class="card-header">
          <h3>Agendamentos ({{ agendamentos.length }})</h3>
        </div>

        <!-- Filtros -->
        <div class="form-row" style="margin-bottom: 16px">
          <div class="field">
            <label>Buscar por Paciente</label>
            <input
              [(ngModel)]="filtroBuscaPaciente"
              (ngModelChange)="filtrarPacientesLista()"
              placeholder="🔍  Nome do paciente..."
            />
            <div class="dropdown" *ngIf="pacientesFiltradosLista.length > 0 && !pacienteFiltroSelecionado">
              <div class="dropdown-item" *ngFor="let p of pacientesFiltradosLista" (click)="selecionarFiltro('paciente', p)">
                {{ p.nome }}
              </div>
            </div>
            <div class="selecionado" *ngIf="pacienteFiltroSelecionado">
              🔍 {{ pacienteFiltroSelecionado.nome }}
              <button class="btn-limpar" (click)="limparFiltro('paciente')">✕</button>
            </div>
          </div>

          <div class="field">
            <label>Buscar por Profissional</label>
            <input
              [(ngModel)]="filtroBuscaProfissional"
              (ngModelChange)="filtrarProfissionaisLista()"
              placeholder="🔍  Nome do profissional..."
            />
            <div class="dropdown" *ngIf="profissionaisFiltradosLista.length > 0 && !profissionalFiltroSelecionado">
              <div class="dropdown-item" *ngFor="let p of profissionaisFiltradosLista" (click)="selecionarFiltro('profissional', p)">
                {{ p.nome }}
              </div>
            </div>
            <div class="selecionado" *ngIf="profissionalFiltroSelecionado">
              🔍 {{ profissionalFiltroSelecionado.nome }}
              <button class="btn-limpar" (click)="limparFiltro('profissional')">✕</button>
            </div>
          </div>

          <div class="field">
            <label>Status</label>
            <select (change)="onFiltroStatusChange($event)">
              <option value="">Todos</option>
              <option value="AGENDADO">Agendado</option>
              <option value="CANCELADO">Cancelado</option>
            </select>
          </div>
        </div>

        <p *ngIf="agendamentos.length === 0" class="vazio">Nenhum agendamento encontrado.</p>
        <table *ngIf="agendamentos.length > 0">
          <thead>
            <tr>
              <th>ID</th><th>Paciente</th><th>Profissional</th>
              <th>Data e Hora</th><th>Tipo</th><th>Status</th><th>Ação</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let a of agendamentos">
              <td>{{ a.id }}</td>
              <td>{{ a.paciente?.nome || '—' }}</td>
              <td>{{ a.profissional?.nome || '—' }}</td>
              <td>{{ a.dataHora | date:'dd/MM/yyyy HH:mm' }}</td>
              <td>{{ a.tipoAtendimento }}</td>
              <td>
                <span class="badge" [class.agendado]="a.status === 'AGENDADO'" [class.cancelado]="a.status === 'CANCELADO'">
                  {{ a.status }}
                </span>
              </td>
              <td>
                <button *ngIf="a.status === 'AGENDADO'" class="btn-danger" (click)="abrirCancelamento(a)">
                  Cancelar
                </button>
                <span *ngIf="a.status === 'CANCELADO'" class="motivo-tip">
                  {{ a.motivoCancelamento || '—' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Modal cancelamento -->
      <div class="overlay" *ngIf="agendamentoSelecionado" (click)="fecharModal()">
        <div class="modal" (click)="$event.stopPropagation()">
          <h3>Cancelar Agendamento #{{ agendamentoSelecionado.id }}</h3>
          <p class="modal-info">
            Paciente: <strong>{{ agendamentoSelecionado.paciente?.nome }}</strong><br/>
            Data: <strong>{{ agendamentoSelecionado.dataHora | date:'dd/MM/yyyy HH:mm' }}</strong>
          </p>
          <div class="field">
            <label>Motivo *</label>
            <input [(ngModel)]="motivoCancelamento" placeholder="Informe o motivo..." />
          </div>
          <div class="modal-actions">
            <button class="btn-secondary" (click)="fecharModal()">Voltar</button>
            <button class="btn-danger" (click)="confirmarCancelamento()">Confirmar</button>
          </div>
          <p class="mensagem erro" *ngIf="erroCancelar">{{ erroCancelar }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page { padding: 24px; max-width: 1100px; margin: 0 auto; }
    h2 { font-size: 1.5rem; margin-bottom: 20px; color: #1e293b; }
    h3 { font-size: 1rem; font-weight: 600; margin-bottom: 16px; color: #334155; }
    .card { background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; margin-bottom: 20px; }
    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
    .card-header h3 { margin-bottom: 0; }
    .form-row { display: flex; gap: 16px; margin-bottom: 12px; }
    .field { flex: 1; display: flex; flex-direction: column; gap: 4px; position: relative; }
    label { font-size: 0.8rem; font-weight: 500; color: #64748b; }
    input, select { padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.9rem; outline: none; width: 100%; box-sizing: border-box; }
    input:focus, select:focus { border-color: #3b82f6; box-shadow: 0 0 0 2px #bfdbfe; }
    .dropdown { position: absolute; top: 100%; left: 0; right: 0; background: #fff; border: 1px solid #e2e8f0; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); z-index: 50; max-height: 200px; overflow-y: auto; margin-top: 2px; }
    .dropdown-item { padding: 8px 12px; cursor: pointer; font-size: 0.88rem; color: #1e293b; display: flex; justify-content: space-between; align-items: center; }
    .dropdown-item:hover { background: #f1f5f9; }
    .cpf { font-size: 0.78rem; color: #94a3b8; }
    .selecionado { display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; font-size: 0.88rem; color: #16a34a; margin-top: 2px; }
    .btn-limpar { background: none; border: none; cursor: pointer; color: #94a3b8; font-size: 0.9rem; padding: 0 4px; }
    .btn-limpar:hover { color: #ef4444; }
    .form-actions { margin-top: 8px; }
    .btn-primary { background: #3b82f6; color: #fff; border: none; padding: 9px 20px; border-radius: 6px; cursor: pointer; font-size: 0.9rem; }
    .btn-primary:hover { background: #2563eb; }
    .btn-secondary { background: #f1f5f9; color: #334155; border: 1px solid #e2e8f0; padding: 7px 16px; border-radius: 6px; cursor: pointer; font-size: 0.85rem; }
    .btn-secondary:hover { background: #e2e8f0; }
    .btn-danger { background: #fee2e2; color: #dc2626; border: 1px solid #fecaca; padding: 5px 12px; border-radius: 6px; cursor: pointer; font-size: 0.82rem; }
    .btn-danger:hover { background: #fecaca; }
    table { width: 100%; border-collapse: collapse; font-size: 0.88rem; }
    th { text-align: left; padding: 10px 12px; background: #f8fafc; color: #64748b; font-weight: 500; font-size: 0.8rem; border-bottom: 1px solid #e2e8f0; }
    td { padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #1e293b; }
    tr:last-child td { border-bottom: none; }
    .badge { padding: 3px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; }
    .badge.agendado { background: #dbeafe; color: #1d4ed8; }
    .badge.cancelado { background: #fee2e2; color: #dc2626; }
    .vazio { color: #94a3b8; font-size: 0.9rem; }
    .motivo-tip { font-size: 0.82rem; color: #64748b; }
    .mensagem { margin-top: 12px; font-size: 0.85rem; padding: 8px 12px; border-radius: 6px; }
    .sucesso { background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0; }
    .erro { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; }
    .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; z-index: 100; }
    .modal { background: #fff; border-radius: 10px; padding: 28px; width: 420px; max-width: 90vw; }
    .modal h3 { margin-bottom: 12px; }
    .modal-info { font-size: 0.88rem; color: #475569; margin-bottom: 16px; line-height: 1.8; }
    .modal-actions { display: flex; gap: 10px; margin-top: 16px; justify-content: flex-end; }
  `]
})
export class AgendamentosComponent implements OnInit {
  agendamentos: Agendamento[] = [];
  pacientes: Paciente[] = [];
  profissionais: Profissional[] = [];

  // Formulário de criação
  form: CriarAgendamentoRequest = { pacienteId: 0, profissionalId: 0, dataHora: '', tipoAtendimento: '' };
  buscaPaciente = '';
  buscaProfissional = '';
  pacientesFiltrados: Paciente[] = [];
  profissionaisFiltrados: Profissional[] = [];
  pacienteSelecionado?: Paciente;
  profissionalSelecionado?: Profissional;

  // Filtros da lista
  filtroBuscaPaciente = '';
  filtroBuscaProfissional = '';
  filtroStatus?: StatusAgendamento;
  pacientesFiltradosLista: Paciente[] = [];
  profissionaisFiltradosLista: Profissional[] = [];
  pacienteFiltroSelecionado?: Paciente;
  profissionalFiltroSelecionado?: Profissional;

  // Modal
  agendamentoSelecionado?: Agendamento;
  motivoCancelamento = '';
  mensagemCriar = '';
  erroCriar = '';
  erroCancelar = '';

  constructor(
    private agendamentoService: AgendamentoService,
    private pacienteService: PacienteService,
    private profissionalService: ProfissionalService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.carregarPacientes();
    this.carregarProfissionais();
    this.carregar();
  }

  carregarPacientes() {
    this.pacienteService.listar().subscribe({ next: (data) => this.pacientes = data });
  }

  carregarProfissionais() {
    this.profissionalService.listar().subscribe({ next: (data) => this.profissionais = data });
  }

  carregar() {
    const pacienteId = this.pacienteFiltroSelecionado?.id;
    const profissionalId = this.profissionalFiltroSelecionado?.id;
    this.agendamentoService.listar(pacienteId, profissionalId, this.filtroStatus).subscribe({
      next: (data) => {
        this.agendamentos = data; 
      this.cdr.detectChanges(); // força atualização da view
      }
    });
  }

  // Busca no formulário
  filtrarPacientes() {
    this.pacienteSelecionado = undefined;
    const t = this.buscaPaciente.toLowerCase();
    this.pacientesFiltrados = t.length < 1 ? [] :
      this.pacientes.filter(p => p.nome.toLowerCase().includes(t)).slice(0, 5);
  }

  filtrarProfissionais() {
    this.profissionalSelecionado = undefined;
    const t = this.buscaProfissional.toLowerCase();
    this.profissionaisFiltrados = t.length < 1 ? [] :
      this.profissionais.filter(p => p.nome.toLowerCase().includes(t)).slice(0, 5);
  }

  selecionarPaciente(p: Paciente) {
    this.pacienteSelecionado = p;
    this.form.pacienteId = p.id;
    this.pacientesFiltrados = [];
    this.buscaPaciente = '';
  }

  selecionarProfissional(p: Profissional) {
    this.profissionalSelecionado = p;
    this.form.profissionalId = p.id;
    this.profissionaisFiltrados = [];
    this.buscaProfissional = '';
  }

  limparPaciente() { this.pacienteSelecionado = undefined; this.form.pacienteId = 0; }
  limparProfissional() { this.profissionalSelecionado = undefined; this.form.profissionalId = 0; }

  // Busca nos filtros da lista
  filtrarPacientesLista() {
    this.pacienteFiltroSelecionado = undefined;
    const t = this.filtroBuscaPaciente.toLowerCase();
    this.pacientesFiltradosLista = t.length < 1 ? [] :
      this.pacientes.filter(p => p.nome.toLowerCase().includes(t)).slice(0, 5);
  }

  filtrarProfissionaisLista() {
    this.profissionalFiltroSelecionado = undefined;
    const t = this.filtroBuscaProfissional.toLowerCase();
    this.profissionaisFiltradosLista = t.length < 1 ? [] :
      this.profissionais.filter(p => p.nome.toLowerCase().includes(t)).slice(0, 5);
  }

  selecionarFiltro(tipo: 'paciente' | 'profissional', item: any) {
    if (tipo === 'paciente') {
      this.pacienteFiltroSelecionado = item;
      this.pacientesFiltradosLista = [];
      this.filtroBuscaPaciente = '';
    } else {
      this.profissionalFiltroSelecionado = item;
      this.profissionaisFiltradosLista = [];
      this.filtroBuscaProfissional = '';
    }
    this.carregar();
  }

  limparFiltro(tipo: 'paciente' | 'profissional') {
    if (tipo === 'paciente') {
      this.pacienteFiltroSelecionado = undefined;
      this.filtroBuscaPaciente = '';
    } else {
      this.profissionalFiltroSelecionado = undefined;
      this.filtroBuscaProfissional = '';
    }
    this.carregar();
  }

  criar() {
    this.mensagemCriar = '';
    this.erroCriar = '';
    if (!this.pacienteSelecionado) { this.erroCriar = 'Selecione um paciente.'; return; }
    if (!this.profissionalSelecionado) { this.erroCriar = 'Selecione um profissional.'; return; }
    if (!this.form.dataHora) { this.erroCriar = 'Informe a data e hora.'; return; }
    if (!this.form.tipoAtendimento) { this.erroCriar = 'Selecione o tipo de atendimento.'; return; }

    const payload = { ...this.form, dataHora: this.form.dataHora + ':00' };

    this.agendamentoService.criar(payload).subscribe({
      next: () => {
        this.mensagemCriar = 'Agendamento criado com sucesso!';
        this.form = { pacienteId: 0, profissionalId: 0, dataHora: '', tipoAtendimento: '' };
        this.pacienteSelecionado = undefined;
        this.profissionalSelecionado = undefined;
        this.carregar();
        setTimeout(() => this.mensagemCriar = '', 3000);
      },
      error: (err) => this.erroCriar = err.error?.message || 'Erro ao criar agendamento.'
    });
  }

  abrirCancelamento(a: Agendamento) {
    this.agendamentoSelecionado = a;
    this.motivoCancelamento = '';
    this.erroCancelar = '';
  }

  fecharModal() { this.agendamentoSelecionado = undefined; }

  confirmarCancelamento() {
    if (!this.motivoCancelamento.trim()) { this.erroCancelar = 'Informe o motivo.'; return; }
    this.agendamentoService.cancelar(this.agendamentoSelecionado!.id, {
      motivoCancelamento: this.motivoCancelamento
    }).subscribe({
      next: () => { this.fecharModal(); this.carregar(); },
      error: (err) => this.erroCancelar = err.error?.message || 'Erro ao cancelar.'
    });
  }

  onFiltroStatusChange(event: Event) {
  const valor = (event.target as HTMLSelectElement).value;
  this.filtroStatus = valor === '' ? undefined : valor as StatusAgendamento;
  this.carregar();
}
}
