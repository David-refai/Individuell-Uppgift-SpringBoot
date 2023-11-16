package com.example.individuelluppgiftspringboot.dto;

import com.example.individuelluppgiftspringboot.entities.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Set;


@Getter
@Setter

    public class UserDto {
    private final int id;
    private final String name;
    private final String email;
    private List<String> roles;
    private final String username;

    public UserDto(int id, String name, String email, List<String> roles, String username) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.username = username;
        this.roles = roles;
    }


    @Override
    public String toString() {
        return "UserDto{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
//                ", password='" + password + '\'' +
                ",username='" + username + "'" +
                ", role='" + roles + '\'' +
                '}';
    }

}
