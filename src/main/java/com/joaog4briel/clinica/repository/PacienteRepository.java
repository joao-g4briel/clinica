package com.joaog4briel.clinica.repository;

import com.joaog4briel.clinica.entity.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {

    List<Paciente> findByNomeContainingIgnoreCase(String nome);
}
