package com.example.individuelluppgiftspringboot.auth;

public record AuthenticationRequest(
        String email,
        String password
){}
