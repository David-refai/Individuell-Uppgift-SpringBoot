package com.example.individuelluppgiftspringboot.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.example.individuelluppgiftspringboot.dao.RoleRepository;
import com.example.individuelluppgiftspringboot.dao.UserRepository;
import com.example.individuelluppgiftspringboot.dto.userdto.UserRegistrationDTO;
import com.example.individuelluppgiftspringboot.entities.Role;
import com.example.individuelluppgiftspringboot.entities.User;
import com.example.individuelluppgiftspringboot.mapper.UserDTOMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collections;
import java.util.Optional;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class UserServiceTest {


 @Autowired
 private UserRepository userRepository;

 @MockBean
 private PasswordEncoder passwordEncoder;

 @MockBean
 private RoleRepository roleRepository;

 @MockBean
 private UserDTOMapper userDTOMapper;

 private UserService userService;

 @BeforeEach
 void setUp() {

  userService = new UserService(userRepository, passwordEncoder, roleRepository, userDTOMapper);
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
            .roles(Collections.singletonList("ROLE_USER"))
            .build();

     System.out.println("user:❌ " + user);
  // When
  userService.saveUserWithRoles(user);

  // Then
  assertNotNull(user);
  assertEquals(1, user.getId()); // Assuming you expect the ID to be 1
  assertEquals("Test", user.getName());
  assertEquals("test@test.com", user.getEmail());
  // You might want to add more assertions based on your business logic
 }



    @Test
    void existsByEmail() {
     // Given
     userService.existsByEmail("test@test.com");
     // When
        when(userRepository.getByEmail("test@test.com")).thenReturn(Optional.of(new User()));
        // Then
        verify(userRepository).getByEmail("test@test.com");


    }

    @Test
    void getAllUsers() {
     // Given
        userService.getAllUsers();
        // When
            when(userRepository.findAll()).thenReturn(Collections.singletonList(new User()));
        // Then
        verify(userRepository).findAll();


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