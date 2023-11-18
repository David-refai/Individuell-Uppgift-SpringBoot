package com.example.individuelluppgiftspringboot.exception;


import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.web.HttpMediaTypeNotAcceptableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.io.IOException;
import java.time.LocalDateTime;


//Slf4j
@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
public class DefaultExceptionHandler extends ResponseEntityExceptionHandler {

//    this is an exception handler for resource not found
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ApiError> handleException(EntityNotFoundException e, HttpServletRequest request) {

        ApiError apiError = new ApiError(
                request.getRequestURI(),
                 e.getMessage(),
                HttpStatus.NOT_FOUND.value(),
                LocalDateTime.now());

        System.out.println("EntityNotFoundException: ❌ " + apiError);
        return new ResponseEntity<>(apiError, HttpStatus.NOT_FOUND);
    }
//    this is an exception handler for insufficient authentication
    @ExceptionHandler(InsufficientAuthenticationException.class)
    public ResponseEntity<ApiError> handleException(InsufficientAuthenticationException e, HttpServletRequest request) {
        ApiError apiError = new ApiError(
                request.getRequestURI(),
                 e.getMessage(),
                HttpStatus.FORBIDDEN.value(),
                LocalDateTime.now());
//        System.out.println("InsufficientAuthenticationException: ❌ " + apiError);
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(apiError);
    }

//   this is a generic exception handler
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleException(Exception e, HttpServletRequest request) {

        ApiError apiError = new ApiError(
                request.getRequestURI(),
                 e.getMessage(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                LocalDateTime.now());
        System.out.println("Exception: ❌ " + apiError);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(apiError);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiError> handleException(ResourceNotFoundException e, HttpServletRequest request, HttpServletResponse response) {

        ApiError apiError = new ApiError(
                request.getRequestURI(),
                e.getMessage(),
                HttpStatus.NOT_FOUND.value(),
                LocalDateTime.now());

//        System.out.println("ResourceNotFoundException: ❌ " + apiError);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(apiError);
    }

    @ExceptionHandler(ExistsEmailException.class)
    public ResponseEntity<ApiError> handleException(ExistsEmailException e, HttpServletRequest request, HttpServletResponse response) {

        ApiError apiError = new ApiError(
                request.getRequestURI(),
                e.getMessage(),
                HttpStatus.CONFLICT.value(),
                LocalDateTime.now());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(apiError);
    }
    }

