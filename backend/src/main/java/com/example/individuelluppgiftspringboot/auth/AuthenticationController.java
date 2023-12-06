package com.example.individuelluppgiftspringboot.auth;

import com.example.individuelluppgiftspringboot.dto.userdto.UserRegistrationDTO;
import com.example.individuelluppgiftspringboot.entities.User;
import com.example.individuelluppgiftspringboot.service.UserService;
import com.example.individuelluppgiftspringboot.jwtUtility.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/v1/auth")

public class AuthenticationController {
    private final UserService userService;
    private final JwtUtil jwtTokenService;
    private final AuthenticationService authenticationService;


    /**
     * Constructor for the AuthenticationController class.
     * @param userService The UserService.
     * @param jwtTokenService The JwtUtil.
     * @param authenticationService The AuthenticationService.
     */
    public AuthenticationController(UserService userService, JwtUtil jwtTokenService, AuthenticationService authenticationService) {
        this.userService = userService;
        this.jwtTokenService = jwtTokenService;
        this.authenticationService = authenticationService;
    }


    /**
     * Register a new user.
     * @param userRegistrationDTO The user to register.
     * @return The registered user.
     */

    @PostMapping("/register")
    public ResponseEntity<User> createUserWithRole(@Valid @RequestBody UserRegistrationDTO userRegistrationDTO) {
            User savedUser = userService.saveUserWithRoles(userRegistrationDTO);

            // Issue a JWT token and include it in the response headers
//            var token = jwtTokenService.issueToken(userRegistrationDTO.getEmail(), userRegistrationDTO.getRoles().toString());

            return ResponseEntity.ok().body(savedUser);

    }

    /**
     * Login a user.
     * @param authenticationRequest The user to login.
     * @return The logged in user.
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody AuthenticationRequest authenticationRequest) {
      AuthenticationResponse response = authenticationService.login(authenticationRequest);
        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, response.jwt())
                .body(response);
    }

    /**
     * Logout a user.
     * @param request The user to logout.
     * @return The logged out user.
     */
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
