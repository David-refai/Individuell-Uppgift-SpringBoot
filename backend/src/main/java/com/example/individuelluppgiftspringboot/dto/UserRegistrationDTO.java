package com.example.individuelluppgiftspringboot.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class UserRegistrationDTO {
        private final int id;
        @NotBlank(message = "Name is required")
        private final String name;
        @NotBlank(message = "Email is required")
        @Email(message = "Email is invalid")
        private final String email;
        @NotBlank(message = "Password is required")
        private final String password;
        private List<String> roles;
        private final String username;


}
