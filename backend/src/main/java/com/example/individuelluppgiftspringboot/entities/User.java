package com.example.individuelluppgiftspringboot.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@Entity
@Getter
@Setter
@Builder
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {
    @Id
    @SequenceGenerator(
            name = "user_sequence",
            sequenceName = "user_sequence",
            allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE
            , generator = "user_sequence")
    private int id;

    @Column(name = "name")
    private String name;
    @Column(unique = true, name = "email")
    private String email;
    @Column(name = "password")
    private String password;

    @JsonBackReference
    @OneToMany(mappedBy = "user", cascade = CascadeType.PERSIST , fetch = FetchType.EAGER)
    private List<Role> roles;




    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }



    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", role='" + roles + '\'' +
                '}';
    }


//    save user with roles
    public void addRole(Role role) {
        if (roles == null) {
            roles = new ArrayList<>();
        }
        roles.add(role);
        role.setUser(this); // set user to role


    }
}
