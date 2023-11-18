package com.example.individuelluppgiftspringboot.dao;

import com.example.individuelluppgiftspringboot.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

//    @Query("SELECT CASE WHEN COUNT(u) > 0 THEN true ELSE false END FROM User u WHERE u.email = ?1")
//    boolean existsByEmail(String email);


//
//    @Query("SELECT u FROM User u WHERE u.email = ?1")
    Optional<UserDetails> getByEmail(String email);
}


