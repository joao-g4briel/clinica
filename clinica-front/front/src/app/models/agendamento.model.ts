export type StatusAgendamento = 'AGENDADO' | 'CANCELADO';

export interface Agendamento {
  id: number;
  paciente: { id: number; nome: string };
  profissional: { id: number; nome: string };
  dataHora: string;
  tipoAtendimento: string;
  status: StatusAgendamento;
  motivoCancelamento?: string;
}

export interface CriarAgendamentoRequest {
  pacienteId: number;
  profissionalId: number;
  dataHora: string;
  tipoAtendimento: string;
}

export interface CancelarAgendamentoRequest {
  motivoCancelamento: string;
}
