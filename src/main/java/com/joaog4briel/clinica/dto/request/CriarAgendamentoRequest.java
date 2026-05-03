package com.joaog4briel.clinica.dto.request;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class CriarAgendamentoRequest {

    @NotNull(message = "O ID do paciente é obrigatório")
    private Long pacienteId;

    @NotNull(message = "O ID do profissional é obrigatório")
    private Long profissionalId;

    @NotNull(message = "A data e hora são obrigatórias")
    @Future(message = "A data e hora devem ser no futuro")
    private LocalDateTime dataHora;

    @NotBlank(message = "O tipo de atendimento é obrigatório")
    private String tipoAtendimento;
}
