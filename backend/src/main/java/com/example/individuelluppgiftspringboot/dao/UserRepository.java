package com.example.individuelluppgiftspringboot.dao;

import com.example.individuelluppgiftspringboot.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<UserDetails> getByEmail(String email);
}


