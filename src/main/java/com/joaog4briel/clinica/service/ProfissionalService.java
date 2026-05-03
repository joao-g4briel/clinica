package com.joaog4briel.clinica.service;

import com.joaog4briel.clinica.dto.response.ProfissionalResponse;
import com.joaog4briel.clinica.entity.Profissional;
import com.joaog4briel.clinica.repository.ProfissionalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfissionalService {

    private final ProfissionalRepository repository;

    @Transactional(readOnly = true)
    public List<ProfissionalResponse> listar() {
        return repository.findAll()
                .stream()
                .map(p -> ProfissionalResponse.builder()
                        .id(p.getId())
                        .nome(p.getNome())
                        .especialidade(p.getEspecialidade())
                        .registro(p.getRegistro())
                        .build())
                .toList();
    }

    @Transactional
    public ProfissionalResponse cadastrar(ProfissionalResponse request) {
        Profissional profissional = new Profissional();
        profissional.setNome(request.getNome());
        profissional.setEspecialidade(request.getEspecialidade());
        profissional.setRegistro(request.getRegistro());
        Profissional salvo = repository.save(profissional);
        return ProfissionalResponse.builder()
                .id(salvo.getId())
                .nome(salvo.getNome())
                .especialidade(salvo.getEspecialidade())
                .registro(salvo.getRegistro())
                .build();
    }
}
