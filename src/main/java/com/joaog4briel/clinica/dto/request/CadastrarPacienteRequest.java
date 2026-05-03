package com.joaog4briel.clinica.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor
public class CadastrarPacienteRequest {

    @NotBlank(message = "Nome é obrigatório")
    @Pattern(regexp = "^[a-zA-ZÀ-ÿ\\s]+$", message = "Nome deve conter apenas letras")
    @Size(min = 2, max = 100, message = "Nome deve ter entre 2 e 100 caracteres")
    private String nome;

    @NotBlank(message = "CPF é obrigatório")
    @Pattern(regexp = "^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$", message = "CPF deve estar no formato 000.000.000-00")
    private String cpf;

    @Email(message = "E-mail inválido")
    private String email;

    @Pattern(regexp = "^\\(\\d{2}\\)\\s?\\d{4,5}-\\d{4}$", message = "Telefone deve estar no formato (00) 00000-0000")
    private String telefone;
}
