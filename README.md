# Clínica API

## Requisitos
- Java 17+
- Maven
- Oracle (ou H2 para testes)

## Como rodar

### Back-end
```bash
# Clone o repositório
git clone https://github.com/joao-g4briel/api-clinica

# Configure o banco em src/main/resources/application-oracle.yml
    url: jdbc:oracle:thin:@localhost:1521:XE
    username: system
    password: oracle

# Rode o projeto
./mvnw spring-boot:run
```

### Front-end
```bash
cd clinica-front/front
npm install
ng serve
```

Acesse: http://localhost:4200

## Endpoints principais
- POST   /pacientes
- GET    /pacientes
- POST   /agendamentos
- GET    /agendamentos
- PATCH  /agendamentos/{id}/cancelar
- POST   /medico/agendamentos
