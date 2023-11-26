package com.example.individuelluppgiftspringboot.dto.userdto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class UserRegistrationDTO {
        private final int id;
        @NotBlank(message = "Name is required")
        private final String name;
        @NotBlank(message = "Email is required")
        @Email(message = "Email is not valid")
        private final String email;
        @NotBlank(message = "Password is required")
        private final String password;

        @NotBlank(message = "Username is required")
        private List<String> roles;
        private final String username;


}
