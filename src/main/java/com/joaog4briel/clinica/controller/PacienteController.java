package com.joaog4briel.clinica.controller;

import com.joaog4briel.clinica.entity.Paciente;
import com.joaog4briel.clinica.repository.PacienteRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pacientes")
public class PacienteController {

    @Autowired
    private PacienteRepository repository;

    @PostMapping
    public Paciente criar(@RequestBody @Valid Paciente paciente) {
        return repository.save(paciente);
    }

    @GetMapping
    public List<Paciente> listar() {
        return repository.findAll();
    }
}
