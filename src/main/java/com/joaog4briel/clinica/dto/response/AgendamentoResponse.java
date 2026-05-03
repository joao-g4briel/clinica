package com.joaog4briel.clinica.dto.response;

import com.joaog4briel.clinica.enums.StatusAgendamento;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AgendamentoResponse {

    private Long id;
    private String nomePaciente;
    private String nomeProfissional;
    private LocalDateTime dataHora;
    private String tipoAtendimento;
    private StatusAgendamento status;
    private String motivoCancelamento; // null enquanto não cancelado
}
