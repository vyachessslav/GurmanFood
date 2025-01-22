package com.gmail.v.c.charkin.gurmanfood.controller;

import com.gmail.v.c.charkin.gurmanfood.constants.Pages;
import com.gmail.v.c.charkin.gurmanfood.dto.request.UserRequest;
import com.gmail.v.c.charkin.gurmanfood.dto.response.MessageResponse;
import com.gmail.v.c.charkin.gurmanfood.service.RegistrationService;
import com.gmail.v.c.charkin.gurmanfood.utils.ControllerUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class RegistrationController {

    private final RegistrationService registrationService;
    private final ControllerUtils controllerUtils;

    @PostMapping("/registration")
    public ResponseEntity<MessageResponse> registration(@RequestBody UserRequest user) {
        MessageResponse response = registrationService.registration(user);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/activate/{code}")
    public String activateEmailCode(@PathVariable String code, Model model) {
        return controllerUtils.setAlertMessage(model, Pages.LOGIN, registrationService.activateEmailCode(code));
    }
}
