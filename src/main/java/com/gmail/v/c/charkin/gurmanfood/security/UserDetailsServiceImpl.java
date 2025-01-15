package com.gmail.v.c.charkin.gurmanfood.security;

import ch.qos.logback.classic.Logger;
import com.gmail.v.c.charkin.gurmanfood.domain.User;
import com.gmail.v.c.charkin.gurmanfood.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service("userDetailsServiceImpl")
@Slf4j
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        log.info("Found user: {}", user);

        if (user == null) {
            log.error("User not found with email: {}", email);
            throw new UsernameNotFoundException("User not found");
        }

        log.info("Activation code: {}", user.getActivationCode());

        if (user.getActivationCode() != null) {
            log.error("Email not activated for user: {}", email);
            throw new LockedException("Email not activated");
        }

        return UserPrincipal.create(user);
    }
}