package com.example.individuelluppgiftspringboot.controller;


import com.example.individuelluppgiftspringboot.dto.UserDto;
import com.example.individuelluppgiftspringboot.dto.UserRegistrationDTO;
import com.example.individuelluppgiftspringboot.entities.User;
import com.example.individuelluppgiftspringboot.service.UserService;
import com.example.individuelluppgiftspringboot.utility.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private final JwtUtil jwtTokenService;

    @Autowired
    public UserController(UserService userService, JwtUtil jwtTokenService) {
        this.userService = userService;
        this.jwtTokenService = jwtTokenService;

    }





    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        var allUsers = userService.getAllUsers();
        return ResponseEntity.ok(allUsers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        var user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }
}
