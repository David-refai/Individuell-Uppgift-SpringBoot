package com.example.individuelluppgiftspringboot.auth;

import com.example.individuelluppgiftspringboot.dto.UserDto;

public record AuthenticationResponse(
        String jwt,
        UserDto user

) {
}
