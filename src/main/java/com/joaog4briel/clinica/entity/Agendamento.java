package com.joaog4briel.clinica.entity;

import com.joaog4briel.clinica.enums.StatusAgendamento;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Agendamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Paciente paciente;

    @ManyToOne
    private Profissional profissional;

    @NotNull
    private LocalDateTime dataHora;

    @NotNull
    private String tipoAtendimento;

    @Enumerated(EnumType.STRING)
    private StatusAgendamento status;

    private String motivoCancelamento;
}
