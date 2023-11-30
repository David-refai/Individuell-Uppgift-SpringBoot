package com.example.individuelluppgiftspringboot.dto.userdto;



import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;


import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class UserRegistrationDTO {
        private int id;
        @NotBlank(message = "Name is required")
        private String name;
        @NotBlank(message = "Email is required")
        @Email(message = "Email is not valid")
        private String email;
        @NotBlank(message = "Password is required")
        private String password;


        private String username;


        private List<String> roles;

        public UserRegistrationDTO(int id, String name, String email, String password, String username) {

                this.id = id;
                this.name = name;
                this.email = email;
                this.password = password;
                this.username = username;
        }

        public UserRegistrationDTO() {
        }

        @Override
        public String toString() {
                return "UserRegistrationDTO{" +
                        "id=" + id +
                        ", name='" + name + '\'' +
                        ", email='" + email + '\'' +
                        ", password='" + password + '\'' +
                        ", roles=" + roles +
                        ", username='" + username + '\'' +
                        '}';
        }
}
