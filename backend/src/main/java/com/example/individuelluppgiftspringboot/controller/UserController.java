package com.example.individuelluppgiftspringboot.controller;


import com.example.individuelluppgiftspringboot.dto.userdto.UserDto;
import com.example.individuelluppgiftspringboot.dto.userdto.UserRegistrationDTO;
import com.example.individuelluppgiftspringboot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin(origins = "http://localhost:5173") // react app
public class UserController {
    private final UserService userService;


    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;


    }

    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        var allUsers = userService.getAllUsers();
        return ResponseEntity.ok(allUsers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
            var userById = userService.getUserById(id);
            return ResponseEntity.ok(userById);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable Long id, @RequestBody UserRegistrationDTO userDto) {
        var updatedUser = userService.updateUser(id, userDto);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }
}
