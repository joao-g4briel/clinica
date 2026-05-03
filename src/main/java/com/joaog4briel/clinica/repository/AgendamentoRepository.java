package com.joaog4briel.clinica.repository;

import com.joaog4briel.clinica.entity.Agendamento;
import com.joaog4briel.clinica.entity.Profissional;
import com.joaog4briel.clinica.enums.StatusAgendamento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {

    boolean existsByProfissionalAndDataHora(Profissional profissional, LocalDateTime dataHora);

    List<Agendamento> findByPacienteId(Long pacienteId);

    List<Agendamento> findByProfissionalId(Long profissionalId);

    List<Agendamento> findByStatus(StatusAgendamento status);
}
