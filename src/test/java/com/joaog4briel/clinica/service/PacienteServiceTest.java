package com.joaog4briel.clinica.service;

import com.joaog4briel.clinica.dto.request.CadastrarPacienteRequest;
import com.joaog4briel.clinica.dto.response.PacienteResponse;
import com.joaog4briel.clinica.entity.Paciente;
import com.joaog4briel.clinica.repository.PacienteRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PacienteServiceTest {

    @Mock
    private PacienteRepository pacienteRepository;

    @InjectMocks
    private PacienteService pacienteService;

    private CadastrarPacienteRequest request;
    private Paciente pacienteSalvo;

    @BeforeEach
    void setUp() {
        request = new CadastrarPacienteRequest();
        request.setNome("Maria Silva");
        request.setCpf("123.456.789-00");
        request.setEmail("maria@email.com");
        request.setTelefone("(81) 99999-0001");

        pacienteSalvo = new Paciente();
        pacienteSalvo.setId(1L);
        pacienteSalvo.setNome("Maria Silva");
        pacienteSalvo.setCpf("123.456.789-00");
        pacienteSalvo.setEmail("maria@email.com");
        pacienteSalvo.setTelefone("(81) 99999-0001");
    }

    @Test
    void deveCadastrarPacienteComSucesso() {
        // Arrange
        when(pacienteRepository.save(any(Paciente.class)))
                .thenReturn(pacienteSalvo);

        // Act
        PacienteResponse resultado = pacienteService.cadastrar(request);

        // Assert
        assertEquals("Maria Silva", resultado.getNome());
        assertEquals("123.456.789-00", resultado.getCpf());
        verify(pacienteRepository).save(any(Paciente.class));
    }

    @Test
    void listar() {
        // implementar depois
    }
}