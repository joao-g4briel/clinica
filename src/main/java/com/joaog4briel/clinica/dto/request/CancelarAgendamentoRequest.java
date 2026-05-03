package com.joaog4briel.clinica.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CancelarAgendamentoRequest {

    @NotBlank(message = "O motivo do cancelamento é obrigatório")
    private String motivoCancelamento;
}
