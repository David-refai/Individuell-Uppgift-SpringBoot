package com.example.individuelluppgiftspringboot.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;

@Entity
@Table(name = "roles")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Role implements GrantedAuthority {
    @Id
    @SequenceGenerator(
            name = "role_sequence",
            sequenceName = "role_sequence",
            allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE
            , generator = "role_sequence")
    private int id;


    private String name;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


    public Role(String name) {
        this.name = name;
    }


    @Override
    public String getAuthority() {
        return name;
    }


}

