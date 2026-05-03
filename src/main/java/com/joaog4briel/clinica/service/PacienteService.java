package com.joaog4briel.clinica.service;

import com.joaog4briel.clinica.dto.request.CadastrarPacienteRequest;
import com.joaog4briel.clinica.dto.response.PacienteResponse;
import com.joaog4briel.clinica.entity.Paciente;
import com.joaog4briel.clinica.repository.PacienteRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PacienteService {

    private final PacienteRepository pacienteRepository;

    @Transactional
    public PacienteResponse cadastrar(CadastrarPacienteRequest request) {
        // Arrange: converte request → entidade
        Paciente paciente = new Paciente();
        paciente.setNome(request.getNome());
        paciente.setCpf(request.getCpf());
        paciente.setEmail(request.getEmail());
        paciente.setTelefone(request.getTelefone());

        // Act: salva no banco
        Paciente salvo = pacienteRepository.save(paciente);

        // Retorna: converte entidade → response
        return toResponse(salvo);
    }

    @Transactional(readOnly = true)
    public List<PacienteResponse> listar() {
        return pacienteRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    // Método privado de conversão — evita repetição
    private PacienteResponse toResponse(Paciente paciente) {
        return PacienteResponse.builder()
                .id(paciente.getId())
                .nome(paciente.getNome())
                .cpf(paciente.getCpf())
                .email(paciente.getEmail())
                .telefone(paciente.getTelefone())
                .build();
    }
}
