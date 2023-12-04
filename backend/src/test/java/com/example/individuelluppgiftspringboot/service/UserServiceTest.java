package com.example.individuelluppgiftspringboot.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;


import com.example.individuelluppgiftspringboot.dao.RoleRepository;
import com.example.individuelluppgiftspringboot.dao.UserRepository;
import com.example.individuelluppgiftspringboot.dto.userdto.UserDto;
import com.example.individuelluppgiftspringboot.dto.userdto.UserRegistrationDTO;
import com.example.individuelluppgiftspringboot.entities.Role;
import com.example.individuelluppgiftspringboot.entities.User;
import com.example.individuelluppgiftspringboot.mapper.UserDTOMapper;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class UserServiceTest {


    @MockBean
    private UserRepository userRepository;

    @MockBean
    private PasswordEncoder passwordEncoder;

    @MockBean
    private RoleRepository roleRepository;

    @MockBean
    private UserDTOMapper userDTOMapper;

    private UserService userService;
    private AutoCloseable autoCloseable;


    @BeforeEach
    void setUp() {
        autoCloseable = MockitoAnnotations.openMocks(this);
        userService = new UserService(userRepository, passwordEncoder, roleRepository, userDTOMapper);
    }


    //close the autoCloseable resource after each test for clean up and to avoid memory leaks
    @AfterEach
    void tearDown() {
        try {
            autoCloseable.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @AfterAll
    static void afterAll() {
        System.out.println(" -->> after all");

    }

    @Test
    public void testDatabaseConnection() {
        // Ensure that the repository instance is not null, indicating a successful database connection
        assertNotNull(userRepository);
    }

    @Test
    void createUser() {
        // Given
        UserRegistrationDTO user = UserRegistrationDTO.builder()
                .id(1)
                .name("Test")
                .email("test@test.com")
                .password("test123")
                .roles(Collections.singletonList("USER"))
                .build();

        System.out.println("user:❌ " + user);
        // When
        userService.saveUserWithRoles(user);

        // Then
        verify(userRepository).save(any(User.class));
        // You might want to add more assertions based on your business logic
    }


    @Test
    void existsByEmail() {
        // Given
        String email = "test@test.com";
        when(userRepository.getByEmail(email)).thenReturn(Optional.empty()); // Assuming no user with the given email

        // When
        boolean actual = userService.existsByEmail(email);

        // Then
        assertFalse(actual); // You are expecting it to return false
        verify(userRepository, times(1)).getByEmail(email);
    }



    @Test
    void getAllUsers() {
        // Given
        userService.getAllUsers();

        // When
        when(userRepository.findAll()).thenReturn(java.util.List.of(new User(), new User()));

        // Then
        verify(userRepository).findAll();


    }

    @Test
    void getUserById() {

//        Given
        var id = 1;
        User user = User.builder()
                .id(id)
                .name("Test")
                .email("test@test.com")
                .password("test123")
                .roles(List.of(new Role("ADMIN")))
                .build();
        when(userRepository.findById(id)).thenReturn(Optional.of(user));

        // When
        User actual = userService.getUserById(id);

        // Then
        verify(userRepository).findById(id);

    }

    @Test
    void updateUser() {
        //  Given
        int id = 1;
        User user = User.builder()
                .id(1)
                .name("Test")
                .email("test@test.com")
                .password("test123")
                .roles(List.of(new Role("ADMIN")))
                .build();


        when(userRepository.findById(id)).thenReturn(Optional.of(user));


        String email = "david@david.com";
        UserRegistrationDTO newUser = UserRegistrationDTO.builder()
                .id(1)
                .name("David")
                .email(email)
                .password("test123")
                .roles(Collections.singletonList("USER"))
                .build();


        // When
        userService.updateUser((long) id, newUser);
        // Then
        ArgumentCaptor<User> userArgumentCaptor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(userArgumentCaptor.capture());
        User capturedUser = userArgumentCaptor.getValue();
        assertThat(capturedUser.getName()).isEqualTo(user.getName());
        assertThat(capturedUser.getEmail()).isEqualTo(user.getEmail());



    }

    @Test
    void testDeleteUser() {

        var id = 1;
        User user = User.builder()
                .id(id)
                .name("Test")
                .email("test@test.com")
                .password("test123")
                .roles(List.of(new Role("ADMIN")))
                .build();
        when(userRepository.findById(id)).thenReturn(Optional.of(user));

        userService.deleteUser(id);

        verify(userRepository).deleteById(id);

    }
}