package com.joaog4briel.clinica.controller;

import com.joaog4briel.clinica.dto.request.CancelarAgendamentoRequest;
import com.joaog4briel.clinica.dto.request.CriarAgendamentoRequest;
import com.joaog4briel.clinica.entity.Agendamento;
import com.joaog4briel.clinica.enums.StatusAgendamento;
import com.joaog4briel.clinica.service.AgendamentoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/agendamentos")
@RequiredArgsConstructor
public class AgendamentoController {

    private final AgendamentoService service;

    @PostMapping
    public ResponseEntity<Agendamento> criar(@RequestBody CriarAgendamentoRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criar(request));
    }

    @GetMapping
    public List<Agendamento> listar(
            @RequestParam(required = false) Long pacienteId,
            @RequestParam(required = false) Long profissionalId,
            @RequestParam(required = false) StatusAgendamento status) {
        return service.listar(pacienteId, profissionalId, status);
    }

    @PatchMapping("/{id}/cancelar")
    public ResponseEntity<Agendamento> cancelar(
            @PathVariable Long id,
            @RequestBody CancelarAgendamentoRequest request) {
        return ResponseEntity.ok(service.cancelar(id, request));
    }
}