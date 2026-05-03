package com.joaog4briel.clinica.controller;

import com.joaog4briel.clinica.dto.response.ProfissionalResponse;
import com.joaog4briel.clinica.service.ProfissionalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/profissionais")
@RequiredArgsConstructor
public class ProfissionalController {

    private final ProfissionalService service;

    @GetMapping
    public List<ProfissionalResponse> listar() {
        return service.listar();
    }

    @PostMapping
    public ResponseEntity<ProfissionalResponse> cadastrar(@RequestBody ProfissionalResponse request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.cadastrar(request));
    }
}
