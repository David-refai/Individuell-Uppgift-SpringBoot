package com.example.individuelluppgiftspringboot.dao;

import com.example.individuelluppgiftspringboot.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
}

