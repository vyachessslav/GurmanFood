package com.gmail.v.c.charkin.gurmanfood.service.impl;

import com.gmail.v.c.charkin.gurmanfood.constants.ErrorMessage;
import com.gmail.v.c.charkin.gurmanfood.constants.SuccessMessage;
import com.gmail.v.c.charkin.gurmanfood.domain.Role;
import com.gmail.v.c.charkin.gurmanfood.domain.User;
import com.gmail.v.c.charkin.gurmanfood.dto.request.UserRequest;
import com.gmail.v.c.charkin.gurmanfood.dto.response.MessageResponse;
import com.gmail.v.c.charkin.gurmanfood.repository.UserRepository;
import com.gmail.v.c.charkin.gurmanfood.service.RegistrationService;
import com.gmail.v.c.charkin.gurmanfood.service.impl.MailService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RegistrationServiceImpl implements RegistrationService {

    private final UserRepository userRepository;
    private final MailService mailService;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;

    @Override
    @Transactional
    public MessageResponse registration(UserRequest userRequest) {
        if (userRequest.getPassword() != null && !userRequest.getPassword().equals(userRequest.getPassword2())) {
            return new MessageResponse("passwordError", ErrorMessage.PASSWORDS_DO_NOT_MATCH);
        }
        if (userRepository.findByEmail(userRequest.getEmail()) != null) {
            return new MessageResponse("emailError", ErrorMessage.EMAIL_IN_USE);
        }

        User user = modelMapper.map(userRequest, User.class);
        user.setActive(false);
        user.setRoles(Collections.singleton(Role.USER));
        user.setActivationCode(UUID.randomUUID().toString());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        Map<String, Object> attributes = new HashMap<>();
        attributes.put("firstName", user.getFirstName());
        attributes.put("activationCode", "/registration/activate/" + user.getActivationCode());
        mailService.sendMessageHtml(user.getEmail(), "Activation code", "registration-template", attributes);
        return new MessageResponse("alert-success", SuccessMessage.ACTIVATION_CODE_SEND);
    }

    @Override
    @Transactional
    public MessageResponse activateEmailCode(String code) {
        User user = userRepository.findByActivationCode(code);

        if (user == null) {
            return new MessageResponse("alert-danger", ErrorMessage.ACTIVATION_CODE_NOT_FOUND);
        }
        user.setActivationCode(null);
        user.setActive(true);
        userRepository.save(user);
        return new MessageResponse("alert-success", SuccessMessage.USER_ACTIVATED);
    }
}