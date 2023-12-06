package com.example.individuelluppgiftspringboot.controller;


import com.example.individuelluppgiftspringboot.dto.userdto.UserDto;
import com.example.individuelluppgiftspringboot.dto.userdto.UserRegistrationDTO;
import com.example.individuelluppgiftspringboot.entities.User;
import com.example.individuelluppgiftspringboot.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin(origins = "*")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    /**
     * Register a new user.
     * @param userRegistrationDTO The user to register.
     * @return The registered user.
     */
    @PostMapping("/create-user")
    public ResponseEntity<User> createUserWithRole(@Valid @RequestBody UserRegistrationDTO userRegistrationDTO) {
            User savedUser = userService.saveUserWithRoles(userRegistrationDTO);
            return ResponseEntity.ok(savedUser);
    }

    /**
     * Get all users. Will only work if the user is an admin.
     * @return All users.
     */
    @GetMapping("/all")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        var allUsers = userService.getAllUsers();
        System.out.println(allUsers);
        return ResponseEntity.ok(allUsers);
    }

    /**
     * Get a user by id.
     * @param id The id of the user to get.
     * @return The user with the specified id.
     */
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable int id) {
            var userById = userService.getUserById(id);
            return ResponseEntity.ok(userById);
    }

    @PutMapping("/update-user/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable Long id, @RequestBody UserRegistrationDTO userDto) {
       userService.updateUser(id, userDto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete-user/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable int id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }
}
