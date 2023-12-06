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

3. Build and run the Spring Boot application:

./mvnw clean install
./mvnw spring-boot:run

The application should be accessible at http://localhost:8080.

4. Setup and run the frontend:

cd backend/src/main/resources/static/frontend
npm install
npm run dev

The frontend should be accessible at http://localhost:5173.


Application Usage:
1. Roles:

Admin: Can upload and delete files, create users, assign roles, update data, and delete users.
User: Can download files.

3. Endpoints:
4. /api/v1/auth/register                   (User): register a new user.
5. /api/v1/auth/login                      (User): log in.
6. /api/v1/auth/logout                     (User): logout.
7. /api/v1/users/create-user               (Admin): Create a new user.
8. /api/v1/users/update-user/{userId}      (Admin): Update user data.
9. /api/v1/users/delete-user/{userId}      (Admin): Delete a user.
10. /api/v1/users/all                       (Admin): Get all users.
11. /api/v1/users/{userId}                  (Admin): Get user by id.
12. /api/v1/file/upload                     (Admin): Upload files.
13. /api/v1/file/download/{id}              (User): Download files.
----------------------------------------------------------------------------
 Admin account
 Email: admin@admin.com
 Password: 123


