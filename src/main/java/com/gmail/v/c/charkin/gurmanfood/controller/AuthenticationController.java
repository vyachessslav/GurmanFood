package com.gmail.v.c.charkin.gurmanfood.controller;

import com.gmail.v.c.charkin.gurmanfood.configuration.JwtTokenProvider;
import com.gmail.v.c.charkin.gurmanfood.constants.PathConstants;
import com.gmail.v.c.charkin.gurmanfood.dto.request.LoginRequest;
import com.gmail.v.c.charkin.gurmanfood.dto.request.PasswordResetRequest;
import com.gmail.v.c.charkin.gurmanfood.dto.request.UserRequest;
import com.gmail.v.c.charkin.gurmanfood.dto.response.JwtResponse;
import com.gmail.v.c.charkin.gurmanfood.dto.response.MessageResponse;
import com.gmail.v.c.charkin.gurmanfood.security.UserPrincipal;
import com.gmail.v.c.charkin.gurmanfood.service.AuthenticationService;
import com.gmail.v.c.charkin.gurmanfood.service.RegistrationService;
import com.gmail.v.c.charkin.gurmanfood.utils.ControllerUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.validation.Valid;

import static com.gmail.v.c.charkin.gurmanfood.constants.Pages.FORGOT_PASSWORD;
import static com.gmail.v.c.charkin.gurmanfood.constants.Pages.RESET_PASSWORD;
import static com.gmail.v.c.charkin.gurmanfood.constants.PathConstants.*;

@Controller
@RequiredArgsConstructor
@RequestMapping(PathConstants.AUTH)
public class AuthenticationController {

    private final AuthenticationService authService;
    private final ControllerUtils controllerUtils;
    private final UserDetailsService userDetailsService;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;
    private final RegistrationService registrationService;

    @PostMapping(REGISTRATION)
    public ResponseEntity<MessageResponse> registration(@RequestBody UserRequest user) {
        MessageResponse response = registrationService.registration(user);
        return ResponseEntity.ok(response);
    }

    @GetMapping(ACTIVATE + "/{code}")
    public String activateEmailCode(@PathVariable String code, Model model) {
        return controllerUtils.setAlertMessage(model, LOGIN, registrationService.activateEmailCode(code));
    }

    @PostMapping(LOGIN)
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getEmail());
            if (!passwordEncoder.matches(loginRequest.getPassword(), userDetails.getPassword())) {
                throw new BadCredentialsException("Invalid password");
            }
            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    userDetails,
                    null,
                    userDetails.getAuthorities()
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtTokenProvider.generateToken(authentication);
            return ResponseEntity.ok(new JwtResponse(jwt));

        } catch (UsernameNotFoundException | LockedException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new MessageResponse("error", e.getMessage()));
        } catch (BadCredentialsException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new MessageResponse("error", "Неверный адрес Электронной Почты или Пароль"));
        }

    }



    @GetMapping(FORGOT)
    public String forgotPassword() {
        return FORGOT_PASSWORD;
    }

    @PostMapping(FORGOT)
    public String forgotPassword(@RequestParam String email, Model model) {
        return controllerUtils.setAlertMessage(model, FORGOT_PASSWORD, authService.sendPasswordResetCode(email));
    }

    @GetMapping(USER)
    public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal UserPrincipal userDetails) {
        try {
            return ResponseEntity.ok(userDetails);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new MessageResponse("error", "User not found"));
        }
    }

    @GetMapping(RESET + "/{code}")
    public String resetPassword(@PathVariable String code, Model model) {
        model.addAttribute("email", authService.getEmailByPasswordResetCode(code));
        return RESET_PASSWORD;
    }

    @PostMapping(RESET)
    public String resetPassword(@Valid PasswordResetRequest request, BindingResult bindingResult,
                                RedirectAttributes redirectAttributes, Model model) {
        if (controllerUtils.validateInputFields(bindingResult, model, "email", request.getEmail())) {
            return RESET_PASSWORD;
        }
        MessageResponse messageResponse = authService.resetPassword(request);
        if (controllerUtils.validateInputField(model, messageResponse, "email", request.getEmail())) {
            return RESET_PASSWORD;
        }
        return controllerUtils.setAlertFlashMessage(redirectAttributes, LOGIN, messageResponse);
    }
}
