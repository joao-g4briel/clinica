# Clínica Front-end

Interface web desenvolvida em **Angular 17+** para consumo da [API Clínica](https://github.com/joao-g4briel/clinica).

---

## Tecnologias

- Angular 17+
- TypeScript
- HttpClient
- Angular Router

---

## Pré-requisitos

- Node.js 18+
- Angular CLI

```bash
npm install -g @angular/cli
```

---

## Como rodar

```bash
# Clone o repositório
git clone https://github.com/joao-g4briel/clinica.git

# Entre na pasta do front
cd clinica/clinica-front/front

# Instale as dependências
npm install

# Inicie o servidor
ng serve
```

Acesse: [http://localhost:4200](http://localhost:4200)

> A API precisa estar rodando em `http://localhost:8080` antes de iniciar o front.

---

## Estrutura do projeto

```
src/app/
├── models/
│   ├── paciente.model.ts
│   ├── agendamento.model.ts
│   └── profissional.model.ts
├── services/
│   ├── paciente.service.ts
│   ├── agendamento.service.ts
│   └── profissional.service.ts
├── pages/
│   ├── pacientes/
│   │   └── pacientes.component.ts
│   └── agendamentos/
│       └── agendamentos.component.ts
├── app.ts
├── app.routes.ts
└── app.config.ts
```

---

## Funcionalidades

### Pacientes
- Cadastrar paciente com validação de campos
  - Nome: apenas letras
  - CPF: formato `000.000.000-00` com máscara automática
  - E-mail: validação de formato
  - Telefone: formato `(00) 00000-0000` com máscara automática
- Listar pacientes com busca por nome ou CPF

### Agendamentos
- Criar agendamento com busca de paciente e profissional por nome
- Listar agendamentos com filtros por paciente, profissional e status
- Cancelar agendamento com motivo via modal

---

## Rotas

| Rota | Componente | Descrição |
|---|---|---|
| `/pacientes` | PacientesComponent | Cadastro e listagem de pacientes |
| `/agendamentos` | AgendamentosComponent | Criação, listagem e cancelamento de agendamentos |

---

## Configuração da API

A URL base da API está definida nos services. Caso a API rode em outra porta, atualize os arquivos:

```
src/app/services/paciente.service.ts
src/app/services/agendamento.service.ts
src/app/services/profissional.service.ts
```

```typescript
private readonly API = 'http://localhost:8080/pacientes';
```
