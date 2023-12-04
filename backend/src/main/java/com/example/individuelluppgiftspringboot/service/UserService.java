package com.example.individuelluppgiftspringboot.service;


import com.example.individuelluppgiftspringboot.dao.RoleRepository;
import com.example.individuelluppgiftspringboot.dao.UserRepository;
import com.example.individuelluppgiftspringboot.dto.userdto.UserDto;
import com.example.individuelluppgiftspringboot.dto.userdto.UserRegistrationDTO;
import com.example.individuelluppgiftspringboot.entities.Role;
import com.example.individuelluppgiftspringboot.entities.User;
import com.example.individuelluppgiftspringboot.exception.ExistsEmailException;
import com.example.individuelluppgiftspringboot.exception.HandleMethodArgumentNotValid;
import com.example.individuelluppgiftspringboot.exception.ResourceNotFoundException;
import com.example.individuelluppgiftspringboot.mapper.UserDTOMapper;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    private final UserDTOMapper userDTOMapper;

    @Autowired
    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       RoleRepository roleRepository, UserDTOMapper userDTOMapper) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.userDTOMapper = userDTOMapper;
    }




    //    save user with roles
    public User saveUserWithRoles(UserRegistrationDTO userRegistrationDTO) {
// Validate the UserDto (e.g., check for required fields)
        validateUserDto(userRegistrationDTO);

//        check if email already exists
        existsByEmail(userRegistrationDTO.getEmail());


        User user = new User();
        user.setName(userRegistrationDTO.getName());
        user.setEmail(userRegistrationDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userRegistrationDTO.getPassword()));

        if (userRegistrationDTO.getRoles() == null) {
            userRegistrationDTO.setRoles(List.of("USER"));
        }

        var roles = userRegistrationDTO.getRoles();
        roles.forEach(roleName -> {
            Role role = new Role();
            role.setName(roleName);
            role.setUser(user);
            user.addRole(role);
        });

        return userRepository.save(user);

    }


    //    get all users
    public List<UserDto> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(userDTOMapper)
                .collect(Collectors.toList());

    }
    @Transactional
    public User getUserById(int id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User with id " + id + " not found"));
    }

    public boolean existsByEmail(String email) {
    userRepository.getByEmail(email)
                .ifPresent(user -> {
                    throw new ExistsEmailException("Email already exists");
                });
        return false;


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

    public void updateUser(Long id, UserRegistrationDTO userRegistrationRequest) {
        User user = getUserById(Math.toIntExact(id));
        
            boolean updated = false;

            if (userRegistrationRequest.getName() != null && !userRegistrationRequest.getName().equals(user.getName())) {
                user.setName(userRegistrationRequest.getName());
                updated = true;
            }
            // Check if a new password is provided
            if (userRegistrationRequest.getPassword() != null && !userRegistrationRequest.getPassword().isEmpty()) {
                user.setPassword(passwordEncoder.encode(userRegistrationRequest.getPassword()));
                updated = true;
            }

            // Check if a new role is provided
            if (userRegistrationRequest.getRoles() != null && !userRegistrationRequest.getRoles().isEmpty()) {
                user.setRoles(userRegistrationRequest.getRoles().stream().map(Role::new).collect(Collectors.toList()));
                updated = true;
            }

            // Check if a new email is provided
            if (userRegistrationRequest.getEmail() != null && !userRegistrationRequest.getEmail().equals(user.getEmail())) {
                existsByEmail(userRegistrationRequest.getEmail());
                user.setEmail(userRegistrationRequest.getEmail());
                updated = true;
            }else if(userRegistrationRequest.getEmail().equals(user.getEmail())){
                updated = true;
            }
            if (!updated) {
                throw new ExistsEmailException("No changes were made");
            }
            userRepository.save(user);


        }

    public Optional<User> deleteUser(int id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            userRepository.deleteById(id);
            return optionalUser;
        } else {
            // Handle the case where the user with the specified ID is not found
            throw new HandleMethodArgumentNotValid("User not found with ID: " + id);
        }
    }


}
