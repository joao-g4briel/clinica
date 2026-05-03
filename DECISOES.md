# Decisões Técnicas

## Principais decisões

- **Spring Boot + JPA:** escolhidos pela produtividade e padronização
- **DTOs separados:** nunca expor a entidade diretamente na API
- **Exceções semânticas:** cada regra de negócio tem sua própria exceção
- **Specification para filtros:** evita múltiplos métodos no repository
- **Angular standalone:** componentes sem NgModule, padrão do Angular 17+

## O que priorizei

Priorizei as regras de negócio obrigatórias (conflito de horário, 
data no passado, cancelamento com motivo) e a estrutura limpa em camadas.

## O que ficou de fora

- Autenticação JWT
- Paginação nas listagens
- Envio de e-mail de confirmação
- Testes de integração e controller

## Uso de IA

Utilizei IA (Claude) para auxiliar no aprendizado, construção da lógica da API, geração da estrutura, resolução de erros. Tudo foi revisado, 
testado manualmente via Postman, antes de ser commitado.
