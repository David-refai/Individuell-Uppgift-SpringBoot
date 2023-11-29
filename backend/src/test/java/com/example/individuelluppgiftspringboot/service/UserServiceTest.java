package com.example.individuelluppgiftspringboot.service;

import com.example.individuelluppgiftspringboot.dao.RoleRepository;
import com.example.individuelluppgiftspringboot.dao.UserRepository;
import com.example.individuelluppgiftspringboot.dto.userdto.UserRegistrationDTO;
import com.example.individuelluppgiftspringboot.mapper.UserDTOMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;

class UserServiceTest {

   @MockBean
    private UserService userService;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private PasswordEncoder passwordEncoder;

    @MockBean
    private RoleRepository roleRepository;

    @MockBean
    private UserDTOMapper userDTOMapper;

   @BeforeEach
    void setUp() {
       userService = new UserService(
                userRepository,
                passwordEncoder,
                roleRepository,
                userDTOMapper
       );


    }

    @Test
    void CreateUser() {
//       var user = new UserRegistrationDTO();
//
//
//
//
//        userService.saveUserWithRoles(user);
//            assertNotNull(user);
//            assertEquals("



    }

    @Test
    void existsByEmail() {


    }

    @Test
    void saveUserWithRoles() {
    }

    @Test
    void getAllUsers() {
    }

    @Test
    void getUserById() {
    }

    @Test
    void updateUser() {
    }

    @Test
    void deleteUser() {
    }
}