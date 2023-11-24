package com.example.individuelluppgiftspringboot.mapper;

import com.example.individuelluppgiftspringboot.dto.userdto.UserDto;
import com.example.individuelluppgiftspringboot.entities.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.function.Function;
import java.util.stream.Collectors;


@Service
public class UserDTOMapper implements Function<User, UserDto> {
    @Override
    public UserDto apply(User user) {
        return new UserDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.toList()),

                user.getUsername()
        );
    }
}
