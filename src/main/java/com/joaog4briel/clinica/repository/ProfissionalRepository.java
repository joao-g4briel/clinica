package com.joaog4briel.clinica.repository;

import com.joaog4briel.clinica.entity.Profissional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProfissionalRepository extends JpaRepository<Profissional, Long> {

    // Buscar por nome
    List<Profissional> findByNome(String nome);

    // Buscar por especialidade
    List<Profissional> findByEspecialidade(String especialidade);

}
