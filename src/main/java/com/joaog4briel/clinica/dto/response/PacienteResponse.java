package com.joaog4briel.clinica.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PacienteResponse {
    private Long id;
    private String nome;
    private int idade;
    private String cpf;
    private String email;
    private String telefone;
}
