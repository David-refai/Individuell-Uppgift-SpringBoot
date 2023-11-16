package com.example.individuelluppgiftspringboot.dto;

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
        private final String name;
        private final String email;
        private final String password;
        private List<String> roles;
        private final String username;


}
