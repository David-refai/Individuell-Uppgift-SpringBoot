package com.example.individuelluppgiftspringboot.auth;

import com.example.individuelluppgiftspringboot.dto.UserRegistrationDTO;
import com.example.individuelluppgiftspringboot.entities.User;
import com.example.individuelluppgiftspringboot.service.UserService;
import com.example.individuelluppgiftspringboot.utility.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {
    private final UserService userService;
    private final JwtUtil jwtTokenService;
    private final AuthenticationService authenticationService;

    public AuthenticationController(UserService userService, JwtUtil jwtTokenService, AuthenticationService authenticationService) {
        this.userService = userService;
        this.jwtTokenService = jwtTokenService;
        this.authenticationService = authenticationService;
    }


    @PostMapping("/register")
    public ResponseEntity<User> createUserWithRole(@RequestBody UserRegistrationDTO userRegistrationDTO) {
        try {
            // Validate the UserDto (e.g., check for required fields)
           userService.validateUserDto(userRegistrationDTO);
            User savedUser = userService.saveUserWithRoles(userRegistrationDTO);
            // Issue a JWT token and include it in the response headers
            var token = jwtTokenService.issueToken(userRegistrationDTO.getEmail(), userRegistrationDTO.getRoles().toString());

            return ResponseEntity.ok()
                    .header(HttpHeaders.AUTHORIZATION, token)
                    .body(savedUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest authenticationRequest) {
      AuthenticationResponse response = authenticationService.login(authenticationRequest);
        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, response.jwt())
                .body(response.user());
    }

//    log out
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        // Invalidating the current session will effectively log the user out
        SecurityContextHolder.clearContext();

        // Additionally, you may want to invalidate the token on the client side
        return ResponseEntity.ok().body("Logout successful");
    }

}
