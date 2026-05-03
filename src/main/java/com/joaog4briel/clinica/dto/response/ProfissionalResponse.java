package com.joaog4briel.clinica.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfissionalResponse {
    private Long id;
    private String nome;
    private String especialidade;
    private String registro;
}
