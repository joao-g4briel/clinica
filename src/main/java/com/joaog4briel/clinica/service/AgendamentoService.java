package com.joaog4briel.clinica.service;

import com.joaog4briel.clinica.dto.request.CancelarAgendamentoRequest;
import com.joaog4briel.clinica.dto.request.CriarAgendamentoRequest;
import com.joaog4briel.clinica.entity.Agendamento;
import com.joaog4briel.clinica.enums.StatusAgendamento;
import com.joaog4briel.clinica.repository.AgendamentoRepository;
import com.joaog4briel.clinica.repository.PacienteRepository;
import com.joaog4briel.clinica.repository.ProfissionalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AgendamentoService {

    private final AgendamentoRepository repository;
    private final PacienteRepository pacienteRepository;
    private final ProfissionalRepository profissionalRepository;

    public Agendamento criar(CriarAgendamentoRequest request) {

        // Validação: data no passado
        if (request.getDataHora().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Data não pode ser no passado");
        }

        // Busca paciente
        var paciente = pacienteRepository.findById(request.getPacienteId())
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado"));

        // Busca profissional
        var profissional = profissionalRepository.findById(request.getProfissionalId())
                .orElseThrow(() -> new RuntimeException("Profissional não encontrado"));

        // Validação: conflito de horário
        boolean existe = repository.existsByProfissionalAndDataHora(
                profissional,
                request.getDataHora()
        );
        if (existe) {
            throw new RuntimeException("Profissional já possui agendamento nesse horário");
        }

        // Monta e salva
        Agendamento agendamento = new Agendamento();
        agendamento.setPaciente(paciente);
        agendamento.setProfissional(profissional);
        agendamento.setDataHora(request.getDataHora());
        agendamento.setTipoAtendimento(request.getTipoAtendimento());
        agendamento.setStatus(StatusAgendamento.AGENDADO);

        return repository.save(agendamento);
    }

    public List<Agendamento> listar(Long pacienteId, Long profissionalId, StatusAgendamento status) {
        if (pacienteId != null) {
            return repository.findByPacienteId(pacienteId);
        }
        if (profissionalId != null) {
            return repository.findByProfissionalId(profissionalId);
        }
        if (status != null) {
            return repository.findByStatus(status);
        }
        return repository.findAll();
    }

    public Agendamento cancelar(Long id, CancelarAgendamentoRequest request) {

        Agendamento agendamento = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Agendamento não encontrado"));

        // Validação: já cancelado
        if (StatusAgendamento.CANCELADO.equals(agendamento.getStatus())) {
            throw new RuntimeException("Este agendamento já foi cancelado");
        }

        agendamento.setStatus(StatusAgendamento.CANCELADO);
        agendamento.setMotivoCancelamento(request.getMotivoCancelamento());

        return repository.save(agendamento);
    }
}