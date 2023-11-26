package com.example.individuelluppgiftspringboot.auth;

import com.example.individuelluppgiftspringboot.dto.userdto.UserRegistrationDTO;
import com.example.individuelluppgiftspringboot.entities.User;
import com.example.individuelluppgiftspringboot.service.UserService;
import com.example.individuelluppgiftspringboot.jwtUtility.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "http://localhost:5173") // react app
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
            User savedUser = userService.saveUserWithRoles(userRegistrationDTO);

            // Issue a JWT token and include it in the response headers
            var token = jwtTokenService.issueToken(userRegistrationDTO.getEmail(), userRegistrationDTO.getRoles().toString());

            return ResponseEntity.ok()
                    .header(HttpHeaders.AUTHORIZATION, token)
                    .body(savedUser);

    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest authenticationRequest) {
      AuthenticationResponse response = authenticationService.login(authenticationRequest);
        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, response.jwt())
                .body(response);
    }

//    log out
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {

        // Invalidating the current session will effectively log the user out
        var session = request.getSession(false); // false == don't create if it doesn't exist
        if (session != null) {
            session.invalidate(); // this will clear the session for the user
        }
        SecurityContextHolder.clearContext();
        // Additionally, you may want to invalidate the token on the client side
        return ResponseEntity.ok().body("Logged out successfully");
    }

}
