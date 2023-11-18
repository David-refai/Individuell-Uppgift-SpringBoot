package com.example.individuelluppgiftspringboot.service;


import com.example.individuelluppgiftspringboot.dao.UserRepository;
import com.example.individuelluppgiftspringboot.dto.UserDto;
import com.example.individuelluppgiftspringboot.dto.UserRegistrationDTO;
import com.example.individuelluppgiftspringboot.entities.Role;
import com.example.individuelluppgiftspringboot.entities.User;
import com.example.individuelluppgiftspringboot.exception.ExistsEmailException;
import com.example.individuelluppgiftspringboot.exception.HandleMethodArgumentNotValid;
import com.example.individuelluppgiftspringboot.exception.ResourceNotFoundException;
import com.example.individuelluppgiftspringboot.mapper.UserDTOMapper;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    private final UserDTOMapper userDTOMapper;

    @Autowired
    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       UserDTOMapper userDTOMapper) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userDTOMapper = userDTOMapper;
    }

    public void existsByEmail(String email) {
        userRepository.getByEmail(email) // Optional<User>
                .ifPresent(user -> {
                    throw new ExistsEmailException("Email already exists");
                });
    }


//    save user with roles
    public User saveUserWithRoles(UserRegistrationDTO userRegistrationDTO) {
// Validate the UserDto (e.g., check for required fields)
        validateUserDto(userRegistrationDTO);

//        check if email already exists
        existsByEmail(userRegistrationDTO.getEmail());


        User user = new User();
        var roles = userRegistrationDTO.getRoles();
        roles.forEach(role1 -> {
            var role = new Role(role1);
            user.addRole(role);
        });
        user.setName(userRegistrationDTO.getName());
        user.setEmail(userRegistrationDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userRegistrationDTO.getPassword()));
        return userRepository.save(user);

    }


//    get all users
    public List<UserDto> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(userDTOMapper)
                .collect(Collectors.toList());

    }

    public UserDto getUserById(Long id) {
        return userRepository.findById(Math.toIntExact(id))
                .map(userDTOMapper)
                .orElseThrow(() -> new ResourceNotFoundException("User with id " + id + " not found"));
    }


    private void validateUserDto(@Valid UserRegistrationDTO user) {
        if (user.getName() == null || user.getName().isEmpty()) {
            throw new HandleMethodArgumentNotValid("Name is required");
        }
        if (user.getEmail() == null || user.getEmail().isEmpty()) {
            throw new HandleMethodArgumentNotValid("Email is required");
        }
        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            throw new HandleMethodArgumentNotValid("Password is required");
        }

    }
}
