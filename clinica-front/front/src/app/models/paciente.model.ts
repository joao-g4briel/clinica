export interface Paciente {
  id: number;
  nome: string;
  cpf: string;
  email?: string;
  telefone?: string;
}

export interface CadastrarPacienteRequest {
  nome: string;
  cpf: string;
  email?: string;
  telefone?: string;
}
