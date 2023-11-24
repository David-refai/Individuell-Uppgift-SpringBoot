package com.example.individuelluppgiftspringboot.auth;

import com.example.individuelluppgiftspringboot.dto.userdto.UserDto;

public record AuthenticationResponse(
        String jwt,
        UserDto user

) {
}
