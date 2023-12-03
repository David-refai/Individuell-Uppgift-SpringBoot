# Individuell-Uppgift-SpringBoot

## Prerequisites

- Java Development Kit (JDK) installed
- Node.js and npm installed
- SQLite database
- Git

## Setup and Run

1. Clone the repository:
git clone https://github.com/David-refai/Individuell-Uppgift-SpringBoot.git

2. Navigate to the project directory:
cd Individuell-Uppgift-SpringBoot

3.Build and run the Spring Boot application:
./mvnw clean install
./mvnw spring-boot:run

The application should be accessible at http://localhost:8080.

4. Setup and run the frontend:
cd src/main/resources/static/frontend
npm install
npm run dev

The frontend should be accessible at http://localhost:5173.


Application Usage:
1. Roles:

Admin: Can upload and delete files, create users, assign roles, update data, and delete users.
User: Can download files.

2. Endpoints:

/api/v1/auth/register                   (User): register a new user.
/api/v1/auth/login                      (User): log in.
/api/v1/auth/logout                     (User): logout.
/api/v1/users/create-user               (Admin): Create a new user.
/api/v1/users/update-user/{userId}      (Admin): Update user data.
/api/v1/users/delete-user/{userId}      (Admin): Delete a user.
/api/v1/users/all                       (Admin): Get all users.
/api/v1/users/{userId}                  (Admin): Get user by id.
/api/v1/file/upload                     (Admin): Upload files.
/api/v1/file/download/{id}              (User): Download files.

Admin account: 
Email: admin@admin.com
Password: 123


