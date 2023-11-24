package com.example.individuelluppgiftspringboot.auth;

import com.example.individuelluppgiftspringboot.dto.userdto.UserDto;
import com.example.individuelluppgiftspringboot.entities.User;
import com.example.individuelluppgiftspringboot.mapper.UserDTOMapper;
import com.example.individuelluppgiftspringboot.jwtUtility.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final UserDTOMapper userDTOMapper;

    public AuthenticationService(JwtUtil jwtUtil, AuthenticationManager authenticationManager, UserDTOMapper userDTOMapper) {
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
        this.userDTOMapper = userDTOMapper;
    }

    public AuthenticationResponse login(AuthenticationRequest authenticationRequest) {
        return getAuthenticationResponse(authenticationRequest);
    }

    private AuthenticationResponse getAuthenticationResponse(AuthenticationRequest authenticationRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticationRequest.email(),
                        authenticationRequest.password()
                )
        );
        User user = (User) authentication.getPrincipal();
        UserDto userDto = userDTOMapper.apply(user);
        String jwt = jwtUtil.generateToken(userDto, userDto.getRoles());
        return new AuthenticationResponse(jwt, userDto);
    }
}