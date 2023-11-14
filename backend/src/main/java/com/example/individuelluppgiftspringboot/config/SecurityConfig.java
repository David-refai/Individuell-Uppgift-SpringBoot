package com.example.individuelluppgiftspringboot.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableWebSecurity
public class SecurityConfig {


    @Bean
    public SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {

        http.authorizeHttpRequests(configure ->

                configure
                        .requestMatchers(HttpMethod.GET, "/api/user").hasRole("ROLE_USER")
                        .requestMatchers(HttpMethod.GET, "/api/user/**").hasRole("ROLE_USER")
                        .requestMatchers(HttpMethod.POST, "/api/user").hasRole("ROLE_MANAGER")
                        .requestMatchers(HttpMethod.PUT, "/api/user").hasRole("ROLE_MANAGER")
                        .requestMatchers(HttpMethod.DELETE, "/api/user/**").hasRole("ROLE_ADMIN")

        );

        // use HTTP Basic authentication
        http.httpBasic(Customizer.withDefaults());

//        display Cross Site Request Forgery (CSRF)
        //in general, not required for stateless REST APIs that use POST, PUT, DELETE and /or PATCH
        http.csrf(AbstractHttpConfigurer::disable); // csrf -> csrf.disable
        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails user = User.withDefaultPasswordEncoder()
                .username("user")
                .password("password")
                .roles("ROLE_USER")
                .build();
        UserDetails admin = User.withDefaultPasswordEncoder()
                .username("admin")
                .password("password")
                .roles("ROLE_ADMIN", "ROLE_USER")
                .build();
        return new InMemoryUserDetailsManager(user, admin);
    }

}

