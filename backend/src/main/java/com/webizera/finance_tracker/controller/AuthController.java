package com.webizera.finance_tracker.controller;

import com.webizera.finance_tracker.dto.LoginRequestDto;
import com.webizera.finance_tracker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto request){
        return userService.authenticate(request.getEmail(), request.getPassword())
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(()->ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Invalid email or password"));
    }
}
