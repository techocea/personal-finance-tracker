package com.webizera.finance_tracker.service;

import com.webizera.finance_tracker.entity.User;
import com.webizera.finance_tracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public Optional<User> authenticate(String email, String password){
        return userRepository.findByEmail(email)
                .filter(user -> user.getPassword().equals(password)); // simple validation for testing
    }
}
